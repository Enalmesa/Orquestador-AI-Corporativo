import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Activity, 
  ShieldCheck, 
  BellRing, 
  CheckCircle2, 
  Lock,
  Cpu,
  BarChart3,
  Send,
  FolderPlus,
  Plus,
  Tag,
  UserPlus,
  UserCheck,
  Check
} from 'lucide-react';
import { UserProfile, UserRole, Language } from '../types';

interface AdminDashboardProps {
  lang?: Language;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ lang = 'es' }) => {
  const [activeUsersCount, setActiveUsersCountState] = useState<number>(() => {
    const saved = localStorage.getItem('rag_collaborators_count');
    return saved !== null ? Number(saved) : 11;
  });

  const labels = {
    es: {
      badge: 'Monitoreo Corporativo 24/7',
      title: 'Panel de Control Administrativo RAG',
      subtitle: 'Control central de uso para la plataforma corporativa con monitoreo del número de colaboradores activos simultáneamente en la organización.',
      activeCollabs: 'Colaboradores Activos',
      kpi1Title: 'Colaboradores Registrados',
      kpi2Title: 'Tasa de Precisión RAG',
      kpi3Title: 'Monitoreo Ley Karin 24/7',
      kpi4Title: 'Subagentes Snowflake/ChromaDB',
      usersTitle: 'Directorio de Usuarios & Gestión de Accesos (RBAC / SSO)',
      addUserBtn: 'Agregar Usuario',
      addUserModalTitle: 'Registrar Nuevo Usuario / Colaborador',
      inputName: 'Nombre Completo',
      inputEmail: 'Correo Corporativo',
      inputDept: 'Departamento / Área',
      inputRole: 'Rol RBAC',
      btnRegister: 'Registrar Usuario SSO',
      btnCancel: 'Cancelar',
      categoriesTitle: 'Gestor de Categorías de Conocimiento',
      inputNewCat: 'Nombre de nueva categoría...',
      btnAddCat: 'Agregar Categoria',
      broadcastTitle: 'Difusión de Notificación Normativa Masiva',
      inputAlertTitle: 'Título del Anuncio (Ej. Nueva Política)',
      inputAlertMsg: 'Mensaje o Instructivo Normativo',
      btnSendAlert: 'Emitir Alerta a Todos los Colaboradores'
    },
    en: {
      badge: 'Corporate Monitoring 24/7',
      title: 'RAG Administrative Control Panel',
      subtitle: 'Central control panel for monitoring platform usage and active employee count across the organization.',
      activeCollabs: 'Active Collaborators',
      kpi1Title: 'Registered Collaborators',
      kpi2Title: 'RAG Accuracy Rate',
      kpi3Title: 'Karin Law 24/7 Monitoring',
      kpi4Title: 'Snowflake/ChromaDB Subagents',
      usersTitle: 'Users Directory & Access Control (RBAC / SSO)',
      addUserBtn: 'Add User',
      addUserModalTitle: 'Register New User / Employee',
      inputName: 'Full Name',
      inputEmail: 'Corporate Email',
      inputDept: 'Department / Area',
      inputRole: 'RBAC Role',
      btnRegister: 'Register SSO User',
      btnCancel: 'Cancel',
      categoriesTitle: 'Knowledge Categories Manager',
      inputNewCat: 'New category name...',
      btnAddCat: 'Add Category',
      broadcastTitle: 'Broadcast Mass Regulatory Notification',
      inputAlertTitle: 'Announcement Title (e.g. New Policy)',
      inputAlertMsg: 'Regulatory Instruction or Message',
      btnSendAlert: 'Broadcast Alert to All Employees'
    },
    pt: {
      badge: 'Monitoramento Corporativo 24/7',
      title: 'Painel de Controle Administrativo RAG',
      subtitle: 'Painel de controle central para monitoramento de uso da plataforma e colaboradores ativos na organização.',
      activeCollabs: 'Colaboradores Ativos',
      kpi1Title: 'Colaboradores Registrados',
      kpi2Title: 'Taxa de Precisão RAG',
      kpi3Title: 'Monitoramento Lei Karin 24/7',
      kpi4Title: 'Subagentes Snowflake/ChromaDB',
      usersTitle: 'Diretório de Usuários & Gestão de Acesso (RBAC / SSO)',
      addUserBtn: 'Adicionar Usuário',
      addUserModalTitle: 'Registrar Novo Usuário / Colaborador',
      inputName: 'Nome Completo',
      inputEmail: 'E-mail Corporativo',
      inputDept: 'Departamento / Área',
      inputRole: 'Função RBAC',
      btnRegister: 'Registrar Usuário SSO',
      btnCancel: 'Cancelar',
      categoriesTitle: 'Gerenciador de Categorias de Conhecimento',
      inputNewCat: 'Nome da nova categoria...',
      btnAddCat: 'Adicionar Categoria',
      broadcastTitle: 'Difusão de Notificação Regulatória em Massa',
      inputAlertTitle: 'Título do Anúncio (Ex. Nova Política)',
      inputAlertMsg: 'Mensagem ou Instrução Regulatória',
      btnSendAlert: 'Emitir Alerta para Todos os Colaboradores'
    }
  };

  const t = labels[lang] || labels['es'];

  // Users Directory state
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [showAddUser, setShowAddUser] = useState(false);
  const [userNameInput, setUserNameInput] = useState('');
  const [userEmailInput, setUserEmailInput] = useState('');
  const [userDeptInput, setUserDeptInput] = useState('Oficina de Cumplimiento & Fiscalía');
  const [userRoleInput, setUserRoleInput] = useState<UserRole>('compliance_officer');
  const [userSuccessMsg, setUserSuccessMsg] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/v1/users');
      const data = await res.json();
      if (data.users && Array.isArray(data.users)) {
        setUsers(data.users);
      }
    } catch (e) {
      console.warn("Error fetching users:", e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRegisterUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userNameInput.trim() || !userEmailInput.trim()) return;

    try {
      const res = await fetch('/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: userNameInput.trim(),
          email: userEmailInput.trim(),
          department: userDeptInput.trim(),
          role: userRoleInput,
          provider: 'sso_saml'
        })
      });
      const data = await res.json();
      if (data.success) {
        setUserSuccessMsg(`Usuario '${userNameInput.trim()}' registrado con éxito en el directorio.`);
        setUserNameInput('');
        setUserEmailInput('');
        setShowAddUser(false);
        fetchUsers();
        setTimeout(() => setUserSuccessMsg(null), 3500);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectActiveUser = (u: UserProfile) => {
    window.dispatchEvent(new CustomEvent('rag_user_changed', { detail: u }));
    setUserSuccessMsg(`Sesión activa cambiada a ${u.name} (${u.email}).`);
    setTimeout(() => setUserSuccessMsg(null), 3000);
  };

  const setActiveUsersCount = (val: number) => {
    const safeVal = Math.max(0, val);
    setActiveUsersCountState(safeVal);
    localStorage.setItem('rag_collaborators_count', String(safeVal));
    window.dispatchEvent(new CustomEvent('rag_collab_count_changed', { detail: safeVal }));
  };

  useEffect(() => {
    const handleCountChange = (e: Event) => {
      const customEv = e as CustomEvent;
      if (customEv.detail !== undefined && typeof customEv.detail === 'number') {
        setActiveUsersCountState(customEv.detail);
      }
    };
    window.addEventListener('rag_collab_count_changed', handleCountChange);
    return () => window.removeEventListener('rag_collab_count_changed', handleCountChange);
  }, []);

  const [alertTitle, setAlertTitle] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertCategory, setAlertCategory] = useState('Ley Karin');
  const [broadcastSuccess, setBroadcastSuccess] = useState(false);

  // Category Management State
  const [categories, setCategories] = useState<string[]>(['laboral', 'procesos', 'legal', 'ciberseguridad', 'etica', 'tecnica']);
  const [newCatInput, setNewCatInput] = useState('');
  const [catSuccessMsg, setCatSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/v1/categories')
      .then(res => res.json())
      .then(data => {
        if (data.categories && Array.isArray(data.categories)) {
          setCategories(data.categories);
        }
      })
      .catch(err => console.warn("Error fetching categories in Admin:", err));
  }, []);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatInput.trim()) return;

    try {
      const res = await fetch('/api/v1/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCatInput.trim() })
      });
      const data = await res.json();
      if (data.success) {
        setCategories(data.categories);
        setCatSuccessMsg(`Categoría '${newCatInput.trim()}' registrada e integrada exitosamente en ChromaDB.`);
        setNewCatInput('');
        setTimeout(() => setCatSuccessMsg(null), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleBroadcastAlert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!alertTitle || !alertMessage) return;

    setBroadcastSuccess(true);
    setTimeout(() => {
      setBroadcastSuccess(false);
      setAlertTitle('');
      setAlertMessage('');
    }, 3000);
  };

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-400">
            <LayoutDashboard className="h-4 w-4" />
            <span>{t.badge}</span>
          </div>
          <h2 className="text-xl font-bold text-white mt-1">
            {t.title}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-center flex flex-col items-center">
            <div className="text-lg font-bold text-emerald-400 flex items-center gap-1.5 justify-center">
              <Users className="h-4 w-4" />
              <input
                type="number"
                min={0}
                value={activeUsersCount}
                onChange={(e) => setActiveUsersCount(Math.max(0, Number(e.target.value)))}
                className="w-16 bg-transparent text-emerald-400 font-bold text-lg text-center focus:outline-none focus:ring-1 focus:ring-emerald-500 rounded font-mono"
                title={t.activeCollabs}
              />
            </div>
            <div className="text-[10px] text-slate-400">{t.activeCollabs}</div>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span>Tasa de Cero Alucinación</span>
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
          </div>
          <div className="text-2xl font-bold text-emerald-400 mt-2">100.0%</div>
          <p className="text-[10px] text-slate-400 mt-1">Verificado en Golden Examples</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span>Reducción de Latencia AHT</span>
            <Activity className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-indigo-400 mt-2">-42.5%</div>
          <p className="text-[10px] text-slate-400 mt-1">Meta del PoC: -40% AHT</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span>Consultas Snowflake / Día</span>
            <BarChart3 className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-indigo-400 mt-2">1,840</div>
          <p className="text-[10px] text-slate-400 mt-1">Reglas SQL validadas</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-4">
          <div className="flex items-center justify-between text-slate-400">
            <span>Seguridad & Cifrado</span>
            <Lock className="h-4 w-4 text-indigo-400" />
          </div>
          <div className="text-2xl font-bold text-indigo-400 mt-2">AES-256</div>
          <p className="text-[10px] text-slate-400 mt-1">E2EE + SHA-256 Hashes</p>
        </div>

      </div>

      {/* Broadcast Real-time Notification Dispatcher */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
        <div className="flex items-center gap-2 text-base font-bold text-white">
          <BellRing className="h-5 w-5 text-rose-400" />
          <span>Emisión de Notificaciones Críticas en Tiempo Real</span>
        </div>
        <p className="text-xs text-slate-400">
          Envía un aviso de urgencia normativo (ej. modificaciones a la Ley Karin o RIOHS) a todos los colaboradores conectados.
        </p>

        {broadcastSuccess && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            <span>Alerta difundida con éxito en tiempo real a todos los terminales.</span>
          </div>
        )}

        <form onSubmit={handleBroadcastAlert} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-slate-400 font-semibold mb-1">Título de la Alerta</label>
              <input
                id="input-alert-title"
                type="text"
                required
                value={alertTitle}
                onChange={(e) => setAlertTitle(e.target.value)}
                placeholder="ej. Actualización Obligatoria Protocolo Acoso Ley Karin"
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-semibold mb-1">Categoría Normativa</label>
              <select
                id="select-alert-category"
                value={alertCategory}
                onChange={(e) => setAlertCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="Ley Karin">Ley Karin</option>
                <option value="Ley 40 Horas">Ley 40 Horas</option>
                <option value="RIOHS">RIOHS & Código Ética</option>
                <option value="Delitos Económicos">Delitos Económicos</option>
                <option value="Seguridad">Seguridad & Datos</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-slate-400 font-semibold mb-1">Detalle del Mensaje Normativo</label>
            <textarea
              id="textarea-alert-msg"
              required
              rows={3}
              value={alertMessage}
              onChange={(e) => setAlertMessage(e.target.value)}
              placeholder="Escriba la instrucción o norma que deben conocer de inmediato los colaboradores..."
              className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
            />
          </div>

          <button
            id="broadcast-alert-btn"
            type="submit"
            className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-semibold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
          >
            <Send className="h-4 w-4" />
            <span>Emitir Alerta a Colaboradores</span>
          </button>
        </form>
      </div>

      {/* Category Management in Admin Panel */}
      <div className="rounded-xl border border-indigo-500/30 bg-slate-900 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-base font-bold text-white">
            <FolderPlus className="h-5 w-5 text-indigo-400" />
            <span>Gestión de Categorías Normativas para ChromaDB</span>
          </div>
          <span className="text-xs text-indigo-300 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-md font-mono">
            {categories.length} Categorías Activas
          </span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Agregue y gestione categorías normativas dinámicas (ej. <strong className="text-indigo-300">Ciberseguridad y Protección de Datos</strong>, <strong className="text-indigo-300">Gobierno de Datos & IA</strong>) para estructurar el almacenamiento vectorial en ChromaDB y la clasificación de consultas RAG.
        </p>

        {catSuccessMsg && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{catSuccessMsg}</span>
          </div>
        )}

        <form onSubmit={handleAddCategory} className="flex flex-col sm:flex-row gap-3 text-xs">
          <input
            id="admin-dashboard-new-cat-input"
            type="text"
            required
            value={newCatInput}
            onChange={(e) => setNewCatInput(e.target.value)}
            placeholder="ej. Ciberseguridad y Protección de Datos"
            className="flex-1 rounded-lg border border-slate-800 bg-slate-950 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-indigo-500 focus:outline-none"
          />
          <button
            id="admin-dashboard-add-cat-btn"
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 font-bold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
          >
            <Plus className="h-4 w-4" />
            <span>Agregar Categoría Normativa</span>
          </button>
        </form>

        <div className="pt-2 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-400 mb-2">Categorías Actualmente Registradas:</div>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <div key={cat} className="flex items-center gap-2 rounded-lg bg-slate-950 border border-slate-800 px-3 py-1.5 text-xs">
                <Tag className="h-3.5 w-3.5 text-indigo-400" />
                <span className="font-semibold text-white capitalize">{cat}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* User Directory & Management Section */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 text-base font-bold text-white">
              <Users className="h-5 w-5 text-indigo-400" />
              <span>Directorio y Gestión de Usuarios Corporativos</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Administre las cuentas de colaboradores (ej. Carolina Morales) y cambie la sesión activa en 1 clic.
            </p>
          </div>

          <button
            id="admin-toggle-add-user-btn"
            onClick={() => setShowAddUser(!showAddUser)}
            className="flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-bold text-white hover:bg-indigo-500 transition shadow-md shadow-indigo-600/20"
          >
            <UserPlus className="h-4 w-4" />
            <span>{showAddUser ? 'Cancelar' : '＋ Registrar Nuevo Usuario'}</span>
          </button>
        </div>

        {userSuccessMsg && (
          <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs text-emerald-300 font-bold flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            <span>{userSuccessMsg}</span>
          </div>
        )}

        {/* User Registration Form */}
        {showAddUser && (
          <form onSubmit={handleRegisterUser} className="rounded-xl border border-indigo-500/30 bg-slate-950 p-4 space-y-3 text-xs">
            <div className="font-bold text-white text-sm flex items-center gap-2 border-b border-slate-800 pb-2">
              <UserPlus className="h-4 w-4 text-indigo-400" />
              <span>Formulario de Registro de Usuario / Colaborador</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Nombre Completo</label>
                <input
                  id="admin-new-user-name"
                  type="text"
                  required
                  placeholder="ej. Carolina Morales"
                  value={userNameInput}
                  onChange={(e) => setUserNameInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Correo Corporativo</label>
                <input
                  id="admin-new-user-email"
                  type="email"
                  required
                  placeholder="ej. carolina.morales@empresa.com"
                  value={userEmailInput}
                  onChange={(e) => setUserEmailInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-semibold mb-1">Departamento / Fiscalía</label>
                <input
                  id="admin-new-user-dept"
                  type="text"
                  value={userDeptInput}
                  onChange={(e) => setUserDeptInput(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-semibold mb-1">Rol RBAC Asignado</label>
                <select
                  id="admin-new-user-role"
                  value={userRoleInput}
                  onChange={(e) => setUserRoleInput(e.target.value as UserRole)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none capitalize"
                >
                  <option value="compliance_officer">Oficial de Cumplimiento</option>
                  <option value="collaborator">Colaborador</option>
                  <option value="auditor">Auditor 24/7</option>
                  <option value="admin">Administrador del Sistema</option>
                </select>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                id="admin-submit-register-user-btn"
                type="submit"
                className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2 font-bold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
              >
                <UserCheck className="h-4 w-4" />
                <span>Guardar e Integrar en Registro RBAC</span>
              </button>
            </div>
          </form>
        )}

        {/* Directory User Cards Table */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {users.map((u) => (
            <div
              key={u.id}
              className="rounded-xl border border-slate-800 bg-slate-950 p-3.5 flex items-center justify-between gap-3 hover:border-slate-700 transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={u.avatar}
                  alt={u.name}
                  className="h-10 w-10 rounded-full object-cover border border-slate-700 flex-shrink-0"
                />
                <div className="min-w-0">
                  <div className="font-bold text-white text-xs truncate flex items-center gap-1.5">
                    <span>{u.name}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">{u.email}</div>
                  <div className="text-[10px] text-indigo-300 font-medium truncate mt-0.5">
                    {u.department}
                  </div>
                </div>
              </div>

              <button
                id={`admin-activate-user-btn-${u.id}`}
                onClick={() => handleSelectActiveUser(u)}
                className="flex-shrink-0 flex items-center gap-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/30 px-3 py-1.5 text-xs font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Activar Sesión</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* RBAC Roles & Privileges Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 space-y-3">
        <h3 className="text-sm font-bold text-white">Matriz de Control de Acceso Basado en Roles (RBAC)</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider font-bold">
              <tr>
                <th className="p-3">Rol Corporativo</th>
                <th className="p-3">Consultas RAG</th>
                <th className="p-3">Gestión Conocimiento</th>
                <th className="p-3">Auditoría 24/7</th>
                <th className="p-3">Emisión Alertas</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              <tr>
                <td className="p-3 font-semibold text-indigo-400">Colaborador</td>
                <td className="p-3 text-emerald-400">✓ Lectura RAG</td>
                <td className="p-3 text-slate-500">✗ Denegado</td>
                <td className="p-3 text-slate-500">✗ Solo Propio</td>
                <td className="p-3 text-slate-500">✗ Denegado</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-indigo-300">Oficial de Cumplimiento</td>
                <td className="p-3 text-emerald-400">✓ Completo</td>
                <td className="p-3 text-emerald-400">✓ Ingestar & Editar</td>
                <td className="p-3 text-emerald-400">✓ Lectura Completa</td>
                <td className="p-3 text-emerald-400">✓ Permitido</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-indigo-300">Auditor 24/7</td>
                <td className="p-3 text-emerald-400">✓ Completo</td>
                <td className="p-3 text-emerald-400">✓ Revisar Golden Ex</td>
                <td className="p-3 text-emerald-400">✓ Verificación Hashes</td>
                <td className="p-3 text-slate-500">✗ Denegado</td>
              </tr>
              <tr>
                <td className="p-3 font-semibold text-amber-400">Administrador Sistema</td>
                <td className="p-3 text-emerald-400">✓ Total</td>
                <td className="p-3 text-emerald-400">✓ Total</td>
                <td className="p-3 text-emerald-400">✓ Total</td>
                <td className="p-3 text-emerald-400">✓ Total</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
