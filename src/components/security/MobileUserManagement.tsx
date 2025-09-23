import React from 'react';
import { View, Text, Pressable } from 'react-native';
import styles from '../../styles/security/MobileUserManagement.styles';

interface MobileUserManagementProps {
  onRegister?: () => void;
}

const MobileUserManagement: React.FC<MobileUserManagementProps> = ({ onRegister }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Gestión de usuarios-sena</Text>
    <Pressable style={styles.registerBtn} onPress={onRegister}>
      {/* Aquí va el ícono de registro */}
      <Text style={styles.registerText}>Registro usuario</Text>
    </Pressable>
  </View>
);

export default MobileUserManagement;
