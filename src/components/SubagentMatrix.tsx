import React, { useState } from 'react';
import { 
  BrainCircuit, 
  Scale, 
  Workflow, 
  ShieldCheck, 
  FileCheck2, 
  Activity, 
  Sparkles,
  ArrowRight,
  Database,
  CheckCircle2,
  Play
} from 'lucide-react';
import { SUBAGENTS } from '../data/knowledgeBase';
import { SubagentConfig, Language } from '../types';

interface SubagentMatrixProps {
  lang?: Language;
}

export const SubagentMatrix: React.FC<SubagentMatrixProps> = ({ lang = 'es' }) => {
  const [selectedAgent, setSelectedAgent] = useState<SubagentConfig>(SUBAGENTS[0]);
  const [testLog, setTestLog] = useState<string | null>(null);
  const [testRunning, setTestRunning] = useState(false);

  const handleSelectAgent = (agent: SubagentConfig) => {
    setSelectedAgent(agent);
    setTestLog(null);
  };

  const runSubagentDiagnostic = (agent: SubagentConfig) => {
    setTestRunning(true);
    setTestLog(null);
    setTimeout(() => {
      setTestRunning(false);
      const logText = lang === 'en'
        ? `[DIAGNOSTIC OK]: ${agent.name} responding in 22ms. ${agent.activeRulesCount} Snowflake SQL Rules synced. ${agent.vectorsCount} ChromaDB vectors validated.`
        : lang === 'pt'
        ? `[DIAGNÓSTICO OK]: ${agent.name} respondendo em 22ms. ${agent.activeRulesCount} Regras SQL Snowflake sincronizadas. ${agent.vectorsCount} vetores ChromaDB validados.`
        : `[DIAGNÓSTICO OK]: ${agent.name} respondiendo en 22ms. ${agent.activeRulesCount} Reglas SQL Snowflake sincronizadas. ${agent.vectorsCount} vectores ChromaDB validados.`;
      setTestLog(logText);
    }, 800);
  };

  const labels = {
    es: {
      badge: 'Jerarquía de Inteligencia Especializada',
      title: 'Red de Subagentes de IA Corporativa',
      subtitle: 'Arquitectura multinivel con un Agente Administrador Orquestador que conmuta hacia agentes expertos especializados con reglas dedicadas en Snowflake y colecciones en ChromaDB.',
      online: 'Orquestador en Línea',
      archDiagram: 'Diagrama de Arquitectura de Subagentes (PoC)',
      masterAgent: 'AGENTE ADMINISTRADOR',
      masterSub: '(Orquestador Master)',
      masterDesc: 'Enrutamiento inteligente RAG & Verificación Golden Examples',
      inspection: 'Inspección de Subagente:',
      btnTest: 'Probar Diagnóstico',
      rules: 'Reglas Snowflake SQL',
      vectors: 'Vectores ChromaDB',
      examples: 'Golden Examples',
      accuracy: 'Tasa de Precisión RAG',
      domains: 'Dominios Normativos Manejados:'
    },
    en: {
      badge: 'Specialized Intelligence Hierarchy',
      title: 'Corporate AI Subagents Network',
      subtitle: 'Multi-level architecture with a Master Administrator Orchestrator routing queries to domain-expert subagents backed by Snowflake rules and ChromaDB vector stores.',
      online: 'Orchestrator Online',
      archDiagram: 'Subagent Architecture Diagram (PoC)',
      masterAgent: 'ADMINISTRATOR AGENT',
      masterSub: '(Master Orchestrator)',
      masterDesc: 'Smart RAG Routing & Golden Examples Verification',
      inspection: 'Subagent Inspection:',
      btnTest: 'Run Diagnostic Test',
      rules: 'Snowflake SQL Rules',
      vectors: 'ChromaDB Vectors',
      examples: 'Golden Examples',
      accuracy: 'RAG Accuracy Rate',
      domains: 'Managed Regulatory Domains:'
    },
    pt: {
      badge: 'Hierarquia de Inteligência Especializada',
      title: 'Rede de Subagentes de IA Corporativa',
      subtitle: 'Arquitetura multinível com um Agente Administrador Orquestrador que direciona consultas para agentes especialistas com regras Snowflake e coleções ChromaDB.',
      online: 'Orquestrador Online',
      archDiagram: 'Diagrama de Arquitetura de Subagentes (PoC)',
      masterAgent: 'AGENTE ADMINISTRADOR',
      masterSub: '(Orquestrador Master)',
      masterDesc: 'Roteamento Inteligente RAG & Verificação Golden Examples',
      inspection: 'Inspeção do Subagente:',
      btnTest: 'Testar Diagnóstico',
      rules: 'Regras Snowflake SQL',
      vectors: 'Vetores ChromaDB',
      examples: 'Golden Examples',
      accuracy: 'Taxa de Precisão RAG',
      domains: 'Domínios Regulatórios Gerenciados:'
    }
  };

  const t = labels[lang] || labels['es'];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Title Header */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
              <BrainCircuit className="h-4 w-4" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              {t.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-400 flex items-center gap-1.5 uppercase tracking-wider">
              <Activity className="h-3.5 w-3.5 animate-pulse" />
              {t.online}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Subagent Tree Visualizer */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 overflow-x-auto shadow-2xl">
        <div className="text-[10px] font-bold text-slate-500 mb-6 uppercase tracking-widest">
          {t.archDiagram}
        </div>

        <div className="min-w-[700px] flex items-center justify-between gap-6 py-4 relative">
          
          {/* Master Administrator Agent */}
          <div 
            onClick={() => handleSelectAgent(SUBAGENTS[0])}
            className={`flex-shrink-0 w-52 rounded-xl border-2 cursor-pointer transition p-4 text-center shadow-lg relative z-10 ${
              selectedAgent.id === 'orquestador'
                ? 'border-indigo-400 bg-indigo-900/60 shadow-indigo-500/30'
                : 'border-indigo-500/60 bg-indigo-950/40 hover:border-indigo-400 shadow-indigo-500/20'
            }`}
          >
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold mb-2">
              <BrainCircuit className="h-6 w-6 animate-pulse" />
            </div>
            <div className="text-xs font-bold text-white">{t.masterAgent}</div>
            <div className="text-[10px] text-indigo-300 mt-1">{t.masterSub}</div>
            <div className="mt-3 rounded-lg bg-slate-950 p-2 text-[10px] text-slate-400 border border-slate-800">
              {t.masterDesc}
            </div>
          </div>

          {/* Lines / Connectors */}
          <div className="flex-1 flex flex-col justify-between h-80 py-4 relative">
            <div className="border-t-2 border-dashed border-indigo-500/50 w-full my-auto"></div>
            <div className="border-t-2 border-dashed border-emerald-500/50 w-full my-auto"></div>
            <div className="border-t-2 border-dashed border-purple-500/50 w-full my-auto"></div>
            <div className="border-t-2 border-dashed border-amber-500/50 w-full my-auto"></div>
          </div>

          {/* Specialized Subagents */}
          <div className="flex-shrink-0 w-64 space-y-3 relative z-10">
            
            {/* Agente Laboral */}
            <div 
              onClick={() => handleSelectAgent(SUBAGENTS[1])}
              className={`rounded-xl border p-3 cursor-pointer transition ${
                selectedAgent.id === 'agente_laboral' 
                  ? 'border-emerald-500 bg-emerald-950/40 shadow-md shadow-emerald-500/20' 
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Scale className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold text-white">Agente Laboral</span>
                </div>
                <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">3 Normas</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1 text-[9px] text-slate-300">
                <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Ley Karin</span>
                <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Conciliación Familiar</span>
                <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Ley 40 Horas</span>
              </div>
            </div>

            {/* Agente Proceso */}
            <div 
              onClick={() => handleSelectAgent(SUBAGENTS[2])}
              className={`rounded-xl border p-3 cursor-pointer transition ${
                selectedAgent.id === 'agente_proceso' 
                  ? 'border-purple-500 bg-purple-950/40 shadow-md shadow-purple-500/20' 
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Workflow className="h-4 w-4 text-purple-400" />
                  <span className="text-xs font-bold text-white">Agente Proceso</span>
                </div>
                <span className="text-[10px] text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded font-mono">2 Dominios</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1 text-[9px] text-slate-300">
                <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Políticas Internas</span>
                <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">RIOHS - Código Ética</span>
              </div>
            </div>

            {/* Agente Legal */}
            <div 
              onClick={() => handleSelectAgent(SUBAGENTS[3])}
              className={`rounded-xl border p-3 cursor-pointer transition ${
                selectedAgent.id === 'agente_legal' 
                  ? 'border-amber-500 bg-amber-950/40 shadow-md shadow-amber-500/20' 
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-400" />
                  <span className="text-xs font-bold text-white">Agente Legal</span>
                </div>
                <span className="text-[10px] text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded font-mono">2 Leyes</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1 text-[9px] text-slate-300">
                <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Delitos Económicos</span>
                <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Datos Personales ARCO</span>
              </div>
            </div>

            {/* Agente Auditor 24/7 */}
            <div 
              onClick={() => handleSelectAgent(SUBAGENTS[4])}
              className={`rounded-xl border p-3 cursor-pointer transition ${
                selectedAgent.id === 'agente_auditor' 
                  ? 'border-cyan-500 bg-cyan-950/40 shadow-md shadow-cyan-500/20' 
                  : 'border-slate-800 bg-slate-950 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck2 className="h-4 w-4 text-cyan-400" />
                  <span className="text-xs font-bold text-white">Agente Auditor 24/7</span>
                </div>
                <span className="text-[10px] text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded font-mono">Continuo</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1 text-[9px] text-slate-300">
                <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Trazabilidad E2EE</span>
                <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Auditoría Hashing</span>
              </div>
            </div>

            {/* Agente Investigador y Verificador de Leyes */}
            {SUBAGENTS[5] && (
              <div 
                onClick={() => handleSelectAgent(SUBAGENTS[5])}
                className={`rounded-xl border p-3 cursor-pointer transition ${
                  selectedAgent.id === 'agente_investigador' 
                    ? 'border-indigo-500 bg-indigo-950/40 shadow-md shadow-indigo-500/20' 
                    : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white">Agente Investigador</span>
                  </div>
                  <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-mono">Leyes Ext</span>
                </div>
                <div className="mt-2 flex flex-wrap gap-1 text-[9px] text-slate-300">
                  <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Búsqueda Normativa</span>
                  <span className="bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">Verificación Fiscalía</span>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>

      {/* Detail Card & Diagnostics Tool */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <span>{t.inspection} {selectedAgent.name}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {selectedAgent.roleDescription}
            </p>
          </div>

          <button
            id="run-subagent-test-btn"
            onClick={() => runSubagentDiagnostic(selectedAgent)}
            disabled={testRunning}
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            <span>{t.btnTest}</span>
          </button>
        </div>

        {testLog && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 font-mono">
            {testLog}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
            <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{t.rules}</div>
            <div className="text-lg font-bold text-indigo-400 mt-0.5">{selectedAgent.activeRulesCount}</div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
            <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{t.vectors}</div>
            <div className="text-lg font-bold text-purple-400 mt-0.5">{selectedAgent.vectorsCount}</div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
            <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{t.examples}</div>
            <div className="text-lg font-bold text-emerald-400 mt-0.5">{selectedAgent.goldenExamplesCount}</div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
            <div className="text-slate-500 text-[10px] uppercase font-bold tracking-widest">{t.accuracy}</div>
            <div className="text-lg font-bold text-indigo-300 mt-0.5">{selectedAgent.accuracyRate}%</div>
          </div>
        </div>

        <div>
          <div className="text-xs font-semibold text-slate-300 mb-2">{t.domains}</div>
          <div className="flex flex-wrap gap-2">
            {selectedAgent.domains.map((dom, i) => (
              <span key={i} className="rounded-md bg-slate-950 px-2.5 py-1 text-xs text-slate-300 border border-slate-800">
                • {dom}
              </span>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
