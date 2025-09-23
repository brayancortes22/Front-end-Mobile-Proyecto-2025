import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface Props {
  visible: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const MobileConfirmModal: React.FC<Props> = ({ visible, title = 'Confirmar acción', message, confirmText = 'Confirmar', cancelText = 'Cancelar', onConfirm, onCancel }) => {
  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={s.backdrop}>
        <View style={s.box}>
          <Text style={s.title}>{title}</Text>
          <Text style={s.message}>{message}</Text>
          <View style={s.actions}>
            <TouchableOpacity style={[s.btn, s.btnCancel]} onPress={onCancel}>
              <Text style={s.btnCancelText}>{cancelText}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[s.btn, s.btnConfirm]} onPress={onConfirm}>
              <Text style={s.btnConfirmText}>{confirmText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const s = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'center', alignItems: 'center', padding: 20 },
  box: { width: '100%', maxWidth: 420, backgroundColor: '#fff', borderRadius: 12, padding: 18 },
  title: { fontSize: 16, fontWeight: '700', marginBottom: 8, color: '#0b2540' },
  message: { fontSize: 14, color: '#345', marginBottom: 16 },
  actions: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center' },
  btnCancel: { backgroundColor: '#f1f1f1', marginRight: 8 },
  btnConfirm: { backgroundColor: '#0b8f3a' },
  btnCancelText: { color: '#333', fontWeight: '700' },
  btnConfirmText: { color: '#fff', fontWeight: '700' },
});

export default MobileConfirmModal;
