import React, { useState } from 'react';
import { Code2, Key, Download, Copy, Check, Play, FileJson } from 'lucide-react';
import { Language } from '../types';

interface ApiDocsProps {
  lang?: Language;
}

export const ApiDocs: React.FC<ApiDocsProps> = ({ lang = 'es' }) => {
  const [apiKey, setApiKey] = useState('sk_live_orquestador_2026_x882a901');
  const [copied, setCopied] = useState(false);
  const [selectedEndpoint, setSelectedEndpoint] = useState<'consult' | 'knowledge' | 'audit'>('consult');
  const [testResult, setTestResult] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  const labels = {
    es: {
      badge: 'Documentación Técnica para Desarrolladores',
      title: 'API RESTful del Orquestador de IA Corporativa',
      subtitle: 'Puntos de entrada HTTP estandarizados con autenticación Bearer Token, payloads cifrados E2EE e integración externa con sistemas ERP / HR.',
      btnOpenApi: 'Especificación OpenAPI 3.0',
      keyTitle: 'Clave de API de Integración Externa',
      btnGenKey: 'Generar Nueva Clave',
      curlTitle: 'Comando cURL de Ejemplo',
      btnCopyCurl: 'Copiar cURL',
      btnRunTest: 'Ejecutar Prueba Endpoint',
      resOkTitle: 'Respuesta HTTP 200 OK (JSON):'
    },
    en: {
      badge: 'Technical Developer Documentation',
      title: 'Corporate AI Orchestrator RESTful API',
      subtitle: 'Standardized HTTP endpoints with Bearer Token auth, E2EE encrypted payloads, and external ERP / HR integration.',
      btnOpenApi: 'OpenAPI 3.0 Specification',
      keyTitle: 'External Integration API Key',
      btnGenKey: 'Generate New Key',
      curlTitle: 'Example cURL Command',
      btnCopyCurl: 'Copy cURL',
      btnRunTest: 'Run Endpoint Test',
      resOkTitle: 'HTTP 200 OK Response (JSON):'
    },
    pt: {
      badge: 'Documentação Técnica para Desenvolvedores',
      title: 'API RESTful do Orquestrador de IA Corporativa',
      subtitle: 'Endpoints HTTP padronizados com autenticação Bearer Token, payloads criptografados E2EE e integração ERP / RH.',
      btnOpenApi: 'Especificação OpenAPI 3.0',
      keyTitle: 'Chave de API de Integração Externa',
      btnGenKey: 'Gerar Nova Chave',
      curlTitle: 'Comando cURL de Exemplo',
      btnCopyCurl: 'Copiar cURL',
      btnRunTest: 'Executar Teste Endpoint',
      resOkTitle: 'Resposta HTTP 200 OK (JSON):'
    }
  };

  const t = labels[lang] || labels['es'];

  const generateNewKey = () => {
    const newK = 'sk_live_orquestador_' + Math.random().toString(36).substring(2, 10);
    setApiKey(newK);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const executeApiTest = async () => {
    setTesting(true);
    setTestResult(null);

    try {
      if (selectedEndpoint === 'consult') {
        const res = await fetch('/api/v1/consult', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: '¿Cuáles son las sanciones por incumplimiento de la Ley Karin?',
            userId: 'usr-developer-test'
          })
        });
        const data = await res.json();
        setTestResult(JSON.stringify(data, null, 2));
      } else if (selectedEndpoint === 'knowledge') {
        const res = await fetch('/api/v1/knowledge');
        const data = await res.json();
        setTestResult(JSON.stringify(data, null, 2));
      } else {
        const res = await fetch('/api/v1/audit-logs');
        const data = await res.json();
        setTestResult(JSON.stringify(data, null, 2));
      }
    } catch (err) {
      setTestResult(JSON.stringify({ error: 'Error ejecutando prueba API' }));
    } finally {
      setTesting(false);
    }
  };

  const getCurlSnippet = () => {
    if (selectedEndpoint === 'consult') {
      return `curl -X POST "${window.location.origin}/api/v1/consult" \\
  -H "Authorization: Bearer ${apiKey}" \\
  -H "Content-Type: application/json" \\
  -d '{
    "query": "¿Cuál es el protocolo tras una denuncia bajo la Ley Karin?",
    "userId": "usr-882",
    "userRole": "colaborador"
  }'`;
    } else if (selectedEndpoint === 'knowledge') {
      return `curl -X GET "${window.location.origin}/api/v1/knowledge" \\
  -H "Authorization: Bearer ${apiKey}"`;
    } else {
      return `curl -X GET "${window.location.origin}/api/v1/audit-logs" \\
  -H "Authorization: Bearer ${apiKey}"`;
    }
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
            <Code2 className="h-4 w-4" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            {t.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <a
          href="/api/v1/developer/openapi.json"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
        >
          <FileJson className="h-4 w-4" />
          <span>{t.btnOpenApi}</span>
        </a>
      </div>

      {/* API Key Management */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-white text-xs">
            <Key className="h-4 w-4 text-indigo-400" />
            <span>{t.keyTitle}</span>
          </div>
          <button
            id="gen-new-api-key-btn"
            onClick={generateNewKey}
            className="text-xs text-indigo-400 hover:underline"
          >
            {t.btnGenKey}
          </button>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-950 p-2.5 font-mono text-xs text-slate-200">
          <span className="flex-1 truncate">{apiKey}</span>
          <button
            id="copy-api-key-btn"
            onClick={() => copyToClipboard(apiKey)}
            className="p-1 text-slate-400 hover:text-white"
          >
            {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Endpoint Playground */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
        <div className="flex gap-2 border-b border-slate-800 pb-3">
          <button
            id="endpoint-tab-consult"
            onClick={() => setSelectedEndpoint('consult')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              selectedEndpoint === 'consult' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            POST /api/v1/consult
          </button>
          <button
            id="endpoint-tab-knowledge"
            onClick={() => setSelectedEndpoint('knowledge')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              selectedEndpoint === 'knowledge' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            GET /api/v1/knowledge
          </button>
          <button
            id="endpoint-tab-audit"
            onClick={() => setSelectedEndpoint('audit')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition ${
              selectedEndpoint === 'audit' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            GET /api/v1/audit-logs
          </button>
        </div>

        {/* cURL Code Box */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>{t.curlTitle}</span>
            <button
              id="copy-curl-btn"
              onClick={() => copyToClipboard(getCurlSnippet())}
              className="text-indigo-400 hover:underline flex items-center gap-1"
            >
              <Copy className="h-3 w-3" /> {t.btnCopyCurl}
            </button>
          </div>
          <pre className="rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-indigo-300 overflow-x-auto">
            {getCurlSnippet()}
          </pre>
        </div>

        {/* Test Execution Button */}
        <div className="flex items-center justify-between pt-2">
          <button
            id="run-api-test-btn"
            onClick={executeApiTest}
            disabled={testing}
            className="flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white hover:bg-emerald-500 transition shadow-lg shadow-emerald-600/20"
          >
            <Play className="h-4 w-4 fill-current" />
            <span>{t.btnRunTest}</span>
          </button>
        </div>

        {testResult && (
          <div>
            <div className="text-xs font-bold text-slate-300 mb-1">{t.resOkTitle}</div>
            <pre className="rounded-lg border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-slate-200 overflow-x-auto max-h-80">
              {testResult}
            </pre>
          </div>
        )}

      </div>

    </div>
  );
};

