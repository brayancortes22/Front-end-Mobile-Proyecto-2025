import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Modal,
  Pressable,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SideNavigation from "./SideNavigation";

interface HamburgerMenuProps {
  onLogout?: () => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        accessibilityLabel="Abrir menú"
        style={styles.buttonWrapper}
      >
        <View style={styles.barsWrapper}>
          <View style={styles.bar} />
          <View style={styles.bar} />
          <View style={styles.bar} />
        </View>
      </TouchableOpacity>

      <Modal
        visible={open}
        animationType="fade"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <SafeAreaView style={styles.modalSafeArea}>
          <Pressable style={{ flex: 1 }} onPress={() => setOpen(false)} />

          <View style={styles.panelContainer}>
            <SideNavigation visible={open} onClose={() => setOpen(false)} />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default HamburgerMenu;

const styles = StyleSheet.create({
  buttonWrapper: { padding: 8 },
  barsWrapper: { justifyContent: "center", width: 32, height: 32 },
  bar: { height: 2, backgroundColor: "#1f2937", marginBottom: 4 },
  modalSafeArea: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  panelContainer: { position: "absolute", right: 16, top: 64, width: 288 },
});
