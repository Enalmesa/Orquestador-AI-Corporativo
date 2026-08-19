import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  Sparkles, 
  Building2, 
  ShieldCheck, 
  Bot, 
  ArrowRight, 
  FileText, 
  Clock, 
  Users, 
  ChevronRight, 
  BadgeCheck, 
  Send, 
  HelpCircle,
  Download,
  Check,
  Zap,
  Lock,
  Calendar,
  Layers,
  Award
} from 'lucide-react';
import { Language } from '../types';

interface CommercialPlanProps {
  lang?: Language;
}

export const CommercialPlan: React.FC<CommercialPlanProps> = ({ lang = 'es' }) => {
  // Headcount state synchronized with localStorage
  const [collabCount, setCollabCountState] = useState<number>(() => {
    const saved = localStorage.getItem('rag_collaborators_count');
    return saved !== null ? Number(saved) : 11;
  });

  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');
  const [selectedPlan, setSelectedPlan] = useState<'pyme' | 'enterprise' | 'onpremise'>('enterprise');

  // Proposal modal state
  const [showProposalModal, setShowProposalModal] = useState(false);
  const [companyName, setCompanyName] = useState('Mi Empresa S.A.');
  const [contactName, setContactName] = useState('Carolina Morales');
  const [contactEmail, setContactEmail] = useState('carolina.morales@empresa.com');
  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleUpdateHeadcount = (num: number) => {
    const safeNum = Math.max(0, num);
    setCollabCountState(safeNum);
    localStorage.setItem('rag_collaborators_count', String(safeNum));
    window.dispatchEvent(new CustomEvent('rag_collab_count_changed', { detail: safeNum }));
  };

  // Pricing calculations
  const pricePerCollabMonthly = collabCount > 100 ? 2.5 : collabCount > 30 ? 2.8 : 3.5;
  const discountMultiplier = billingCycle === 'annual' ? 0.8 : 1.0; // 20% discount on annual
  const monthlyTotalUSD = Math.round(collabCount * pricePerCollabMonthly * discountMultiplier);

  // Estimated HH Savings
  const savedHoursPerMonth = Math.round((collabCount * 0.8));
  const estimatedCostSavedUSD = Math.round(savedHoursPerMonth * 35);

  const handleSendProposalRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setShowProposalModal(false);
    }, 2500);
  };

  // Dictionary for translations
  const text = {
    es: {
      badgeHeader: 'Modelo Comercial & Guía de Adopción',
      titleHeader: 'Plan Comercial e Implementación Paso a Paso',
      subtitleHeader: 'Explicación simple, transparente y estructurada para contratar la plataforma RAG de IA Corporativa con garantía de cero alucinaciones normativas (Ley Karin, 40 Horas, RIOHS).',
      btnProposal: 'Solicitar Ficha de Contratación (PoC 48h)',
      noHiddenCosts: 'Sin costos ocultos • Despliegue en 5 días',
      simTitle: 'Simulador Comercial por Número de Colaboradores',
      simSub: 'Calcula la inversión mensual estimada según la dotación activa de tu organización.',
      annualPayment: 'Pago Anual (-20% Desc)',
      monthlyPayment: 'Mensual',
      collabLabel: 'Dotación de Colaboradores:',
      collabCountText: `${collabCount} Colaboradores Activos`,
      invEst: 'Inversión Estimada',
      perMonth: 'USD / mes',
      savingsEst: `Ahorro proyectado: ~${estimatedCostSavedUSD} USD/mes en HH`,
      plansTitle: 'Planes Comerciales Disponibles',
      pymeTitle: 'Standard / PyME',
      pymeCap: 'Hasta 50 pers.',
      pymeDesc: 'Ideal para empresas pequeñas en proceso de adecuación a la Ley Karin.',
      pymeF1: 'Ingesta RIOHS y Ley Karin (Hasta 10 documentos)',
      pymeF2: '3 Roles RBAC (Colaborador, Cumplimiento, Admin)',
      pymeF3: 'Orquestador RAG Web Responsive',
      pymeF4: 'Soporte estándar 8/5 por correo',
      pymeBtn: 'Elegir Plan Standard',
      entTitle: 'Enterprise Corporativo',
      entCap: '50 a 500+ pers.',
      entBadge: '★ MÁS POPULAR CORPORATIVO',
      entDesc: 'Gobernanza completa, cero alucinaciones y red de 5 subagentes.',
      entF1: 'Red de 5 Subagentes Especializados',
      entF2: 'Verificación Cero Alucinación (Snowflake SQL + RAG)',
      entF3: 'Auditoría Inmutable SHA-256 E2EE para la DT/SUSESO',
      entF4: 'Integración SSO (Google, Microsoft Entra ID, SAML)',
      entF5: 'Soporte prioritario 24/7 y Agente de Leyes Externas',
      entBtn: 'Seleccionar Enterprise',
      onpTitle: 'On-Premise / Govermental',
      onpCap: '+500 colaboradores',
      onpPrice: 'Custom / Cotización a Medida',
      onpDesc: 'Soberanía total de datos para el sector público o alta banca.',
      onpF1: 'Nube privada aislada o Servidores Propios On-Premise',
      onpF2: 'Embeddings y modelos de IA dedicados exclusivamente',
      onpF3: 'SLA del 99,99% garantizado por contrato',
      onpF4: 'Oficial de Cumplimiento Técnico dedicado',
      onpBtn: 'Solicitar Propuesta On-Premise',
      howTitle: 'Explicación Simple: ¿Cómo se contrata el servicio?',
      step1Badge: 'Sin costo inicial',
      step1Title: '1. Envío de Documentación para PoC',
      step1Desc: 'Subes tu Reglamento Interno (RIOHS) y Código de Ética a nuestra plataforma o nos los envías bajo un acuerdo de confidencialidad (NDA).',
      step2Badge: 'En 48 Horas',
      step2Title: '2. Demostración y Prueba de Concepto',
      step2Desc: 'Montamos un ambiente piloto con tus propios reglamentos para que Fiscalía, RRHH y el Oficial de Cumplimiento prueben la precisión cero alucinaciones.',
      step3Badge: 'Activación Final',
      step3Title: '3. Firma de Contrato & Sincronización SSO',
      step3Desc: 'Formalizamos el acuerdo de servicio (SLA) y conectamos el inicio de sesión corporativo (Google / Microsoft) para todos tus colaboradores.',
      roadmapTitle: 'Guía de Implementación Técnica & Operativa (Paso a Paso)',
      roadmapSub: 'Plan detallado de despliegue en 5 etapas semanales hasta la puesta en marcha definitiva.',
      roadmapTime: 'Despliegue estimado: 5 a 10 días',
      e1Title: 'Etapa 1: Ingesta & Estructuración de la Base de Conocimiento',
      e1Time: 'Día 1 - 2',
      e1Desc: 'Carga de RIOHS, Ley Karin, Ley 40 Horas, Políticas de Regalos, Ciberseguridad e instructivos internos. Procesamiento y vectorización en la base híbrida.',
      e2Title: 'Etapa 2: Parametrización de Reglas SQL & Golden Examples',
      e2Time: 'Día 3',
      e2Desc: 'Configuración de respuestas determinísticas para casos críticos de denuncias Ley Karin o prohibición de represalias (Golden Examples validados por Fiscalía).',
      e3Title: 'Etapa 3: Configuración de Identidad y Roles RBAC (SSO/SAML)',
      e3Time: 'Día 4',
      e3Desc: 'Sincronización con el directorio corporativo (Microsoft Entra ID, Google Workspace, SSO SAML) para asignación automática de permisos según rol.',
      e4Title: 'Etapa 4: Marcha Blanca & Capacitación a Key Users',
      e4Time: 'Día 5',
      e4Desc: 'Sesión de entrenamiento práctico con el Oficial de Cumplimiento, RRHH y auditores. Validación de registros de auditoría inmutables SHA-256.',
      e5Title: 'Etapa 5: Lanzamiento General & Monitoreo de Auditoría 24/7',
      e5Time: 'Producción',
      e5Desc: 'Apertura masiva a la totalidad de colaboradores. Monitoreo continuo de consultas, métricas AHT y alertas tempranas normativas.',
      faqTitle: 'Preguntas Frecuentes Comerciales & Técnicas',
      faq1Q: '¿Qué sucede cuando actualizamos nuestro RIOHS o Políticas?',
      faq1A: 'La re-ingesta se realiza de forma inmediata desde el módulo "Base de Conocimiento". Los documentos antiguos quedan archivados con control de versión.',
      faq2Q: '¿Requiere instalar software en las computadoras de la empresa?',
      faq2A: 'No. Es una aplicación 100% web responsive que funciona en navegadores de PC, notebooks, tablets y teléfonos móviles con inicio de sesión único (SSO).',
      faq3Q: '¿Cómo nos protege frente a revisiones de la Dirección del Trabajo (DT)?',
      faq3A: 'Cada consulta realizada por los colaboradores queda registrada con un hash criptográfico SHA-256 encadenado inmutable, respaldando que la empresa entregó información normativa oportuna.',
      faq4Q: '¿Se pueden agregar más colaboradores a mitad de contrato?',
      faq4A: 'Sí. La suscripción escala dinámicamente y se prorratean los nuevos colaboradores agregados en el ciclo de facturación.',
      modalTitle: 'Ficha de Contratación & Solicitud de PoC (48h)',
      modalSuccessTitle: '¡Ficha de Contratación Generada con Éxito!',
      modalSuccessDesc: `Un Oficial de Cumplimiento Técnico de nuestro equipo se pondrá en contacto con ${contactName} (${contactEmail}) en menos de 2 horas hábiles para iniciar la prueba piloto.`,
      companyLabel: 'Nombre de la Empresa u Organización',
      contactLabel: 'Nombre del Contacto',
      emailLabel: 'Correo Corporativo',
      planSel: 'Plan Seleccionado:',
      headcountSel: 'Dotación Configurada:',
      valueSel: 'Valor Estimado Mensual:',
      confirmBtn: 'Confirmar & Solicitar Demostración PoC en 48 Horas'
    },
    en: {
      badgeHeader: 'Commercial Model & Adoption Guide',
      titleHeader: 'Commercial Plan & Step-by-Step Implementation',
      subtitleHeader: 'Clear, transparent, and structured guide to subscribe to the Corporate AI RAG platform with zero regulatory hallucination guarantee (Karin Law, 40 Hours, RIOHS).',
      btnProposal: 'Request Subscription Form (48h PoC)',
      noHiddenCosts: 'No hidden fees • Deployment in 5 days',
      simTitle: 'Commercial Simulator by Employee Headcount',
      simSub: 'Calculate estimated monthly investment based on active workforce.',
      annualPayment: 'Annual Payment (-20% Off)',
      monthlyPayment: 'Monthly',
      collabLabel: 'Employee Headcount:',
      collabCountText: `${collabCount} Active Employees`,
      invEst: 'Estimated Investment',
      perMonth: 'USD / month',
      savingsEst: `Projected savings: ~${estimatedCostSavedUSD} USD/month in Labor Hours`,
      plansTitle: 'Available Commercial Plans',
      pymeTitle: 'Standard / SME',
      pymeCap: 'Up to 50 employees',
      pymeDesc: 'Ideal for small businesses adopting Karin Law compliance.',
      pymeF1: 'RIOHS & Karin Law ingestion (Up to 10 documents)',
      pymeF2: '3 RBAC Roles (Employee, Compliance, Admin)',
      pymeF3: 'Responsive Web RAG Orchestrator',
      pymeF4: 'Standard 8/5 email support',
      pymeBtn: 'Select Standard Plan',
      entTitle: 'Corporate Enterprise',
      entCap: '50 to 500+ employees',
      entBadge: '★ MOST POPULAR CORPORATE',
      entDesc: 'Full governance, zero hallucinations, and 5 subagent network.',
      entF1: '5 Specialized Subagent Network',
      entF2: 'Zero Hallucination Verification (Snowflake SQL + RAG)',
      entF3: 'Immutable SHA-256 E2EE Audit Trail for Labor Inspectorate',
      entF4: 'SSO Integration (Google, Microsoft Entra ID, SAML)',
      entF5: 'Priority 24/7 support & External Law Agent',
      entBtn: 'Select Enterprise Plan',
      onpTitle: 'On-Premise / Governmental',
      onpCap: '500+ employees',
      onpPrice: 'Custom Quote',
      onpDesc: 'Total data sovereignty for public sector or financial institutions.',
      onpF1: 'Isolated private cloud or On-Premise dedicated servers',
      onpF2: 'Exclusively dedicated AI embeddings and LLM models',
      onpF3: 'Contracted 99.99% SLA guarantee',
      onpF4: 'Dedicated Technical Compliance Officer',
      onpBtn: 'Request On-Premise Proposal',
      howTitle: 'Simple Guide: How to Subscribe to the Service',
      step1Badge: 'No upfront cost',
      step1Title: '1. Send Documentation for PoC',
      step1Desc: 'Upload your Internal Regulations (RIOHS) and Code of Ethics or send them under NDA.',
      step2Badge: 'In 48 Hours',
      step2Title: '2. Demonstration & Proof of Concept',
      step2Desc: 'We set up a pilot sandbox with your regulations so HR, Legal, and Compliance test zero hallucination precision.',
      step3Badge: 'Final Launch',
      step3Title: '3. Agreement Signing & SSO Sync',
      step3Desc: 'We formalize the SLA agreement and link corporate SSO (Google / Microsoft) for all employees.',
      roadmapTitle: 'Technical & Operational Implementation Roadmap',
      roadmapSub: 'Detailed 5-stage weekly deployment plan until production go-live.',
      roadmapTime: 'Estimated deployment: 5 to 10 days',
      e1Title: 'Stage 1: Knowledge Base Ingestion & Structuring',
      e1Time: 'Day 1 - 2',
      e1Desc: 'Upload RIOHS, Karin Law, 40 Hours Law, Gift Policies, Cybersecurity. Hybrid vector processing.',
      e2Title: 'Stage 2: SQL Rules Parameterization & Golden Examples',
      e2Time: 'Day 3',
      e2Desc: 'Deterministic response configuration for critical Karin Law reports or anti-retaliation rules.',
      e3Title: 'Stage 3: Identity & RBAC Configuration (SSO/SAML)',
      e3Time: 'Day 4',
      e3Desc: 'Corporate directory sync (Microsoft Entra ID, Google Workspace, SAML) for automated role permissions.',
      e4Title: 'Stage 4: Pilot & Key User Training',
      e4Time: 'Day 5',
      e4Desc: 'Hands-on training session with Compliance, HR, and auditors. Validation of immutable SHA-256 logs.',
      e5Title: 'Stage 5: General Launch & 24/7 Audit Monitoring',
      e5Time: 'Production',
      e5Desc: 'Full organization rollout. Continuous query monitoring, AHT metrics, and early regulatory alerts.',
      faqTitle: 'Commercial & Technical FAQs',
      faq1Q: 'What happens when we update our internal policies?',
      faq1A: 'Re-ingestion is immediate via the "Knowledge Base" module. Older versions are archived with version control.',
      faq2Q: 'Does it require software installation on company PCs?',
      faq2A: 'No. It is a 100% web responsive app running on PC browsers, laptops, tablets, and phones with SSO.',
      faq3Q: 'How does it protect us against Labor Authority audits?',
      faq3A: 'Every employee query is recorded with an immutable SHA-256 cryptographic hash chain, proving compliance delivery.',
      faq4Q: 'Can we add more employees mid-contract?',
      faq4A: 'Yes. The subscription scales dynamically with prorated additions on your billing cycle.',
      modalTitle: 'Subscription Form & PoC Request (48h)',
      modalSuccessTitle: 'Subscription Request Generated Successfully!',
      modalSuccessDesc: `A Technical Compliance Officer will contact ${contactName} (${contactEmail}) in under 2 hours to start your pilot.`,
      companyLabel: 'Company / Organization Name',
      contactLabel: 'Contact Name',
      emailLabel: 'Corporate Email',
      planSel: 'Selected Plan:',
      headcountSel: 'Configured Headcount:',
      valueSel: 'Estimated Monthly Value:',
      confirmBtn: 'Confirm & Request 48h PoC Demo'
    },
    pt: {
      badgeHeader: 'Modelo Comercial & Guia de Adoção',
      titleHeader: 'Plano Comercial e Implementação Passo a Passo',
      subtitleHeader: 'Guia simples, transparente e estruturado para contratar a plataforma RAG de IA Corporativa com garantia de zero alucinação regulatória.',
      btnProposal: 'Solicitar Ficha de Contratação (PoC 48h)',
      noHiddenCosts: 'Sem custos ocultos • Implantação em 5 dias',
      simTitle: 'Simulador Comercial por Número de Colaboradores',
      simSub: 'Calcule o investimento mensal estimado de acordo com a equipe ativa.',
      annualPayment: 'Pagamento Anual (-20% Desc)',
      monthlyPayment: 'Mensal',
      collabLabel: 'Equipe de Colaboradores:',
      collabCountText: `${collabCount} Colaboradores Ativos`,
      invEst: 'Investimento Estimado',
      perMonth: 'USD / mês',
      savingsEst: `Economia projetada: ~${estimatedCostSavedUSD} USD/mês em Horas-Homem`,
      plansTitle: 'Planos Comerciais Disponíveis',
      pymeTitle: 'Standard / PME',
      pymeCap: 'Até 50 pessoas',
      pymeDesc: 'Ideal para pequenas empresas em processo de adequação regulatória.',
      pymeF1: 'Ingestão RIOHS e Lei Karin (Até 10 documentos)',
      pymeF2: '3 Funções RBAC (Colaborador, Conformidade, Admin)',
      pymeF3: 'Orquestrador RAG Web Responsivo',
      pymeF4: 'Suporte padrão 8/5 por e-mail',
      pymeBtn: 'Escolher Plano Standard',
      entTitle: 'Enterprise Corporativo',
      entCap: '50 a 500+ pessoas',
      entBadge: '★ MAIS POPULAR CORPORATIVO',
      entDesc: 'Governança completa, zero alucinações e rede de 5 subagentes.',
      entF1: 'Rede de 5 Subagentes Especializados',
      entF2: 'Verificação Zero Alucinação (Snowflake SQL + RAG)',
      entF3: 'Trilha de Auditoria Imutável SHA-256 E2EE',
      entF4: 'Integração SSO (Google, Microsoft Entra ID, SAML)',
      entF5: 'Suporte prioritário 24/7 e Agente de Leis Externas',
      entBtn: 'Selecionar Enterprise',
      onpTitle: 'On-Premise / Governamental',
      onpCap: '+500 colaboradores',
      onpPrice: 'Cotação Sob Medida',
      onpDesc: 'Soberania total de dados para setor público ou instituições financeiras.',
      onpF1: 'Nuvem privada isolada ou Servidores Próprios On-Premise',
      onpF2: 'Embeddings e modelos de IA exclusivamente dedicados',
      onpF3: 'SLA de 99,99% garantido em contrato',
      onpF4: 'Oficial de Conformidade Técnica Dedicado',
      onpBtn: 'Solicitar Proposta On-Premise',
      howTitle: 'Explicação Simples: Como contratar o serviço?',
      step1Badge: 'Sem custo inicial',
      step1Title: '1. Envio de Documentos para PoC',
      step1Desc: 'Envie o Regulamento Interno (RIOHS) e Código de Ética sob termo de confidencialidade (NDA).',
      step2Badge: 'Em 48 Horas',
      step2Title: '2. Demonstração e Prova de Conceito',
      step2Desc: 'Montamos um ambiente piloto com seus regulamentos para testar a precisão sem alucinações.',
      step3Badge: 'Ativação Final',
      step3Title: '3. Assinatura de Contrato & Sincronização SSO',
      step3Desc: 'Formalizamos o contrato SLA e conectamos o login corporativo (Google / Microsoft).',
      roadmapTitle: 'Guia de Implementação Técnica e Operacional (Passo a Passo)',
      roadmapSub: 'Plano detalhado de implantação em 5 etapas semanais até a produção.',
      roadmapTime: 'Implantação estimada: 5 a 10 dias',
      e1Title: 'Etapa 1: Ingestão & Estruturação da Base de Conhecimento',
      e1Time: 'Dia 1 - 2',
      e1Desc: 'Carga de RIOHS, leis trabalhistas, cibersegurança e políticas internas na base híbrida.',
      e2Title: 'Etapa 2: Parametrização de Regras SQL & Golden Examples',
      e2Time: 'Dia 3',
      e2Desc: 'Configuração de respostas determinísticas validadas para casos críticos.',
      e3Title: 'Etapa 3: Configuração de Identidade e Funções RBAC (SSO/SAML)',
      e3Time: 'Dia 4',
      e3Desc: 'Sincronização com o diretório corporativo para atribuição automática de permissões.',
      e4Title: 'Etapa 4: Projeto Piloto & Treinamento de Usuarios Chave',
      e4Time: 'Dia 5',
      e4Desc: 'Treinamento prático com Conformidade, RH e auditores. Validação de logs SHA-256.',
      e5Title: 'Etapa 5: Lançamento Geral & Monitoramento de Auditoria 24/7',
      e5Time: 'Produção',
      e5Desc: 'Lançamento para todos os colaboradores com monitoramento contínuo.',
      faqTitle: 'Perguntas Frequentes Comerciais e Técnicas',
      faq1Q: 'O que acontece quando atualizamos nossas políticas internas?',
      faq1A: 'A re-ingestão é imediata pelo módulo "Base de Conhecimento". Documentos antigos são arquivados com histórico.',
      faq2Q: 'Requer instalação de software nos computadores da empresa?',
      faq2A: 'Não. É uma aplicação 100% web em navegadores de PC, tablets e celulares com SSO.',
      faq3Q: 'Como nos protege em auditorias regulatórias?',
      faq3A: 'Cada consulta é registrada com um hash criptográfico SHA-256 imutável.',
      faq4Q: 'Podemos adicionar mais colaboradores durante o contrato?',
      faq4A: 'Sim. A assinatura escala dinamicamente com cálculo proporcional.',
      modalTitle: 'Ficha de Contratação & Solicitação de PoC (48h)',
      modalSuccessTitle: 'Ficha de Contratação Gerada com Sucesso!',
      modalSuccessDesc: `Um Oficial de Conformidade Técnica entrará em contato com ${contactName} (${contactEmail}) em menos de 2 horas.`,
      companyLabel: 'Nome da Empresa ou Organização',
      contactLabel: 'Nome do Contato',
      emailLabel: 'E-mail Corporativo',
      planSel: 'Plano Selecionado:',
      headcountSel: 'Equipe Configurada:',
      valueSel: 'Valor Mensal Estimado:',
      confirmBtn: 'Confirmar e Solicitar Demonstração PoC em 48 Horas'
    }
  };

  const t = text[lang] || text['es'];

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 p-6 md:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-400 uppercase tracking-widest">
              <Sparkles className="h-4 w-4 text-indigo-400" />
              <span>{t.badgeHeader}</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              {t.titleHeader}
            </h1>
            <p className="text-xs md:text-sm text-slate-300 max-w-2xl leading-relaxed">
              {t.subtitleHeader}
            </p>
          </div>

          <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
            <button
              id="open-proposal-modal-header-btn"
              onClick={() => setShowProposalModal(true)}
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-bold text-xs text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
            >
              <FileText className="h-4 w-4" />
              <span>{t.btnProposal}</span>
            </button>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <CheckCircle2 className="h-3 w-3" /> {t.noHiddenCosts}
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Cost Simulator Bar */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4 shadow-lg">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Users className="h-4 w-4 text-indigo-400" />
              <span>Simulador Comercial por Número de Colaboradores</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Calcula la inversión mensual estimada según la dotación activa de tu organización.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 rounded-lg">
            <button
              id="billing-cycle-annual"
              onClick={() => setBillingCycle('annual')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                billingCycle === 'annual' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pago Anual (-20% Desc)
            </button>
            <button
              id="billing-cycle-monthly"
              onClick={() => setBillingCycle('monthly')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition ${
                billingCycle === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Mensual
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
          {/* Headcount Input Slider */}
          <div className="md:col-span-2 space-y-2">
            <div className="flex justify-between text-xs font-semibold text-slate-300">
              <span>Dotación de Colaboradores:</span>
              <span className="text-indigo-400 font-mono font-bold text-sm">{collabCount} Colaboradores Activos</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                id="commercial-collab-slider"
                type="range"
                min={0}
                max={500}
                step={1}
                value={collabCount}
                onChange={(e) => handleUpdateHeadcount(Number(e.target.value))}
                className="flex-1 accent-indigo-500"
              />
              <input
                id="commercial-collab-number-input"
                type="number"
                min={0}
                max={10000}
                value={collabCount}
                onChange={(e) => handleUpdateHeadcount(Number(e.target.value))}
                className="w-20 rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1 text-xs font-bold text-indigo-400 font-mono text-center focus:border-indigo-500 focus:outline-none"
              />
            </div>
            <div className="flex justify-between text-[10px] text-slate-500">
              <span>0 personas</span>
              <span>100 personas</span>
              <span>250 personas</span>
              <span>500+ corporativo</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-4 text-center space-y-1">
            <div className="text-[10px] text-indigo-300 font-bold uppercase tracking-widest">Inversión Estimada</div>
            <div className="text-2xl font-black text-white font-mono">
              ${monthlyTotalUSD} <span className="text-xs text-slate-400 font-normal">USD / mes</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-medium">
              Ahorro proyectado: ~${estimatedCostSavedUSD} USD/mes en HH
            </div>
          </div>
        </div>
      </div>

      {/* 3 Commercial Tiers Cards */}
      <div className="space-y-3">
        <div className="text-sm font-bold text-white flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-indigo-400" />
          <span>Planes Comerciales Disponibles</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Plan PyME */}
          <div 
            onClick={() => setSelectedPlan('pyme')}
            className={`rounded-2xl border p-5 space-y-4 transition cursor-pointer relative flex flex-col justify-between ${
              selectedPlan === 'pyme' 
                ? 'border-indigo-500 bg-slate-900 shadow-xl shadow-indigo-500/10' 
                : 'border-slate-800 bg-slate-950 hover:border-slate-700'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Standard / PyME</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">Hasta 50 pers.</span>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-white">$3,5 <span className="text-xs font-normal text-slate-400">USD / colab / mes</span></div>
                <p className="text-[11px] text-slate-400 mt-1">Ideal para empresas pequeñas en proceso de adecuación a la Ley Karin.</p>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Ingesta RIOHS y Ley Karin (Hasta 10 documentos)</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>3 Roles RBAC (Colaborador, Cumplimiento, Admin)</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Orquestador RAG Web Responsive</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Soporte estándar 8/5 por correo</span>
                </div>
              </div>
            </div>

            <button
              id="select-plan-pyme-btn"
              onClick={(e) => { e.stopPropagation(); setSelectedPlan('pyme'); setShowProposalModal(true); }}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition mt-4 ${
                selectedPlan === 'pyme' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Elegir Plan Standard
            </button>
          </div>

          {/* Plan Enterprise (RECOMENDADO) */}
          <div 
            onClick={() => setSelectedPlan('enterprise')}
            className={`rounded-2xl border p-5 space-y-4 transition cursor-pointer relative flex flex-col justify-between ${
              selectedPlan === 'enterprise' 
                ? 'border-indigo-500 bg-indigo-950/30 shadow-2xl ring-2 ring-indigo-500/40' 
                : 'border-slate-800 bg-slate-950 hover:border-slate-700'
            }`}
          >
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-3 py-0.5 rounded-full shadow">
              ★ MÁS POPULAR CORPORATIVO
            </div>

            <div className="space-y-3 pt-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Enterprise Corporativo</span>
                <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded font-medium">50 a 500+ pers.</span>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-white">$2,8 <span className="text-xs font-normal text-slate-400">USD / colab / mes</span></div>
                <p className="text-[11px] text-indigo-200 mt-1">Gobernanza completa, cero alucinaciones y red de 5 subagentes.</p>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                <div className="flex items-start gap-2 text-slate-200 font-semibold">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Red de 5 Subagentes Especializados</span>
                </div>
                <div className="flex items-start gap-2 text-slate-200 font-semibold">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Verificación Cero Alucinación (Snowflake SQL + RAG)</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Auditoría Inmutable SHA-256 E2EE para la DT/SUSESO</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Integración SSO (Google, Microsoft Entra ID, SAML)</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Soporte prioritario 24/7 y Agente de Leyes Externas</span>
                </div>
              </div>
            </div>

            <button
              id="select-plan-enterprise-btn"
              onClick={(e) => { e.stopPropagation(); setSelectedPlan('enterprise'); setShowProposalModal(true); }}
              className="w-full py-2.5 rounded-xl font-bold text-xs bg-indigo-600 text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30 mt-4"
            >
              Seleccionar Enterprise
            </button>
          </div>

          {/* Plan On-Premise */}
          <div 
            onClick={() => setSelectedPlan('onpremise')}
            className={`rounded-2xl border p-5 space-y-4 transition cursor-pointer relative flex flex-col justify-between ${
              selectedPlan === 'onpremise' 
                ? 'border-indigo-500 bg-slate-900 shadow-xl shadow-indigo-500/10' 
                : 'border-slate-800 bg-slate-950 hover:border-slate-700'
            }`}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">On-Premise / Govermental</span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-medium">+500 colaboradores</span>
              </div>

              <div>
                <div className="text-2xl font-extrabold text-white">Custom <span className="text-xs font-normal text-slate-400">/ Cotización a Medida</span></div>
                <p className="text-[11px] text-slate-400 mt-1">Soberanía total de datos para el sector público o alta banca.</p>
              </div>

              <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Nube privada aislada o Servidores Propios On-Premise</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Embeddings y modelos de IA dedicados exclusivamente</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>SLA del 99,99% garantizado por contrato</span>
                </div>
                <div className="flex items-start gap-2 text-slate-300">
                  <Check className="h-4 w-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>Oficial de Cumplimiento Técnico dedicado</span>
                </div>
              </div>
            </div>

            <button
              id="select-plan-onpremise-btn"
              onClick={(e) => { e.stopPropagation(); setSelectedPlan('onpremise'); setShowProposalModal(true); }}
              className={`w-full py-2.5 rounded-xl font-bold text-xs transition mt-4 ${
                selectedPlan === 'onpremise' ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Solicitar Propuesta On-Premise
            </button>
          </div>
        </div>
      </div>

      {/* Explicación Simple: ¿Cómo se contrata? (3 Pasos Simples) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-5">
        <div className="flex items-center gap-2 text-base font-bold text-white border-b border-slate-800 pb-3">
          <Zap className="h-5 w-5 text-amber-400" />
          <span>Explicación Simple: ¿Cómo se contrata el servicio?</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Paso A */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-sm">
                1
              </span>
              <span className="text-[10px] text-indigo-400 font-bold bg-indigo-500/10 px-2 py-0.5 rounded">
                Sin costo inicial
              </span>
            </div>
            <h4 className="text-xs font-bold text-white pt-1">1. Envío de Documentación para PoC</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Subes tu Reglamento Interno (RIOHS) y Código de Ética a nuestra plataforma o nos los envías bajo un acuerdo de confidencialidad (NDA).
            </p>
          </div>

          {/* Paso B */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-sm">
                2
              </span>
              <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded">
                En 48 Horas
              </span>
            </div>
            <h4 className="text-xs font-bold text-white pt-1">2. Demostración y Prueba de Concepto</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Montamos un ambiente piloto con tus propios reglamentos para que Fiscalía, RRHH y el Oficial de Cumplimiento prueben la precisión cero alucinaciones.
            </p>
          </div>

          {/* Paso C */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-2 relative">
            <div className="flex items-center justify-between">
              <span className="h-8 w-8 rounded-full bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-sm">
                3
              </span>
              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded">
                Activación Final
              </span>
            </div>
            <h4 className="text-xs font-bold text-white pt-1">3. Firma de Contrato & Sincronización SSO</h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Formalizamos el acuerdo de servicio (SLA) y conectamos el inicio de sesión corporativo (Google / Microsoft) para todos tus colaboradores.
            </p>
          </div>
        </div>
      </div>

      {/* Guía de Implementación Paso a Paso (Roadmap de 5 Etapas) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-400" />
              <span>Guía de Implementación Técnica & Operativa (Paso a Paso)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Plan detallado de despliegue en 5 etapas semanales hasta la puesta en marcha definitiva.
            </p>
          </div>
          <span className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" /> Despliegue estimado: 5 a 10 días
          </span>
        </div>

        <div className="space-y-3">
          {/* Etapa 1 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                E1
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Etapa 1: Ingesta & Estructuración de la Base de Conocimiento</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Día 1 - 2</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Carga de RIOHS, Ley Karin, Ley 40 Horas, Políticas de Regalos, Ciberseguridad e instructivos internos. Procesamiento y vectorización en la base híbrida.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded">
              ✓ Ingesta Híbrida ChromaDB
            </span>
          </div>

          {/* Etapa 2 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                E2
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Etapa 2: Parametrización de Reglas SQL & Golden Examples</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Día 3</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Configuración de respuestas determinísticas para casos críticos de denuncias Ley Karin o prohibición de represalias (Golden Examples validados por Fiscalía).
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 rounded">
              ✓ Guardrails Snowflake
            </span>
          </div>

          {/* Etapa 3 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                E3
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Etapa 3: Configuración de Identidad y Roles RBAC (SSO/SAML)</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Día 4</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Sincronización con el directorio corporativo (Microsoft Entra ID, Google Workspace, SSO SAML) para asignación automática de permisos según rol (Colaborador vs Fiscalía).
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1 rounded">
              ✓ SAML 2.0 / OAuth2
            </span>
          </div>

          {/* Etapa 4 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                E4
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Etapa 4: Marcha Blanca & Capacitación a Key Users</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Día 5</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Sesión de entrenamiento práctico con el Oficial de Cumplimiento, RRHH y auditores. Validación de registros de auditoría inmutables SHA-256.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-amber-300 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded">
              ✓ Pruebas de Cero Alucinación
            </span>
          </div>

          {/* Etapa 5 */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 rounded-lg bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 font-bold flex items-center justify-center text-xs flex-shrink-0 mt-0.5">
                E5
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <span>Etapa 5: Lanzamiento General & Monitoreo de Auditoría 24/7</span>
                  <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">Producción</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                  Apertura masiva a la totalidad de colaboradores. Monitoreo continuo de consultas, métricas AHT y alertas tempranas normativas.
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded">
              ✓ Producción Activa
            </span>
          </div>
        </div>
      </div>

      {/* Preguntas Frecuentes Comerciales (FAQ) */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-indigo-400" />
          <span>Preguntas Frecuentes Comerciales & Técnicas</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
            <div className="font-bold text-indigo-300">¿Qué sucede cuando actualizamos nuestro RIOHS o Políticas?</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              La re-ingesta se realiza de forma inmediata desde el módulo "Base de Conocimiento". Los documentos antiguos quedan archivados con control de versión.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
            <div className="font-bold text-indigo-300">¿Requiere instalar software en las computadoras de la empresa?</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              No. Es una aplicación 100% web responsive que funciona en navegadores de PC, notebooks, tablets y teléfonos móviles con inicio de sesión único (SSO).
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
            <div className="font-bold text-indigo-300">¿Cómo nos protege frente a revisiones de la Dirección del Trabajo (DT)?</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Cada consulta realizada por los colaboradores queda registrada con un hash criptográfico SHA-256 encadenado inmutable, respaldando que la empresa entregó información normativa oportuna y oficial.
            </p>
          </div>

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 space-y-1">
            <div className="font-bold text-indigo-300">¿Se pueden agregar más colaboradores a mitad de contrato?</div>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              Sí. La suscripción escala dinámicamente y se prorratean los nuevos colaboradores agregados en el ciclo de facturación.
            </p>
          </div>
        </div>
      </div>

      {/* Modal / Formulario Interactivo para Ficha de Contratación */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl border border-indigo-500/40 bg-slate-900 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <FileText className="h-5 w-5 text-indigo-400" />
                <span>Ficha de Contratación & Solicitud de PoC (48h)</span>
              </div>
              <button 
                id="close-proposal-modal-btn"
                onClick={() => setShowProposalModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {isSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="h-12 w-12 text-emerald-400 mx-auto" />
                <h4 className="text-base font-bold text-white">¡Ficha de Contratación Generada con Éxito!</h4>
                <p className="text-xs text-slate-300 max-w-sm mx-auto">
                  Un Oficial de Cumplimiento Técnico de nuestro equipo se pondrá en contacto con {contactName} ({contactEmail}) en menos de 2 horas hábiles para iniciar la prueba piloto con tus reglamentos.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSendProposalRequest} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-semibold mb-1">Nombre de la Empresa u Organización</label>
                  <input
                    id="proposal-company-input"
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Nombre del Contacto</label>
                    <input
                      id="proposal-contact-name-input"
                      type="text"
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-400 font-semibold mb-1">Correo Corporativo</label>
                    <input
                      id="proposal-contact-email-input"
                      type="email"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="rounded-xl border border-slate-800 bg-slate-950 p-3 space-y-1">
                  <div className="flex justify-between text-[11px] font-bold text-white">
                    <span>Plan Seleccionado:</span>
                    <span className="text-indigo-400 capitalize">{selectedPlan}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>Dotación Configurada:</span>
                    <span className="font-mono text-white">{collabCount} Colaboradores</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-emerald-400 font-bold border-t border-slate-800 pt-1 mt-1">
                    <span>Valor Estimado Mensual:</span>
                    <span className="font-mono">${monthlyTotalUSD} USD / mes</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    id="submit-proposal-btn"
                    type="submit"
                    className="w-full py-2.5 bg-indigo-600 font-bold text-white rounded-xl hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/30"
                  >
                    Confirmar & Solicitar Demostración PoC en 48 Horas
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
