import React, { useState } from 'react';
import { 
  Layers, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Scale, 
  Ban, 
  GitBranch, 
  TrendingUp, 
  Calendar, 
  FileCheck2, 
  Sparkles, 
  UserCheck, 
  HelpCircle,
  FileText,
  Clock,
  DollarSign
} from 'lucide-react';
import { 
  SIX_PHASES_DATA, 
  AI_STRATEGY_MATRIX, 
  EVALUATION_BENCHMARK_FRONTS, 
  EXCLUSIONS_MATRIX, 
  STAGE_GATES_DATA, 
  FINANCIAL_IMPACT_METRICS, 
  PARADOX_95_DATA 
} from '../data/knowledgeBase';
import { Language } from '../types';

interface PitchDeck6PhasesProps {
  lang?: Language;
}

export const PitchDeck6Phases: React.FC<PitchDeck6PhasesProps> = ({ lang = 'es' }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'phase1' | 'phase2' | 'phase3' | 'phase4_5' | 'phase6'>('all');

  const labels = {
    es: {
      badge: 'Pitch Metodológico PoC • Transformación Digital e IA',
      title: 'Las Seis Fases del Proyecto & Estrategia de IA Corporativa',
      subtitle: 'Garantía de coherencia hacia atrás: cada fase sostiene el rigor normativo y cuantitativo de la siguiente para el despliegue corporativo auditado.',
      tagFase2: 'Fase 2: Estrategia de Eficacia / Experto',
      tabAll: 'Visión General 6 Fases',
      tabP1: 'Fase 1: Gobernanza & Benchmark 300',
      tabP2: 'Fase 2: Estrategia IA Experta',
      tabP3: 'Fase 3: Matriz de Exclusiones',
      tabP4: 'Fases 4-5: Paradoja 95% & Finanzas',
      tabP6: 'Fase 6: Stage-Gates Quincenales',
      matrixTitle: 'Matriz de Selección de Estrategia de IA',
      matrixSub: 'Tolerancia al Error vs. Métrica Principal',
      colStrategy: 'Estrategia',
      colMetric: 'Métrica Principal',
      colTolerance: 'Tolerancia al Error',
      colSelection: 'Selección PoC',
      selectedTag: 'SELECCIONADA',
      warningTitle: 'Advertencia del Comité de IA:',
      warningMsg: 'Elegir "Productividad" por sonar más ambiciosa en un proceso de cumplimiento normativo es un error grave. Un proceso de gobernanza legal NUNCA es estrategia de productividad; exige Eficacia y rigor Experto con tolerancia cero a alucinaciones.'
    },
    en: {
      badge: 'PoC Methodological Pitch • Digital Transformation & AI',
      title: 'The Six Project Phases & Corporate AI Strategy',
      subtitle: 'Backward coherence guarantee: each phase supports the regulatory and quantitative rigor of the next for audited corporate deployment.',
      tagFase2: 'Phase 2: Efficacy / Expert Strategy',
      tabAll: '6 Phases Overview',
      tabP1: 'Phase 1: Governance & 300 Benchmark',
      tabP2: 'Phase 2: Expert AI Strategy',
      tabP3: 'Phase 3: Exclusions Matrix',
      tabP4: 'Phases 4-5: 95% Paradox & Financials',
      tabP6: 'Phase 6: Bi-weekly Stage-Gates',
      matrixTitle: 'AI Strategy Selection Matrix',
      matrixSub: 'Error Tolerance vs. Primary Metric',
      colStrategy: 'Strategy',
      colMetric: 'Primary Metric',
      colTolerance: 'Error Tolerance',
      colSelection: 'PoC Selection',
      selectedTag: 'SELECTED',
      warningTitle: 'AI Committee Warning:',
      warningMsg: 'Choosing "Productivity" just because it sounds ambitious in regulatory compliance is a grave mistake. Legal governance is NEVER a productivity strategy; it demands Efficacy and Expert rigor with zero tolerance for hallucinations.'
    },
    pt: {
      badge: 'Pitch Metodológico PoC • Transformação Digital e IA',
      title: 'As Seis Fases do Projeto & Estratégia de IA Corporativa',
      subtitle: 'Garantia de coerência regressiva: cada fase sustenta o rigor regulatório e quantitativo da seguinte para o envio corporativo auditado.',
      tagFase2: 'Fase 2: Estratégia de Eficácia / Especialista',
      tabAll: 'Visão Geral 6 Fases',
      tabP1: 'Fase 1: Governança & Benchmark 300',
      tabP2: 'Fase 2: Estratégia IA Especialista',
      tabP3: 'Fase 3: Matriz de Exclusões',
      tabP4: 'Fases 4-5: Paradoxo 95% & Finanças',
      tabP6: 'Fase 6: Stage-Gates Quinzenais',
      matrixTitle: 'Matriz de Seleção de Estratégia de IA',
      matrixSub: 'Tolerância ao Erro vs. Métrica Principal',
      colStrategy: 'Estratégia',
      colMetric: 'Métrica Principal',
      colTolerance: 'Tolerância ao Erro',
      colSelection: 'Seleção PoC',
      selectedTag: 'SELECIONADA',
      warningTitle: 'Aviso do Comitê de IA:',
      warningMsg: 'Escolher "Produtividade" por soar mais ambicioso em conformidade regulatória é um erro grave. Governança legal NUNCA é estratégia de produtividade; exige Eficácia e rigor Especialista com tolerância zero a alucinações.'
    }
  };

  const t = labels[lang] || labels['es'];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Pitch Header */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
              <Layers className="h-4 w-4" />
              <span>{t.badge}</span>
            </div>
            <h2 className="text-xl font-bold text-white mt-1">
              {t.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
              {t.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg border border-indigo-500/30 bg-indigo-500/10 px-3 py-1.5 text-xs font-semibold text-indigo-400">
              {t.tagFase2}
            </span>
            <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
              0.0% Alucinaciones (Safe-Fail)
            </span>
          </div>
        </div>

        {/* Phase Navigation Tabs */}
        <div className="flex flex-wrap gap-1.5 mt-5 pt-4 border-t border-slate-800">
          {[
            { id: 'all', label: t.tabAll },
            { id: 'phase1', label: t.tabP1 },
            { id: 'phase2', label: t.tabP2 },
            { id: 'phase3', label: t.tabP3 },
            { id: 'phase4_5', label: t.tabP4 },
            { id: 'phase6', label: t.tabP6 }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                activeTab === tab.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                  : 'bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview Grid (Visible when 'all' is selected) */}
      {(activeTab === 'all' || activeTab === 'phase1') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-indigo-400" />
              <span>Fase 1: Gobernanza, Validador Institucional & Benchmark de 300 Casos</span>
            </h3>
            <span className="text-xs text-indigo-400 font-mono font-semibold">95% Confianza ± 2.1%</span>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
            {/* Lead Role Card */}
            <div className="rounded-lg border border-indigo-500/30 bg-indigo-950/30 p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="text-xs font-bold text-indigo-300 flex items-center gap-2">
                  <UserCheck className="h-4 w-4 text-indigo-400" />
                  <span>Rol Institucional Formal: Oficial de Cumplimiento / Lead Legal & Compliance</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Firma y certificación de <strong>verdad terreno vinculada a documento oficial, versión, fecha y cláusula/párrafo específica</strong>. Queda estrictamente eliminada la validación por memoria humana.
                </p>
              </div>
              <div className="bg-slate-950 px-3 py-2 rounded-lg border border-slate-800 text-right">
                <div className="text-[10px] text-slate-400 font-mono">Golden Dataset</div>
                <div className="text-sm font-black text-emerald-400">300 Casos Normativos</div>
              </div>
            </div>

            {/* 6 Audited Normative Fronts Table */}
            <div>
              <div className="text-xs font-bold text-slate-300 mb-2">Evaluación con Puntuación de Evidencia en 6 Frentes Normativos Auditados:</div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {EVALUATION_BENCHMARK_FRONTS.map((front) => (
                  <div key={front.id} className="rounded-lg border border-slate-800 bg-slate-950 p-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white leading-snug">{front.name}</span>
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                        {front.evidenceScore}% Score
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {front.domain}
                    </p>
                    <div className="text-[10px] text-slate-500 font-mono truncate border-t border-slate-900 pt-1.5">
                      Doc: <span className="text-slate-300">{front.groundTruthSource}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6 Phases Grid */}
      {activeTab === 'all' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SIX_PHASES_DATA.map((phase) => (
            <div key={phase.number} className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-2 relative overflow-hidden shadow-lg hover:border-slate-700 transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-indigo-500 font-mono">
                    {phase.number}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                    phase.status === 'Completado' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' :
                    phase.status === 'En Proceso' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {phase.status}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white mt-2">
                  {phase.title}
                </h3>

                <p className="text-xs text-indigo-300 italic font-medium mt-1">
                  "{phase.question}"
                </p>

                <p className="text-[11px] text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800 mt-2.5">
                  {phase.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Strategy Matrix (Fase 2) */}
      {(activeTab === 'all' || activeTab === 'phase2') && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Cpu className="h-5 w-5 text-indigo-400" />
              <span>{t.matrixTitle} (Fase 2)</span>
            </h3>
            <span className="text-xs text-slate-400">{t.matrixSub}</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-bold">
                <tr>
                  <th className="p-3">{t.colStrategy}</th>
                  <th className="p-3">{t.colMetric}</th>
                  <th className="p-3">{t.colTolerance}</th>
                  <th className="p-3">{t.colSelection}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-200">
                {AI_STRATEGY_MATRIX.map((row, i) => (
                  <tr key={i} className={row.selected ? 'bg-indigo-950/20' : ''}>
                    <td className="p-3 font-semibold text-white">{row.strategy}</td>
                    <td className="p-3 text-slate-300">{row.mainMetric}</td>
                    <td className="p-3">
                      <span className={`font-semibold ${
                        row.errorTolerance.includes('baja') || row.errorTolerance.includes('Low') || row.errorTolerance.includes('baixa') ? 'text-emerald-400' : 'text-amber-400'
                      }`}>
                        {row.errorTolerance}
                      </span>
                    </td>
                    <td className="p-3">
                      {row.selected ? (
                        <span className="flex items-center gap-1 text-emerald-400 font-bold">
                          <CheckCircle2 className="h-4 w-4" /> {t.selectedTag}
                        </span>
                      ) : (
                        <span className="text-slate-500">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Warning Callout Box */}
          <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-300 flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 text-amber-400 mt-0.5" />
            <div className="leading-relaxed">
              <span className="font-bold">{t.warningTitle}</span> {t.warningMsg}
            </div>
          </div>
        </div>
      )}

      {/* Exclusions Matrix (Fase 3) */}
      {(activeTab === 'all' || activeTab === 'phase3') && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-base font-bold text-white">
              <Ban className="h-5 w-5 text-rose-400" />
              <span>Fase 3: Matriz de Exclusiones y Delimitación Estricta de Alcance</span>
            </div>
            <span className="text-xs text-rose-400 bg-rose-500/10 border border-rose-500/30 px-2.5 py-1 rounded-full font-bold">
              4 Exclusiones Clave Auditadas
            </span>
          </div>

          <p className="text-xs text-slate-300">
            Para blindar a la organización ante contingencias legales o laborales, el sistema incorpora salvaguardas que impiden acciones fuera del alcance normativo asistencial.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EXCLUSIONS_MATRIX.map((ex) => (
              <div key={ex.id} className="rounded-xl border border-rose-500/20 bg-slate-950 p-4 space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-bold text-white flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-rose-500"></span>
                    {ex.title}
                  </span>
                  <span className="text-[10px] font-mono text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
                    {ex.riskLevel}
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {ex.description}
                </p>
                <div className="text-[11px] text-indigo-300 font-mono bg-slate-900 p-2 rounded border border-slate-800">
                  Salvaguarda: <span className="text-slate-200">{ex.safeguard}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 95% Decision Paradox & Safe-Fail + Financial Impact (Fases 4 y 5) */}
      {(activeTab === 'all' || activeTab === 'phase4_5') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Paradoja del 95% Card */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <GitBranch className="h-5 w-5 text-indigo-400" />
                <span>Fase 4: Paradoja del 95% & Safe-Fail Forzado</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                0.0% Alucinación
              </span>
            </div>

            <div className="rounded-lg bg-slate-950 p-4 border border-slate-800 space-y-3">
              <div className="text-xs text-slate-300 leading-relaxed">
                {PARADOX_95_DATA.explanation}
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-900 text-xs">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Resolución Directa RAG</div>
                  <div className="text-lg font-black text-emerald-400 mt-0.5">{PARADOX_95_DATA.directResolutionRate}</div>
                  <div className="text-[10px] text-slate-400">Cita textual exacta</div>
                </div>

                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Abstención Forzada Safe-Fail</div>
                  <div className="text-lg font-black text-amber-400 mt-0.5">{PARADOX_95_DATA.abstentionRate}</div>
                  <div className="text-[10px] text-slate-400">Derivación a Experto</div>
                </div>
              </div>

              <div className="text-[11px] text-indigo-300 font-mono bg-indigo-950/40 p-2.5 rounded border border-indigo-500/30">
                Regla de Oro: {PARADOX_95_DATA.rule}
              </div>
            </div>
          </div>

          {/* Financial Breakdown (Fase 5) */}
          <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <DollarSign className="h-5 w-5 text-emerald-400" />
                <span>Fase 5: Métricas Financieras & Retorno de Inversión</span>
              </div>
              <span className="text-[10px] font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
                CLP Auditado
              </span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Costo Actual del Proceso Sin IA:</span>
                <span className="font-mono font-bold text-rose-400">
                  ${FINANCIAL_IMPACT_METRICS.currentProcessCostCLP.toLocaleString('es-CL')} CLP <span className="text-[10px] text-slate-400">{FINANCIAL_IMPACT_METRICS.currentCostTag}</span>
                </span>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                <span className="text-slate-300">Inversión Total (Capex + Opex):</span>
                <span className="font-mono font-bold text-indigo-400">
                  ${FINANCIAL_IMPACT_METRICS.totalInvestmentCLP.toLocaleString('es-CL')} CLP <span className="text-[10px] text-slate-400">{FINANCIAL_IMPACT_METRICS.investmentTag}</span>
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Capex Desarrollo:</span>
                  <span className="font-mono font-bold text-white">${FINANCIAL_IMPACT_METRICS.capexCLP.toLocaleString('es-CL')}</span>
                </div>
                <div className="bg-slate-950 p-2 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Opex Anual:</span>
                  <span className="font-mono font-bold text-white">${FINANCIAL_IMPACT_METRICS.opexAnnualCLP.toLocaleString('es-CL')}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-center">
                  <div className="text-[10px] text-slate-400">Payback Proyectado</div>
                  <div className="text-base font-black text-emerald-400 mt-0.5">
                    {FINANCIAL_IMPACT_METRICS.paybackMonths} Meses <span className="text-[10px] text-slate-400">{FINANCIAL_IMPACT_METRICS.paybackTag}</span>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-500/30 text-center">
                  <div className="text-[10px] text-slate-400">Liberación Horas-Hombre (HH)</div>
                  <div className="text-base font-black text-indigo-400 mt-0.5">
                    -{FINANCIAL_IMPACT_METRICS.hhReductionPercent}% AHT <span className="text-[10px] text-slate-400">{FINANCIAL_IMPACT_METRICS.hhReductionTag}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* Stage-Gates & Bi-weekly Governance Cadences (Fase 6) */}
      {(activeTab === 'all' || activeTab === 'phase6') && (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-base font-bold text-white">
              <Calendar className="h-5 w-5 text-indigo-400" />
              <span>Fase 6: Visualización de Stage-Gates & Cadencias Quincenales de Gobernanza</span>
            </div>
            <span className="text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 rounded-full font-semibold">
              Triple Cita Obligatoria: Doc + Versión + Cláusula
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {STAGE_GATES_DATA.map((gate, i) => (
              <div key={gate.gate} className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-indigo-400 font-mono">{gate.gate}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">{gate.phase}</span>
                  </div>

                  <h4 className="text-xs font-bold text-white mt-1.5 leading-snug">
                    {gate.title}
                  </h4>

                  <p className="text-[11px] text-slate-300 mt-2 leading-relaxed">
                    {gate.requirement}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-900 space-y-1">
                  <div className="text-[10px] text-emerald-400 font-mono">
                    Entregable: <span className="text-slate-300">{gate.deliverable}</span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Cadencia: <strong className="text-slate-400">{gate.cadence}</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};


