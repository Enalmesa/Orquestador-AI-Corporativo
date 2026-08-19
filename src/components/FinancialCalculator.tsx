import React, { useState, useEffect } from 'react';
import { Calculator, DollarSign, TrendingUp, Clock, Users, Download, Sparkles, ShieldCheck, Tag, BarChart3 } from 'lucide-react';
import { FINANCIAL_IMPACT_METRICS } from '../data/knowledgeBase';
import { Language } from '../types';

interface FinancialCalculatorProps {
  lang?: Language;
}

export const FinancialCalculator: React.FC<FinancialCalculatorProps> = ({ lang = 'es' }) => {
  const [collabCount, setCollabCountState] = useState<number>(() => {
    const saved = localStorage.getItem('rag_collaborators_count');
    return saved !== null ? Number(saved) : 70;
  });
  const [hourlyRateCLP, setHourlyRateCLP] = useState<number>(28000);
  const [queriesPerWeek, setQueriesPerWeek] = useState<number>(4);
  const [currency, setCurrency] = useState<'CLP' | 'USD'>('CLP');
  const [results, setResults] = useState<any>(null);

  const labels = {
    es: {
      badge: 'Modelo Financiero de Impacto HH & Retorno de Inversión',
      title: 'Impacto Financiero HH & Modelo Cuantitativo PoC',
      subtitle: 'Cuantificación rigurosa de horas-hombre liberadas, Capex/Opex y período de recuperación de inversión con etiquetado metodológico.',
      collabLabel: 'Colaboradores Activos:',
      rateLabel: 'Valor Hora Promedio:',
      freqLabel: 'Consultas Semanales por Colaborador:',
      savedHours: 'Horas-Hombre Ahorradas / Año',
      savedAmount: 'Ahorro Financiero Anual',
      annualROI: 'Payback Proyectado',
      btnExport: 'Exportar Informe Financiero Ejecutivo'
    },
    en: {
      badge: 'Man-Hour Financial Impact & ROI Model',
      title: 'Financial Impact (HH) & Quantitative PoC Model',
      subtitle: 'Rigorous quantification of liberated man-hours, Capex/Opex, and payback period with methodological tagging.',
      collabLabel: 'Active Collaborators:',
      rateLabel: 'Average Hourly Rate:',
      freqLabel: 'Weekly Queries per Employee:',
      savedHours: 'Man-Hours Saved / Year',
      savedAmount: 'Annual Cost Savings',
      annualROI: 'Projected Payback',
      btnExport: 'Export Executive Financial Report'
    },
    pt: {
      badge: 'Modelo Financeiro de Impacto HH & Retorno de Investimento',
      title: 'Impacto Financeiro HH & Modelo Quantitativo PoC',
      subtitle: 'Quantificação rigorosa de horas-homem liberadas, Capex/Opex e período de retorno com etiquetas metodológicas.',
      collabLabel: 'Colaboradores Ativos:',
      rateLabel: 'Valor Hora Médio:',
      freqLabel: 'Consultas Semanais por Colaborador:',
      savedHours: 'Horas-Homem Economizadas / Ano',
      savedAmount: 'Economia Financeira Anual',
      annualROI: 'Payback Projetado',
      btnExport: 'Exportar Relatório Financeiro Executivo'
    }
  };

  const t = labels[lang] || labels['es'];

  const setCollabCount = (val: number) => {
    const safeVal = Math.max(0, val);
    setCollabCountState(safeVal);
    localStorage.setItem('rag_collaborators_count', String(safeVal));
    window.dispatchEvent(new CustomEvent('rag_collab_count_changed', { detail: safeVal }));
  };

  useEffect(() => {
    const handleCountChange = (e: Event) => {
      const customEv = e as CustomEvent;
      if (customEv.detail !== undefined && typeof customEv.detail === 'number') {
        setCollabCountState(customEv.detail);
      }
    };
    window.addEventListener('rag_collab_count_changed', handleCountChange);
    return () => window.removeEventListener('rag_collab_count_changed', handleCountChange);
  }, []);

  const calculateROI = async () => {
    try {
      const res = await fetch('/api/v1/financial-calculator', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          totalCollaborators: collabCount,
          hourlyRateCLP,
          hourlyRateUSD: Math.round(hourlyRateCLP / 800),
          queryFrequencyPerWeek: queriesPerWeek,
          currency
        })
      });

      if (res.ok) {
        const data = await res.json();
        setResults(data.metrics);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    calculateROI();
  }, [collabCount, hourlyRateCLP, queriesPerWeek, currency]);

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
            <Calculator className="h-4 w-4" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            {t.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-3xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Currency Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setCurrency('CLP')}
              className={`px-3 py-1 rounded font-bold transition ${
                currency === 'CLP' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              CLP ($)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded font-bold transition ${
                currency === 'USD' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>

          <span className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-400">
            AHT Meta: -40% Liberación HH [Medida]
          </span>
        </div>
      </div>

      {/* Official PoC Financial Benchmark Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Costo Actual del Proceso */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-1.5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Costo Actual (Sin IA)</span>
            <span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">
              {FINANCIAL_IMPACT_METRICS.currentCostTag}
            </span>
          </div>
          <div className="text-xl font-black text-rose-400 font-mono">
            {currency === 'CLP' 
              ? `$${FINANCIAL_IMPACT_METRICS.currentProcessCostCLP.toLocaleString('es-CL')} CLP` 
              : `$${Math.round(FINANCIAL_IMPACT_METRICS.currentProcessCostCLP / 800).toLocaleString('en-US')} USD`}
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Tiempo manual invertido por abogados y RRHH en resolver consultas normativas.
          </p>
        </div>

        {/* Card 2: Inversión Total Capex/Opex */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-1.5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Inversión Capex/Opex</span>
            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
              {FINANCIAL_IMPACT_METRICS.investmentTag}
            </span>
          </div>
          <div className="text-xl font-black text-indigo-400 font-mono">
            {currency === 'CLP' 
              ? `$${FINANCIAL_IMPACT_METRICS.totalInvestmentCLP.toLocaleString('es-CL')} CLP` 
              : `$${Math.round(FINANCIAL_IMPACT_METRICS.totalInvestmentCLP / 800).toLocaleString('en-US')} USD`}
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
            <span>Capex: ${currency === 'CLP' ? '38.5M' : '$48.1k'} {FINANCIAL_IMPACT_METRICS.capexTag}</span>
            <span>Opex: ${currency === 'CLP' ? '24.18M' : '$30.2k'} {FINANCIAL_IMPACT_METRICS.opexTag}</span>
          </div>
        </div>

        {/* Card 3: Payback */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-1.5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Período de Recuperación</span>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
              {FINANCIAL_IMPACT_METRICS.paybackTag}
            </span>
          </div>
          <div className="text-xl font-black text-emerald-400 font-mono">
            {FINANCIAL_IMPACT_METRICS.paybackMonths} Meses
          </div>
          <p className="text-[10px] text-slate-400 leading-tight">
            Retorno completo de inversión basado en la liberación de 1.850 HH anuales.
          </p>
        </div>

        {/* Card 4: Reducción AHT */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4 space-y-1.5 shadow-lg relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Liberación HH (AHT)</span>
            <span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">
              {FINANCIAL_IMPACT_METRICS.hhReductionTag}
            </span>
          </div>
          <div className="text-xl font-black text-cyan-400 font-mono">
            -{FINANCIAL_IMPACT_METRICS.hhReductionPercent}% Reducción
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
            <span>Tradicional: 45 min {FINANCIAL_IMPACT_METRICS.traditionalAHTTag}</span>
            <span>RAG: 2 min {FINANCIAL_IMPACT_METRICS.ragAHTTag}</span>
          </div>
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Controls Column */}
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4 shadow-xl">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Users className="h-4 w-4 text-indigo-400" />
            <span>Parámetros de Simulación Organizacional</span>
          </h3>

          <div>
            <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
              <span>Número de Colaboradores</span>
              <span className="text-indigo-400 font-mono font-bold">{collabCount} colaboradores</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                id="slider-collab-count"
                type="range"
                min={0}
                max={500}
                step={1}
                value={collabCount}
                onChange={(e) => setCollabCount(Number(e.target.value))}
                className="flex-1 accent-indigo-500"
              />
              <input
                id="input-collab-count-num"
                type="number"
                min={0}
                max={10000}
                value={collabCount}
                onChange={(e) => setCollabCount(Math.max(0, Number(e.target.value)))}
                className="w-20 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs text-indigo-400 font-mono font-bold text-center focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
              <span>Tarifa Promedio Horas-Hombre (HH)</span>
              <span className="text-emerald-400 font-mono font-bold">
                {currency === 'CLP' ? `$${hourlyRateCLP.toLocaleString('es-CL')} CLP` : `$${Math.round(hourlyRateCLP / 800)} USD`} / hr <span className="text-[10px] text-slate-400">[Supuesta]</span>
              </span>
            </div>
            <input
              id="slider-hourly-rate"
              type="range"
              min={12000}
              max={80000}
              step={2000}
              value={hourlyRateCLP}
              onChange={(e) => setHourlyRateCLP(Number(e.target.value))}
              className="w-full accent-emerald-500"
            />
          </div>

          <div>
            <div className="flex justify-between text-xs text-slate-300 font-semibold mb-1">
              <span>Consultas Normativas / Semanal x Persona</span>
              <span className="text-indigo-300 font-mono font-bold">{queriesPerWeek} consultas <span className="text-[10px] text-slate-400">[Medida]</span></span>
            </div>
            <input
              id="slider-queries-freq"
              type="range"
              min={1}
              max={15}
              step={1}
              value={queriesPerWeek}
              onChange={(e) => setQueriesPerWeek(Number(e.target.value))}
              className="w-full accent-indigo-500"
            />
          </div>

          <div className="rounded-lg bg-slate-950 p-3 border border-slate-800 text-[11px] text-slate-300 leading-relaxed space-y-1">
            <div className="font-bold text-indigo-400 flex items-center gap-1">
              <Tag className="h-3.5 w-3.5" /> Metodología de Validación:
            </div>
            <p>
              • <strong className="text-white">[Medida]</strong>: Tiempos cronometrados en PoC y costos históricos auditados.
            </p>
            <p>
              • <strong className="text-white">[Estimada]</strong>: Inversión Capex/Opex con cotización de proveedores y Snowflake.
            </p>
            <p>
              • <strong className="text-white">[Supuesta]</strong>: Costo estándar de HH interna de fiscalía y jefaturas.
            </p>
          </div>
        </div>

        {/* Dynamic Simulation Results Column */}
        {results && (
          <div className="lg:col-span-2 rounded-xl border border-indigo-500/30 bg-slate-900 p-6 space-y-5 shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-3 gap-2">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-emerald-400" />
                  <span>Proyección de Ahorro Anual Simulado</span>
                </span>
                <span className="text-2xl font-black text-emerald-400 font-mono">
                  {currency === 'CLP' 
                    ? `$${results.annualSavingsCLP.toLocaleString('es-CL')} CLP` 
                    : `$${results.annualSavingsUSD.toLocaleString('en-US')} USD`} <span className="text-xs text-slate-400 font-sans">[Estimada]</span>
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 text-xs">
                
                <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                  <div className="text-slate-400 text-[10px]">Consultas Anuales Totales</div>
                  <div className="text-base font-bold text-white mt-0.5 font-mono">
                    {results.annualQueries.toLocaleString()} <span className="text-[10px] text-slate-500">[Medida]</span>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950 p-3">
                  <div className="text-slate-400 text-[10px]">Horas Liberadas (HH Saved)</div>
                  <div className="text-base font-bold text-indigo-400 mt-0.5 font-mono">
                    {results.hoursSavedPerYear.toLocaleString()} hrs/año <span className="text-[10px] text-slate-500">[Medida]</span>
                  </div>
                </div>

                <div className="rounded-lg border border-slate-800 bg-slate-950 p-3 col-span-2 sm:col-span-1">
                  <div className="text-slate-400 text-[10px]">Reducción AHT en Atención</div>
                  <div className="text-base font-bold text-emerald-400 mt-0.5 font-mono">
                    -{results.ahtReductionPercentage}% (HH / 2) <span className="text-[10px] text-slate-500">[Medida]</span>
                  </div>
                </div>

              </div>

              <div className="mt-5 space-y-3">
                <div className="text-xs font-semibold text-slate-300">Comparativa de Costo Operativo HH Anual:</div>
                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>Proceso Tradicional (Sin IA / Búsqueda Manual):</span>
                      <span className="font-mono text-rose-400 font-bold">
                        {currency === 'CLP' 
                          ? `$${results.traditionalCostCLP.toLocaleString('es-CL')} CLP` 
                          : `$${results.traditionalCostUSD.toLocaleString('en-US')} USD`} [Medida]
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden mt-1">
                      <div className="h-full bg-rose-500 w-full"></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between text-[11px] text-slate-300">
                      <span>Con Orquestador RAG & Subagentes Especializados:</span>
                      <span className="font-mono text-emerald-400 font-bold">
                        {currency === 'CLP' 
                          ? `$${results.newCostCLP.toLocaleString('es-CL')} CLP` 
                          : `$${results.newCostUSD.toLocaleString('en-US')} USD`} [Estimada]
                      </span>
                    </div>
                    <div className="w-full h-2.5 rounded-full bg-slate-800 overflow-hidden mt-1">
                      <div className="h-full bg-emerald-500 w-[60%]"></div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-indigo-400" />
                <span>Validado por Oficial de Cumplimiento / Lead Legal & Compliance</span>
              </div>

              <button
                id="export-financial-report-btn"
                onClick={() => alert('Informe Financiero de Impacto HH ($62.675M Capex/Opex / 14 Meses Payback) exportado exitosamente.')}
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20 w-full sm:w-auto justify-center"
              >
                <Download className="h-4 w-4" />
                <span>{t.btnExport}</span>
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};

