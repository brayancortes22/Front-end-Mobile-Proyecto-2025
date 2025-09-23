import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import BSIcon from './ui/BSIcon';

interface Props {
  name: string;
  email: string;
  area?: string;
  role?: string;
  programa?: string;
  ficha?: string | number;
  status?: 'Activo' | 'Inhabilitado' | string;
  onEdit?: () => void;
  onToggle?: () => void;
}

const MobileUserCard: React.FC<Props> = ({ name, email, area, role, programa, ficha, status = 'Activo', onEdit, onToggle }) => {
  const normStatus = (s: string | undefined) => {
    const low = (s || '').toLowerCase();
    if (low.includes('inhabil') || low === 'inhabilitado') return 'Inhabilitado';
    if (low.includes('registr') || low === 'registrado') return 'Registrado';
    return 'Activo';
  };

  const st = normStatus(status);

  const variants: Record<string, any> = {
    Activo: {
      cardBg: '#eafbe3',
      border: '#1bb934',
      badgeBg: '#1bb934',
      badgeText: '#fff',
      iconColor: '#1a48bc',
      primaryBtnBg: '#d32f2f',
      primaryBtnText: '#fff',
      primaryLabel: 'Inhabilitar',
      pillBg: '#f2f2f2',
      pillText: '#1a48bc',
      editIcon: 'edit',
      primaryIcon: 'person',
    },
    Registrado: {
      cardBg: '#fff6d9',
      border: '#f1d86a',
      badgeBg: '#fff1c7',
      badgeText: '#b88600',
      iconColor: '#b88600',
      primaryBtnBg: '#2e7d32',
      primaryBtnText: '#fff',
      primaryLabel: 'Habilitar',
      pillBg: '#f2f2f2',
      pillText: '#1a48bc',
      editIcon: 'edit',
      primaryIcon: 'person',
    },
    Inhabilitado: {
      cardBg: '#ffecec',
      border: '#f6c5c5',
      badgeBg: '#ffdede',
      badgeText: '#a12f2f',
      iconColor: '#a12f2f',
      primaryBtnBg: '#2e7d32',
      primaryBtnText: '#fff',
      primaryLabel: 'Habilitar',
      pillBg: '#f2f2f2',
      pillText: '#1a48bc',
      editIcon: 'edit',
      primaryIcon: 'person',
    },
  };

  const v = variants[st] || variants.Activo;

  return (
    <View style={[styles.card, { backgroundColor: v.cardBg, borderColor: v.border }]}> 
      <View style={[styles.statusWrap, { backgroundColor: v.badgeBg }]}> 
        <Text style={[styles.statusText, { color: v.badgeText }]}>{st}</Text>
      </View>

      <BSIcon name="person" size={32} color={v.iconColor} />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.email}>{email}</Text>
      {area ? <Text style={styles.area}>Area : {area}</Text> : null}
      {programa ? <Text style={styles.area}>Programa : {programa}</Text> : null}
      {role ? (
        <View style={[styles.pill, { backgroundColor: v.pillBg }]}> 
          <Text style={[styles.pillText, { color: v.pillText }]}>{role}</Text>
        </View>
      ) : null}
      {ficha ? <Text style={styles.area}>Ficha : {ficha}</Text> : null}

      <TouchableOpacity style={[styles.primaryBtn, { backgroundColor: v.primaryBtnBg }]} onPress={onToggle}>
        <BSIcon name="person" size={16} color={v.primaryBtnText} />
        <Text style={[styles.primaryText, { color: v.primaryBtnText }]}>{v.primaryLabel}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.editBtn} onPress={onEdit}>
        <BSIcon name="edit" size={16} color="#1a48bc" />
        <Text style={styles.editText}>Editar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '100%',
    backgroundColor: '#eafbe3',
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#1bb934',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 2,
  },
  statusWrap: {
    backgroundColor: '#1bb934',
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 999,
    marginBottom: 8,
    alignSelf: 'flex-start',
    marginLeft: 2,
    marginTop: 2,
  },
  statusText: { color: '#fff', fontWeight: '700', fontSize: 14 },
  name: { marginTop: 8, fontSize: 16, fontWeight: '700', color: '#020817', textAlign: 'center' },
  email: { fontSize: 13, color: '#607d8b', marginTop: 2, textAlign: 'center' },
  area: { fontSize: 12, color: '#607d8b', marginTop: 8, textAlign: 'center' },
  pill: {
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 8,
    alignSelf: 'center',
  },
  pillText: { fontSize: 13, fontWeight: '700', color: '#1a48bc', textAlign: 'center' },
  primaryBtn: {
    paddingVertical: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#d32f2f',
  },
  primaryText: { color: '#fff', fontWeight: '700', marginLeft: 8, fontSize: 15 },
  editBtn: {
    marginTop: 10,
    width: '100%',
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e6e7ee',
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  editText: { color: '#1a48bc', fontWeight: '700', marginLeft: 8, fontSize: 15 },
});

export default MobileUserCard;
