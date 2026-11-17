export type CompanionMode = "neutral" | "friendly" | "romantic" | "roleplay";

export type CompanionBoundary = {
  id: string;
  label: string;
  enabled: boolean;
};

export type CompanionPreferences = {
  mode: CompanionMode;
  displayName: string;
  responseStyle: "concise" | "balanced" | "detailed";
  boundaries: CompanionBoundary[];
  memoryEnabled: boolean;
};

export type CompanionMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type CompanionConversation = {
  id: string;
  profileId: string;
  messages: CompanionMessage[];
  updatedAt: string;
};

export type CompanionMemoryEntry = {
  id: string;
  content: string;
  category: "preference" | "project-context" | "conversation-summary";
  createdAt: string;
  updatedAt: string;
};

export type ProviderStatus = "READY" | "UNAVAILABLE" | "ERROR";

export type ProviderRequest = {
  conversationId: string;
  profileId: string;
  mode: CompanionMode;
  messages: Pick<CompanionMessage, "role" | "content">[];
  preferences: Pick<CompanionPreferences, "responseStyle" | "boundaries">;
  signal?: AbortSignal;
};

export type ProviderResponse =
  | { status: "SUCCEEDED"; content: string; provider: string; model: string }
  | { status: "UNAVAILABLE"; reason: string }
  | { status: "ERROR"; reason: string };

export type CompanionResult = ProviderResponse & {
  requestId: string;
  createdAt: string;
};
