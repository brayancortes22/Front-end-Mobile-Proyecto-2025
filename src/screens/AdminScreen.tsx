import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import BSIcon from '../components/ui/BSIcon';
import MobileMatrix from '../components/MobileMatrix';
import MobileUserCard from '../components/MobileUserCard';
import MobileConfirmModal from '../components/MobileConfirmModal';
import MobileFooter from '../components/MobileFooter';
import MobileInfoCard from '../components/MobileInfoCard';
import MobileStatCard from '../components/MobileStatCard';
import { useNavigation } from '@react-navigation/native';
import styles from '../styles/AdminScreen.styles';
import { useEffect } from 'react';
import { getUsers, deleteUser } from '../Api/Services/User';
import { getRoles, getRolesFormsPerms } from '../Api/Services/Rol';
import { getModules } from '../Api/Services/Module';
import { getForms } from '../Api/Services/Form';

type Tab = 'Resumen' | 'Usuarios' | 'Roles' | 'Módulos';

type Variant = 'default' | 'roles' | 'aprendices' | 'instructores';

const sampleMatrixHeader = ['Rol', 'Formulario', 'Ver', 'Editar', 'Eliminar', 'Habilitar'];

const AdminScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Resumen');
  const navigation = useNavigation<any>();

  const [userCount, setUserCount] = React.useState<number | null>(null);
  const [roleCount, setRoleCount] = React.useState<number | null>(null);
  const [moduleCount, setModuleCount] = React.useState<number | null>(null);
  const [formCount, setFormCount] = React.useState<number | null>(null);
  const [matrixRows, setMatrixRows] = React.useState<any[] | null>(null);
  const [users, setUsers] = React.useState<any[]>([]);
  const [rolesList, setRolesList] = React.useState<any[]>([]);
  const [modulesList, setModulesList] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [confirmVisible, setConfirmVisible] = React.useState(false);
  const [confirmTarget, setConfirmTarget] = React.useState<{ type: 'user'|'role'|'module'; item: any } | null>(null);
  const [actionLoading, setActionLoading] = React.useState(false);

  useEffect(() => {
    let mounted = true;
    async function fetchAll() {
      setLoading(true);
      setError(null);
      try {
        const [users, roles, modules, forms, perms] = await Promise.all([
          getUsers(),
          getRoles(),
          getModules(),
          getForms(),
          // roles-forms-perms might be heavy; try to fetch but tolerate failure
          (async () => { try { return await getRolesFormsPerms(); } catch { return null; } })(),
        ]);

  if (!mounted) return;
  setUsers(Array.isArray(users) ? users : []);
  setUserCount(Array.isArray(users) ? users.length : 0);
        setRoleCount(Array.isArray(roles) ? roles.length : 0);
        setModuleCount(Array.isArray(modules) ? modules.length : 0);
        setFormCount(Array.isArray(forms) ? forms.length : 0);
  setRolesList(Array.isArray(roles) ? roles : []);
  setModulesList(Array.isArray(modules) ? modules : []);

        if (perms && Array.isArray(perms) && perms.length > 0) {
          // reduce to a few rows for mobile: take first 6 entries
          const rows = perms.slice(0, 6).map((p: any) => ({
            rol: p.role_name || p.rol || p.role || '—',
            formulario: p.form_name || p.formulario || p.form || '—',
            ver: !!p.view,
            editar: !!p.edit,
            eliminar: !!p.delete,
            habilitar: !!p.enable,
          }));
          setMatrixRows(rows);
        } else {
          setMatrixRows(null);
        }
      } catch (err: any) {
        if (!mounted) return;
        setError(err?.message || 'Error al cargar datos');
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchAll();
    return () => { mounted = false };
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Administración de Permisos</Text>
          <Text style={styles.subtitle}>Gestiona usuarios, roles, módulos y permisos desde una sola pantalla</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.statsRow} contentContainerStyle={{ paddingHorizontal: 8 }}>
          <MobileStatCard iconName="person" iconColor="#1a48bc" count={userCount != null ? String(userCount) : '—'} label="Usuarios" />
          <MobileStatCard iconName="shield" iconColor="#2e7d32" count={roleCount != null ? String(roleCount) : '—'} label="Roles" />
          <MobileStatCard iconName="grid-on" iconColor="#8e24aa" count={moduleCount != null ? String(moduleCount) : '—'} label="Módulos" />
          <MobileStatCard iconName="article" iconColor="#f57c00" count={formCount != null ? String(formCount) : '—'} label="Formularios" />
        </ScrollView>

        <View style={styles.controlsRow}>
          <View style={styles.tabsRow}>
            <View style={styles.tabsBar}>
              <TouchableOpacity style={[styles.tabButton, activeTab === 'Resumen' && styles.tabActive]} onPress={() => setActiveTab('Resumen')}>
                <BSIcon name="grid-on" size={16} color={activeTab === 'Resumen' ? '#0b2540' : '#607d8b'} />
                <Text style={[styles.tabText, activeTab === 'Resumen' && styles.tabTextActive]}>Resumen</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tabButton, activeTab === 'Usuarios' && styles.tabActive]} onPress={() => setActiveTab('Usuarios')}>
                <BSIcon name="person" size={16} color={activeTab === 'Usuarios' ? '#0b2540' : '#607d8b'} />
                <Text style={[styles.tabText, activeTab === 'Usuarios' && styles.tabTextActive]}>Usuarios</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tabButton, activeTab === 'Roles' && styles.tabActive]} onPress={() => setActiveTab('Roles')}>
                <BSIcon name="shield" size={16} color={activeTab === 'Roles' ? '#0b2540' : '#607d8b'} />
                <Text style={[styles.tabText, activeTab === 'Roles' && styles.tabTextActive]}>Roles</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.tabButton, activeTab === 'Módulos' && styles.tabActive]} onPress={() => setActiveTab('Módulos')}>
                <BSIcon name="grid-on" size={16} color={activeTab === 'Módulos' ? '#0b2540' : '#607d8b'} />
                <Text style={[styles.tabText, activeTab === 'Módulos' && styles.tabTextActive]}>Módulos</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.actionsRow}>
            <TouchableOpacity style={styles.iconButton}>
              <BSIcon name="filter-list" size={20} color="#263238" />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.primaryButton]} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.primaryButtonText}>Registro usuario</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Contenido por pestaña */}
        {activeTab === 'Resumen' && (
          <View style={styles.matrixContainer}>
            <Text style={styles.matrixTitle}>Matriz de Permisos por Rol</Text>
            {loading && <Text style={{ marginTop: 8, color: '#666' }}>Cargando permisos...</Text>}
            {error && <Text style={{ marginTop: 8, color: 'red' }}>{error}</Text>}
            <MobileMatrix rows={(matrixRows && matrixRows.length > 0) ? matrixRows.map(r => ({ rol: r.rol, formulario: r.formulario })) : [{ rol: '—', formulario: '—' }]} />
          </View>
        )}

        {activeTab === 'Usuarios' && (
          <View style={{ marginTop: 12 }}>
            <View style={styles.searchBox}>
              <BSIcon name="zoom-in" size={16} color="#607d8b" />
              <Text style={styles.searchText}>Buscar por número de documento</Text>
            </View>
            <View style={styles.filterRow}>
              <TouchableOpacity style={styles.filterButton}><Text>Todos los usuarios</Text></TouchableOpacity>
              <TouchableOpacity style={styles.filterButton}><Text>Todos los estados</Text></TouchableOpacity>
            </View>

            <View style={styles.listContainer}>
              {users.length === 0 && !loading ? (
                <Text style={{ color: '#666', marginTop: 8 }}>No hay usuarios.</Text>
              ) : (
                users.map((u, i) => (
                  <MobileUserCard
                    key={u.id || i}
                    name={(u.first_name && u.first_last_name) ? `${u.first_name} ${u.first_last_name}` : (u.name || 'Sin nombre')}
                    email={u.email || u.username || '—'}
                    area={u.area_name || u.area || ''}
                    role={u.role_name || u.role || ''}
                    status={u.enabled === false ? 'Inhabilitado' : 'Activo'}
                    onEdit={() => navigation.navigate('EditUser', { id: u.id })}
                    onToggle={() => { setConfirmTarget({ type: 'user', item: u }); setConfirmVisible(true); }}
                  />
                ))
              )}
            </View>

            <MobileConfirmModal
              visible={confirmVisible}
              title="Confirmar"
              message={`¿Deseas cambiar el estado de ${(confirmTarget && (confirmTarget.item && (confirmTarget.item.first_name || confirmTarget.item.name || confirmTarget.item.title || confirmTarget.item.label))) || 'este elemento'}?`}
              onCancel={() => { setConfirmVisible(false); setConfirmTarget(null); }}
              onConfirm={async () => {
                  if (!confirmTarget) return setConfirmVisible(false);
                  setActionLoading(true);
                  try {
                    if (confirmTarget.type === 'user') {
                      const u = confirmTarget.item;
                      await deleteUser(String(u.id));
                      setUsers(prev => prev.map(p => p.id === u.id ? { ...p, enabled: !p.enabled } : p));
                    } else if (confirmTarget.type === 'role') {
                      // Simular inhabilitar rol localmente
                      const r = confirmTarget.item;
                      setRolesList(prev => prev.map(p => p.id === r.id ? { ...p, disabled: !p.disabled } : p));
                    } else if (confirmTarget.type === 'module') {
                      const m = confirmTarget.item;
                      setModulesList(prev => prev.map(p => p.id === m.id ? { ...p, active: !p.active } : p));
                    }
                  } catch (err: any) {
                    console.error('Error toggling item:', err);
                    setError(err?.message || 'Error al cambiar estado');
                  } finally {
                    setActionLoading(false);
                    setConfirmVisible(false);
                    setConfirmTarget(null);
                  }
                }}
            />
          </View>
        )}

        {activeTab === 'Roles' && (
          <View style={{ marginTop: 12 }}>
            <View style={styles.listContainer}>
              {rolesList.length === 0 && !loading ? (
                <Text style={{ color: '#666' }}>No hay roles.</Text>
              ) : (
                rolesList.slice(0, 8).map((r, i) => (
                  <MobileInfoCard
                    key={r.id || i}
                    title={r.name || r.label || `Rol ${i+1}`}
                    subtitle={r.description || 'Acceso parcial al sistema'}
                    badgeLabel={`${r.users_count || 0}`}
                    badgeColor={'#def7df'}
                    primaryText={'Ajustar'}
                    onPrimary={() => navigation.navigate('RoleDetail', { id: r.id })}
                    secondaryText={'Inhabilitar'}
                    onSecondary={() => { setConfirmTarget({ type: 'role', item: r }); setConfirmVisible(true); }}
                    iconName={'person-check'}
                    variant={'default'}
                  />
                ))
              )}
            </View>
          </View>
        )}

        {activeTab === 'Módulos' && (
          <View style={{ marginTop: 12 }}>
            <View style={styles.listContainer}>
              {modulesList.length === 0 && !loading ? (
                <Text style={{ color: '#666' }}>No hay módulos.</Text>
              ) : (
                modulesList.slice(0, 12).map((m, i) => (
                  <MobileInfoCard
                    key={m.id || i}
                    title={m.name || m.title || `Módulo ${i+1}`}
                    subtitle={m.description || 'Descripción breve del módulo'}
                    badgeLabel={m.active ? 'Activo' : 'Inactivo'}
                    badgeColor={m.active ? '#def7df' : '#fdecea'}
                    primaryText={'Ajustar'}
                    onPrimary={() => navigation.navigate('ModuleDetail', { id: m.id })}
                    secondaryText={m.active ? 'Inhabilitar' : 'Habilitar'}
                    onSecondary={() => { setConfirmTarget({ type: 'module', item: m }); setConfirmVisible(true); }}
                    iconName={'settings'}
                    variant={m.active ? 'default' : 'red'}
                  />
                ))
              )}
            </View>
          </View>
        )}

        <MobileFooter />
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminScreen;
