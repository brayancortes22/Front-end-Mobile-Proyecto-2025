import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, Dimensions, TouchableWithoutFeedback, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import GreenMenu from './GreenMenu';

type Props = {
  visible: boolean;
  onClose: () => void;
};

const SCREEN_WIDTH = Dimensions.get('window').width;
const PANEL_WIDTH = Math.min(320, SCREEN_WIDTH * 0.85);

const SideNavigation: React.FC<Props> = ({ visible, onClose }) => {
  const nav = useNavigation<any>();
  const anim = useRef(new Animated.Value(visible ? 0 : -PANEL_WIDTH)).current;

  useEffect(() => {
    Animated.timing(anim, { toValue: visible ? 0 : -PANEL_WIDTH, duration: 220, useNativeDriver: true }).start();
  }, [visible, anim]);

  const handleNavigate = (route: string) => {
    onClose();
    // slight delay so panel closes smoothly
    setTimeout(() => nav.navigate(route), 250);
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <SafeAreaView style={styles.modalSafeArea}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <Animated.View style={[styles.panelWrapper, { transform: [{ translateX: anim }] }]}>
          <View style={styles.panelInner}>
            <GreenMenu onNavigate={handleNavigate} />
          </View>
        </Animated.View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999 },
  backdrop: { flex: 1, backgroundColor: 'rgba(0,0,0,0.35)' },
  modalSafeArea: { flex: 1, backgroundColor: 'transparent' },
  panelWrapper: { position: 'absolute', left: 0, top: 0, bottom: 0, width: PANEL_WIDTH, paddingLeft: 8 },
  panelInner: { flex: 1, backgroundColor: 'transparent' , paddingTop: 0, paddingHorizontal: 0, shadowColor: '#000', shadowOpacity: 0.15, shadowRadius: 8, elevation: 10 },
  title: { fontSize: 18, fontWeight: '700', marginBottom: 12, color: '#263238' },
  item: { paddingVertical: 12, borderBottomColor: '#eee', borderBottomWidth: 1 },
  itemText: { fontSize: 16, color: '#263238' },
  footer: { marginTop: 24 },
});

export default SideNavigation;
