import React from "react";
import { View, StyleSheet } from "react-native";
import HamburgerHeader from "../components/HamburgerHeader";

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Header card (full width) */}
      <View style={styles.headerWrap}>
        <HamburgerHeader />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerWrap: { paddingHorizontal: 16, paddingTop: 16 },
});

export default HomeScreen;
