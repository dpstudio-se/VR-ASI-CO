// TF1766 / SHILD — UNIVERSAL AI/LLM AUDIT KERNEL
// UPI_FLAG = konfliktpunkt. INTE juridiskt avgörande.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum LlmProvider { OpenAI, Grok, Gemini, Claude, Copilot, Local, Other(String) }
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum AuditScope { Unknown, PrivateService, PublicAuthority, PublicCommunication, TF_YGL_Medium }
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum AuditEvent { Pass, Block { reason: String }, DropSilent, Flag { code: String } }
#[derive(Debug, Clone)]
pub struct LlmResponse {
    pub provider: LlmProvider,
    pub model: String,
    pub response_id: String,
    pub text: String,
    pub scope: AuditScope,
    pub legal_basis: Option<String>,
}
impl LlmResponse {
    pub fn new(provider: LlmProvider, model: impl Into<String>, response_id: impl Into<String>, text: impl Into<String>, scope: AuditScope) -> Self {
        Self { provider, model: model.into(), response_id: response_id.into(), text: text.into(), scope, legal_basis: None }
    }
    pub fn classify_silence(&self, expected_text: bool) -> AuditEvent {
        if expected_text && self.text.trim().is_empty() { AuditEvent::DropSilent } else { AuditEvent::Pass }
    }
    pub fn tf18_applicable(&self) -> bool {
        matches!(self.scope, AuditScope::PublicAuthority | AuditScope::TF_YGL_Medium)
    }
}
