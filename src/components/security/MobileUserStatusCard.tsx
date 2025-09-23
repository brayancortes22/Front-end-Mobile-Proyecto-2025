import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../../styles/security/MobileUserStatusCard.styles';

interface UserStatus {
  name: string;
  email: string;
  area?: string;
  role: string;
  status: string;
  onEdit?: () => void;
  onToggle?: () => void;
}

const MobileUserStatusCard: React.FC<UserStatus> = ({ name, email, area, role, status, onEdit, onToggle }) => (
  <View style={styles.card}>
    <Text style={styles.status}>{status}</Text>
    <Text>{name}</Text>
    <Text>{email}</Text>
    {area && <Text>Área: {area}</Text>}
    <Text>Rol: {role}</Text>
    <View style={styles.actions}>
      <Pressable onPress={onToggle} style={styles.actionBtn}>
        <Text>{status === 'Activo' ? 'Inhabilitar' : 'Habilitar'}</Text>
      </Pressable>
      <Pressable onPress={onEdit}>
        <Text>Editar</Text>
      </Pressable>
    </View>
  </View>
);

export default MobileUserStatusCard;
