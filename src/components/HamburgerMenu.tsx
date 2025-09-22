import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, SafeAreaView, Pressable } from 'react-native';
import SideNavigation from './SideNavigation';

interface HamburgerMenuProps {
  onLogout?: () => void;
}

export const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onLogout }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="p-2"
        accessibilityLabel="Abrir menú"
      >
        <View className="justify-center w-8 h-8">
          <View className="h-0.5 bg-gray-800 mb-1" />
          <View className="h-0.5 bg-gray-800 mb-1" />
          <View className="h-0.5 bg-gray-800" />
        </View>
      </TouchableOpacity>

      <Modal
        visible={open}
        animationType="fade"
        transparent
        onRequestClose={() => setOpen(false)}
      >
        <SafeAreaView className="flex-1 bg-black/40">
          <Pressable style={{ flex: 1 }} onPress={() => setOpen(false)} />

          <View className="absolute right-4 top-16 w-72">
            <SideNavigation visible={open} onClose={() => setOpen(false)} />
          </View>
        </SafeAreaView>
      </Modal>
    </>
  );
};

export default HamburgerMenu;
