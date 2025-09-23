import React from 'react';
import { View, Text, TextInput, Pressable, ScrollView } from 'react-native';
import MobileUserStatusCard from './MobileUserStatusCard';
import styles from '../../styles/security/MobileUserSection.styles';

interface User {
  name: string;
  email: string;
  area?: string;
  role: string;
  status: 'Activo' | 'Registrado' | 'Inhabilitado';
  programa?: string;
  ficha?: string;
}

interface MobileUserSectionProps {
  users: User[];
  onRegister?: () => void;
}

const getColor = (status: string) => {
  if (status === 'Activo') return styles.green;
  if (status === 'Registrado') return styles.yellow;
  if (status === 'Inhabilitado') return styles.red;
  return {};
};

const MobileUserSection: React.FC<MobileUserSectionProps> = ({ users, onRegister }) => {
  // Agrupar usuarios por estado
  const habilitados = users.filter(u => u.status === 'Activo');
  const registrados = users.filter(u => u.status === 'Registrado');
  const inhabilitados = users.filter(u => u.status === 'Inhabilitado');

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gestión De Usuarios-Sena</Text>
      <Pressable style={styles.registerBtn} onPress={onRegister}>
        <Text style={styles.registerBtnText}>+ Registro usuario</Text>
      </Pressable>
      <View style={styles.filtersRow}>
        <View style={styles.filterInputRow}>
          <TextInput style={styles.input} placeholder="Buscar por número de documento" />
        </View>
        <View style={styles.filterBtnsRow}>
          <Pressable style={styles.filterBtn}><Text>Todos los usuarios</Text></Pressable>
          <Pressable style={styles.filterBtn}><Text>Todos los estados</Text></Pressable>
        </View>
      </View>
      {/* Usuarios habilitados */}
      <Text style={styles.habilitadosTitle}>Usuarios habilitados ( {habilitados.length} )</Text>
      {habilitados.map((u, i) => (
        <View key={i} style={[styles.cardWrapper, getColor(u.status)]}>
          <MobileUserStatusCard {...u} />
        </View>
      ))}
      {/* Usuarios registrados */}
      <Text style={styles.registradosTitle}>Usuarios Registrados ( {registrados.length} )</Text>
      {registrados.map((u, i) => (
        <View key={i} style={[styles.cardWrapper, getColor(u.status)]}>
          <MobileUserStatusCard {...u} />
        </View>
      ))}
      {/* Usuarios inhabilitados */}
      <Text style={styles.inhabilitadosTitle}>Usuarios Inhabilitados ( {inhabilitados.length} )</Text>
      {inhabilitados.map((u, i) => (
        <View key={i} style={[styles.cardWrapper, getColor(u.status)]}>
          <MobileUserStatusCard {...u} />
        </View>
      ))}
    </ScrollView>
  );
};

export default MobileUserSection;
