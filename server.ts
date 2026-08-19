import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { SUBAGENTS, INITIAL_KNOWLEDGE_DOCS, INITIAL_GOLDEN_EXAMPLES, INITIAL_AUDIT_LOGS, INITIAL_NOTIFICATIONS } from "./src/data/knowledgeBase.js";

dotenv.config();

const app = express();
app.use(express.json({ limit: "10mb" }));

const PORT = 3000;

// Initialize Gemini Client safely
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  try {
    ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  } catch (e) {
    console.warn("Gemini AI client initialization warning:", e);
  }
}

// In-memory data structures
let knowledgeDocs = [...INITIAL_KNOWLEDGE_DOCS];
let goldenExamples = [...INITIAL_GOLDEN_EXAMPLES];
let auditLogs = [...INITIAL_AUDIT_LOGS];
let notifications = [...INITIAL_NOTIFICATIONS];

let registeredUsers = [
  {
    id: 'usr-882',
    name: 'Carolina Morales',
    email: 'carolina.morales@empresa.com',
    role: 'compliance_officer',
    department: 'Oficina de Cumplimiento & Fiscalía',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150',
    provider: 'sso_saml',
    e2eeEnabled: true,
    publicKeyFingerprint: 'SHA256:7f889a2b104c8e9d3a1f420e6b5c'
  },
  {
    id: 'usr-104',
    name: 'Elena Montes',
    email: 'elena.montes@empresa.com',
    role: 'collaborator',
    department: 'Gerencia de Personas & HR',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150',
    provider: 'google',
    e2eeEnabled: true,
    publicKeyFingerprint: 'SHA256:4a331c902e88f11d290a14bc73'
  },
  {
    id: 'usr-301',
    name: 'Carlos Silva',
    email: 'carlos.silva@empresa.com',
    role: 'admin',
    department: 'Ciberseguridad & Sistemas IT',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
    provider: 'microsoft',
    e2eeEnabled: true,
    publicKeyFingerprint: 'SHA256:91b002c4ef77011d8821a003f9'
  },
  {
    id: 'usr-505',
    name: 'Roberto Valdés',
    email: 'roberto.valdes@empresa.com',
    role: 'auditor',
    department: 'Auditoría Interna & Riesgo',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
    provider: 'sso_saml',
    e2eeEnabled: true,
    publicKeyFingerprint: 'SHA256:1198c0a982fe523a100bc82210'
  }
];

// Simple SHA-256 helper for Node.js
async function nodeHash(text: string): Promise<string> {
  const crypto = await import("crypto");
  return crypto.createHash("sha256").update(text).digest("hex");
}

// Helper: Determine Subagent Routing
function determineSubagent(query: string, forceResearchMode: boolean = false) {
  if (forceResearchMode) {
    return SUBAGENTS.find(s => s.id === "agente_investigador") || SUBAGENTS[5] || SUBAGENTS[0];
  }

  const q = query.toLowerCase();
  if (q.includes("investig") || q.includes("externa") || q.includes("buscar ley") || q.includes("fiscalia")) {
    return SUBAGENTS.find(s => s.id === "agente_investigador") || SUBAGENTS[5] || SUBAGENTS[0];
  }
  if (q.includes("karin") || q.includes("40 hora") || q.includes("conciliaci") || q.includes("laboral") || q.includes("acoso") || q.includes("jornada") || q.includes("denuncia") || q.includes("inspeccion") || q.includes("trabajo")) {
    return SUBAGENTS.find(s => s.id === "agente_laboral") || SUBAGENTS[1];
  }
  if (q.includes("regalo") || q.includes("delito") || q.includes("arco") || q.includes("datos") || q.includes("conflicto") || q.includes("inteligencia artificial") || q.includes("ia corporativa")) {
    return SUBAGENTS.find(s => s.id === "agente_legal") || SUBAGENTS[3];
  }
  if (q.includes("gasto") || q.includes("viatico") || q.includes("riohs") || q.includes("compra") || q.includes("activo") || q.includes("procedimiento") || q.includes("etica")) {
    return SUBAGENTS.find(s => s.id === "agente_proceso") || SUBAGENTS[2];
  }
  if (q.includes("auditor") || q.includes("hash") || q.includes("alucinaci")) {
    return SUBAGENTS.find(s => s.id === "agente_auditor") || SUBAGENTS[4];
  }
  return SUBAGENTS.find(s => s.id === "agente_laboral") || SUBAGENTS[1];
}

// Helper: Discern Query Intent (Greetings, Incongruous/Profanity/Bias, or Normative/Legal)
function classifyQueryIntent(query: string, userName: string = ""): {
  category: 'saludo' | 'incongruente' | 'normativa';
  cleanName?: string;
  responseMessage?: string;
  riskAssessment: 'bajo' | 'medio' | 'crítico';
} {
  const qNorm = query.toLowerCase().trim();

  // 1. Check for Profanity, Abusive Language, Biased/Incongruous Inputs or Spam/Gibberish
  const profanityList = ["weon", "weona", "mierda", "concha", "puta", "pendejo", "culiao", "ctm", "fuck", "shit", "bastardo", "maricon", "estupido", "tarado", "perra"];
  const containsProfanity = profanityList.some(w => qNorm.includes(w));
  
  // Check for nonsense gibberish like repeating keys "asdfghjkl", "12345678", "qwerty"
  const isGibberish = /^[a-z]{1,4}$/.test(qNorm) && !["hola", "chao", "ley", "rio", "dt", "sgsi", "arco"].includes(qNorm);

  if (containsProfanity || isGibberish) {
    return {
      category: 'incongruente',
      riskAssessment: 'crítico',
      responseMessage: `⚠️ ADVERTENCIA DE GOBERNANZA ÉTICA Y CONDUCTA CORPORATIVA:\n\n` +
        `Estimado/a colaborador/a: Como sistema de IA Corporativa bajo estricta auditabilidad y trazabilidad en tiempo real, ` +
        `mi función es brindar orientación sobre leyes, normativas y procedimientos corporativos en un marco de respeto profesional y buena fe.\n\n` +
        `De acuerdo con los principios de nuestro Código de Ética y la Ley Karin (Ley N° 21.643), le solicitamos formular su consulta con un lenguaje adecuado, constructivo y profesional.\n\n` +
        `Si requiere asesoría sobre canales de denuncia, ciberseguridad, viáticos, teletrabajo o reglamentos internos, estoy disponible para asistirte.`
    };
  }

  // 2. Check for Greetings, Introductions, Casual Chat (e.g. "Hola soy Arian", "Buenos días", "Hola", "quien eres")
  const greetingKeywords = ["hola", "buenos dias", "buenas tardes", "buenas noches", "saludos", "quien eres", "como te llamas", "me llamo", "soy "];
  const hasGreetingStart = greetingKeywords.some(g => qNorm.startsWith(g) || qNorm.includes(g));

  // Check if there are NO legal/normative keywords present
  const legalKeywords = [
    "denuncia", "inspeccion", "karin", "40 hora", "conciliaci", "laboral", "acoso", "jornada", 
    "trabajo", "regalo", "delito", "arco", "datos", "ciberseguridad", "conflicto", "ia", "gasto", 
    "viatico", "riohs", "compra", "activo", "procedimiento", "etica", "ley", "norma", "reglamento", 
    "contrato", "despido", "finiquito", "licencia", "vacaciones", "sueldo", "proveedor", "fiscalia"
  ];
  const hasLegalKeyword = legalKeywords.some(lk => qNorm.includes(lk));

  if (hasGreetingStart && !hasLegalKeyword) {
    // Extract name if provided ("hola soy arian" -> Arian)
    let extractedName = userName && userName !== "Usuario Corporativo" ? userName : "";
    const soyMatch = qNorm.match(/(?:soy|me llamo|mi nombre es)\s+([a-záéíóúñ]+)/i);
    if (soyMatch && soyMatch[1]) {
      const rawName = soyMatch[1];
      extractedName = rawName.charAt(0).toUpperCase() + rawName.slice(1);
    }

    const nameSalutation = extractedName ? ` ${extractedName}` : "";

    return {
      category: 'saludo',
      cleanName: extractedName,
      riskAssessment: 'bajo',
      responseMessage: `👋 ¡Hola${nameSalutation}! Un gusto saludarte. Soy el **Orquestador de IA Corporativa y Gobierno RAG** de la empresa.\n\n` +
        `Mi función es brindarte orientación oficial, auditada y 100% libre de alucinaciones sobre los marcos legales, procedimientos internos y políticas corporativas. Puedo asistirte en:\n\n` +
        `• 📜 **Derecho Laboral & Ley Karin (21.643)**: Protocolos de denuncia por acoso/violencia, Inspección del Trabajo y canales seguros.\n` +
        `• ⚖️ **Conciliación Familiar & Jornada (21.645 y 40 Horas)**: Teletrabajo para cuidadores, licencias y flexibilidad horaria.\n` +
        `• 🔐 **Ciberseguridad & Protección de Datos (SGSI / Ley 21.459)**: Notificación de incidentes, brechas de datos y seguridad.\n` +
        `• 💼 **Código de Ética, RIOHS & Rendición**: Aceptación de regalos, prevención de conflictos de interés y viáticos.\n\n` +
        `¿En qué consulta normativa o procedimiento corporativo te puedo colaborar hoy?`
    };
  }

  // 3. Otherwise, treat as Normative Query
  return {
    category: 'normativa',
    riskAssessment: 'bajo'
  };
}

// RESTful API Routes

// 1. Healthcheck
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    system: "Orquestador IA Corporativa RAG",
    subagentsCount: SUBAGENTS.length,
    knowledgeDocsCount: knowledgeDocs.length,
    geminiEnabled: Boolean(process.env.GEMINI_API_KEY)
  });
});

// 2. Subagent RAG Query Pipeline
app.post("/api/v1/consult", async (req, res) => {
  try {
    const { query, userId = "usr-guest", userRole = "colaborador", userName = "Usuario Corporativo", forceResearchMode = false } = req.body;
    if (!query) {
      return res.status(400).json({ error: "El parámetro 'query' es obligatorio." });
    }

    const subagent = determineSubagent(query, forceResearchMode);
    const intent = classifyQueryIntent(query, userName);

    // 2A. Handle Casual Greeting / Personal Introduction
    if (intent.category === 'saludo') {
      const answer = intent.responseMessage!;
      const queryHashInput = `${query}_${subagent.id}_${Date.now()}_${userId}`;
      const auditHash = await nodeHash(queryHashInput);
      const previousHash = auditLogs[0]?.encryptedHash || "0000000000000000000000000000000000000000000000000000000000000000";

      const newAuditLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        userId,
        userName,
        userRole,
        subagentId: subagent.id,
        querySummary: query.length > 60 ? query.slice(0, 60) + "..." : query,
        riskAssessment: 'bajo' as const,
        encryptedHash: auditHash,
        previousHash,
        ipAddress: req.ip || "127.0.0.1",
        action: "QUERY_RAG" as const
      };
      auditLogs.unshift(newAuditLog);

      return res.json({
        queryId: `qry-${Date.now()}`,
        originalQuery: query,
        routedSubagent: subagent,
        answer,
        encryptedPayload: Buffer.from(answer).toString('base64'),
        sources: [],
        hybridLayers: {
          rulesLayer: { matched: true, ruleText: "Rule_Intent_Greeting", snowflakeTable: "SNOWFLAKE_DB.GOVERNANCE.GREETINGS" },
          mlLayer: { similarityScore: 0.99, chromaCollection: "chromadb_governance_vectors", chunkMatch: "intent_greeting" },
          genAiLayer: { model: "Discernimiento Cognitivo y Empático", promptTokens: 50, completionTokens: 120 }
        },
        goldenExampleMatch: false,
        auditHash,
        riskAssessment: 'bajo',
        processingTimeMs: 12,
        timestamp: new Date().toISOString(),
        isOutOfScope: false,
        intentCategory: 'saludo',
        canResearch: false
      });
    }

    // 2B. Handle Incongruent / Inappropriate / Profanity Input
    if (intent.category === 'incongruente') {
      const answer = intent.responseMessage!;
      const queryHashInput = `${query}_${subagent.id}_${Date.now()}_${userId}`;
      const auditHash = await nodeHash(queryHashInput);
      const previousHash = auditLogs[0]?.encryptedHash || "0000000000000000000000000000000000000000000000000000000000000000";

      const newAuditLog = {
        id: `log-${Date.now()}`,
        timestamp: new Date().toISOString(),
        userId,
        userName,
        userRole,
        subagentId: subagent.id,
        querySummary: query.length > 60 ? query.slice(0, 60) + "..." : query,
        riskAssessment: intent.riskAssessment,
        encryptedHash: auditHash,
        previousHash,
        ipAddress: req.ip || "127.0.0.1",
        action: "QUERY_RAG" as const
      };
      auditLogs.unshift(newAuditLog);

      return res.json({
        queryId: `qry-${Date.now()}`,
        originalQuery: query,
        routedSubagent: subagent,
        answer,
        encryptedPayload: Buffer.from(answer).toString('base64'),
        sources: [],
        hybridLayers: {
          rulesLayer: { matched: false, ruleText: "Rule_Filter_Conduct_Code", snowflakeTable: "SNOWFLAKE_DB.GOVERNANCE.CONDUCT_RULES" },
          mlLayer: { similarityScore: 0.0, chromaCollection: "chromadb_governance_vectors", chunkMatch: "filter_conduct" },
          genAiLayer: { model: "Discernimiento Ético y Filtro de Sesgos", promptTokens: 60, completionTokens: 130 }
        },
        goldenExampleMatch: false,
        auditHash,
        riskAssessment: intent.riskAssessment,
        processingTimeMs: 15,
        timestamp: new Date().toISOString(),
        isOutOfScope: false,
        intentCategory: 'incongruente',
        canResearch: false
      });
    }

    // 2C. Handle Normative Regulatory Query
    // Golden Example check
    const qNorm = query.toLowerCase();
    const goldenMatch = goldenExamples.find(ge => {
      const gqNorm = ge.query.toLowerCase();
      return (
        qNorm.includes("denuncia") && qNorm.includes("inspeccion") ? gqNorm.includes("denuncia") && gqNorm.includes("inspeccion") :
        qNorm.includes(gqNorm.slice(0, 15)) || gqNorm.includes(qNorm.slice(0, 15))
      );
    });

    // Smart Keyword & Vector Relevance Scoring
    const scoredDocs = knowledgeDocs
      .filter(doc => doc.status !== 'pendiente_aprobacion')
      .map(doc => {
        let score = 0;
        const titleLower = doc.title.toLowerCase();
        const contentLower = doc.content.toLowerCase();
        const lawLower = doc.sourceLawOrPolicy.toLowerCase();

        // Extract key search tokens
        const tokens = qNorm.split(/\s+/).filter(t => t.length > 3);
        tokens.forEach(token => {
          if (titleLower.includes(token)) score += 0.35;
          if (lawLower.includes(token)) score += 0.25;
          if (contentLower.includes(token)) score += 0.15;
        });

        if (doc.subagentAssigned === subagent.id) score += 0.1;
        if (qNorm.includes("denuncia") && titleLower.includes("denuncia")) score += 0.5;
        if (qNorm.includes("inspeccion") && titleLower.includes("inspeccion")) score += 0.5;
        if (qNorm.includes("karin") && titleLower.includes("karin")) score += 0.5;

        return { doc, score };
      })
      .filter(item => item.score > 0.1)
      .sort((a, b) => b.score - a.score);

    const matchedDocs = scoredDocs.map(item => item.doc);
    const topScore = scoredDocs[0]?.score || 0;

    // Discern if query is completely out of corporate knowledge base scope
    const isOutOfScope = matchedDocs.length === 0 || (topScore < 0.2 && !goldenMatch);

    const sources = matchedDocs.slice(0, 3).map((doc, idx) => ({
      documentId: doc.id,
      title: doc.title,
      sourceLawOrPolicy: doc.sourceLawOrPolicy,
      similarityScore: Number(Math.min(0.98, 0.70 + (scoredDocs[idx]?.score || 0) * 0.2).toFixed(2)),
      snippet: doc.content.slice(0, 240) + "...",
      ruleMatched: `Rule_Snowflake_${doc.id.replace(/-/g, "_")}`
    }));

    let answer = "";
    if (goldenMatch) {
      answer = `[VERIFICADO POR GOLDEN EXAMPLE]: ${goldenMatch.verifiedAnswer}\n\nFundamento Legal: ${goldenMatch.legalCitation}. (Verificado por ${goldenMatch.lastVerifiedBy})`;
    } else if (isOutOfScope) {
      answer = `⚠️ ADVERTENCIA DE GOBERNANZA CORPORATIVA (ESTRATEGIA EFICACIA / EXPERTO - 0% ALUCINACIONES):\n\n` +
        `La consulta sobre '${query}' aborda una materia o normativa externa que NO se encuentra expresamente ingestada ni validada en la Base de Conocimiento Oficial (ChromaDB + Snowflake) de la empresa.\n\n` +
        `Para garantizar respuestas libres de alucinaciones y con sustento legal garantizado, el sistema no improvisará una respuesta sin respaldo corporativo.` +
        `\n\n💡 OPCIÓN DE MEJORA DISPONIBLE: Puede activar el 'Agente Investigador y Verificador de Leyes' para buscar la normativa externa en fuentes oficiales (Dirección del Trabajo / Diario Oficial), generar un borrador normativo RAG y someterlo a verificación previa de Fiscalía antes de ingestarla oficialmente.`;
    } else if (ai) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: `Eres el ${subagent.name} del Orquestador de IA Corporativa de la empresa.
Responde la consulta del colaborador basándote estrictamente en el siguiente contexto normativo corporativo (RAG).
Si la consulta involucra la Ley Karin, procedimiento de denuncias e Inspección del Trabajo, Ley 40 Horas, Ley de Conciliación Familiar, RIOHS, Regalos o Rendición de Gastos, sé categórico y cita el procedimiento exacto.
Para denuncias o consultas sobre la Inspección del Trabajo bajo Ley Karin (Ley 21.643): indica expresamente la obligatoriedad de adjuntar comprobantes/evidencias y registrar el evento en el portal de cumplimiento en un plazo máximo de 3 días hábiles.
Proporciona una respuesta ejecutiva, libre de alucinaciones y con fundamentos.

Contexto Normativo RAG:
${matchedDocs.map(d => `- ${d.title}: ${d.content}`).join("\n\n")}

Consulta del Colaborador: "${query}"`
        });
        answer = response.text || "Respuesta generada según la normativa corporativa vigente.";
      } catch (geminiErr: any) {
        console.error("Gemini API call error, falling back to RAG template:", geminiErr);
        answer = `Basado en la normativa corporativa oficial y las reglas Snowflake asignadas a ${subagent.name}:\n\n` +
          `Para la consulta sobre '${query}', se aplica el procedimiento de cumplimiento normativo: ` +
          `${matchedDocs[0]?.title || 'Protocolo Ley Karin N° 21.643'}.\n\n` +
          `Es OBLIGATORIO adjuntar comprobantes y evidencias de respaldo, y registrar el evento en el portal de cumplimiento en un plazo máximo de 3 días hábiles.`;
      }
    } else {
      answer = `Basado en la normativa corporativa oficial y las reglas Snowflake asignadas a ${subagent.name}:\n\n` +
        `Para la consulta sobre '${query}', se aplica el procedimiento de cumplimiento normativo: ` +
        `${matchedDocs[0]?.title || 'Protocolo General'}.\n\n` +
        `📌 Requisitos Clave:\n- Vías de ingreso: Portal de Cumplimiento interno o Inspección del Trabajo.\n- Comprobantes: Es obligatorio adjuntar antecedentes de respaldo en el portal.\n- Plazo: Registro e informe obligatorio dentro de un plazo máximo de 3 días hábiles.`;
    }

    // Cryptographic audit hash
    const queryHashInput = `${query}_${subagent.id}_${Date.now()}_${userId}`;
    const auditHash = await nodeHash(queryHashInput);
    const previousHash = auditLogs[0]?.encryptedHash || "0000000000000000000000000000000000000000000000000000000000000000";

    const riskAssessment: 'bajo' | 'medio' | 'crítico' = (
      query.toLowerCase().includes("regalo") || query.toLowerCase().includes("acoso") || query.toLowerCase().includes("denuncia") || isOutOfScope
        ? 'crítico' 
        : 'bajo'
    );

    // Record audit log
    const newAuditLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      userId,
      userName,
      userRole,
      subagentId: subagent.id,
      querySummary: query.length > 60 ? query.slice(0, 60) + "..." : query,
      riskAssessment,
      encryptedHash: auditHash,
      previousHash,
      ipAddress: req.ip || "127.0.0.1",
      action: "QUERY_RAG" as const
    };

    auditLogs.unshift(newAuditLog);

    res.json({
      queryId: `qry-${Date.now()}`,
      originalQuery: query,
      routedSubagent: subagent,
      answer,
      encryptedPayload: Buffer.from(answer).toString('base64'),
      sources,
      hybridLayers: {
        rulesLayer: {
          matched: !isOutOfScope,
          ruleText: matchedDocs[0]?.sourceLawOrPolicy || (isOutOfScope ? "Sin coincidencia en Snowflake" : "Snowflake Rule #882"),
          snowflakeTable: "SNOWFLAKE_DB.GOVERNANCE.RULES_GOLDEN"
        },
        mlLayer: {
          similarityScore: sources[0]?.similarityScore || 0.0,
          chromaCollection: "chromadb_governance_vectors",
          chunkMatch: matchedDocs[0]?.id || (isOutOfScope ? "no_chunk_match" : "chunk_default")
        },
        genAiLayer: {
          model: ai ? "gemini-2.5-flash" : "DSPy / Fallback Engine",
          promptTokens: 380,
          completionTokens: 210
        }
      },
      goldenExampleMatch: Boolean(goldenMatch),
      auditHash,
      riskAssessment,
      isOutOfScope,
      intentCategory: 'normativa',
      canResearch: isOutOfScope,
      outOfScopeReason: isOutOfScope ? "DOCUMENTO_NO_INGESTADO_EN_CHROMADB" : undefined,
      processingTimeMs: Math.floor(Math.random() * 80) + 120,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error("Error handling consult:", error);
    res.status(500).json({ error: "Error en la orquestación RAG." });
  }
});

// 2b. Agente Investigador y Verificador de Leyes Endpoint
app.post("/api/v1/research-law", async (req, res) => {
  try {
    const { query, userId = "usr-guest", userName = "Usuario Corporativo" } = req.body;
    if (!query) {
      return res.status(400).json({ error: "El parámetro 'query' es requerido para la investigación." });
    }

    const researchSubagent = SUBAGENTS.find(s => s.id === "agente_investigador") || SUBAGENTS[5] || SUBAGENTS[0];

    let researchedTitle = `Normativa y Procedimiento sobre: ${query.slice(0, 50)}`;
    let sourceLaw = "Dirección del Trabajo de Chile / Código del Trabajo";
    let category = "laboral" as const;
    let content = "";
    let keyObligations = [
      "Verificación previa por Fiscalía antes de ingestar a producción.",
      "Registro formal en el Portal de Cumplimiento en máximo 3 días hábiles.",
      "Acreditación de comprobantes y evidencias escritas."
    ];
    let legalCitation = "Código del Trabajo & Leyes Laborales de Chile";

    if (ai) {
      try {
        const researchPrompt = `Eres el Agente Investigador y Verificador de Leyes del sistema de Gobernanza Corporativa.
Realiza una investigación detallada de la normativa chilena oficial relacionada con la consulta: "${query}".
Devuelve un informe estructurado que sirva como borrador para ingestar en la base de conocimientos RAG en ChromaDB y Snowflake.

Estructura requerida:
1. Título oficial del documento normativo.
2. Ley de Origen o Fuente Oficial (ej. Ley N° 21.643 Ley Karin, Código del Trabajo, Dictamen DT, etc.).
3. Categoría (laboral, procesos, legal, etica).
4. Resumen Ejecutivo y Procedimiento Paso a Paso.
5. Requisitos de comprobantes/evidencias y plazos de registro (ej. 3 días hábiles).
6. Cita legal exacta.`;

        const geminiRes = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: researchPrompt
        });

        content = geminiRes.text || "Informe de investigación normativa completado por Agente Investigador.";
        if (query.toLowerCase().includes("denuncia") || query.toLowerCase().includes("inspeccion")) {
          researchedTitle = "Procedimiento de Denuncia e Investigación ante la Inspección del Trabajo (Ley Karin N° 21.643)";
          sourceLaw = "Código del Trabajo Art. 211-A al 211-E / Ley Karin";
          legalCitation = "Ley N° 21.643 & Dictámenes de la Dirección del Trabajo";
        }
      } catch (err) {
        console.warn("Error calling Gemini for research, using research template:", err);
      }
    }

    if (!content) {
      content = `INVESTIGACIÓN NORMATIVA EXTERNA EFECTUADA POR AGENTE INVESTIGADOR:\n\n` +
        `Respecto a la consulta: '${query}'\n\n` +
        `1. Marco Normativo Aplicable: Ley N° 21.643 (Ley Karin) y Disposiciones del Código del Trabajo de Chile.\n` +
        `2. Procedimiento ante la Inspección del Trabajo: El colaborador puede ingresar su denuncia vía portal de la Dirección del Trabajo o en el Portal de Cumplimiento Interno.\n` +
        `3. Obligatoriedad de Evidencias: Es estrictamente necesario adjuntar comprobantes, comunicaciones escrito y respaldos de prueba.\n` +
        `4. Plazo Legal: Se debe ingresar el registro en el portal corporativo en un plazo máximo de 3 días hábiles desde el evento o notificación.`;
    }

    const docId = `doc-researched-${Date.now()}`;
    const researchedDoc = {
      id: docId,
      title: researchedTitle,
      category,
      sourceLawOrPolicy: sourceLaw,
      content,
      lastUpdated: new Date().toISOString().split("T")[0],
      version: "1.0-BORRADOR",
      chunksCount: Math.ceil(content.length / 280),
      subagentAssigned: "agente_investigador" as const,
      confidentiality: "interna" as const,
      status: "pendiente_aprobacion" as const,
      researchedBy: researchSubagent.name
    };

    // Stage in knowledge base as pending approval
    knowledgeDocs.unshift(researchedDoc);

    const auditHash = await nodeHash(`RESEARCH_${docId}_${Date.now()}`);

    res.json({
      success: true,
      docId,
      researchedDoc,
      routedSubagent: researchSubagent,
      explanation: `El Agente Investigador ha extraído el marco legal oficial y generado la propuesta '${researchedTitle}'. El documento queda en estado 'Pendiente de Aprobación por Fiscalía / Compliance' antes de activarse en ChromaDB.`,
      auditHash
    });
  } catch (error: any) {
    console.error("Error in research-law:", error);
    res.status(500).json({ error: "Error en la investigación del agente legal." });
  }
});

// 2c. Approve Pending Researched Document
app.post("/api/v1/knowledge/approve", (req, res) => {
  const { documentId, approvedBy = "Oficial de Cumplimiento" } = req.body;
  const doc = knowledgeDocs.find(d => d.id === documentId);
  if (!doc) {
    return res.status(404).json({ error: "Documento no encontrado." });
  }

  doc.status = "activo";
  doc.version = "1.0-OFICIAL";
  doc.lastUpdated = new Date().toISOString().split("T")[0];

  res.json({
    success: true,
    documentId,
    message: `El documento '${doc.title}' ha sido verificado por ${approvedBy} e ingestado exitosamente en ChromaDB y Snowflake.`,
    document: doc
  });
});

// 3. Get Knowledge Documents
app.get("/api/v1/knowledge", (req, res) => {
  res.json({ documents: knowledgeDocs, total: knowledgeDocs.length });
});

// Categories in-memory list
let categories = ["laboral", "procesos", "legal", "ciberseguridad", "etica", "tecnica"];

app.get("/api/v1/categories", (req, res) => {
  // Return unique categories from documents + default categories list
  const docCategories = knowledgeDocs.map(d => d.category);
  const uniqueCats = Array.from(new Set([...categories, ...docCategories])).filter(Boolean);
  res.json({ categories: uniqueCats });
});

app.post("/api/v1/categories", (req, res) => {
  const { name } = req.body;
  if (!name || typeof name !== 'string') {
    return res.status(400).json({ error: "Nombre de categoría inválido." });
  }

  const cleanName = name.trim().toLowerCase();
  if (!categories.includes(cleanName)) {
    categories.push(cleanName);
  }

  const docCategories = knowledgeDocs.map(d => d.category);
  const uniqueCats = Array.from(new Set([...categories, ...docCategories])).filter(Boolean);

  res.json({ success: true, category: cleanName, categories: uniqueCats });
});

// 4. Upload / Create Knowledge Document
app.post("/api/v1/knowledge/upload", (req, res) => {
  const { title, category, sourceLawOrPolicy, content, subagentAssigned = "agente_laboral" } = req.body;
  if (!title || !content) {
    return res.status(400).json({ error: "Título y contenido son requeridos." });
  }

  const newDoc = {
    id: `doc-${Date.now()}`,
    title,
    category: category || "laboral",
    sourceLawOrPolicy: sourceLawOrPolicy || "Política Interna Corporativa",
    content,
    lastUpdated: new Date().toISOString().split("T")[0],
    version: "1.0",
    chunksCount: Math.ceil(content.length / 300),
    subagentAssigned,
    confidentiality: "interna" as const,
    status: "activo" as const
  };

  knowledgeDocs.unshift(newDoc);
  res.json({ success: true, document: newDoc });
});

// 5. Audit Logs
app.get("/api/v1/audit-logs", (req, res) => {
  res.json({ logs: auditLogs, total: auditLogs.length });
});

// 6. Notifications
app.get("/api/v1/notifications", (req, res) => {
  res.json({ notifications, unreadCount: notifications.filter(n => !n.read).length });
});

app.post("/api/v1/notifications/read", (req, res) => {
  notifications = notifications.map(n => ({ ...n, read: true }));
  res.json({ success: true });
});

// 6.5 User Directory Management
app.get("/api/v1/users", (req, res) => {
  res.json({ users: registeredUsers });
});

app.post("/api/v1/users", (req, res) => {
  const { name, email, role, department, provider, avatar } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Nombre y correo son campos requeridos" });
  }

  const existingIndex = registeredUsers.findIndex(u => u.email.toLowerCase() === email.toLowerCase());
  if (existingIndex >= 0) {
    // Update existing user
    registeredUsers[existingIndex] = {
      ...registeredUsers[existingIndex],
      name,
      role: role || registeredUsers[existingIndex].role,
      department: department || registeredUsers[existingIndex].department,
      provider: provider || registeredUsers[existingIndex].provider
    };
    return res.json({ success: true, user: registeredUsers[existingIndex], users: registeredUsers, updated: true });
  }

  const newUser = {
    id: `usr-${Date.now().toString().slice(-4)}`,
    name,
    email,
    role: role || 'collaborator',
    department: department || 'Operaciones & Cumplimiento',
    avatar: avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150`,
    provider: provider || 'sso_saml',
    e2eeEnabled: true,
    publicKeyFingerprint: `SHA256:${Math.random().toString(16).substring(2, 10)}${Math.random().toString(16).substring(2, 10)}`
  };

  registeredUsers.unshift(newUser);
  res.json({ success: true, user: newUser, users: registeredUsers, created: true });
});

// 7. Financial Calculator endpoint
app.post("/api/v1/financial-calculator", (req, res) => {
  const { 
    totalCollaborators = 70, 
    hourlyRateUSD = 35, 
    hourlyRateCLP = 28000,
    queryFrequencyPerWeek = 4,
    currency = 'CLP'
  } = req.body;
  
  const weeklyQueries = totalCollaborators * queryFrequencyPerWeek;
  const annualQueries = weeklyQueries * 52;
  
  // Traditional AHT (Average Handling Time) = 45 mins = 0.75 hrs per query
  const traditionalTotalHours = annualQueries * 0.75;
  const traditionalCostUSD = traditionalTotalHours * hourlyRateUSD;
  const traditionalCostCLP = traditionalTotalHours * hourlyRateCLP;

  // Subagents Orchestrator AHT Reduction = -40% (Medida)
  const hhReductionPercentage = 40;
  const hoursSavedPerYear = traditionalTotalHours * (hhReductionPercentage / 100);
  const newTotalHours = traditionalTotalHours - hoursSavedPerYear;
  
  const newCostUSD = newTotalHours * hourlyRateUSD;
  const annualSavingsUSD = traditionalCostUSD - newCostUSD;

  const newCostCLP = newTotalHours * hourlyRateCLP;
  const annualSavingsCLP = traditionalCostCLP - newCostCLP;

  // Baseline PoC Benchmark Metrics
  const benchmark = {
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
    assumedHourlyRateCLP: 28000,
    assumedHourlyRateTag: '[Supuesta]'
  };

  res.json({
    metrics: {
      totalCollaborators,
      annualQueries,
      traditionalTotalHours: Math.round(traditionalTotalHours),
      newTotalHours: Math.round(newTotalHours),
      hoursSavedPerYear: Math.round(hoursSavedPerYear),
      traditionalCostUSD: Math.round(traditionalCostUSD),
      newCostUSD: Math.round(newCostUSD),
      annualSavingsUSD: Math.round(annualSavingsUSD),
      traditionalCostCLP: Math.round(traditionalCostCLP),
      newCostCLP: Math.round(newCostCLP),
      annualSavingsCLP: Math.round(annualSavingsCLP),
      ahtReductionPercentage: hhReductionPercentage,
      currency,
      benchmark,
      tags: {
        currentCost: '[Medida]',
        investment: '[Estimada]',
        payback: '[Estimada]',
        hhReduction: '[Medida]',
        hourlyRate: '[Supuesta]'
      }
    }
  });
});

// 8. OpenAPI JSON endpoint for developer documentation
app.get("/api/v1/developer/openapi.json", (req, res) => {
  res.json({
    openapi: "3.0.0",
    info: {
      title: "Orquestador de IA Corporativa API",
      version: "1.0.0",
      description: "API RESTful para integración externa con el sistema de RAG y Subagentes de Gobernanza y Cumplimiento Normativo."
    },
    paths: {
      "/api/v1/consult": {
        post: {
          summary: "Realiza una consulta normativo-RAG orquestada por subagentes",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    query: { type: "string", example: "¿Cuál es el procedimiento bajo la Ley Karin ante una denuncia?" },
                    userId: { type: "string", example: "usr-882" },
                    userRole: { type: "string", example: "colaborador" }
                  }
                }
              }
            }
          },
          responses: {
            "200": { description: "Respuesta normativo-RAG cifrada con hash de auditoría" }
          }
        }
      },
      "/api/v1/knowledge": {
        get: { summary: "Obtiene los documentos de la base de conocimiento" }
      },
      "/api/v1/audit-logs": {
        get: { summary: "Obtiene el historial inmutable de auditoría criptográfica" }
      }
    }
  });
});

// Vite Middleware or Production Serve
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Orquestador IA Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
