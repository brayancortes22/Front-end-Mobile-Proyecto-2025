import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../context/AuthContext';
import { menu } from '../Api/Services/Menu';
import { MenuItem as MenuItemType, MenuUserInfo } from '../Api/types/entities/menu.types';
import BSIcon from './ui/BSIcon';

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
  const [profileOpen, setProfileOpen] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [userInfo, setUserInfo] = useState<MenuUserInfo>({ name: 'Usuario', role: '' });
  const [loadingMenu, setLoadingMenu] = useState(false);

  const { setIsAuthenticated } = useAuth();

  const nav = (route: string) => {
    if (onNavigate) onNavigate(route);
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('user');
    } catch (e) {
      // ignore
    }
    try { setIsAuthenticated(false); } catch(e){}
    setProfileOpen(false);
    nav('Login');
  };

  // Load user from storage and fetch menu
  useEffect(() => {
    const loadMenu = async () => {
      try {
        setLoadingMenu(true);
        const rawUser = await AsyncStorage.getItem('user');
        if (!rawUser) return;
        const parsed = JSON.parse(rawUser);
        const userId = parsed?.id || parsed?.user_id || parsed?.pk || null;
        const userName = parsed?.nombre || parsed?.name || parsed?.full_name || parsed?.email || '';
        if (!userId) return;
        const data = await menu.getMenuItems(userId, userName);
        setMenuItems(data.menuItems || []);
        setUserInfo(data.userInfo || { name: userName || 'Usuario', role: '' });
      } catch (e) {
        // ignore
      } finally {
        setLoadingMenu(false);
      }
    };
    loadMenu();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <Image source={{ uri: assets.imgLogo }} style={styles.logo} />
        <View style={styles.titleTextWrap}>
          <Text style={styles.titleTextTop}>Autogestión</Text>
          <Text style={styles.titleTextBottom}>CIES</Text>
        </View>
      </View>

      <ScrollView
        style={styles.menuList}
        contentContainerStyle={{ paddingVertical: 8 }}
      >
        {loadingMenu ? (
          <View style={{ padding: 12 }}><Text style={{ color: '#fff' }}>Cargando...</Text></View>
        ) : (
          // Group by module
          (() => {
            const groups: Record<string, MenuItemType[]> = {};
            menuItems.forEach(item => {
              if (!groups[item.module]) groups[item.module] = [];
              groups[item.module].push(item);
            });
            return Object.entries(groups).map(([module, items]) => {
              const moduleKey = module.toLowerCase();

                // Only render as a single module button when module is 'inicio'
                // Other modules (even with a single item) are displayed as a group
                if (moduleKey === 'inicio') {
                const target = items[0];
                return (
                  <TouchableOpacity key={module} style={[styles.menuItem, { paddingVertical: 14 }]} onPress={() => nav(target.path)}>
                    <BSIcon name={target?.icon || 'home'} size={18} color="#fff" />
                    <Text style={[styles.menuLabel, { marginLeft: 8, fontWeight: '800' }]}>{module}</Text>
                  </TouchableOpacity>
                );
              }

              return (
                <View key={module} style={styles.menuGroup}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, marginBottom: 6 }}>
                    <BSIcon name={items[0]?.icon || 'home'} size={18} color="#fff" />
                    <Text style={[styles.menuLabel, { marginLeft: 8, fontWeight: '800' }]}>{module}</Text>
                  </View>
                  {items.map(i => (
                    <TouchableOpacity key={i.id} style={[styles.menuItem, styles.subItemRow]} onPress={() => nav(i.path)}>
                      <Text style={styles.subBullet}>•</Text>
                      <Text style={[styles.menuLabel, styles.subTextLabel]}>{i.name}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              );
            });
          })()
        )}
      </ScrollView>

      <TouchableOpacity style={styles.profile} onPress={() => setProfileOpen(true)}>
        <Image source={{ uri: assets.avatar }} style={styles.avatar} />
        <View style={{ marginLeft: 12 }}>
          <Text style={styles.profileName}>brandon</Text>
          <View style={styles.rolePill}>
            <Text style={styles.roleText}>Administrador</Text>
          </View>
        </View>
      </TouchableOpacity>

      <Modal visible={profileOpen} transparent animationType="fade" onRequestClose={() => setProfileOpen(false)}>
        <Pressable style={modalStyles.modalOverlay} onPress={() => setProfileOpen(false)} />
        <View style={modalStyles.profileCardContainer} pointerEvents="box-none">
          <View style={modalStyles.profileCard}>
            <Text style={modalStyles.cardName}>brayan stid cortes lombana</Text>
            <Text style={modalStyles.cardEmail}>bscl20062007@gmail.com</Text>

            <TouchableOpacity style={modalStyles.cardRow} onPress={() => { setProfileOpen(false); nav('Profile'); }}>
              <Text style={modalStyles.cardLink}>Ver perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={modalStyles.cardMutedRow} onPress={() => { /* cambiar rol UI */ }}>
              <Text style={modalStyles.cardMuted}>Cambiar rol</Text>
            </TouchableOpacity>

            <View style={modalStyles.roleRow}>
              <Image source={{ uri: assets.avatar }} style={modalStyles.roleIcon} />
              <Text style={modalStyles.roleName}>Administrador</Text>
              <View style={modalStyles.roleDot} />
            </View>

            <TouchableOpacity style={modalStyles.logoutButton} onPress={handleLogout}>
              <Text style={modalStyles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  titleRow: { flexDirection: "column", alignItems: "flex-start", paddingBottom: 10 },
  logo: { width: 56, height: 56, marginBottom: 6, resizeMode: "contain" },
  titleTextWrap: { marginLeft: 0 },
  titleTextTop: { color: "#e6f6ea", fontSize: 14, fontWeight: "700" },
  titleTextBottom: { color: "#e6f6ea", fontSize: 16, fontWeight: "800" },
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
  subItemRow: { paddingLeft: 24, paddingVertical: 10, alignItems: 'center', flexDirection: 'row' },
  subBullet: { color: '#d8f0db', fontSize: 14, marginRight: 12 },
  subTextLabel: { color: '#d8f0db', fontSize: 15 },
});

// Styles for profile modal/card
const modalStyles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.35)'
  },
  profileCardContainer: {
    position: 'absolute',
    right: 24,
    top: 80,
    width: 300,
    alignItems: 'flex-end',
  },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: 300,
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
    elevation: 6,
  },
  cardName: { fontSize: 16, fontWeight: '700', color: '#263238', marginBottom: 4 },
  cardEmail: { fontSize: 13, color: '#7b8a8d', marginBottom: 12 },
  cardRow: { paddingVertical: 8 },
  cardLink: { color: '#263238', fontSize: 15 },
  cardMutedRow: { paddingVertical: 6 },
  cardMuted: { color: '#9e9e9e', fontSize: 14 },
  roleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  roleIcon: { width: 20, height: 20, borderRadius: 10, backgroundColor: '#e0e0e0' },
  roleName: { marginLeft: 6, color: '#263238', fontWeight: '600' },
  roleDot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#00C853', marginLeft: 'auto' },
  logoutButton: {
    marginTop: 14,
    backgroundColor: '#F28B8B',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: { color: '#6b0b0b', fontWeight: '700' },
});

// merge modal styles into styles so exports remain consistent
Object.assign(styles, modalStyles);

export default GreenMenu;
