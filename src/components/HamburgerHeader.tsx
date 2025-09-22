import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import SideNavigation from "./SideNavigation";

const assets = {
  menuBg: require("../../assets/icons/menu.png"),
  bell: require("../../assets/icons/campana.png"),
};

type Props = {
  onNotificationsPress?: () => void;
};

const HamburgerHeader: React.FC<Props> = ({ onNotificationsPress }) => {
  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerInner}>
        <TouchableOpacity
          style={styles.menuButton}
          onPress={() => setMenuVisible(true)}
          testID="menu-button"
        >
          <Image source={assets.menuBg} style={styles.menuImage} />
        </TouchableOpacity>
        {/* salto de linea para que el menu se vea bien */}
        <View style={{ height: 12 }} />

        <View style={styles.breadcrumbs}>
          <Text style={styles.breadcrumbSmall}>dashboard</Text>
          <Text style={styles.breadcrumbArrow}>&gt;</Text>
          <Text style={styles.breadcrumbMain}>Inicio</Text>
        </View>

        <TouchableOpacity
          style={styles.notifications}
          onPress={onNotificationsPress}
          testID="notifications-button"
        >
          <Image source={assets.bell} style={styles.bell} />
          <Text style={styles.notificationsText}>Notificaciones</Text>
        </TouchableOpacity>
      </View>

      <SideNavigation
        visible={menuVisible}
        onClose={() => setMenuVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: "transparent" },
  headerInner: {
    backgroundColor: "#edf0f3",
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 12,
    // approximate height from design
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 6,
    elevation: 2,
  },
  menuButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  menuImage: { width: 28, height: 28, resizeMode: "contain" },
  breadcrumbs: {
    flex: 1,
    marginLeft: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  breadcrumbSmall: { color: "#9aa6ad", opacity: 0.9, fontSize: 14 },
  breadcrumbArrow: { color: "#607d8b", fontSize: 14, marginHorizontal: 8 },
  breadcrumbMain: { color: "#263238", fontSize: 20, fontWeight: "600" },
  notifications: { flexDirection: "row", alignItems: "center" },
  bell: { width: 20, height: 20, marginRight: 8 },
  notificationsText: { fontSize: 16, color: "#263238" },
});

export default HamburgerHeader;
