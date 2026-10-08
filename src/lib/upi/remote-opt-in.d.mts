export type RemotePersona = "angelica" | "emilia" | "luna";
export type RemoteOffer = {
  status: "CONSENT_REQUIRED" | "STOP" | "REFERENCE_ONLY";
  reason?: string;
  canUseProvider: boolean;
  hostAdmission: "STOP";
  repository?: string;
  branch?: string;
  commit?: string;
  persona?: RemotePersona;
  receiptId?: string;
  promptSha256?: string;
  files?: Record<string, string>;
  prompt?: string;
  providerModel?: null;
  hostPromptInstalled?: boolean;
  hostInferencePerformed?: boolean;
  dnaWritePerformed?: boolean;
  next?: string;
};
export declare const REMOTE_PERSONAS: readonly RemotePersona[];
export declare const REMOTE_REPO: "dpstudio-se/VR-ASI-CO";
export declare function prepareRemoteOffer(args?: {
  accepted?: boolean;
  persona?: RemotePersona;
  readBoot?: (options: { persona: RemotePersona }) => Promise<unknown>;
}): Promise<RemoteOffer>;
