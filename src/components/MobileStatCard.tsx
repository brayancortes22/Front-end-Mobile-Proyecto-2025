import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BSIcon from './ui/BSIcon';

interface Props {
  iconName: string;
  iconColor?: string;
  count: string | number;
  label: string;
  countColor?: string;
}

const MobileStatCard: React.FC<Props> = ({ iconName, iconColor = '#1a48bc', count, label, countColor }) => {
  return (
    <View style={s.card}>
      <View style={s.left}>
        <BSIcon name={iconName} size={34} color={iconColor} />
      </View>
      <View style={s.right}>
        <Text style={[s.count, { color: countColor || '#0b2540' }]}>{count}</Text>
        <Text style={s.label}>{label}</Text>
      </View>
    </View>
  );
};
const s = StyleSheet.create({
  card: {
    width: 170,
    height: 96,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#eef2f7',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  left: { width: 48, alignItems: 'center', justifyContent: 'center' },
  right: { flex: 1, paddingLeft: 10 },
  count: { fontSize: 22, fontWeight: '800', color: '#0b2540' },
  label: { fontSize: 13, color: '#607d8b', marginTop: 6 },
});

export default MobileStatCard;
