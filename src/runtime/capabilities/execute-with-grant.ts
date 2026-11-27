import type { StartOperationInput } from "../grants/contracts.ts";
import type { PostgresRuntimeGrantService } from "../grants/postgres-grant-service.ts";

export interface GrantedExecutionResult<T> {
  executed: boolean;
  status: "STARTED" | "COMPLETED" | "FAILED" | "UNKNOWN";
  result?: T;
}

/**
 * Server-side capability broker wrapper. A caller must supply principal/session
 * values from authenticated server context and currentDnaCommit from the
 * canonical DNA resolver, never from browser request fields.
 *
 * External work already started cannot be rolled back by grant revocation.
 * A crash/expired lease becomes UNKNOWN and is never automatically retried.
 */
export async function executeWithRuntimeGrant<T>(
  service: PostgresRuntimeGrantService,
  input: StartOperationInput,
  execute: () => Promise<T>,
  isAmbiguousFailure: (error: unknown) => boolean = () => false,
): Promise<GrantedExecutionResult<T>> {
  const started = await service.startOperation(input);
  if (!started.shouldExecute) {
    return { executed: false, status: started.status };
  }

  try {
    const result = await execute();
    const recorded = await service.finishOperation(
      input.operationId,
      "COMPLETED",
      input.principalId,
      input.sessionId,
    );
    if (!recorded) throw new Error("OPERATION_COMPLETION_NOT_RECORDED");
    return { executed: true, status: "COMPLETED", result };
  } catch (error) {
    const outcome = isAmbiguousFailure(error) ? "UNKNOWN" : "FAILED";
    await service.finishOperation(
      input.operationId,
      outcome,
      input.principalId,
      input.sessionId,
    );
    throw error;
  }
}
