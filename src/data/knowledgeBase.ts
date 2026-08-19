import { KnowledgeDocument, GoldenExample, SubagentConfig, ComplianceNotification, AuditLogEntry } from '../types';

export const SUBAGENTS: SubagentConfig[] = [
  {
    id: 'orquestador',
    name: 'Agente Administrador (Orquestador Central)',
    shortName: 'Orquestador Master',
    roleDescription: 'Clasifica intenciones, valida reglas de negocio en Snowflake, enruta hacia subagentes especialistas y aplica verificación de Golden Examples.',
    icon: 'BrainCircuit',
    color: 'border-blue-500 text-blue-400 bg-blue-500/10',
    domains: ['Enrutamiento inteligente', 'Prevención de Alucinaciones', 'Verificación Multicapa'],
    activeRulesCount: 142,
    vectorsCount: 1850,
    goldenExamplesCount: 98,
    accuracyRate: 99.8
  },
  {
    id: 'agente_laboral',
    name: 'Agente Laboral y Normativo',
    shortName: 'Agente Laboral',
    roleDescription: 'Especialista en legislación laboral chilena vigente: Ley Karin, Ley de Conciliación Familiar y Ley de 40 Horas.',
    icon: 'Scale',
    color: 'border-emerald-500 text-emerald-400 bg-emerald-500/10',
    domains: ['Ley Karin (21.643)', 'Ley Conciliación Familiar (21.645)', 'Ley 40 Horas (21.561)'],
    activeRulesCount: 88,
    vectorsCount: 640,
    goldenExamplesCount: 45,
    accuracyRate: 99.9
  },
  {
    id: 'agente_proceso',
    name: 'Agente de Procesos y Políticas Internas',
    shortName: 'Agente Procesos',
    roleDescription: 'Procesos operativos internos, RIOHS (Reglamento Interno), Código de Ética, viáticos, rendición de gastos y compras de activos.',
    icon: 'Workflow',
    color: 'border-purple-500 text-purple-400 bg-purple-500/10',
    domains: ['RIOHS & Código de Ética', 'Rendición de Gastos y Viáticos', 'Adquisiciones y Activos Fijos'],
    activeRulesCount: 110,
    vectorsCount: 720,
    goldenExamplesCount: 38,
    accuracyRate: 99.6
  },
  {
    id: 'agente_legal',
    name: 'Agente Legal, Delitos Económicos y Datos',
    shortName: 'Agente Legal',
    roleDescription: 'Manual de prevención de delitos económicos (Ley 21.595), gestión de regalos, conflicto de interés, derechos ARCO y Política de IA.',
    icon: 'ShieldCheck',
    color: 'border-amber-500 text-amber-400 bg-amber-500/10',
    domains: ['Delitos Económicos & Anticorrupción', 'Protección Datos Personales ARCO', 'Política de IA Corporativa'],
    activeRulesCount: 95,
    vectorsCount: 580,
    goldenExamplesCount: 32,
    accuracyRate: 99.7
  },
  {
    id: 'agente_auditor',
    name: 'Agente Auditor 24/7 y Trazabilidad',
    shortName: 'Agente Auditor',
    roleDescription: 'Auditoría continua en tiempo real, hashing criptográfico de consultas, detección de anomalías y compliance continuo.',
    icon: 'FileCheck2',
    color: 'border-cyan-500 text-cyan-400 bg-cyan-500/10',
    domains: ['Cifrado E2EE', 'Trazabilidad Criptográfica', 'Monitoreo de Sesgos & Riesgos'],
    activeRulesCount: 65,
    vectorsCount: 410,
    goldenExamplesCount: 20,
    accuracyRate: 100.0
  },
  {
    id: 'agente_investigador',
    name: 'Agente Investigador y Verificador de Leyes',
    shortName: 'Agente Investigador',
    roleDescription: 'Agente especializado en buscar, analizar e ingestar nuevas leyes y normativas externas para su verificación previa por Fiscalía antes de incorporarse a Snowflake y ChromaDB.',
    icon: 'Search',
    color: 'border-indigo-500 text-indigo-400 bg-indigo-500/10',
    domains: ['Investigación Normativa Externa', 'ChileAtiende & Dirección del Trabajo', 'Propuestas de Ingestión en Borrador'],
    activeRulesCount: 42,
    vectorsCount: 310,
    goldenExamplesCount: 15,
    accuracyRate: 99.5
  }
];

export const INITIAL_KNOWLEDGE_DOCS: KnowledgeDocument[] = [
  {
    id: 'doc-ley-karin',
    title: 'Ley N° 21.643 (Ley Karin) - Prevención y Sanción del Acoso y Violencia',
    category: 'laboral',
    sourceLawOrPolicy: 'Diario Oficial de Chile - Ley N° 21.643 / RIOHS',
    content: `La Ley Karin (Ley 21.643) modifica el Código del Trabajo en materia de prevención, investigación y sanción del acoso laboral, sexual y violencia en el trabajo.
Obligaciones Clave y Procedimiento de Denuncia:
1. Procedimiento de denuncia e investigación obligatoria de acoso y violencia laboral o sexual.
2. Protocolo de prevención en el RIOHS con matriz de riesgos psicosociales.
3. Medidas de resguardo inmediatas para la persona denunciante (ej. separación de espacios físicos, cambio de turnos o adecuación de jornada).
4. Informar a la Inspección del Trabajo y la SUSESO en un plazo máximo no mayor a 3 días hábiles desde la recepción formal de la denuncia.
5. Incompatibilidad absoluta de represalias contra colaboradores que ejerzan su derecho a denuncia.
6. Es obligatorio adjuntar comprobantes, evidencias y respaldos escritos en el Portal de Cumplimiento.`,
    lastUpdated: '2026-01-15',
    version: '2.1',
    chunksCount: 12,
    subagentAssigned: 'agente_laboral',
    confidentiality: 'pública',
    status: 'activo'
  },
  {
    id: 'doc-denuncia-inspeccion',
    title: 'Procedimiento de Denuncia ante la Inspección del Trabajo y Canal de Cumplimiento (Ley N° 21.643)',
    category: 'laboral',
    sourceLawOrPolicy: 'Código del Trabajo Art. 211-A al 211-E / Ley Karin N° 21.643',
    content: `Procedimiento Oficial de Cumplimiento Normativo para la tramitación de denuncias ante la Inspección del Trabajo o el Canal de Cumplimiento Interno:
1. Vías de Ingreso: El colaborador afectado o denunciante puede presentar la denuncia internamente en el Portal de Cumplimiento o directamente ante la Inspección del Trabajo.
2. Exigencia de Comprobantes: Es OBLIGATORIO adjuntar comprobantes, antecedentes de respaldo, correos, testimonios o evidencias documentales para iniciar la carpeta de investigación.
3. Plazo de Registro Obligatorio: La empresa o el denunciante debe registrar el evento en el Portal de Cumplimiento Corporativo en un plazo máximo de 3 días hábiles.
4. Notificación a Autoridades: Al recibirse la denuncia interna, la empresa tiene el deber legal estricto de remitir los antecedentes a la Inspección del Trabajo dentro de un plazo máximo de 3 días hábiles.
5. Medidas Cautelares Inmediatas: La empresa adoptará medidas de resguardo inmediatas y garantiza la protección total contra represalias.`,
    lastUpdated: '2026-02-10',
    version: '1.0',
    chunksCount: 9,
    subagentAssigned: 'agente_laboral',
    confidentiality: 'pública',
    status: 'activo'
  },
  {
    id: 'doc-conciliacion-familiar',
    title: 'Ley N° 21.645 - Conciliación de la Vida Personal, Familiar y Laboral',
    category: 'laboral',
    sourceLawOrPolicy: 'Ley N° 21.645 de Conciliación Familiar',
    content: `Establece el derecho al trabajo a distancia o teletrabajo (total o parcial) para trabajadores que tengan a su cuidado niños menores de 12 años o personas con discapacidad/dependencia severa.
Lineamientos:
1. Ferias legales preferentes durante periodos de vacaciones escolares.
2. Modificación de turnos o distribución de jornada ordinaria por causas familiares debidamente acreditadas.
3. El empleador solo podrá negar el teletrabajo demostrando incompatibilidad técnica con la naturaleza del cargo.`,
    lastUpdated: '2025-11-20',
    version: '1.4',
    chunksCount: 8,
    subagentAssigned: 'agente_laboral',
    confidentiality: 'pública',
    status: 'activo'
  },
  {
    id: 'doc-ley-40-horas',
    title: 'Ley N° 21.561 - Reducción Gradual de la Jornada Laboral a 40 Horas',
    category: 'laboral',
    sourceLawOrPolicy: 'Ley N° 21.561 de 40 Horas',
    content: `Regula la reducción progresiva de la jornada ordinaria de trabajo de 45 a 40 horas semanales.
Etapas y Reglas:
1. Distribución de jornada en semanas de 4 a 5 días (Jornada 4x3 opcional).
2. Bandas horarias de ingreso y salida para madres/padres de niños menores de 12 años (margen de 2 horas).
3. Compensación de horas extraordinarias por días adicionales de feriado anual (hasta 5 días hábiles por año).`,
    lastUpdated: '2025-08-10',
    version: '1.8',
    chunksCount: 10,
    subagentAssigned: 'agente_laboral',
    confidentiality: 'pública',
    status: 'activo'
  },
  {
    id: 'doc-delitos-economicos',
    title: 'Manual de Prevención de Delitos Económicos (Ley N° 21.595) & Regalos',
    category: 'legal',
    sourceLawOrPolicy: 'Ley N° 21.595 / Manual Interno de Cumplimiento',
    content: `Regula la responsabilidad penal de las personas jurídicas frente a delitos económicos, lavado de activos y cohecho.
Política Estricta de Regalos y Hospitalidad:
1. Prohibida la entrega o recepción de cualquier regalo o beneficio a/de funcionarios públicos.
2. Entre privados: Se permiten artículos publicitarios o cortesías comerciales cuyo valor estimado no supere las 2 UF, previa notificación formal al Oficial de Cumplimiento.
3. Declaración obligatoria en el Portal de Registro de Regalos e Incompatividades.
4. Cualquier sospecha de conflicto de interés debe reportarse vía el Canal de Denuncias Anónimo.`,
    lastUpdated: '2026-02-01',
    version: '3.0',
    chunksCount: 16,
    subagentAssigned: 'agente_legal',
    confidentiality: 'interna',
    status: 'activo'
  },
  {
    id: 'doc-datos-arco-ia',
    title: 'Política de Protección de Datos Personales (Derechos ARCO) & Uso de IA',
    category: 'legal',
    sourceLawOrPolicy: 'Ley N° 19.628 / Política Interna de IA Generativa',
    content: `Establece los principios para el tratamiento ético y seguro de datos personales y el uso corporativo de Inteligencia Artificial.
Derechos ARCO:
- Acceso: El titular puede solicitar el reporte de sus datos en custodios de la empresa.
- Rectificación, Cancelación y Oposición: Plazo máximo de respuesta de 10 días hábiles.
Política de IA Corporativa:
- Queda strictly prohibido ingresar código fuente propietario o datos personales de clientes a modelos públicos externos de IA no auditados.
- Toda consulta de gobernanza debe canalizarse exclusivamente a través del Orquestador de IA Corporativa RAG.`,
    lastUpdated: '2026-03-05',
    version: '2.5',
    chunksCount: 14,
    subagentAssigned: 'agente_legal',
    confidentiality: 'confidencial',
    status: 'activo'
  },
  {
    id: 'doc-ciberseguridad-datos',
    title: 'Ley N° 21.459 y Política de Ciberseguridad y Protección de Datos Corporativos (SGSI)',
    category: 'ciberseguridad',
    sourceLawOrPolicy: 'Ley N° 21.459 sobre Delitos Informáticos & ISO/IEC 27001 SGSI',
    content: `Establece las exigencias y controles de ciberseguridad, gestión de incidentes y protección de datos corporativos:
1. Notificación Obligatoria de Incidentes: Todo evento de ciberseguridad o brecha de datos debe notificarse al CSIRT corporativo en un plazo máximo de 2 horas.
2. Autenticación MFA & Cifrado E2EE: Es obligatorio el uso de factor de doble autenticación y cifrado de datos en reposo y tránsito.
3. Clasificación de Datos: La información confidencial o sensible no puede almacenarse en repositorios personales no autorizados.
4. Auditoría de Accesos: Todos los accesos a datos sensibles quedan registrados criptográficamente con trazabilidad SHA-256.`,
    lastUpdated: '2026-03-10',
    version: '3.1',
    chunksCount: 15,
    subagentAssigned: 'agente_legal',
    confidentiality: 'confidencial',
    status: 'activo'
  },
  {
    id: 'doc-procedimientos-gastos',
    title: 'Procedimiento de Rendición de Gastos, Viajes y Fondos por Rendir',
    category: 'procesos',
    sourceLawOrPolicy: 'Manual de Procedimientos Financieros PR-FIN-008',
    content: `Define las normas obligatorias para la aprobación, rendición de viáticos y compra de activos fijos.
Normas de Rendición:
1. Plazo límite: Todas las rendiciones deben ingresarse dentro de los 5 días hábiles posteriores al término de la comisión de servicio o viaje.
2. Documentación exigida: Boleta o factura electrónica a nombre de la empresa con desglose detallado (no se aceptan vales informales).
3. Fondo por rendir: Requiere autorización previa del Gerente de Área para montos superiores a 10 UF.
4. Los gastos de alcohol o entretenimiento personal no son reembolsables bajo ninguna circunstancia.`,
    lastUpdated: '2026-01-30',
    version: '1.9',
    chunksCount: 11,
    subagentAssigned: 'agente_proceso',
    confidentiality: 'interna',
    status: 'activo'
  }
];

export const INITIAL_GOLDEN_EXAMPLES: GoldenExample[] = [
  {
    id: 'ge-1',
    query: '¿Puedo recibir un regalo de un proveedor de software por la renovación del contrato?',
    subagentId: 'agente_legal',
    verifiedAnswer: 'No si el regalo supera las 2 UF o condiciona la decisión de compra. En caso de ser un artículo corporativo promocional de valor inferior a 2 UF, debe registrarse formalmente en el Portal de Cumplimiento. Si es un funcionario público o licitación abierta, el rechazo es categórico e inmediato.',
    legalCitation: 'Manual de Prevención de Delitos Económicos Art. 12 & Ley 21.595',
    lastVerifiedBy: 'Oficial de Cumplimiento (Carolina Morales)'
  },
  {
    id: 'ge-2',
    query: '¿Cómo hago una denuncia ante la inspección del trabajo?',
    subagentId: 'agente_laboral',
    verifiedAnswer: 'Para realizar una denuncia ante la Inspección del Trabajo o en el Portal de Cumplimiento interno se aplica el procedimiento de la Ley N° 21.643 (Ley Karin) - Prevención y Sanción del Acoso y Violencia. Es obligatorio adjuntar comprobantes/evidencias de respaldo y registrar el evento en el portal de cumplimiento en un plazo máximo de 3 días hábiles.',
    legalCitation: 'Ley N° 21.643 (Ley Karin) Art. 211-A al 211-E y Protocolo Interno de Cumplimiento',
    lastVerifiedBy: 'Fiscalía Laboral & Oficial de Cumplimiento'
  },
  {
    id: 'ge-3',
    query: '¿Cuáles son los pasos inmediatos tras recibir una denuncia bajo Ley Karin?',
    subagentId: 'agente_laboral',
    verifiedAnswer: '1) Otorgar número de folio confidencial en menos de 24 hrs. 2) Dictar medidas de resguardo provisionales para la víctima inmediatamente. 3) Notificar a la Inspección del Trabajo / SUSESO en un plazo máximo de 3 días hábiles. 4) Derivar al Comité Evaluador Interno o Dirección del Trabajo.',
    legalCitation: 'Ley N° 21.643 Art. 211-A y Protocolo Interno Ley Karin',
    lastVerifiedBy: 'Fiscalía Laboral'
  },
  {
    id: 'ge-4',
    query: '¿Puedo solicitar teletrabajo alegando cuidado de mi hijo de 8 años?',
    subagentId: 'agente_laboral',
    verifiedAnswer: 'Sí. Bajo la Ley N° 21.645 de Conciliación Familiar, los colaboradores con hijos menores de 12 años tienen derecho a solicitar modalidad de trabajo a distancia o híbrido, salvo que la naturaleza indispensable de sus funciones exija presencialidad física acreditada por el empleador.',
    legalCitation: 'Ley N° 21.645 Art. 152 quáter O',
    lastVerifiedBy: 'Dirección de Personas'
  }
];

export const INITIAL_NOTIFICATIONS: ComplianceNotification[] = [
  {
    id: 'notif-1',
    title: 'Actualización Crítica de Ley Karin',
    message: 'Se actualizaron las directrices de resguardo psicosocial en el módulo de Ley Karin. Revisa el protocolo modificado.',
    timestamp: 'Hace 10 min',
    severity: 'critical',
    category: 'Ley Karin',
    read: false,
    actionRequired: true
  },
  {
    id: 'notif-2',
    title: 'Alerta de Auditoría Criptográfica 24/7',
    message: 'Se verificaron 1,420 consultas RAG en Snowflake. 100% de coincidencia con Golden Examples. Cero alucinaciones registradas.',
    timestamp: 'Hace 45 min',
    severity: 'info',
    category: 'Seguridad',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Aviso sobre Rendición de Gastos Q3',
    message: 'Recuerda que todas las rendiciones de viajes deben ajustarse a la actualización del Manual PR-FIN-008.',
    timestamp: 'Hace 2 horas',
    severity: 'warning',
    category: 'RIOHS',
    read: true
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'log-9001',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    userId: 'usr-882',
    userName: 'Gonzalo Tapia (Gerente Operaciones)',
    userRole: 'compliance_officer',
    subagentId: 'agente_laboral',
    querySummary: 'Consulta sobre bandas horarias de ingreso por Ley 40 Horas',
    riskAssessment: 'bajo',
    encryptedHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    previousHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    ipAddress: '192.168.1.104',
    action: 'QUERY_RAG'
  },
  {
    id: 'log-9002',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    userId: 'usr-104',
    userName: 'Beatriz Saavedra (Legal)',
    userRole: 'admin',
    subagentId: 'agente_legal',
    querySummary: 'Verificación de obsequios a contrapartes estatales Ley 21.595',
    riskAssessment: 'crítico',
    encryptedHash: '8f434346648f6b96df89dda901c5176b10a6d83961dd3c1ac88b59b2dc327aa4',
    previousHash: 'a591a6d40bf420404a011733cfb7b190d62c65bf0bcda32b57b277d9ad9f146e',
    ipAddress: '192.168.1.88',
    action: 'QUERY_RAG'
  }
];

export const SIX_PHASES_DATA = [
  {
    number: '01',
    title: 'Gobernanza, Validador y Golden Dataset',
    question: '¿Quién valida la verdad terreno y cómo se certifica el benchmark?',
    details: 'Definición del rol institucional formal "Oficial de Cumplimiento / Lead Legal & Compliance" con firma y certificación de verdad terreno vinculada a documento oficial, versión, fecha y cláusula específica (sin memoria humana). Construcción de Benchmark con Golden Dataset de 300 casos normativos auditados con intervalo de confianza 95% ± 2.1% en 6 frentes normativos.',
    status: 'Completado',
    leadRole: 'Oficial de Cumplimiento / Lead Legal & Compliance',
    benchmarkCases: 300,
    confidenceInterval: '95% ± 2.1%',
    evidenceScore: 'Puntuación de Evidencia en 6 Frentes Normativos'
  },
  {
    number: '02',
    title: 'Estrategia de IA & Rigor Experto',
    question: '¿Qué tipo de valor persigue el proyecto y qué tolerancia al error tiene?',
    details: 'Enfocado en Eficacia y Rigor Experto (Baja/Nula tolerancia al error). En cumplimiento legal y gobernanza corporativa, la estrategia NUNCA es de productividad genérica; se prioriza la precisión de la cita legal verificable y cero alucinaciones.',
    status: 'Completado',
    strategyType: 'Eficacia / Experto',
    errorTolerance: 'Cero Alucinaciones / Rigor Criptográfico'
  },
  {
    number: '03',
    title: 'Matriz de Exclusiones y Alcance Delimitado',
    question: '¿Qué NO hace el sistema bajo ninguna circunstancia?',
    details: 'Delimitación estricta de alcance: 1) No emite dictamen legal vinculante. 2) No interactúa directamente con fiscalizadores externos (DT, SUSESO, CMF). 3) No resuelve directamente denuncias de Ley Karin (solo canaliza y orienta). 4) No aprueba automáticamente pagos ni rendiciones de fondos/viáticos.',
    status: 'En Proceso',
    exclusionsCount: 4,
    focus: 'Asistencia y Orientación Normativa Auditada'
  },
  {
    number: '04',
    title: 'Diseño RAG con Paradoja del 95% & Safe-Fail',
    question: '¿Cómo se garantiza 0% alucinaciones ante vacíos documentales?',
    details: 'Operación bajo el umbral de decisión estricto: el 95% de consultas se resuelven con cita jurídica exacta de alta similitud; el 5% restante NO es error ni alucinación, sino "Abstención Forzada y Derivación a Experto Humano" (Safe-Fail) con cita a documento legal ausente o ambiguo.',
    status: 'Planificado',
    safeFailRate: '5% Derivación / 95% Resolución Directa',
    hallucinationRate: '0.0% Alucinaciones'
  },
  {
    number: '05',
    title: 'Selección de Solución & Arquitectura Híbrida',
    question: '¿Construir, adaptar o comprar? ¿Qué modelo financiero sustenta la solución?',
    details: 'Construcción propietaria con orquestación híbrida (Snowflake SQL determinístico + ChromaDB RAG vectorial + Gemini Flash). Inversión Total Capex/Opex de $62.675.000 CLP [Estimada] frente a un costo actual del proceso sin IA de $52.000.000 CLP [Medida], con Payback de 14 meses [Estimada] y 40% de HH liberadas [Medida].',
    status: 'Planificado',
    capexOpex: '$62.675.000 CLP [Estimada]',
    currentCost: '$52.000.000 CLP [Medida]',
    payback: '14 meses [Estimada]'
  },
  {
    number: '06',
    title: 'Despliegue, Stage-Gates & Gobernanza Continua',
    question: '¿Cómo entra en operación y cómo se monitorea quincenalmente?',
    details: 'Visualización de Stage-Gates con cadencias quincenales de gobernanza, auditoría continua 24/7 y exigencia de triple cita obligatoria (Documento Oficial + Versión + Cláusula/Párrafo o Artículo Específico). Registro inmutable con SHA-256 ante fiscalizaciones.',
    status: 'Futuro',
    stageGatesCadence: 'Cadencia Quincenal (Bi-weekly)',
    citationRequirement: 'Triple Cita Obligatoria (Doc + Versión + Cláusula)'
  }
];

export const EVALUATION_BENCHMARK_FRONTS = [
  {
    id: 'frente-1',
    name: 'Ley Karin (Ley N° 21.643)',
    domain: 'Acoso laboral, sexual, violencia y protocolos de resguardo',
    casesCount: 65,
    evidenceScore: 99.4,
    groundTruthSource: 'Diario Oficial N° 21.643 / Dictámenes DT N° 362/09 / RIOHS Cláusula 42',
    certifier: 'Oficial de Cumplimiento / Lead Legal & Compliance',
    status: 'Auditado'
  },
  {
    id: 'frente-2',
    name: 'Reducción Jornada 40 Horas (Ley N° 21.561)',
    domain: 'Bandas horarias, jornada 4x3 y compensación de horas extras',
    casesCount: 50,
    evidenceScore: 99.1,
    groundTruthSource: 'Ley N° 21.561 / Dictamen ORD DT N° 2356 / Anexo Contrato v2.1',
    certifier: 'Oficial de Cumplimiento / Lead Legal & Compliance',
    status: 'Auditado'
  },
  {
    id: 'frente-3',
    name: 'Conciliación Familiar (Ley N° 21.645)',
    domain: 'Teletrabajo cuidadores menores 12 años y feriados preferentes',
    casesCount: 45,
    evidenceScore: 98.8,
    groundTruthSource: 'Ley N° 21.645 Art. 152 quáter O / Protocolo HR Conciliación v1.4',
    certifier: 'Oficial de Cumplimiento / Lead Legal & Compliance',
    status: 'Auditado'
  },
  {
    id: 'frente-4',
    name: 'Delitos Económicos & Anticorrupción (Ley N° 21.595)',
    domain: 'Responsabilidad penal PJ, política de regalos < 2 UF y conflictos de interés',
    casesCount: 55,
    evidenceScore: 99.6,
    groundTruthSource: 'Ley N° 21.595 / Manual de Prevención de Delitos v3.0 Cláusula 12',
    certifier: 'Oficial de Cumplimiento / Lead Legal & Compliance',
    status: 'Auditado'
  },
  {
    id: 'frente-5',
    name: 'Ciberseguridad, SGSI & Datos Personales (Ley N° 21.459 / 19.628)',
    domain: 'Notificación incidentes 2h, derechos ARCO y salvaguardas de IA',
    casesCount: 45,
    evidenceScore: 99.2,
    groundTruthSource: 'Ley N° 21.459 / ISO 27001 SGSI / Política IA Corporativa v2.5',
    certifier: 'Oficial de Cumplimiento / Lead Legal & Compliance',
    status: 'Auditado'
  },
  {
    id: 'frente-6',
    name: 'RIOHS, Ética & Procedimientos Financieros (PR-FIN-008)',
    domain: 'Rendición de fondos, viáticos 5 días hábiles y adquisiciones',
    casesCount: 40,
    evidenceScore: 98.9,
    groundTruthSource: 'Manual de Procedimientos Financieros PR-FIN-008 / RIOHS v2.1',
    certifier: 'Oficial de Cumplimiento / Lead Legal & Compliance',
    status: 'Auditado'
  }
];

export const EXCLUSIONS_MATRIX = [
  {
    id: 'ex-1',
    title: 'No emite dictamen legal vinculante',
    description: 'El sistema provee orientación informativa y procedimental basada en documentos vigentes; no sustituye el patrocinio de un abogado ni el dictamen formal vinculante emitido por Fiscalía o la Gerencia Legal.',
    category: 'Legal',
    riskLevel: 'Crítico',
    safeguard: 'Disclaimer obligatorio en cada respuesta y registro de advertencia'
  },
  {
    id: 'ex-2',
    title: 'No interactúa directamente con fiscalizadores externos',
    description: 'No efectúa envíos, notificaciones ni declaraciones automáticas a la Dirección del Trabajo (DT), SUSESO, CMF o SII sin la visación previa y firma humana del Oficial de Cumplimiento.',
    category: 'Relaciones Regulatorias',
    riskLevel: 'Alto',
    safeguard: 'Bloqueo de webhooks hacia endpoints de organismos públicos'
  },
  {
    id: 'ex-3',
    title: 'No resuelve directamente denuncias de Ley Karin',
    description: 'El sistema genera folios confidenciales, entrega el instructivo de resguardo y orienta sobre plazos (3 días hábiles); pero la ponderación de pruebas, calificación de gravedad y sanción es exclusiva del Comité Evaluador Humano.',
    category: 'Laboral / Ley Karin',
    riskLevel: 'Crítico',
    safeguard: 'Derivación inmediata a expediente reservado de Fiscalía Laboral'
  },
  {
    id: 'ex-4',
    title: 'No aprueba automáticamente pagos ni rendiciones de fondos/viáticos',
    description: 'Calcula montos, valida topes y detecta faltas de comprobantes según el Manual PR-FIN-008, pero la autorización de desembolso requiere la firma y aprobación humana del Gerente/Aprobador correspondiente.',
    category: 'Financiero / Procesos',
    riskLevel: 'Medio',
    safeguard: 'El estado permanece como \'Revisado por IA - Pendiente Firma Gerencial\''
  }
];

export const STAGE_GATES_DATA = [
  {
    gate: 'Stage-Gate 1',
    phase: 'Semana 1 - 2',
    title: 'Certificación del Golden Dataset (300 Casos)',
    requirement: 'Revisión y firma electrónica del Oficial de Cumplimiento con validación del intervalo 95% ± 2.1%.',
    cadence: 'Quincenal (Bi-weekly)',
    status: 'Aprobado',
    deliverable: 'Acta de Aprobación de Verdad Terreno & Matriz de 6 Frentes'
  },
  {
    gate: 'Stage-Gate 2',
    phase: 'Semana 3 - 4',
    title: 'Parametrización de Exclusiones & Reglas Determinísticas Snowflake',
    requirement: 'Verificación del bloqueo de 4 exclusiones críticas y respuesta cero alucinaciones.',
    cadence: 'Quincenal (Bi-weekly)',
    status: 'En Curso',
    deliverable: 'Suite de Pruebas Automatizadas de Exclusiones (100% Pass)'
  },
  {
    gate: 'Stage-Gate 3',
    phase: 'Semana 5 - 6',
    title: 'Auditoría de Safe-Fail (Paradoja del 95%) & Derivación Humana',
    requirement: 'Comprobación de que el 5% de casos ambiguos se abstiene y deriva con cita a documento ausente.',
    cadence: 'Quincenal (Bi-weekly)',
    status: 'Planificado',
    deliverable: 'Informe de Resiliencia y Test de Alucinación Cero (0.0% Hallucination)'
  },
  {
    gate: 'Stage-Gate 4',
    phase: 'Semana 7 - 8',
    title: 'Puesta en Marcha & Triple Cita Obligatoria (Doc + Versión + Cláusula)',
    requirement: 'Integración SSO/RBAC, encadenamiento SHA-256 activo y visualización de trazabilidad E2EE.',
    cadence: 'Quincenal (Bi-weekly)',
    status: 'Planificado',
    deliverable: 'Certificado de Conformidad Regulatoria para Dirección del Trabajo / Directorio'
  }
];

export const FINANCIAL_IMPACT_METRICS = {
  currentProcessCostCLP: 52000000,
  currentCostTag: '[Medida]',
  totalInvestmentCLP: 62675000,
  investmentTag: '[Estimada]',
  capexCLP: 38500000,
  capexTag: '[Estimada]',
  opexAnnualCLP: 24175000,
  opexTag: '[Estimada]',
  paybackMonths: 14,
  paybackTag: '[Estimada]',
  hhReductionPercent: 40,
  hhReductionTag: '[Medida]',
  annualHHSavedHours: 1850,
  annualHHSavedTag: '[Medida]',
  traditionalAHTMins: 45,
  traditionalAHTTag: '[Medida]',
  ragAHTMins: 2,
  ragAHTTag: '[Medida]',
  assumedHourlyRateCLP: 28000,
  assumedHourlyRateTag: '[Supuesta]',
  annualSavingsCLP: 51800000,
  annualSavingsTag: '[Estimada]'
};

export const PARADOX_95_DATA = {
  directResolutionRate: '95%',
  abstentionRate: '5%',
  hallucinationRate: '0.0%',
  mechanism: 'Safe-Fail Determinístico',
  explanation: 'El sistema opera con un umbral de confianza estricto. Cuando una consulta no tiene respaldo textual suficiente en la base documental vigente, el 5% restante NO genera alucinaciones ni conjeturas, sino que fuerza la abstención inmediata, cita la ausencia del documento específico y deriva el ticket al Oficial de Cumplimiento / Lead Legal & Compliance.',
  rule: 'Triple Cita Obligatoria: Documento Oficial + Versión + Cláusula/Párrafo'
};

export const INITIAL_CATEGORIES: string[] = [
  'laboral',
  'procesos',
  'legal',
  'ciberseguridad',
  'etica',
  'tecnica'
];

export const AI_STRATEGY_MATRIX = [
  { strategy: 'Eficiencia', mainMetric: 'Costo por unidad, horas liberadas (HH/2)', errorTolerance: 'Media', selected: false },
  { strategy: 'Eficacia', mainMetric: 'Tasa de acierto, retrabajo, cero alucinaciones', errorTolerance: 'Muy baja', selected: true },
  { strategy: 'Productividad', mainMetric: 'Volumen por persona', errorTolerance: 'Alta', selected: false, warning: 'Un proceso de cumplimiento normativo NUNCA es estrategia de productividad' },
  { strategy: 'Experto', mainMetric: 'Calidad de decisión y rigor legal', errorTolerance: 'Baja', selected: true },
  { strategy: 'Crecimiento', mainMetric: 'Ingresos, conversión', errorTolerance: 'Media', selected: false }
];


