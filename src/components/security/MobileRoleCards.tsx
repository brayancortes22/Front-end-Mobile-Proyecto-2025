import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import styles from '../../styles/security/MobileRoleCards.styles';

interface RoleCard {
  name: string;
  count: number;
  description: string;
  assigned: string;
  onAdjust?: () => void;
  onDisable?: () => void;
}

interface MobileRoleCardsProps {
  roles: RoleCard[];
  onRegister?: () => void;
}

const MobileRoleCards: React.FC<MobileRoleCardsProps> = ({ roles, onRegister }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.titulo}>Gestión de Roles-Sena</Text>
    <Pressable style={styles.botonRegistrar} onPress={onRegister}>
      {/* Aquí va el ícono de registro */}
      <Text style={styles.registroRol}>Registro Rol</Text>
    </Pressable>
    {/* Filtros y búsqueda */}
    <View style={styles.buscar}>
      <View style={styles.zoomInParent}>
        {/* Aquí va el ícono de búsqueda */}
        <Text style={styles.buscarPorRol}>Buscar por rol</Text>
      </View>
      <View style={styles.filtroParent}>
        <Pressable style={styles.filtro}><Text style={styles.todosLosUsuarios}>Todos los usuarios</Text></Pressable>
        <Pressable style={styles.filtro}><Text style={styles.todosLosUsuarios}>Todos los estados</Text></Pressable>
      </View>
    </View>
    <View style={styles.tarjetas}>
      {roles.map((role, i) => (
        <View key={i} style={styles.tarjetaRoles}>
          <View style={styles.frameParent}>
            <View style={styles.administradorWrapper}>
              <Text style={styles.administrador}>{role.name}</Text>
            </View>
            <View style={styles.estados}>
              <Text style={styles.activo}>{role.count}</Text>
            </View>
          </View>
          <Text style={styles.accesoTotalAl}>{role.description}</Text>
          <View style={styles.usuariosAsignadosParent}>
            <Text style={styles.usuariosAsignados}>{role.assigned}</Text>
            <Pressable style={styles.ajustar} onPress={role.onAdjust}>
              <Text>Ajustar</Text>
            </Pressable>
          </View>
          <View style={styles.inhabilitar}>
            {/* Aquí va el ícono de inhabilitar */}
            <Text style={styles.contenedorInhabilitar}>Inhabilitar</Text>
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
);

export default MobileRoleCards;
