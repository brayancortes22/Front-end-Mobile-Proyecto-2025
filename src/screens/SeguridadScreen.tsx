
import { ScrollView, View , TouchableOpacity, Text,} from 'react-native';
import MobileStatCardList from '../components/security/MobileStatCardList';
import MobileSummarySection from '../components/security/MobileSummarySection';
import MobileNavTabs from '../components/security/MobileNavTabs';
import MobileUserManagement from '../components/security/MobileUserManagement';
import MobileRoleCards from '../components/security/MobileRoleCards';
import MobileModuleCards from '../components/security/MobileModuleCards';
  const modules = [
    {
      name: 'Gestion academica',
      status: 'Activo',
      description: 'Administración de procesos educativos',
      onAdjust: () => {},
    },
    {
      name: 'Seguridad',
      status: 'Activo',
      description: 'Administración de usuarios',
      onAdjust: () => {},
    },
    {
      name: 'Gestion academica',
      status: 'Activo',
      description: 'Administración de procesos educativos',
      onAdjust: () => {},
    },
    {
      name: 'Gestion academica',
      status: 'Activo',
      description: 'Administración de procesos educativos',
      onAdjust: () => {},
    },
  ];
import MobilePermissionMatrix from '../components/security/MobilePermissionMatrix';
import MobileUserStatusCard from '../components/security/MobileUserStatusCard';
import MobileUserSection from '../components/security/MobileUserSection';
import MobileFooter from '../components/MobileFooter';
import HamburgerHeader from '../components/HamburgerHeader';

import React, { useState } from 'react';

const SeguridadScreen = () => {
  // Datos de ejemplo
  const stats = [
    { iconName: 'user', count: 2, label: 'Usuarios' },
    { iconName: 'shield', count: 2, label: 'Roles' },
    { iconName: 'module', count: 2, label: 'Módulos' },
    { iconName: 'form', count: 3, label: 'Formularios' },
  ];
  const navTabs = [
    { icon: null, label: 'Resumen' },
    { icon: null, label: 'Usuarios' },
    { icon: null, label: 'Roles' },
    { icon: null, label: 'Módulos' },
  ];
  const matrixRows = [
    { rol: 'Administrador', formulario: 'Crear Usuario', visualizar: true, editar: true, eliminar: true, habilitar: true },
    { rol: 'Administrador', formulario: 'Editar Usuario', visualizar: true, editar: true, eliminar: true, habilitar: true },
    { rol: 'Usuario', formulario: 'Crear Usuario', visualizar: true, editar: false, eliminar: false, habilitar: false },
    { rol: 'Usuario', formulario: 'Editar Usuario', visualizar: true, editar: true, eliminar: false, habilitar: false },
  ];
  const roles = [
    {
      name: "Administrador",
      count: 2,
      description: "Acceso total al sistema",
      assigned: "2 usuarios asignados",
      onAdjust: () => {},
      onDisable: () => {},
    },
    {
      name: "Instructor",
      count: 2,
      description: "Acceso parcial al sistema",
      assigned: "2 usuarios asignados",
      onAdjust: () => {},
      onDisable: () => {},
    },
    {
      name: "Aprendiz",
      count: 2,
      description: "Acceso parcial al sistema",
      assigned: "2 usuarios asignados",
      onAdjust: () => {},
      onDisable: () => {},
    },
    {
      name: "Coordinador",
      count: 2,
      description: "Acceso total al sistema",
      assigned: "2 usuarios asignados",
      onAdjust: () => {},
      onDisable: () => {},
    },
  ];
  const users = [
    { name: 'Maria Elena Rodrigesz', email: 'merodrigez@soy.sena.edu.co', area: 'Sistemas e informática', role: 'Administrador', status: 'Activo' as const },
    { name: 'Juan Perez', email: 'jperez@soy.sena.edu.co', area: 'Sistemas e informática', role: 'Administrador', status: 'Activo' as const },
    { name: 'Maria Elena Rodrigesz', email: 'merodrigez@soy.sena.edu.co', area: 'Sistemas e informática', role: 'Aprendiz', status: 'Registrado' as const, programa: 'Análisis e informática', ficha: '29018171' },
    { name: 'Maria Elena Rodrigesz', email: 'merodrigez@soy.sena.edu.co', area: 'Sistemas e informática', role: 'Aprendiz', status: 'Registrado' as const, programa: 'Análisis e informática', ficha: '29018171' },
    { name: 'Maria Elena Rodrigesz', email: 'merodrigez@soy.sena.edu.co', area: 'Sistemas e informática', role: 'Administrador', status: 'Inhabilitado' as const },
    { name: 'Maria Elena Rodrigesz', email: 'merodrigez@soy.sena.edu.co', area: 'Sistemas e informática', role: 'Administrador', status: 'Inhabilitado' as const },
  ];

  const [selectedTab, setSelectedTab] = useState(0);

  
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      <View style={{ padding: 16 }}>
        {/* Header menú */}
        <HamburgerHeader />
        {/* Título y subtítulo */}
        <View style={{ marginBottom: 16 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 28, color: '#1e293b', textAlign: 'center' }}>Administración de Permisos</Text>
          <Text style={{ color: '#64748b', fontSize: 16, textAlign: 'center', marginTop: 4 }}>
            Gestiona usuarios, roles, módulos y permisos desde una sola pantalla
          </Text>
        </View>
        {/* Barra de navegación */}
        <MobileNavTabs
          tabs={navTabs.map((tab, i) => ({ ...tab, icon: tab.icon }))}
          selectedTab={selectedTab}
          onTabPress={setSelectedTab}
        />
        {selectedTab === 0 ? (
          <>
            {/* Tarjetas de estadísticas */}
            <MobileStatCardList stats={stats} />
            {/* Matriz de permisos con scroll horizontal */}
            <ScrollView horizontal showsHorizontalScrollIndicator={true} style={{ marginVertical: 8 }}>
              <MobilePermissionMatrix rows={matrixRows} />
            </ScrollView>
            {/* Distribución por roles y usuarios */}
            <MobileSummarySection />
          </>
        ) : selectedTab === 1 ? (
          <MobileUserSection users={users} />
        ) : selectedTab === 2 ? (
          <MobileRoleCards roles={roles} onRegister={() => {}} />
        ) : selectedTab === 3 ? (
          <MobileModuleCards modules={modules} onRegisterForm={() => {}} onRegisterModule={() => {}} />
        ) : null}
        <MobileFooter />
      </View>
    </ScrollView>
  );
};

export default SeguridadScreen;
