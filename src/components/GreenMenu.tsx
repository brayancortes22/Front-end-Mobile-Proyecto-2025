import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const assets = {
  imgImage:
    "http://localhost:3845/assets/115ba0404e48f5dcb5faec55c1f316efb111873f.png",
  imgImage1:
    "http://localhost:3845/assets/c15e3351e021342cedcff4fe5c634e0707a6e1ee.png",
  imgLogo:
    "http://localhost:3845/assets/201f6a74196576d2d1e978d2a70547043a7b2c0d.png",
  icon1:
    "http://localhost:3845/assets/7e96993c4a8440a81bf50d2476edc48c3d4380e5.svg",
  icon2:
    "http://localhost:3845/assets/231001f32bafe4baf7eb97a183ab5f116908d0c6.svg",
  avatar:
    "http://localhost:3845/assets/e1153fe0d53c30e529fdaff5d8917c116bb59bef.svg",
};

type Props = {
  onNavigate?: (route: string) => void;
};

const GreenMenu: React.FC<Props> = ({ onNavigate }) => {
  const nav = (route: string) => {
    if (onNavigate) onNavigate(route);
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Image source={{ uri: assets.imgLogo }} style={styles.logo} />
        <Text style={styles.titleText}>Autogestión CIES</Text>
      </View>

      <ScrollView
        style={styles.menuList}
        contentContainerStyle={{ paddingVertical: 8 }}
      >
        <TouchableOpacity style={styles.menuItem} onPress={() => nav("Home")}>
          <Image source={{ uri: assets.imgImage }} style={styles.menuIcon} />
          <Text style={styles.menuLabel}>Inicio</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => nav("Settings")}
        >
          <Image source={{ uri: assets.icon1 }} style={styles.menuIcon} />
          <Text style={styles.menuLabel}>Seguridad</Text>
        </TouchableOpacity>

        <View style={styles.menuGroup}>
          <TouchableOpacity
            style={[styles.menuItem, styles.activeItem]}
            onPress={() => nav("InicioAdministrador")}
          >
            <Image source={{ uri: assets.icon2 }} style={styles.menuIcon} />
            <Text style={[styles.menuLabel, { color: "#fff" }]}>
              Asignar seguimiento
            </Text>
          </TouchableOpacity>

          <View style={styles.subItem}>
            <Text style={styles.subText}>• Asignar</Text>
          </View>
          <View style={styles.subItem}>
            <Text style={styles.subText}>• Reasignar</Text>
          </View>
          <View style={styles.subItem}>
            <Text style={styles.subText}>• Seguimiento</Text>
          </View>
          <View style={styles.subItem}>
            <Text style={styles.subText}>• Historial de seguimiento</Text>
          </View>
          <View style={styles.subItem}>
            <Text style={styles.subText}>• Evaluar visita final</Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.profile} onPress={() => nav("Profile")}>
        <Image source={{ uri: assets.avatar }} style={styles.avatar} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.profileName}>brandon</Text>
          <View style={styles.rolePill}>
            <Text style={styles.roleText}>Administrador</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#109940",
    borderRadius: 18,
    padding: 16,
    marginTop: 12,
    width: "85%",
    height: "85%",
    position: "absolute",
    top: "10%",
    justifyContent: "space-between",
  },
  titleRow: { flexDirection: "row", alignItems: "center", paddingBottom: 10 },
  logo: { width: 48, height: 48, marginRight: 12, resizeMode: "contain" },
  titleText: { color: "#e6f6ea", fontSize: 16, fontWeight: "600" },
  menuList: { marginTop: 8, flexGrow: 0, maxHeight: 420 },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  menuIcon: { width: 20, height: 20, marginRight: 12, tintColor: "#fff" },
  menuLabel: { color: "#fff", fontSize: 18 },
  menuGroup: { marginTop: 6 },
  activeItem: {
    backgroundColor: "rgba(0,0,0,0.18)",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  subItem: { paddingLeft: 44, paddingVertical: 6 },
  subText: { color: "#d8f0db", fontSize: 15 },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    paddingTop: 6,
  },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: "#fff" },
  profileName: { color: "#fff", fontSize: 16, fontWeight: "700" },
  rolePill: {
    backgroundColor: "#0b6b2f",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 6,
  },
  roleText: { color: "#cfe9d1", fontWeight: "700" },
});

export default GreenMenu;
