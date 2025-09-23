import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface Row { rol: string; formulario: string }

const MobileMatrix: React.FC<{ rows: Row[] }> = ({ rows }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rol</Text>
        <Text style={styles.headerText}>Formulario</Text>
      </View>
      <FlatList
        data={rows}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.pill}><Text style={styles.pillText}>{item.rol}</Text></View>
            <View style={styles.pill}><Text style={styles.pillText}>{item.formulario}</Text></View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginTop: 12 },
  header: { flexDirection: 'row', backgroundColor: '#f6f7fb', padding: 10, borderRadius: 8 },
  headerText: { flex: 1, fontWeight: '700', color: '#020817' },
  row: { flexDirection: 'row', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee', alignItems: 'center' },
  pill: { flex: 1, backgroundColor: '#fff', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 999, borderWidth: 1, borderColor: '#eef2f5' },
  pillText: { color: '#020817' },
});

export default MobileMatrix;
