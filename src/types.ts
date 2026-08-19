export type UserRole = 'admin' | 'auditor' | 'compliance_officer' | 'collaborator';

export type Language = 'es' | 'en' | 'pt';

export type ThemeMode = 'navy_dark' | 'corporate_light' | 'emerald_slate';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  department: string;
  avatar: string;
  provider: 'google' | 'microsoft' | 'sso_saml' | 'email';
  e2eeEnabled: boolean;
  publicKeyFingerprint: string;
}

export type SubagentId = 
  | 'orquestador'
  | 'agente_laboral'
  | 'agente_proceso'
  | 'agente_legal'
  | 'agente_auditor'
  | 'agente_investigador';

export interface SubagentConfig {
  id: SubagentId;
  name: string;
  shortName: string;
  roleDescription: string;
  icon: string;
  color: string;
  domains: string[];
  activeRulesCount: number;
  vectorsCount: number;
  goldenExamplesCount: number;
  accuracyRate: number;
}

export interface KnowledgeDocument {
  id: string;
  title: string;
  category: string;
  sourceLawOrPolicy: string;
  content: string;
  lastUpdated: string;
  version: string;
  chunksCount: number;
  subagentAssigned: SubagentId;
  confidentiality: 'pública' | 'interna' | 'confidencial' | 'estrictamente_reservada';
  status?: 'activo' | 'pendiente_aprobacion' | 'rechazado';
  researchedBy?: string;
}

export interface GoldenExample {
  id: string;
  query: string;
  subagentId: SubagentId;
  verifiedAnswer: string;
  legalCitation: string;
  lastVerifiedBy: string;
}

export interface RAGSourceCitation {
  documentId: string;
  title: string;
  sourceLawOrPolicy: string;
  similarityScore: number;
  snippet: string;
  ruleMatched?: string;
}

export interface ResearchedLawDraft {
  title: string;
  category: string;
  sourceLawOrPolicy: string;
  content: string;
  keyObligations: string[];
  legalCitation: string;
}

export interface QueryResponse {
  queryId: string;
  originalQuery: string;
  routedSubagent: SubagentConfig;
  answer: string;
  encryptedPayload: string;
  sources: RAGSourceCitation[];
  hybridLayers: {
    rulesLayer: { matched: boolean; ruleText: string | null; snowflakeTable: string };
    mlLayer: { similarityScore: number; chromaCollection: string; chunkMatch: string };
    genAiLayer: { model: string; promptTokens: number; completionTokens: number };
  };
  goldenExampleMatch: boolean;
  auditHash: string;
  riskAssessment: 'bajo' | 'medio' | 'crítico';
  processingTimeMs: number;
  timestamp: string;
  isOutOfScope?: boolean;
  intentCategory?: 'normativa' | 'saludo' | 'incongruente';
  canResearch?: boolean;
  outOfScopeReason?: string;
  researchedLawDraft?: ResearchedLawDraft;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: UserRole;
  subagentId: SubagentId;
  querySummary: string;
  riskAssessment: 'bajo' | 'medio' | 'crítico';
  encryptedHash: string;
  previousHash: string;
  ipAddress: string;
  action: 'QUERY_RAG' | 'DOCUMENT_UPLOAD' | 'CONFIG_CHANGE' | 'PERMISSIONS_UPDATE' | 'ALERT_ACKNOWLEDGE';
}

export interface ComplianceNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  severity: 'info' | 'warning' | 'critical';
  category: 'Ley Karin' | 'Ley 40 Horas' | 'RIOHS' | 'Seguridad' | 'Delitos Económicos';
  read: boolean;
  actionRequired?: boolean;
}

export interface RestEndpointDoc {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  path: string;
  summary: string;
  headers: Record<string, string>;
  requestBodyExample?: string;
  responseExample: string;
}
