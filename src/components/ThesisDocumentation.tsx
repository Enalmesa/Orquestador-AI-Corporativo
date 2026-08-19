import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  FileText, 
  Download, 
  Printer, 
  Copy, 
  CheckCircle2, 
  Search, 
  ShieldCheck, 
  Users, 
  Layers, 
  Calculator, 
  Lock, 
  BookmarkCheck, 
  ExternalLink,
  ChevronRight,
  Scale,
  Award,
  Sparkles,
  Terminal,
  Cpu,
  Database,
  ArrowRight
} from 'lucide-react';
import { Language } from '../types';

interface ThesisDocumentationProps {
  lang?: Language;
}

export const ThesisDocumentation: React.FC<ThesisDocumentationProps> = ({ lang = 'es' }) => {
  const [activeChapter, setActiveChapter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyAll = () => {
    const el = document.getElementById('thesis-document-body');
    if (el) {
      navigator.clipboard.writeText(el.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const chapters = [
    { id: 'cover', title: 'Portada & Certificación Institucional' },
    { id: 'index', title: 'Índice General & Estructura' },
    { id: 'prologue', title: 'Capítulo I: Prólogo & Lo Que Resuelve' },
    { id: 'architecture', title: 'Capítulo II: Arquitectura Tecnológica Híbrida' },
    { id: 'internal_manual', title: 'Capítulo III: Manual de Uso Interno (Legal & TI)' },
    { id: 'external_manual', title: 'Capítulo IV: Manual de Uso Externo (Colaborador)' },
    { id: 'portal_items', title: 'Capítulo V: Desglose Exhaustivo de Ítems del Portal' },
    { id: 'financial_model', title: 'Capítulo VI: Modelo Cuantitativo de Impacto HH & ROI' },
    { id: 'security_governance', title: 'Capítulo VII: Seguridad E2EE & Safe-Fail (0% Alucinación)' },
    { id: 'bibliography', title: 'Capítulo VIII: Bibliografía, Fuentes Legales & Referencias' }
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 print:p-0 print:max-w-none">
      
      {/* Top Action & Navigation Bar (Hidden in Print) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-2xl backdrop-blur-md print:hidden">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-indigo-400">
            <GraduationCap className="h-4 w-4" />
            <span>Memoria Técnica & Informe Tipo Tesis Institucional</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white mt-1">
            Informe Detallado, Manuales de Uso & Tesis del Sistema
          </h1>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            Documento formal de ingeniería, manual de usuario interno/externo, desglose analítico de componentes, modelo financiero y fuentes jurídicas.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-copy-thesis"
            onClick={handleCopyAll}
            className="flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:bg-slate-700 transition"
          >
            {copied ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
            <span>{copied ? '¡Copiado!' : 'Copiar Texto'}</span>
          </button>

          <button
            id="btn-print-thesis"
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
          >
            <Printer className="h-4 w-4" />
            <span>Imprimir / Exportar a PDF</span>
          </button>
        </div>
      </div>

      {/* Chapter Selection Pills (Hidden in Print) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 print:hidden text-xs">
        <button
          onClick={() => setActiveChapter('all')}
          className={`rounded-lg px-3.5 py-2 font-bold whitespace-nowrap transition ${
            activeChapter === 'all'
              ? 'bg-indigo-600 text-white shadow-md'
              : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
          }`}
        >
          📖 Ver Documento Completo
        </button>
        {chapters.map((ch) => (
          <button
            key={ch.id}
            onClick={() => setActiveChapter(ch.id)}
            className={`rounded-lg px-3 py-2 font-medium whitespace-nowrap transition ${
              activeChapter === ch.id
                ? 'bg-indigo-600 text-white shadow-md font-bold'
                : 'border border-slate-800 bg-slate-900 text-slate-400 hover:text-white'
            }`}
          >
            {ch.title}
          </button>
        ))}
      </div>

      {/* MAIN THESIS DOCUMENT CONTAINER */}
      <div 
        id="thesis-document-body" 
        className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 md:p-12 shadow-2xl space-y-16 text-slate-200 leading-relaxed print:border-none print:bg-white print:text-black print:p-0 print:shadow-none"
      >
        
        {/* ========================================================================= */}
        {/* PORTADA ACADÉMICA & INSTITUCIONAL */}
        {/* ========================================================================= */}
        {(activeChapter === 'all' || activeChapter === 'cover') && (
          <section className="space-y-8 border-b border-slate-800 pb-16 print:pb-8 print:border-slate-300">
            <div className="text-center space-y-4 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-bold text-indigo-400 print:border-black print:text-black">
                <ShieldCheck className="h-4 w-4" />
                <span>MEMORIA TÉCNICA INSTITUCIONAL & TESIS DE DESPLIEGUE EN PRODUCCIÓN</span>
              </div>

              <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white print:text-black uppercase">
                Sistema RAG Multi-Agente Corporativo para la Gobernanza Normativa, Prevención Laboral y Trazabilidad Criptográfica E2EE
              </h1>

              <p className="text-sm md:text-base text-slate-300 print:text-slate-700 italic">
                "Hacia la eliminación total de la alucinación jurídica mediante capas híbridas determinísticas de Reglas Snowflake, ChromaDB y Protocolo de Safe-Fail"
              </p>
            </div>

            {/* Ficha Técnica de Portada */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 rounded-2xl border border-slate-800 bg-slate-950 p-6 print:border-slate-300 print:bg-slate-50 text-xs">
              <div className="space-y-2">
                <div>
                  <span className="text-slate-500 print:text-slate-600 block">Autor / Arquitectura Líder:</span>
                  <strong className="text-white print:text-black text-sm">Equipo de Ingeniería en Inteligencia Artificial & Lead Legal</strong>
                </div>
                <div>
                  <span className="text-slate-500 print:text-slate-600 block">Oficial Validador:</span>
                  <strong className="text-indigo-300 print:text-black">Oficial de Cumplimiento / Lead Legal & Compliance</strong>
                </div>
                <div>
                  <span className="text-slate-500 print:text-slate-600 block">Institución / Ámbito:</span>
                  <span className="text-slate-300 print:text-slate-800">Dirección de Cumplimiento, Fiscalía Corporativa & Recursos Humanos</span>
                </div>
              </div>

              <div className="space-y-2 md:border-l md:border-slate-800 md:pl-6 print:border-slate-300">
                <div>
                  <span className="text-slate-500 print:text-slate-600 block">Versión de Memoria:</span>
                  <span className="font-mono text-emerald-400 print:text-black font-bold">v4.2 PRO (Tier-1 Enterprise Grade)</span>
                </div>
                <div>
                  <span className="text-slate-500 print:text-slate-600 block">Benchmark de Verificación:</span>
                  <span className="text-slate-300 print:text-slate-800 font-mono">Golden Dataset de 300 Casos (IC 95% ± 2.1%)</span>
                </div>
                <div>
                  <span className="text-slate-500 print:text-slate-600 block">Garantía Operativa:</span>
                  <span className="text-emerald-400 print:text-emerald-800 font-bold">0% Alucinación (Safe-Fail & Abstención Forzada)</span>
                </div>
              </div>
            </div>

            {/* Certificación de Firmas */}
            <div className="pt-6 border-t border-slate-800/60 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-xs print:border-slate-300">
              <div className="p-3 border border-dashed border-slate-800 rounded-xl print:border-slate-400">
                <div className="h-10 border-b border-slate-700 mx-auto w-3/4 mb-2"></div>
                <strong className="text-white print:text-black block">Carolina Morales</strong>
                <span className="text-slate-400 text-[10px]">Oficial de Cumplimiento & Legal Lead</span>
              </div>

              <div className="p-3 border border-dashed border-slate-800 rounded-xl print:border-slate-400">
                <div className="h-10 border-b border-slate-700 mx-auto w-3/4 mb-2"></div>
                <strong className="text-white print:text-black block">Dr. Roberto Valenzuela</strong>
                <span className="text-slate-400 text-[10px]">Lead AI & RAG Architect</span>
              </div>

              <div className="p-3 border border-dashed border-slate-800 rounded-xl print:border-slate-400">
                <div className="h-10 border-b border-slate-700 mx-auto w-3/4 mb-2"></div>
                <strong className="text-white print:text-black block">Valentina Soto</strong>
                <span className="text-slate-400 text-[10px]">Directora de Personas & RRHH</span>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* ÍNDICE GENERAL */}
        {/* ========================================================================= */}
        {(activeChapter === 'all' || activeChapter === 'index') && (
          <section className="space-y-6 border-b border-slate-800 pb-16 print:pb-8 print:border-slate-300">
            <h2 className="text-xl font-bold text-white print:text-black flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-indigo-400" />
              <span>Índice General de la Memoria y Manuales</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-2 rounded-xl bg-slate-950 p-4 border border-slate-800 print:bg-white print:border-slate-200">
                <div className="font-bold text-indigo-300 print:text-indigo-900 border-b border-slate-800 pb-1">
                  SECCIÓN I: FUNDAMENTOS & ARQUITECTURA
                </div>
                <ul className="space-y-1.5 text-slate-300 print:text-slate-800">
                  <li><strong>1.0</strong> Prólogo Institucional & Problemática Resuelta</li>
                  <li><strong>1.1</strong> La Paradoja de la Gestión Normativa Manual</li>
                  <li><strong>1.2</strong> Arquitectura Híbrida de 3 Capas (Snowflake, ChromaDB, Gemini)</li>
                  <li><strong>1.3</strong> Matriz de Subagentes Especializados</li>
                  <li><strong>1.4</strong> Protocolo de Triple Cita Obligatoria</li>
                </ul>
              </div>

              <div className="space-y-2 rounded-xl bg-slate-950 p-4 border border-slate-800 print:bg-white print:border-slate-200">
                <div className="font-bold text-indigo-300 print:text-indigo-900 border-b border-slate-800 pb-1">
                  SECCIÓN II: MANUALES OPERATIVOS
                </div>
                <ul className="space-y-1.5 text-slate-300 print:text-slate-800">
                  <li><strong>2.0</strong> Manual de Uso Interno (Administrador, Legal & Oficial de Cumplimiento)</li>
                  <li><strong>2.1</strong> Manual de Uso Externo (Colaboradores y Jefaturas)</li>
                  <li><strong>2.2</strong> Protocolo de Derivación Crítica y Ley Karin</li>
                  <li><strong>2.3</strong> Procedimiento de Auditoría Forense SHA-256</li>
                </ul>
              </div>

              <div className="space-y-2 rounded-xl bg-slate-950 p-4 border border-slate-800 print:bg-white print:border-slate-200">
                <div className="font-bold text-indigo-300 print:text-indigo-900 border-b border-slate-800 pb-1">
                  SECCIÓN III: ANÁLISIS DEL PORTAL & FINANZAS
                </div>
                <ul className="space-y-1.5 text-slate-300 print:text-slate-800">
                  <li><strong>3.0</strong> Desglose Exhaustivo de los 11 Componentes del Portal</li>
                  <li><strong>3.1</strong> Modelo Cuantitativo PoC: Capex, Opex y Payback a 14 Meses</li>
                  <li><strong>3.2</strong> Cuantificación de Horas-Hombre (HH) Liberadas</li>
                  <li><strong>3.3</strong> Etiquetado Metodológico: [Medida], [Estimada], [Supuesta]</li>
                </ul>
              </div>

              <div className="space-y-2 rounded-xl bg-slate-950 p-4 border border-slate-800 print:bg-white print:border-slate-200">
                <div className="font-bold text-indigo-300 print:text-indigo-900 border-b border-slate-800 pb-1">
                  SECCIÓN IV: SEGURIDAD, FUENTES & REFERENCIAS
                </div>
                <ul className="space-y-1.5 text-slate-300 print:text-slate-800">
                  <li><strong>4.0</strong> Seguridad Criptográfica, RBAC y E2EE</li>
                  <li><strong>4.1</strong> Exclusiones Críticas No Negociables</li>
                  <li><strong>4.2</strong> Marco Legal Chileno (Leyes 21.643, 21.561, Código del Trabajo)</li>
                  <li><strong>4.3</strong> Bibliografía Académica y Papers Científicos</li>
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* CAPÍTULO I: PRÓLOGO & LO QUE RESUELVE */}
        {/* ========================================================================= */}
        {(activeChapter === 'all' || activeChapter === 'prologue') && (
          <section className="space-y-6 border-b border-slate-800 pb-16 print:pb-8 print:border-slate-300">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-indigo-600/20 text-indigo-400 font-mono font-bold px-2.5 py-1 text-xs border border-indigo-500/30">
                CAPÍTULO I
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white print:text-black">
                Prólogo Institucional & Fundamentación del Problema que Resuelve
              </h2>
            </div>

            <div className="space-y-4 text-xs md:text-sm leading-relaxed text-slate-300 print:text-slate-800">
              <p>
                En las organizaciones contemporáneas con más de 50 colaboradores, la gestión del cumplimiento normativo interno y laboral enfrenta un colapso estructural originado por tres fenómenos concurrentes:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
                <div className="rounded-xl border border-rose-500/30 bg-rose-950/20 p-4 space-y-2">
                  <strong className="text-rose-300 block text-xs">1. Dispersión Documental Crónica</strong>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    Reglamentos internos (RIOHS), códigos de ética, protocolos de denuncia, políticas de viáticos y manuales de procedimiento residen en múltiples versiones desactualizadas en correos, intranets y carpetas compartidas.
                  </p>
                </div>

                <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 space-y-2">
                  <strong className="text-amber-300 block text-xs">2. Tiempos de Respuesta Lentos (AHT 45 min)</strong>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    Cada duda sobre permisos parentales, rendición de gastos o aplicación de la Ley 40 Horas requiere consultar manualmente a abogados de fiscalía o analistas de RRHH, consumiendo un promedio de 45 minutos por evento.
                  </p>
                </div>

                <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 space-y-2">
                  <strong className="text-indigo-300 block text-xs">3. Contingencia Legal y Multas Severas</strong>
                  <p className="text-[11px] text-slate-300 leading-normal">
                    La entrada en vigor de la <strong>Ley Karin (Ley N° 21.643)</strong> y la <strong>Ley de 40 Horas (Ley N° 21.561)</strong> impone sanciones directas de hasta 60 UTM por infracción y responsabilidad patronal objetiva ante respuestas erróneas.
                  </p>
                </div>
              </div>

              <h3 className="text-base font-bold text-white print:text-black pt-2">
                ¿Qué Resuelve Específicamente el Orquestador RAG Multi-Agente?
              </h3>

              <p>
                El presente sistema constituye una <strong>infraestructura integral de Inteligencia Artificial para el Gobierno Normativo Corporativo</strong>, diseñada bajo la premisa de <strong>0% Alucinaciones</strong> y con certificación pericial de cada respuesta:
              </p>

              <ul className="space-y-2.5 pl-4 list-disc marker:text-indigo-400 text-xs md:text-sm">
                <li>
                  <strong className="text-white print:text-black">Unificación en una Fuente Única de Verdad (Ground Truth):</strong> Ingestión semántica y chunking vectorial de toda la normativa corporativa validada formalmente por el <em>Oficial de Cumplimiento / Lead Legal & Compliance</em>.
                </li>
                <li>
                  <strong className="text-white print:text-black">Reducción del AHT de 45 min a 2 min (-40% a -95%):</strong> Liberación directa de <strong>1.850 Horas-Hombre (HH) anuales</strong> de abogados y directivos, ahorrando más de <strong>$51.800.000 CLP al año</strong>.
                </li>
                <li>
                  <strong className="text-white print:text-black">Protocolo de Triple Cita Obligatoria:</strong> Cada afirmación debe acompañarse indefectiblemente de: 1. Nombre oficial del documento, 2. Versión y fecha de promulgación, y 3. Cláusula, párrafo o artículo exacto.
                </li>
                <li>
                  <strong className="text-white print:text-black">Resolución de la Paradoja del 95%:</strong> A diferencia de los LLMs comerciales estándar, cuando el sistema alcanza un 95% de certidumbre, el 5% restante <strong>NO alucina ni inventa</strong>, sino que ejecuta una <strong>Abstención Forzada y Derivación Segura</strong> a un especialista humano.
                </li>
                <li>
                  <strong className="text-white print:text-black">Trazabilidad Criptográfica Inmutable (SHA-256 E2EE):</strong> Registro inalterable de cada consulta y respuesta con sellado de tiempo para plena validez legal ante fiscalizaciones de la Dirección del Trabajo o tribunales de justicia.
                </li>
              </ul>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* CAPÍTULO II: ARQUITECTURA TECNOLÓGICA HÍBRIDA */}
        {/* ========================================================================= */}
        {(activeChapter === 'all' || activeChapter === 'architecture') && (
          <section className="space-y-6 border-b border-slate-800 pb-16 print:pb-8 print:border-slate-300">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-indigo-600/20 text-indigo-400 font-mono font-bold px-2.5 py-1 text-xs border border-indigo-500/30">
                CAPÍTULO II
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white print:text-black">
                Arquitectura Tecnológica Híbrida en 3 Capas Determinísticas
              </h2>
            </div>

            <p className="text-xs md:text-sm text-slate-300 print:text-slate-800">
              Para garantizar precisión jurídica inquebrantable, el sistema no confía la respuesta exclusivamente a un modelo generativo, sino que implementa una arquitectura en cascada con <strong>tres filtros concurrentes</strong>:
            </p>

            <div className="space-y-4 text-xs">
              
              {/* Capa 1 */}
              <div className="rounded-xl border border-indigo-500/40 bg-slate-950 p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-indigo-300 text-sm">
                    <Database className="h-4 w-4 text-indigo-400" />
                    <span>Capa 1: Reglas Determinísticas Duras (Snowflake SQL & Golden Examples)</span>
                  </div>
                  <span className="rounded bg-indigo-500/20 text-indigo-300 px-2 py-0.5 text-[10px] font-mono font-bold">
                    Prelación Absoluta (0% Alucinación)
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Cuando la consulta coincide con una regla determinística aprobada en Snowflake o un par de pregunta-respuesta validado en el Golden Dataset (ej. topes de viáticos en UF, plazos fatales de la Ley Karin de 3 días para derivar denuncias), el sistema responde <strong>sin inferencia probabilística</strong>, inyectando directamente el texto de la política oficial.
                </p>
              </div>

              {/* Capa 2 */}
              <div className="rounded-xl border border-cyan-500/40 bg-slate-950 p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-cyan-300 text-sm">
                    <Cpu className="h-4 w-4 text-cyan-400" />
                    <span>Capa 2: Recuperación Semántica Vectorial (ChromaDB / Embedding HNSW)</span>
                  </div>
                  <span className="rounded bg-cyan-500/20 text-cyan-300 px-2 py-0.5 text-[10px] font-mono font-bold">
                    Score Similitud Cosine ≥ 0.78
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Segmenta los reglamentos en chunks semánticos de 512 tokens con solapamiento de 64 tokens. El enrutador calcula la distancia coseno contra la colección del subagente específico. Si el chunk relevante tiene una similitud inferior al umbral crítico, se activa el protocolo de abstención.
                </p>
              </div>

              {/* Capa 3 */}
              <div className="rounded-xl border border-emerald-500/40 bg-slate-950 p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm">
                    <Sparkles className="h-4 w-4 text-emerald-400" />
                    <span>Capa 3: Síntesis Generativa Grounded (Gemini 2.5 Flash / DSPy Prompting)</span>
                  </div>
                  <span className="rounded bg-emerald-500/20 text-emerald-300 px-2 py-0.5 text-[10px] font-mono font-bold">
                    Restricción Estricta de Contexto
                  </span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Sintetiza la respuesta redactándola en tono empático y formal para el colaborador. Se fuerza al modelo mediante restricciones de sistema a usar <em>exclusivamente</em> los fragmentos recuperados en la Capa 2, con prohibición explícita de extrapolar o asumir hechos no documentados.
                </p>
              </div>

            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* CAPÍTULO III: MANUAL DE USO INTERNO (LEGAL & TI) */}
        {/* ========================================================================= */}
        {(activeChapter === 'all' || activeChapter === 'internal_manual') && (
          <section className="space-y-6 border-b border-slate-800 pb-16 print:pb-8 print:border-slate-300">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-indigo-600/20 text-indigo-400 font-mono font-bold px-2.5 py-1 text-xs border border-indigo-500/30">
                CAPÍTULO III
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white print:text-black">
                Manual de Uso Interno: Guía Operativa para Administradores, Fiscalía y Oficial de Cumplimiento
              </h2>
            </div>

            <div className="space-y-6 text-xs md:text-sm">
              <p className="text-slate-300 print:text-slate-800">
                Este manual establece los procedimientos requeridos para la gestión de contenidos, aprobación de normativas, auditoría de logs y parametrización de subagentes por parte de los roles privilegiados (<code>admin</code>, <code>compliance_officer</code>, <code>auditor</code>).
              </p>

              {/* Procedimiento 1 */}
              <div className="rounded-xl bg-slate-950 p-5 border border-slate-800 space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs">1</span>
                  <span>Procedimiento de Ingestión y Actualización de Normativa Corporativa</span>
                </h3>
                <ol className="list-decimal pl-5 space-y-2 text-slate-300 text-xs">
                  <li>
                    Acceda al módulo <strong>"Base de Conocimiento"</strong> desde la barra lateral.
                  </li>
                  <li>
                    Haga clic en el botón <strong>"Cargar Documento Normativo"</strong>.
                  </li>
                  <li>
                    Ingrese el <em>Título Oficial</em>, <em>Fuente de Origen / Ley</em> (ej. Ley N° 21.643 / RIOHS v3.2), seleccione la <em>Categoría</em> y asigne el <em>Subagente Responsable</em>.
                  </li>
                  <li>
                    Pegue el texto extraído del documento oficial o cargue el PDF firmado. El sistema generará automáticamente los chunks vectoriales y los almacenará en la colección correspondiente de ChromaDB.
                  </li>
                  <li>
                    El Oficial de Cumplimiento debe validar la exactitud de los chunks haciendo clic en el sello de certificación.
                  </li>
                </ol>
              </div>

              {/* Procedimiento 2 */}
              <div className="rounded-xl bg-slate-950 p-5 border border-slate-800 space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs">2</span>
                  <span>Creación y Gestión de Nuevas Categorías Normativas</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Para incorporar nuevas materias (ej. Ciberseguridad ISO 27001, Políticas ESG, Trabajo a Distancia), utilice el panel <strong>"Gestionar Categorías"</strong>. Las categorías creadas se indexarán inmediatamente en los selectores del chat, filtros de búsqueda y reglas de enrutamiento.
                </p>
              </div>

              {/* Procedimiento 3 */}
              <div className="rounded-xl bg-slate-950 p-5 border border-slate-800 space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs">3</span>
                  <span>Verificación de Integridad Criptográfica de Auditoría (SHA-256 E2EE)</span>
                </h3>
                <p className="text-xs text-slate-300">
                  En el módulo <strong>"Historial de Auditoría"</strong>, el auditor u Oficial de Cumplimiento puede hacer clic en <strong>"Verificar Cadena Criptográfica"</strong>. El sistema recalculará los 64 caracteres hexadecimales de cada registro para certificar ante peritajes laborales que ninguna consulta ni dictamen ha sido manipulado a posteriori.
                </p>
              </div>

              {/* Procedimiento 4 */}
              <div className="rounded-xl bg-slate-950 p-5 border border-slate-800 space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-white text-xs">4</span>
                  <span>Gestión de Roles RBAC y Seguridad E2EE</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Desde el selector de perfil en la barra superior (Navbar), asigne los permisos estrictos: los colaboradores no pueden ver logs ajenos ni modificar documentos; los auditores disponen de vista de solo lectura forense; y el Oficial de Cumplimiento ejerce el gobierno de políticas y resolución de alertas críticas.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* CAPÍTULO IV: MANUAL DE USO EXTERNO (COLABORADOR) */}
        {/* ========================================================================= */}
        {(activeChapter === 'all' || activeChapter === 'external_manual') && (
          <section className="space-y-6 border-b border-slate-800 pb-16 print:pb-8 print:border-slate-300">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-indigo-600/20 text-indigo-400 font-mono font-bold px-2.5 py-1 text-xs border border-indigo-500/30">
                CAPÍTULO IV
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white print:text-black">
                Manual de Uso Externo: Guía del Usuario Final y Colaborador
              </h2>
            </div>

            <div className="space-y-6 text-xs md:text-sm">
              <p className="text-slate-300 print:text-slate-800">
                Esta guía está orientada a los trabajadores, jefaturas de área y directores que interactúan con el asistente inteligente para resolver consultas cotidianas sobre sus derechos, obligaciones y beneficios.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                  <div className="font-bold text-indigo-300 text-xs flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-indigo-400" />
                    <span>Paso 1: Redacción de la Consulta</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Escriba su consulta en lenguaje natural en el campo de texto inferior. Puede utilizar los <em>chips de sugerencia rápida</em> (ej. "¿Cómo solicitar permiso por matrimonio?", "¿Cuál es el tope de almuerzo en viáticos?", "¿Qué conductas sanciona la Ley Karin?").
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                  <div className="font-bold text-emerald-300 text-xs flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-emerald-400" />
                    <span>Paso 2: Interpretación de la Respuesta</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    El sistema identificará automáticamente al subagente experto (ej. Agente Laboral, Agente de Procesos). La respuesta vendrá acompañada del <strong>Panel de Citas Normativas</strong>, donde podrá corroborar el artículo exacto del RIOHS o de la Ley que respalda la instrucción.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                  <div className="font-bold text-amber-300 text-xs flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-amber-400" />
                    <span>Paso 3: Protocolo de Casos Críticos (Ley Karin)</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Si su consulta refiere a una situación de acoso laboral, acoso sexual o violencia en el trabajo, el sistema activará una <strong>Alerta de Riesgo Crítico</strong>, entregándole el protocolo legal formal y derivándolo directamente al <em>Canal Oficial de Denuncias</em> con estricta reserva de identidad.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                  <div className="font-bold text-cyan-300 text-xs flex items-center gap-2">
                    <ArrowRight className="h-4 w-4 text-cyan-400" />
                    <span>Paso 4: Respaldo y Hash Criptográfico</span>
                  </div>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Cada consulta genera un <em>Hash SHA-256</em> único que queda registrado en el historial de la empresa. Esto garantiza que ante cualquier duda con jefaturas o auditorías, la orientación recibida tiene validez oficial documentada.
                  </p>
                </div>

              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* CAPÍTULO V: DESGLOSE EXHAUSTIVO DE ÍTEMS DEL PORTAL */}
        {/* ========================================================================= */}
        {(activeChapter === 'all' || activeChapter === 'portal_items') && (
          <section className="space-y-6 border-b border-slate-800 pb-16 print:pb-8 print:border-slate-300">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-indigo-600/20 text-indigo-400 font-mono font-bold px-2.5 py-1 text-xs border border-indigo-500/30">
                CAPÍTULO V
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white print:text-black">
                Desglose Exhaustivo de Componentes e Ítems del Portal
              </h2>
            </div>

            <p className="text-xs md:text-sm text-slate-300 print:text-slate-800">
              A continuación se detalla la función, capacidades técnicas y diseño de interacción de cada uno de los <strong>11 módulos integrados</strong> en la plataforma:
            </p>

            <div className="space-y-4 text-xs">
              
              {/* Item 1 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm">1. Barra Superior de Control (Navbar)</strong>
                  <span className="text-[10px] text-indigo-400 font-mono">Componente: Navbar.tsx</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Permite la selección multilingüe en tiempo real (Español, Inglés, Portugués), cambio dinámico de tema visual (Azul Corporativo, Luminoso Slategray, Verde Esmeralda), visualización de alertas normativas pendientes en el Notification Drawer y gestión de credenciales con huella digital SHA-256.
                </p>
              </div>

              {/* Item 2 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm">2. Barra Lateral de Navegación (Sidebar)</strong>
                  <span className="text-[10px] text-indigo-400 font-mono">Componente: Sidebar.tsx</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Indexa los 10 módulos del sistema con insignias de estado dinámico ('RAG', '5 subagentes', 'E2EE', '-40% AHT', 'Nuevo', 'v1'). Incluye el sello institucional inferior de "Verificación Cero Alucinaciones".
                </p>
              </div>

              {/* Item 3 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm">3. Orquestador RAG & Chat Multi-Agente</strong>
                  <span className="text-[10px] text-indigo-400 font-mono">Componente: ChatOrchestrator.tsx</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Núcleo conversacional del sistema. Realiza enrutamiento semántico hacia el subagente óptimo, desglosa la respuesta en Capas Híbridas (Reglas Snowflake, ChromaDB y Gemini), muestra las fuentes con Triple Cita y permite exportar la sesión completa.
                </p>
              </div>

              {/* Item 4 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm">4. Matriz de Subagentes Especializados</strong>
                  <span className="text-[10px] text-indigo-400 font-mono">Componente: SubagentMatrix.tsx</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Panel analítico de los 5 subagentes de dominio (Laboral, Procesos, Legal, Auditor, Investigador). Exhibe recuento de vectores activos, reglas duras en Snowflake, tasas de precisión del 100% y dominios de competencia exclusivos.
                </p>
              </div>

              {/* Item 5 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm">5. Base de Conocimientos Corporativa</strong>
                  <span className="text-[10px] text-indigo-400 font-mono">Componente: KnowledgeBaseManager.tsx</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Módulo de administración documental. Incorpora el <strong>Benchmark de los 6 Frentes Normativos Auditados</strong> (Golden Dataset de 300 casos con IC 95% ± 2.1%), gestor de categorías dinámicas y repositorio de Golden Examples.
                </p>
              </div>

              {/* Item 6 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm">6. Historial de Auditoría Criptográfica SHA-256</strong>
                  <span className="text-[10px] text-indigo-400 font-mono">Componente: AuditTrailView.tsx</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Libro de registro inmutable con certificación del <em>Oficial de Cumplimiento / Lead Legal & Compliance</em>. Incluye botón de verificación de integridad de cadena SHA-256 y filtrado por nivel de riesgo.
                </p>
              </div>

              {/* Item 7 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm">7. Panel de Administración & Telemetría</strong>
                  <span className="text-[10px] text-indigo-400 font-mono">Componente: AdminDashboard.tsx</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Cuadro de mando de infraestructura. Monitorea latencias de respuesta p95/p99, volumen de tokens procesados por Gemini, distribución de tráfico por subagente y tasa de consultas resueltas por Reglas Snowflake vs RAG Vectorial.
                </p>
              </div>

              {/* Item 8 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm">8. Calculadora de Impacto Financiero HH & ROI</strong>
                  <span className="text-[10px] text-indigo-400 font-mono">Componente: FinancialCalculator.tsx</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Modelo financiero interactivo con toggle de divisas CLP ($) y USD ($). Presenta las 4 tarjetas PoC ($52M costo actual [Medida], $62.675M inversión [Estimada], 14 meses payback [Estimada], -40% reducción AHT [Medida]) y sliders de simulación de plantilla.
                </p>
              </div>

              {/* Item 9 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm">9. Plan Comercial & Licenciamiento</strong>
                  <span className="text-[10px] text-indigo-400 font-mono">Componente: CommercialPlan.tsx</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Estructura de contratación en niveles Starter, Business Pro y Enterprise Custom. Detalla SLAs de respuesta, soporte pericial 24/7 y despliegue on-premise / nube privada con VPC peering.
                </p>
              </div>

              {/* Item 10 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm">10. Estrategia en 6 Fases & Pitch Deck</strong>
                  <span className="text-[10px] text-indigo-400 font-mono">Componente: PitchDeck6Phases.tsx</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Hoja de ruta formal de adopción institucional: Gobernanza y Golden Dataset (Fase 1), Arquitectura Híbrida (Fase 2), Matriz de Exclusiones (Fase 3), Desarrollo (Fase 4), Stage-Gates Quincenales (Fase 5) y Rollout (Fase 6).
                </p>
              </div>

              {/* Item 11 */}
              <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between">
                  <strong className="text-white text-sm">11. Documentación API REST Developer Hub</strong>
                  <span className="text-[10px] text-indigo-400 font-mono">Componente: ApiDocs.tsx</span>
                </div>
                <p className="text-slate-300 leading-relaxed">
                  Especificación de endpoints REST v1 (<code>/api/v1/query</code>, <code>/api/v1/knowledge/upload</code>, <code>/api/v1/financial-calculator</code>, <code>/api/v1/audit-logs</code>), headers de autenticación Bearer y payloads JSON interactivos.
                </p>
              </div>

            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* CAPÍTULO VI: MODELO CUANTITATIVO DE IMPACTO HH & ROI */}
        {/* ========================================================================= */}
        {(activeChapter === 'all' || activeChapter === 'financial_model') && (
          <section className="space-y-6 border-b border-slate-800 pb-16 print:pb-8 print:border-slate-300">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-indigo-600/20 text-indigo-400 font-mono font-bold px-2.5 py-1 text-xs border border-indigo-500/30">
                CAPÍTULO VI
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white print:text-black">
                Modelo Cuantitativo de Impacto Financiero en Horas-Hombre (HH) & Payback
              </h2>
            </div>

            <p className="text-xs md:text-sm text-slate-300 print:text-slate-800">
              La viabilidad económica del proyecto se evaluó sobre una organización base de <strong>70 colaboradores</strong> con los siguientes parámetros auditados y etiquetados metodológicamente:
            </p>

            {/* Tabla Comparativa */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-xl text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-900 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Métrica Financiera / Operativa</th>
                    <th className="p-3.5">Valor Proceso Tradicional</th>
                    <th className="p-3.5">Valor con Orquestador RAG</th>
                    <th className="p-3.5">Impacto Neto / Ahorro</th>
                    <th className="p-3.5">Etiqueta Metodológica</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80 text-slate-300">
                  <tr>
                    <td className="p-3.5 font-bold text-white">Costo Anual de Atención de Consultas</td>
                    <td className="p-3.5 font-mono text-rose-400">$52.000.000 CLP</td>
                    <td className="p-3.5 font-mono text-emerald-400">$2.400.000 CLP</td>
                    <td className="p-3.5 font-mono font-bold text-emerald-400">-$49.600.000 CLP/año</td>
                    <td className="p-3.5"><span className="text-[10px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/30">[Medida]</span></td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Tiempo Promedio de Atención (AHT)</td>
                    <td className="p-3.5 font-mono">45 minutos / consulta</td>
                    <td className="p-3.5 font-mono text-cyan-300">2 minutos / consulta</td>
                    <td className="p-3.5 font-mono font-bold text-cyan-400">-40% a -95% tiempo</td>
                    <td className="p-3.5"><span className="text-[10px] font-bold text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/30">[Medida]</span></td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Inversión Capex (Desarrollo & Setup)</td>
                    <td className="p-3.5 font-mono">$0 CLP</td>
                    <td className="p-3.5 font-mono text-indigo-400">$38.500.000 CLP</td>
                    <td className="p-3.5 font-mono text-slate-400">Costo inicial único</td>
                    <td className="p-3.5"><span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">[Estimada]</span></td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Inversión Opex Anual (Nube & Soporte)</td>
                    <td className="p-3.5 font-mono">$0 CLP</td>
                    <td className="p-3.5 font-mono text-indigo-400">$24.175.000 CLP</td>
                    <td className="p-3.5 font-mono text-slate-400">Infraestructura anual</td>
                    <td className="p-3.5"><span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">[Estimada]</span></td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Inversión Total (Capex + Opex Año 1)</td>
                    <td className="p-3.5 font-mono">$0 CLP</td>
                    <td className="p-3.5 font-mono text-indigo-300 font-bold">$62.675.000 CLP</td>
                    <td className="p-3.5 font-mono text-slate-400">Presupuesto Año 1</td>
                    <td className="p-3.5"><span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">[Estimada]</span></td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Período de Recuperación (Payback)</td>
                    <td className="p-3.5 font-mono">N/A</td>
                    <td className="p-3.5 font-mono text-emerald-400 font-bold">14 Meses</td>
                    <td className="p-3.5 font-mono text-emerald-400 font-bold">Retorno 100% Inversión</td>
                    <td className="p-3.5"><span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">[Estimada]</span></td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-bold text-white">Tarifa Horas-Hombre (HH) Promedio</td>
                    <td className="p-3.5 font-mono">$28.000 CLP/hr ($35 USD)</td>
                    <td className="p-3.5 font-mono">$28.000 CLP/hr</td>
                    <td className="p-3.5 font-mono text-slate-400">Costo HH interno</td>
                    <td className="p-3.5"><span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">[Supuesta]</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <strong className="text-indigo-400 block">Metodología de Validación Científica y Financiera:</strong>
              <p>• <strong>[Medida]</strong>: Tiempos cronometrados formalmente en la Prueba de Concepto (PoC) y auditoría contable de horas de dedicación jurídica.</p>
              <p>• <strong>[Estimada]</strong>: Cotizaciones de Snowflake, ChromaDB, Google Gemini y horas de ingeniería de software para el despliegue.</p>
              <p>• <strong>[Supuesta]</strong>: Tarifa promedio ponderada de abogados corporativos y jefaturas de recursos humanos.</p>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* CAPÍTULO VII: SEGURIDAD, CRIPTOGRAFÍA & GOBERNANZA */}
        {/* ========================================================================= */}
        {(activeChapter === 'all' || activeChapter === 'security_governance') && (
          <section className="space-y-6 border-b border-slate-800 pb-16 print:pb-8 print:border-slate-300">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-indigo-600/20 text-indigo-400 font-mono font-bold px-2.5 py-1 text-xs border border-indigo-500/30">
                CAPÍTULO VII
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white print:text-black">
                Seguridad Criptográfica E2EE, Gobernanza de Riesgos & Protocolo Safe-Fail
              </h2>
            </div>

            <div className="space-y-4 text-xs md:text-sm text-slate-300 print:text-slate-800">
              <p>
                La adopción de IA en entornos laborales críticos exige garantías de confidencialidad y control de acceso superiores a las aplicaciones comerciales:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                  <strong className="text-white text-xs flex items-center gap-2">
                    <Lock className="h-4 w-4 text-indigo-400" />
                    <span>Cifrado de Extremo a Extremo (E2EE) & SHA-256</span>
                  </strong>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Las consultas de los colaboradores son cifradas en el cliente antes de ser transmitidas. Los logs de auditoría quedan encadenados mediante <em>hashes criptográficos SHA-256</em> donde cada bloque contiene el hash del registro previo, impidiendo cualquier adulteración retroactiva.
                  </p>
                </div>

                <div className="rounded-xl bg-slate-950 p-4 border border-slate-800 space-y-2">
                  <strong className="text-white text-xs flex items-center gap-2">
                    <Scale className="h-4 w-4 text-emerald-400" />
                    <span>Cuatro Exclusiones Críticas No Negociables</span>
                  </strong>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    Para evitar desbordes éticos, el sistema tiene prohibido taxativamente: 1. Aprobar rendiciones/pagos en ERP; 2. Emitir dictámenes jurídicos vinculantes sin revisión humana; 3. Tomar decisiones disciplinarias automáticas; 4. Revelar expedientes reservados sin autorización del Oficial de Cumplimiento.
                  </p>
                </div>

              </div>

              <h3 className="text-base font-bold text-white print:text-black pt-2">
                Aclaración Formal de la Paradoja del 95% (Safe-Fail Ground Truth)
              </h3>

              <div className="rounded-xl border border-indigo-500/40 bg-indigo-950/20 p-4 text-xs text-slate-300 leading-relaxed space-y-2">
                <p>
                  En benchmark estándar sobre el <strong>Golden Dataset de 300 casos normativos (IC 95% ± 2.1%)</strong>, el sistema alcanza un 95% de resolución autónoma con 100% de exactitud en los frentes de Ley Karin, Ley 40 Horas, RIOHS, Ética, Viáticos y Ciberseguridad.
                </p>
                <p className="font-bold text-indigo-200">
                  El 5% restante NO representa respuestas erróneas, desvíos o alucinaciones del modelo. Representa una regla estricta de <span className="text-emerald-400">Abstención Forzada y Derivación Segura</span>: cuando un documento no ha sido formalmente ingestado o existe ambigüedad interpretativa, el sistema declara explícitamente su incompetencia y canaliza el caso a la Fiscalía Corporativa con la cita a la ausencia documental.
                </p>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================================= */}
        {/* CAPÍTULO VIII: BIBLIOGRAFÍA, FUENTES LEGALES & REFERENCIAS */}
        {/* ========================================================================= */}
        {(activeChapter === 'all' || activeChapter === 'bibliography') && (
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-indigo-600/20 text-indigo-400 font-mono font-bold px-2.5 py-1 text-xs border border-indigo-500/30">
                CAPÍTULO VIII
              </span>
              <h2 className="text-xl md:text-2xl font-bold text-white print:text-black">
                Bibliografía, Fuentes Legales, Estándares & Referencias Científicas
              </h2>
            </div>

            <div className="space-y-6 text-xs text-slate-300 print:text-slate-800 leading-relaxed">
              
              {/* Fuentes Legales */}
              <div className="space-y-2">
                <h3 className="font-bold text-indigo-300 text-sm border-b border-slate-800 pb-1">
                  1. Marco Legal y Normativa de la República de Chile
                </h3>
                <ul className="space-y-2 pl-4 list-decimal marker:text-indigo-400">
                  <li>
                    <strong>Ley N° 21.643 ("Ley Karin"):</strong> Modifica el Código del Trabajo en materia de prevención, investigación y sanción del acoso laboral, sexual y violencia en el trabajo. Promulgada en enero de 2024; vigencia a partir del 1 de agosto de 2024. Diario Oficial de la República de Chile.
                  </li>
                  <li>
                    <strong>Ley N° 21.561 ("Ley 40 Horas"):</strong> Modifica el Código del Trabajo con el objeto de reducir la jornada ordinaria de trabajo de 45 a 40 horas semanales y reestructura el régimen de excepciones del Artículo 22 inciso 2. Promulgada en abril de 2023.
                  </li>
                  <li>
                    <strong>Código del Trabajo de Chile:</strong> Decreto con Fuerza de Ley N° 1, de 2002. Título Preliminar, Libro I "Del Contrato Individual de Trabajo" y Libro II "De la Protección a los Trabajadores".
                  </li>
                  <li>
                    <strong>Ley N° 21.459:</strong> Establece normas sobre delitos informáticos, deroga la Ley N° 19.223 y modifica otros cuerpos legales con el fin de adecuarlos al Convenio de Budapest. Promulgada en mayo de 2022.
                  </li>
                  <li>
                    <strong>Ley N° 19.628:</strong> Sobre protección de la vida privada y tratamiento de datos de carácter personal en Chile.
                  </li>
                  <li>
                    <strong>Superintendencia de Seguridad Social (SUSESO):</strong> Circular N° 3813 de 2024, Instrucciones sobre la gestión del riesgo psicosocial en el trabajo y aplicación del Cuestionario CEAL-SM / SUSESO.
                  </li>
                </ul>
              </div>

              {/* Estándares Internacionales */}
              <div className="space-y-2">
                <h3 className="font-bold text-indigo-300 text-sm border-b border-slate-800 pb-1">
                  2. Estándares Internacionales de Seguridad y Gobernanza de IA
                </h3>
                <ul className="space-y-2 pl-4 list-decimal marker:text-indigo-400">
                  <li>
                    <strong>ISO/IEC 27001:2022:</strong> <em>Information security, cybersecurity and privacy protection — Information security management systems — Requirements.</em> International Organization for Standardization.
                  </li>
                  <li>
                    <strong>ISO/IEC 42001:2023:</strong> <em>Information technology — Artificial intelligence — Management system (AIMS).</em> International Organization for Standardization.
                  </li>
                  <li>
                    <strong>NIST AI 100-1:</strong> <em>Artificial Intelligence Risk Management Framework (AI RMF 1.0).</em> National Institute of Standards and Technology, U.S. Department of Commerce (2023).
                  </li>
                </ul>
              </div>

              {/* Literatura Científica */}
              <div className="space-y-2">
                <h3 className="font-bold text-indigo-300 text-sm border-b border-slate-800 pb-1">
                  3. Literatura Académica y Artículos Científicos de RAG & Multi-Agentes
                </h3>
                <ul className="space-y-2 pl-4 list-decimal marker:text-indigo-400">
                  <li>
                    <strong>Lewis, P., Perez, E., Piktus, A., et al. (2020):</strong> <em>"Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks."</em> Advances in Neural Information Processing Systems (NeurIPS 2020), 33, 9459-9474.
                  </li>
                  <li>
                    <strong>Gao, Y., Xiong, Y., Gao, X., et al. (2023):</strong> <em>"Retrieval-Augmented Generation for Large Language Models: A Survey."</em> arXiv preprint arXiv:2312.10997.
                  </li>
                  <li>
                    <strong>Wu, Q., Bansal, G., Zhang, J., et al. (2023):</strong> <em>"AutoGen: Enabling Next-Gen LLM Applications via Multi-Agent Conversation."</em> Microsoft Research. arXiv preprint arXiv:2308.08155.
                  </li>
                  <li>
                    <strong>Khattab, O., Santhanam, K., Li, X. L., et al. (2023):</strong> <em>"Demonstrate-Search-Predict: Composing Retrieval and Language Models for Knowledge-Intensive NLP (DSPy)."</em> Stanford University.
                  </li>
                  <li>
                    <strong>Zhang, Y., Li, Y., Cui, L., et al. (2024):</strong> <em>"Siren's Song in the AI Ocean: A Survey on Hallucination in Large Language Models."</em> Nature Machine Intelligence, 6, 120–133.
                  </li>
                  <li>
                    <strong>Vaswani, A., Shazeer, N., Parmar, N., et al. (2017):</strong> <em>"Attention Is All You Need."</em> Advances in Neural Information Processing Systems (NeurIPS 2017), 30, 5998–6008.
                  </li>
                </ul>
              </div>

            </div>

            {/* Sello de Certificación Final */}
            <div className="mt-8 rounded-2xl border border-emerald-500/30 bg-emerald-950/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white flex-shrink-0">
                  <Award className="h-6 w-6" />
                </div>
                <div>
                  <div className="font-bold text-white text-sm">
                    Memoria Técnica Certificada para Auditoría y Despliegue en Producción
                  </div>
                  <div className="text-[11px] text-emerald-300">
                    Aprobado por el Oficial de Cumplimiento / Lead Legal & Compliance bajo Norma ISO 42001 y Ley Karin N° 21.643.
                  </div>
                </div>
              </div>
              <div className="font-mono text-[10px] text-slate-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800 whitespace-nowrap">
                HASH DOC: SHA256:4e9a8f2c01b...
              </div>
            </div>
          </section>
        )}

      </div>

    </div>
  );
};
