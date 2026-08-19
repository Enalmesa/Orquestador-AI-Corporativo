import React, { useState, useEffect } from 'react';
import { X, Shield, Lock, Key, Mail, CheckCircle2, UserCheck, Smartphone, Users, UserPlus, Check } from 'lucide-react';
import { UserProfile, UserRole } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUpdateUser: (user: UserProfile) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpdateUser
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'directory' | 'social'>('profile');
  const [selectedRole, setSelectedRole] = useState<UserRole>(currentUser.role);
  const [userName, setUserName] = useState(currentUser.name);
  const [userEmail, setUserEmail] = useState(currentUser.email);
  const [department, setDepartment] = useState(currentUser.department);
  const [provider, setProvider] = useState(currentUser.provider);
  const [socialSuccessMessage, setSocialSuccessMessage] = useState('');

  // Registered Users Directory State
  const [registeredUsers, setRegisteredUsers] = useState<UserProfile[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newDept, setNewDept] = useState('Oficina de Cumplimiento & Fiscalía');
  const [newRole, setNewRole] = useState<UserRole>('compliance_officer');
  const [addUserSuccessMsg, setAddUserSuccessMsg] = useState('');

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/v1/users');
      const data = await res.json();
      if (data.users && Array.isArray(data.users)) {
        setRegisteredUsers(data.users);
      }
    } catch (e) {
      console.warn('Error fetching users:', e);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSaveProfile = () => {
    onUpdateUser({
      ...currentUser,
      name: userName,
      email: userEmail,
      role: selectedRole,
      department,
      provider
    });
    onClose();
  };

  const handleSwitchUser = (user: UserProfile) => {
    onUpdateUser(user);
    setUserName(user.name);
    setUserEmail(user.email);
    setDepartment(user.department);
    setSelectedRole(user.role);
    setProvider(user.provider);
    setSocialSuccessMessage(`Sesión cambiada activamente a ${user.name}`);
    setTimeout(() => {
      setSocialSuccessMessage('');
      onClose();
    }, 1000);
  };

  const handleCreateNewUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    try {
      const res = await fetch('/api/v1/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newName.trim(),
          email: newEmail.trim(),
          role: newRole,
          department: newDept.trim(),
          provider: 'sso_saml'
        })
      });
      const data = await res.json();
      if (data.success && data.user) {
        setAddUserSuccessMsg(`Usuario ${data.user.name} registrado con éxito.`);
        fetchUsers();
        // Automatically switch session to newly created user
        onUpdateUser(data.user);
        setNewName('');
        setNewEmail('');
        setShowAddForm(false);
        setTimeout(() => {
          setAddUserSuccessMsg('');
          onClose();
        }, 1200);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSocialLogin = (socialProvider: 'google' | 'microsoft' | 'sso_saml') => {
    let mockName = userName;
    let mockEmail = userEmail;
    if (socialProvider === 'google') {
      mockName = 'Elena Montes (Google Workspace)';
      mockEmail = 'elena.montes@empresa.com';
    } else if (socialProvider === 'microsoft') {
      mockName = 'Carlos Silva (Microsoft 365)';
      mockEmail = 'carlos.silva@empresa.com';
    } else {
      mockName = 'Roberto Valdés (SSO SAML Identity)';
      mockEmail = 'roberto.valdes@empresa.com';
    }

    setProvider(socialProvider);
    setUserName(mockName);
    setUserEmail(mockEmail);
    setSocialSuccessMessage(`Autenticado exitosamente vía ${socialProvider.toUpperCase()}`);

    setTimeout(() => {
      onUpdateUser({
        ...currentUser,
        name: mockName,
        email: mockEmail,
        provider: socialProvider,
        role: selectedRole
      });
      setSocialSuccessMessage('');
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">Autenticación & Control de Roles (RBAC)</h2>
          </div>
          <button 
            id="close-auth-modal"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="mt-4 flex gap-1.5 border-b border-slate-800 pb-2 overflow-x-auto">
          <button
            id="auth-tab-profile"
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition whitespace-nowrap ${
              activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Perfil Activo
          </button>
          <button
            id="auth-tab-directory"
            onClick={() => setActiveTab('directory')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === 'directory' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            <Users className="h-3.5 w-3.5 text-emerald-400" />
            <span>Directorio de Usuarios ({registeredUsers.length})</span>
          </button>
          <button
            id="auth-tab-social"
            onClick={() => setActiveTab('social')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition whitespace-nowrap ${
              activeTab === 'social' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-800'
            }`}
          >
            Inicio de Sesión Social
          </button>
        </div>

        {socialSuccessMessage && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-400">
            <CheckCircle2 className="h-4 w-4" />
            <span>{socialSuccessMessage}</span>
          </div>
        )}

        {/* Content Tabs */}
        {activeTab === 'profile' && (
          <div className="mt-4 space-y-4 text-xs">
            <div>
              <label className="block text-slate-400 font-medium mb-1">Nombre Completo</label>
              <input
                id="input-user-name"
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-slate-400 font-medium mb-1">Correo Corporativo</label>
              <input
                id="input-user-email"
                type="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-slate-400 font-medium mb-1">Departamento</label>
                <input
                  id="input-user-dept"
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-slate-400 font-medium mb-1">Rol de Acceso RBAC</label>
                <select
                  id="select-user-role"
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                  className="w-full rounded-lg border border-slate-800 bg-slate-950 px-3 py-2 text-white focus:border-indigo-500 focus:outline-none capitalize"
                >
                  <option value="collaborator">Colaborador</option>
                  <option value="compliance_officer">Oficial de Cumplimiento</option>
                  <option value="auditor">Auditor 24/7</option>
                  <option value="admin">Administrador del Sistema</option>
                </select>
              </div>
            </div>

            {/* E2EE Info Box */}
            <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold">
                <Key className="h-4 w-4" />
                <span>Huella Criptográfica E2EE</span>
              </div>
              <p className="mt-1 font-mono text-[10px] text-slate-400 break-all">
                {currentUser.publicKeyFingerprint}
              </p>
            </div>

            <button
              id="save-profile-btn"
              onClick={handleSaveProfile}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-2.5 font-bold text-white hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/20"
            >
              <UserCheck className="h-4 w-4" />
              Actualizar Perfil & Permisos RBAC
            </button>
          </div>
        )}

        {activeTab === 'directory' && (
          <div className="mt-4 space-y-4 text-xs max-h-[380px] overflow-y-auto pr-1">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Selecciona o registra un usuario para activar su sesión:</span>
              <button
                id="toggle-add-user-form-btn"
                onClick={() => setShowAddForm(!showAddForm)}
                className="flex items-center gap-1 rounded bg-indigo-600/20 border border-indigo-500/30 px-2.5 py-1 font-semibold text-indigo-300 hover:bg-indigo-600 hover:text-white transition"
              >
                <UserPlus className="h-3.5 w-3.5" />
                <span>{showAddForm ? 'Cancelar' : '＋ Agregar Usuario'}</span>
              </button>
            </div>

            {addUserSuccessMsg && (
              <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3 font-semibold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                <span>{addUserSuccessMsg}</span>
              </div>
            )}

            {/* New User Creation Form */}
            {showAddForm && (
              <form onSubmit={handleCreateNewUser} className="rounded-xl border border-indigo-500/30 bg-slate-950 p-4 space-y-3">
                <div className="font-bold text-white flex items-center gap-1.5">
                  <UserPlus className="h-4 w-4 text-indigo-400" />
                  <span>Registrar Nuevo Colaborador / Usuario</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Nombre Completo</label>
                    <input
                      id="new-user-name-input"
                      type="text"
                      required
                      placeholder="ej. Carolina Morales"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Correo Corporativo</label>
                    <input
                      id="new-user-email-input"
                      type="email"
                      required
                      placeholder="ej. carolina.morales@empresa.com"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Departamento / Área</label>
                    <input
                      id="new-user-dept-input"
                      type="text"
                      value={newDept}
                      onChange={(e) => setNewDept(e.target.value)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-400 font-medium mb-1">Rol RBAC</label>
                    <select
                      id="new-user-role-select"
                      value={newRole}
                      onChange={(e) => setNewRole(e.target.value as UserRole)}
                      className="w-full rounded-lg border border-slate-800 bg-slate-900 px-3 py-1.5 text-white focus:border-indigo-500 focus:outline-none"
                    >
                      <option value="compliance_officer">Oficial de Cumplimiento</option>
                      <option value="collaborator">Colaborador</option>
                      <option value="auditor">Auditor 24/7</option>
                      <option value="admin">Administrador del Sistema</option>
                    </select>
                  </div>
                </div>

                <button
                  id="submit-create-user-btn"
                  type="submit"
                  className="w-full py-2 bg-indigo-600 font-bold text-white rounded-lg hover:bg-indigo-500 transition"
                >
                  Guardar & Activar Sesión de Usuario
                </button>
              </form>
            )}

            {/* Registered Users List */}
            <div className="space-y-2">
              {registeredUsers.map((u) => {
                const isActive = currentUser.email.toLowerCase() === u.email.toLowerCase();
                return (
                  <div
                    key={u.id}
                    className={`flex items-center justify-between rounded-xl border p-3 transition ${
                      isActive
                        ? 'border-indigo-500/50 bg-indigo-950/30'
                        : 'border-slate-800 bg-slate-950 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar}
                        alt={u.name}
                        className="h-9 w-9 rounded-full object-cover border border-slate-700"
                      />
                      <div>
                        <div className="font-bold text-white flex items-center gap-1.5">
                          <span>{u.name}</span>
                          {isActive && (
                            <span className="rounded bg-indigo-500/20 border border-indigo-500/40 px-1.5 py-0.5 text-[9px] font-mono text-indigo-300">
                              SESIÓN ACTIVA
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {u.email} • <span className="text-slate-300">{u.department}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      id={`switch-user-btn-${u.id}`}
                      onClick={() => handleSwitchUser(u)}
                      disabled={isActive}
                      className={`flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                        isActive
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 cursor-default'
                          : 'bg-indigo-600 text-white hover:bg-indigo-500'
                      }`}
                    >
                      {isActive ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Activo</span>
                        </>
                      ) : (
                        <span>Iniciar Sesión</span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className="mt-4 space-y-3">
            <p className="text-xs text-slate-400">
              Inicia sesión utilizando los proveedores de identidad corporativos federados con cifrado E2EE:
            </p>

            {/* Google Workspace Button */}
            <button
              id="auth-google-btn"
              onClick={() => handleSocialLogin('google')}
              className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-xs font-semibold text-white hover:bg-slate-800 transition"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-slate-900 font-bold text-xs">
                  G
                </div>
                <span>Continuar con Google Workspace</span>
              </div>
              <span className="text-[10px] text-indigo-400 font-mono">OAuth 2.0</span>
            </button>

            {/* Microsoft 365 Button */}
            <button
              id="auth-microsoft-btn"
              onClick={() => handleSocialLogin('microsoft')}
              className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-xs font-semibold text-white hover:bg-slate-800 transition"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-500 text-white font-bold text-xs">
                  M
                </div>
                <span>Continuar con Microsoft 365 Entra ID</span>
              </div>
              <span className="text-[10px] text-indigo-400 font-mono">MSAL</span>
            </button>

            {/* SSO SAML Button */}
            <button
              id="auth-saml-btn"
              onClick={() => handleSocialLogin('sso_saml')}
              className="flex w-full items-center justify-between rounded-lg border border-slate-800 bg-slate-950 px-4 py-3 text-xs font-semibold text-white hover:bg-slate-800 transition"
            >
              <div className="flex items-center gap-3">
                <Lock className="h-4 w-4 text-emerald-400" />
                <span>Autenticación SSO SAML 2.0 Corporativa</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">Empresa SSO</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

