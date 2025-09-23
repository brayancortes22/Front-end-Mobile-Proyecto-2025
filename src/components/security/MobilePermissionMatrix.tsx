import React from 'react';
import { View, Text } from 'react-native';
import styles from '../../styles/security/MobilePermissionMatrix.styles';

interface PermissionRow {
  rol: string;
  formulario: string;
  visualizar?: boolean;
  editar?: boolean;
  eliminar?: boolean;
  habilitar?: boolean;
}

interface MobilePermissionMatrixProps {
  rows: PermissionRow[];
}

const MobilePermissionMatrix: React.FC<MobilePermissionMatrixProps> = ({ rows }) => (
  <View style={styles.container}>
    <Text style={styles.heading}>Matriz de Permisos por Rol</Text>
    <View style={styles.header}>
      <Text style={styles.cell}>Rol</Text>
      <Text style={styles.cellWide}>Formulario</Text>
      <Text style={styles.cell}>Visualizar</Text>
      <Text style={styles.cell}>Editar</Text>
      <Text style={styles.cell}>Eliminar</Text>
      <Text style={styles.cellWide}>Inhabilitar/Habilitar</Text>
    </View>
    {rows.map((row, i) => (
      <View key={i} style={styles.row}>
        <Text style={styles.cell}>{row.rol}</Text>
        <Text style={styles.cellWide}>{row.formulario}</Text>
        <Text style={styles.cell}>{row.visualizar ? '✔️' : ''}</Text>
        <Text style={styles.cell}>{row.editar ? '✔️' : ''}</Text>
        <Text style={styles.cell}>{row.eliminar ? '✔️' : ''}</Text>
        <Text style={styles.cellWide}>{row.habilitar ? '✔️' : ''}</Text>
      </View>
    ))}
  </View>
);

export default MobilePermissionMatrix;
