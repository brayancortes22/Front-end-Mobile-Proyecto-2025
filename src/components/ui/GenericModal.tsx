import React from 'react';
import { Modal, View, Text, ScrollView, Pressable } from 'react-native';
import { Button } from 'react-native-paper';
import { genericModalStyles as styles } from '../../styles/GenericModal.styles';
import BSIcon from '../ui/BSIcon';

interface GenericModalProps {
  visible: boolean;
  onClose: () => void;
  title?: string;
  content?: string | React.ReactNode;
  onAccept?: () => void;
  acceptText?: string;
}

const GenericModal: React.FC<GenericModalProps> = ({
  visible,
  onClose,
  title,
  content,
  onAccept,
  acceptText = 'Aceptar',
}) => {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <View style={styles.header}>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <BSIcon name="x-lg" size={28} color="#757575" />
            </Pressable>
            <Text style={styles.title}>{title}</Text>
          </View>

          <ScrollView style={styles.scrollContent}>
            {content ? (
              typeof content === 'string' ? (
                <Text style={styles.legalText}>{content}</Text>
              ) : (
                content
              )
            ) : null}
          </ScrollView>

          <View style={styles.footer}>
            <Button mode="contained" onPress={() => { if (onAccept) onAccept(); else onClose(); }} contentStyle={styles.acceptButtonContent} style={styles.acceptButton} labelStyle={styles.acceptButtonText}>{acceptText}</Button>
            <Pressable onPress={onClose} style={styles.cancelButton}><Text style={styles.cancelButtonText}>Cerrar</Text></Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default GenericModal;
