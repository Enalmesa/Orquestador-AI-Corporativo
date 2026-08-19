import React, { useState } from 'react';
import { 
  Send, 
  Sparkles, 
  CheckCircle2, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Brain, 
  Lock, 
  FileText, 
  AlertTriangle,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';
import { UserProfile, QueryResponse, Language } from '../types';
import { SUBAGENTS, INITIAL_GOLDEN_EXAMPLES } from '../data/knowledgeBase';
import { t } from '../utils/i18n';

interface ChatOrchestratorProps {
  user: UserProfile;
  lang: Language;
}

const PRESET_QUERIES: Record<Language, string[]> = {
  es: [
    '¿Cómo hago una denuncia ante la Inspección del Trabajo?',
    '¿Cuál es el protocolo obligatorio tras una denuncia bajo la Ley Karin?',
    '¿Cuáles son las obligaciones ante un incidente de ciberseguridad y brecha de datos?',
    '¿Puedo recibir un regalo de un proveedor por la renovación de un contrato?',
    '¿Cómo solicito el beneficio de teletrabajo para el cuidado de mi hijo bajo la Ley 21.645?'
  ],
  en: [
    'How do I file a labor complaint with the Labor Inspectorate?',
    'What is the mandatory protocol after a Karin Law complaint?',
    'What are our obligations during a cybersecurity incident and data breach?',
    'Can I accept a supplier gift for renewing a contract?',
    'How do I request telework benefits for childcare under Law 21,645?'
  ],
  pt: [
    'Como faço uma denúncia na Inspeção do Trabalho?',
    'Qual é o protocolo obrigatório após uma denúncia sob a Lei Karin?',
    'Quais são as obrigações perante um incidente de cibersegurança e violação de dados?',
    'Posso receber um presente de um fornecedor pela renovação de um contrato?',
    'Como solicito o benefício do teletrabalho para cuidar do meu filho sob a Lei 21.645?'
  ]
};

const CHAT_TEXTS: Record<Language, Record<string, string>> = {
  es: {
    phase1Tag: 'Fase 1: PoC RAG Corporativo',
    zeroHallucinationsTag: '0% Alucinaciones',
    bannerTitle: 'Consultas Internas de Gobernanza y Normativa',
    bannerSubtitle: 'Acceso unificado a Ley Karin, Ley 40 Horas, RIOHS, Prevención de Delitos Económicos y Gastos mediante arquitectura de subagentes enrutados sobre Snowflake y ChromaDB.',
    ahtProjected: 'AHT Proyectado',
    collaboratorsNet: 'Red Colaboradores',
    activeStatus: 'Activo',
    goldenExamplesTitle: 'Consultas Frecuentes Verificadas (Golden Examples)',
    orchestratingRag: 'Orquestando RAG...',
    subagentAssigned: 'Subagente Asignado:',
    goldenExampleMatchBadge: 'Golden Example Match (Cero Alucinaciones)',
    riskLabel: 'Riesgo:',
    layer1Title: '1. Reglas SQL (Snowflake)',
    layer1Table: 'Tabla:',
    layer2Title: '2. ML Vector DB (ChromaDB)',
    layer2Cosine: 'Similitud Coseno:',
    layer3Title: '3. GenAI (Gemini / DSPy)',
    layer3Model: 'Modelo:',
    layer3Verification: 'Verificación de Golden Examples completada',
    verifiedAnswerHeader: 'Respuesta Normativa Verificada',
    e2eeDecrypted: 'Descifrado E2EE',
    sourcesTitle: 'Fuentes Oficiales Consultadas (RAG)',
    cognitiveDiscernment: 'Discernimiento Cognitivo:',
    socialGreeting: 'Saludo / Interacción Social',
    ethicalFilter: 'Filtro Ético-Conductual',
    noRagNeeded: 'No requiere búsqueda RAG de leyes',
    researchAgentTitle: 'Agente Investigador y Verificador de Leyes',
    regulatoryModule: 'Módulo de Extensión Normativa',
    researchDesc: 'Si la consulta abarca un tema normativo no registrado o requiere verificar fuentes oficiales externas (Dirección del Trabajo / Diario Oficial), active este agente especializado para investigar y generar la propuesta RAG.',
    researchBtn: 'Investigar Ley Externa',
    researchingBtn: 'Investigando Leyes...',
    researchCompleted: 'Investigación Finalizada por',
    pendingApproval: 'Estado: Pendiente de Aprobación Fiscalía',
    officialSource: 'Fuente Oficial:',
    ingestingChroma: 'Ingestando en ChromaDB...',
    approveBtn: 'Aprobar e Ingestar Documento Oficial en ChromaDB',
    auditHashLabel: 'Hash Auditoría:',
    copyHash: 'Copiar Hash',
    copied: 'Copiado'
  },
  en: {
    phase1Tag: 'Phase 1: Corporate RAG PoC',
    zeroHallucinationsTag: '0% Hallucinations',
    bannerTitle: 'Internal Governance & Regulatory Queries',
    bannerSubtitle: 'Unified access to Karin Law, 40-Hour Workweek, RIOHS, Economic Crimes Prevention, and Expenses via subagent architecture routed on Snowflake and ChromaDB.',
    ahtProjected: 'Projected AHT',
    collaboratorsNet: 'Employee Network',
    activeStatus: 'Active',
    goldenExamplesTitle: 'Verified Frequent Queries (Golden Examples)',
    orchestratingRag: 'Orchestrating RAG...',
    subagentAssigned: 'Assigned Subagent:',
    goldenExampleMatchBadge: 'Golden Example Match (Zero Hallucinations)',
    riskLabel: 'Risk:',
    layer1Title: '1. SQL Rules (Snowflake)',
    layer1Table: 'Table:',
    layer2Title: '2. ML Vector DB (ChromaDB)',
    layer2Cosine: 'Cosine Similarity:',
    layer3Title: '3. GenAI (Gemini / DSPy)',
    layer3Model: 'Model:',
    layer3Verification: 'Golden Examples verification completed',
    verifiedAnswerHeader: 'Verified Regulatory Answer',
    e2eeDecrypted: 'E2EE Decrypted',
    sourcesTitle: 'Official Consulted Sources (RAG)',
    cognitiveDiscernment: 'Cognitive Discernment:',
    socialGreeting: 'Social Greeting / Introduction',
    ethicalFilter: 'Ethical & Conduct Filter',
    noRagNeeded: 'No RAG law search required',
    researchAgentTitle: 'Law Research & Verification Agent',
    regulatoryModule: 'Regulatory Extension Module',
    researchDesc: 'If the query covers an unregistered regulatory topic or requires verifying external official sources (Labor Inspectorate / Official Gazette), trigger this specialized agent to research and generate the RAG proposal.',
    researchBtn: 'Research External Law',
    researchingBtn: 'Researching Laws...',
    researchCompleted: 'Research Completed by',
    pendingApproval: 'Status: Pending Legal Approval',
    officialSource: 'Official Source:',
    ingestingChroma: 'Ingesting into ChromaDB...',
    approveBtn: 'Approve & Ingest Official Document into ChromaDB',
    auditHashLabel: 'Audit Hash:',
    copyHash: 'Copy Hash',
    copied: 'Copied'
  },
  pt: {
    phase1Tag: 'Fase 1: PoC RAG Corporativo',
    zeroHallucinationsTag: '0% Alucinações',
    bannerTitle: 'Consultas Internas de Governança e Regulamentação',
    bannerSubtitle: 'Acesso unificado à Lei Karin, Lei de 40 Horas, RIOHS, Prevenção de Crimes Econômicos e Despesas por meio de subagentes no Snowflake e ChromaDB.',
    ahtProjected: 'AHT Projetado',
    collaboratorsNet: 'Rede de Colaboradores',
    activeStatus: 'Ativo',
    goldenExamplesTitle: 'Consultas Frequentes Verificadas (Golden Examples)',
    orchestratingRag: 'Orquestrando RAG...',
    subagentAssigned: 'Subagente Atribuído:',
    goldenExampleMatchBadge: 'Golden Example Match (Zero Alucinações)',
    riskLabel: 'Risco:',
    layer1Title: '1. Regras SQL (Snowflake)',
    layer1Table: 'Tabela:',
    layer2Title: '2. BD de Vetores ML (ChromaDB)',
    layer2Cosine: 'Similaridade de Cosseno:',
    layer3Title: '3. GenAI (Gemini / DSPy)',
    layer3Model: 'Modelo:',
    layer3Verification: 'Verificação de Golden Examples concluída',
    verifiedAnswerHeader: 'Resposta Regulatória Verificada',
    e2eeDecrypted: 'Descriptografado E2EE',
    sourcesTitle: 'Fontes Oficiais Consultadas (RAG)',
    cognitiveDiscernment: 'Discernimento Cognitivo:',
    socialGreeting: 'Saudação / Interação Social',
    ethicalFilter: 'Filtro Ético-Conductual',
    noRagNeeded: 'Não requer pesquisa RAG de leis',
    researchAgentTitle: 'Agente Investigador e Verificador de Leis',
    regulatoryModule: 'Módulo de Extensão Regulatória',
    researchDesc: 'Se a consulta abranger um tópico regulatório não registrado ou exigir verificação de fontes oficiais externas, ative este agente especializado para pesquisar e gerar a proposta RAG.',
    researchBtn: 'Pesquisar Lei Externa',
    researchingBtn: 'Pesquisando Leis...',
    researchCompleted: 'Pesquisa Concluída por',
    pendingApproval: 'Status: Pendente de Aprovação Jurídica',
    officialSource: 'Fonte Oficial:',
    ingestingChroma: 'Ingerindo no ChromaDB...',
    approveBtn: 'Aprovar e Ingerir Documento Oficial no ChromaDB',
    auditHashLabel: 'Hash de Auditoria:',
    copyHash: 'Copiar Hash',
    copied: 'Copiado'
  }
};

export const ChatOrchestrator: React.FC<ChatOrchestratorProps> = ({ user, lang }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [copiedHash, setCopiedHash] = useState(false);
  const [researching, setResearching] = useState(false);
  const [researchResult, setResearchResult] = useState<any>(null);
  const [approving, setApproving] = useState(false);
  const [approvalMessage, setApprovalMessage] = useState<string | null>(null);

  const txt = CHAT_TEXTS[lang] || CHAT_TEXTS['es'];
  const presetQueries = PRESET_QUERIES[lang] || PRESET_QUERIES['es'];

  const handleSendQuery = async (queryText?: string, forceResearch: boolean = false) => {
    const q = queryText || query;
    if (!q.trim()) return;

    setLoading(true);
    setResponse(null);
    setResearchResult(null);
    setApprovalMessage(null);

    try {
      const res = await fetch('/api/v1/consult', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: q,
          userId: user.id,
          userName: user.name,
          userRole: user.role,
          forceResearchMode: forceResearch
        })
      });

      if (!res.ok) throw new Error('Error en el servicio de RAG');
      const data: QueryResponse = await res.json();
      setResponse(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleTriggerResearch = async () => {
    if (!query && !response?.originalQuery) return;
    const targetQuery = query || response?.originalQuery || '';
    setResearching(true);
    setApprovalMessage(null);

    try {
      const res = await fetch('/api/v1/research-law', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: targetQuery,
          userId: user.id,
          userName: user.name
        })
      });

      const data = await res.json();
      if (data.success) {
        setResearchResult(data);
      }
    } catch (err) {
      console.error("Error triggering research agent:", err);
    } finally {
      setResearching(false);
    }
  };

  const handleApproveDocument = async (docId: string) => {
    setApproving(true);
    try {
      const res = await fetch('/api/v1/knowledge/approve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          documentId: docId,
          approvedBy: `${user.name} (${user.role})`
        })
      });

      const data = await res.json();
      if (data.success) {
        setApprovalMessage(data.message);
        // Automatically re-query now that the document is active!
        setTimeout(() => {
          handleSendQuery(query || response?.originalQuery);
        }, 1200);
      }
    } catch (err) {
      console.error("Error approving document:", err);
    } finally {
      setApproving(false);
    }
  };

  const copyHashToClipboard = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-6 max-w-6xl mx-auto">
      
      {/* Banner Intro */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-indigo-500/10 px-2 py-0.5 text-[10px] font-bold text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                {txt.phase1Tag}
              </span>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                {txt.zeroHallucinationsTag}
              </span>
            </div>
            <h2 className="mt-2 text-xl font-bold text-white">
              {txt.bannerTitle}
            </h2>
            <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
              {txt.bannerSubtitle}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-center min-w-[100px]">
              <div className="text-lg font-bold text-indigo-400">-40%</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{txt.ahtProjected}</div>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-center min-w-[100px]">
              <div className="text-lg font-bold text-emerald-400">{txt.activeStatus}</div>
              <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{txt.collaboratorsNet}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Preset Query Chips */}
      <div>
        <div className="text-xs font-semibold text-slate-400 mb-2.5 flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5 text-indigo-400" />
          <span>{txt.goldenExamplesTitle}</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presetQueries.map((preset, idx) => (
            <button
              key={idx}
              id={`preset-btn-${idx}`}
              onClick={() => {
                setQuery(preset);
                handleSendQuery(preset);
              }}
              className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300 hover:border-indigo-500/50 hover:bg-slate-800 hover:text-white transition text-left"
            >
              "{preset}"
            </button>
          ))}
        </div>
      </div>

      {/* Main Query Input Bar */}
      <div className="relative">
        <textarea
          id="query-input-textarea"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t(lang, 'consultaPromptPlaceholder')}
          rows={3}
          className="w-full rounded-xl border border-slate-800 bg-slate-950 p-4 text-sm text-slate-200 placeholder-slate-500 focus:border-indigo-500 focus:outline-none shadow-xl"
        />
        <div className="absolute right-3 bottom-3 flex items-center gap-2">
          <button
            id="send-query-btn"
            onClick={() => handleSendQuery()}
            disabled={loading || !query.trim()}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 transition shadow-lg shadow-indigo-600/20"
          >
            {loading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin text-white" />
                <span>{txt.orchestratingRag}</span>
              </>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>{t(lang, 'enviarConsulta')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Response Panel */}
      {response && (
        <div className="space-y-4 animate-fade-in">
          
          {/* Subagent Routing Badge & Risk Assessment */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-800 bg-slate-900 p-4">
            <div className="flex items-center gap-3">
              <div className={`rounded-lg p-2.5 ${response.routedSubagent.color}`}>
                <Brain className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">
                  {txt.subagentAssigned} {response.routedSubagent.name}
                </div>
                <div className="text-[11px] text-slate-400">
                  {response.routedSubagent.roleDescription}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {response.goldenExampleMatch && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/30">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  {txt.goldenExampleMatchBadge}
                </span>
              )}
              <span className={`rounded-full px-2.5 py-1 text-xs font-bold capitalize ${
                response.riskAssessment === 'crítico' 
                  ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' 
                  : 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
              }`}>
                {txt.riskLabel} {response.riskAssessment}
              </span>
            </div>
          </div>

          {/* 3-Layer Hybrid RAG Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
            {/* Layer 1: Snowflake Rules */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3.5">
              <div className="flex items-center gap-2 font-bold text-indigo-400 mb-1">
                <Database className="h-4 w-4" />
                <span>{txt.layer1Title}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {txt.layer1Table} <code className="text-indigo-300 font-mono">{response.hybridLayers.rulesLayer.snowflakeTable}</code>
              </p>
              <div className="mt-2 font-mono text-[10px] text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                {response.hybridLayers.rulesLayer.ruleText}
              </div>
            </div>

            {/* Layer 2: ML ChromaDB */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3.5">
              <div className="flex items-center gap-2 font-bold text-purple-400 mb-1">
                <Cpu className="h-4 w-4" />
                <span>{txt.layer2Title}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {txt.layer2Cosine} <span className="text-emerald-400 font-bold">{(response.hybridLayers.mlLayer.similarityScore * 100).toFixed(1)}%</span>
              </p>
              <div className="mt-2 font-mono text-[10px] text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                Chunk: {response.hybridLayers.mlLayer.chunkMatch}
              </div>
            </div>

            {/* Layer 3: GenAI / Gemini */}
            <div className="rounded-xl border border-slate-800 bg-slate-900 p-3.5">
              <div className="flex items-center gap-2 font-bold text-indigo-300 mb-1">
                <Sparkles className="h-4 w-4 text-indigo-400" />
                <span>{txt.layer3Title}</span>
              </div>
              <p className="text-[11px] text-slate-400">
                {txt.layer3Model} <span className="text-indigo-300 font-bold">{response.hybridLayers.genAiLayer.model}</span>
              </p>
              <div className="mt-2 text-[10px] text-slate-300 bg-slate-950 p-2 rounded border border-slate-800">
                {txt.layer3Verification}
              </div>
            </div>
          </div>

          {/* Main Answer Card */}
          <div className="rounded-xl border border-indigo-500/30 bg-slate-900 p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3.5 mb-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <ShieldCheck className="h-5 w-5 text-emerald-400" />
                <span>{txt.verifiedAnswerHeader}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
                <Lock className="h-3.5 w-3.5 text-indigo-400" />
                <span>{txt.e2eeDecrypted}</span>
              </div>
            </div>

            <div className="prose prose-invert max-w-none text-sm leading-relaxed text-slate-200 whitespace-pre-line">
              {response.answer}
            </div>

            {/* Sources Citations */}
            {response.sources.length > 0 && (
              <div className="mt-5 border-t border-slate-800 pt-4">
                <div className="text-xs font-bold text-slate-300 mb-2.5 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-indigo-400" />
                  <span>{txt.sourcesTitle}</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                  {response.sources.map((src, i) => (
                    <div key={i} className="rounded-lg border border-slate-800 bg-slate-950 p-3 text-xs">
                      <div className="font-semibold text-indigo-300">{src.title}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{src.sourceLawOrPolicy}</div>
                      <p className="text-[11px] text-slate-300 mt-1.5 italic">"{src.snippet}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Intent Discernment Badge */}
            {response.intentCategory && response.intentCategory !== 'normativa' && (
              <div className="mt-4 rounded-lg bg-indigo-500/10 border border-indigo-500/30 p-3 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-300 font-medium">
                  <Brain className="h-4 w-4 text-indigo-400" />
                  <span>
                    {txt.cognitiveDiscernment} {response.intentCategory === 'saludo' ? txt.socialGreeting : txt.ethicalFilter}
                  </span>
                </div>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  {txt.noRagNeeded}
                </span>
              </div>
            )}

            {/* Out-of-Scope or External Law Research Agent Trigger */}
            {(response.intentCategory === 'normativa' || response.isOutOfScope) && (
              <div className="mt-5 rounded-xl border border-indigo-500/40 bg-indigo-950/30 p-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-lg bg-indigo-500/20 p-2 text-indigo-400 mt-0.5">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white flex items-center gap-2">
                        <span>{txt.researchAgentTitle}</span>
                        <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] text-indigo-300 font-mono">
                          {txt.regulatoryModule}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-300 mt-1">
                        {txt.researchDesc}
                      </p>
                    </div>
                  </div>

                  <button
                    id="trigger-research-agent-btn"
                    onClick={handleTriggerResearch}
                    disabled={researching}
                    className="flex-shrink-0 flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 transition shadow-lg shadow-indigo-600/30"
                  >
                    {researching ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        <span>{txt.researchingBtn}</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-4 w-4 text-amber-300" />
                        <span>{txt.researchBtn}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Research Result & Approval Panel */}
                {researchResult && (
                  <div className="mt-4 pt-4 border-t border-indigo-500/30 space-y-3 animate-fade-in">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" />
                        {txt.researchCompleted} {researchResult.routedSubagent.name}
                      </span>
                      <span className="rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                        {txt.pendingApproval}
                      </span>
                    </div>

                    <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 text-xs space-y-2">
                      <div className="text-sm font-bold text-indigo-300">{researchResult.researchedDoc.title}</div>
                      <div className="text-[11px] text-slate-400">
                        {txt.officialSource} <span className="text-slate-200 font-semibold">{researchResult.researchedDoc.sourceLawOrPolicy}</span>
                      </div>
                      <div className="text-slate-300 whitespace-pre-line leading-relaxed bg-slate-900/80 p-3 rounded border border-slate-800 font-mono text-[11px]">
                        {researchResult.researchedDoc.content}
                      </div>
                    </div>

                    {approvalMessage ? (
                      <div className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs font-bold text-emerald-400 flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{approvalMessage}</span>
                      </div>
                    ) : (
                      <div className="flex justify-end">
                        <button
                          id="approve-knowledge-doc-btn"
                          onClick={() => handleApproveDocument(researchResult.docId)}
                          disabled={approving}
                          className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-500 disabled:opacity-50 transition shadow-lg shadow-emerald-600/30"
                        >
                          {approving ? (
                            <>
                              <RefreshCw className="h-4 w-4 animate-spin" />
                              <span>{txt.ingestingChroma}</span>
                            </>
                          ) : (
                            <>
                              <ShieldCheck className="h-4 w-4" />
                              <span>{txt.approveBtn}</span>
                            </>
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Cryptographic SHA-256 Audit Hash */}
            <div className="mt-4 flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-[11px]">
              <div className="flex items-center gap-2 text-slate-400 font-mono truncate">
                <Lock className="h-3.5 w-3.5 text-indigo-400 flex-shrink-0" />
                <span>{txt.auditHashLabel} <span className="text-slate-200">{response.auditHash}</span></span>
              </div>
              <button
                id="copy-hash-btn"
                onClick={() => copyHashToClipboard(response.auditHash)}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 ml-2 flex-shrink-0"
              >
                {copiedHash ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedHash ? txt.copied : txt.copyHash}</span>
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
