import type { ProviderRequest } from "../companion-types";
import type { CompanionProvider } from "./provider-types";

/**
 * Explicit default until an approved server-side provider adapter is configured.
 * It never fabricates assistant content or pretends that inference occurred.
 */
export class UnavailableCompanionProvider implements CompanionProvider {
  readonly id = "not-configured";

  getStatus(): "UNAVAILABLE" {
    return "UNAVAILABLE";
  }

  async generate(_request: ProviderRequest) {
    return {
      status: "UNAVAILABLE" as const,
      reason: "Ingen AI-provider är ansluten. Konfigurera en godkänd serveradapter först.",
    };
  }
}
