import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/security/MobileRoleDistribution.styles';

interface RoleDistribution {
  role: string;
  description: string;
  count: number;
  label: string;
}

interface MobileRoleDistributionProps {
  roles: RoleDistribution[];
}

const getRoleColor = (role: string) => {
  switch (role) {
    case 'Administrador': return styles.green;
    case 'Usuarios': return styles.red;
    case 'Aprendices': return styles.blue;
    case 'Instructores': return styles.yellow;
    case 'Coordinadores': return styles.pink;
    default: return {};
  }
};

const MobileRoleDistribution: React.FC<MobileRoleDistributionProps> = ({ roles }) => (
  <View style={styles.container}>
    <Text style={styles.title}>Distribución por Roles</Text>
    <Text style={styles.subtitle}>Usuarios asignados por rol</Text>
    {roles.map((r, i) => (
      <View key={i} style={styles.roleRow}>
        <View>
          <Text style={styles.roleInfo}>{r.role}</Text>
          <Text style={styles.description}>{r.description}</Text>
        </View>
        <View style={[styles.count, getRoleColor(r.role)]}>
          <Text>{r.count}</Text>
          <Text>{r.label}</Text>
        </View>
      </View>
    ))}
  </View>
);

export default MobileRoleDistribution;
