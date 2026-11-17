import type { ProviderRequest, ProviderResponse } from "../companion-types";

export interface CompanionProvider {
  readonly id: string;
  getStatus(): "READY" | "UNAVAILABLE";
  generate(request: ProviderRequest): Promise<ProviderResponse>;
}
