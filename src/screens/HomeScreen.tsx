import React from 'react';
import { View, Text, Image } from 'react-native';
import HamburgerHeader from '../components/HamburgerHeader';

const HomeScreen: React.FC = () => {
  return (
    <View className="flex-1 bg-white">
      {/* Header card (full width) */}
      <View className="px-4 pt-4">
        <HamburgerHeader />
      </View> 
    </View>
  );
};

export default HomeScreen;
