import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MobileFooter = () => {
  const year = new Date().getFullYear();
  return (
    <View style={s.footer}>
      <Text style={s.text}>© {year}. Desarrollado por Servicio Nacional de Aprendizaje</Text>
    </View>
  );
};

const s = StyleSheet.create({ footer: { paddingVertical: 12, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#e6e7ee', marginTop: 16 }, text: { color: '#6b7280', fontSize: 12 } });

export default MobileFooter;
