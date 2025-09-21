import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { NavigationProps } from '../Api/types/entities/user.types';

const Menu: React.FC<NavigationProps> = ({ navigation }) => {
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [biometricsEnabled, setBiometricsEnabled] = React.useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = React.useState(false);

  const menuSections = [
    {
      title: 'Preferencias',
      items: [
        {
          id: 'notifications',
          title: 'Notificaciones',
          subtitle: 'Recibir notificaciones de la app',
          icon: 'notifications',
          type: 'switch',
          value: notificationsEnabled,
          onToggle: setNotificationsEnabled,
        },
        {
          id: 'biometrics',
          title: 'Autenticación Biométrica',
          subtitle: 'Usar huella dactilar o Face ID',
          icon: 'fingerprint',
          type: 'switch',
          value: biometricsEnabled,
          onToggle: setBiometricsEnabled,
        },
        {
          id: 'darkMode',
          title: 'Modo Oscuro',
          subtitle: 'Tema oscuro para la aplicación',
          icon: 'dark-mode',
          type: 'switch',
          value: darkModeEnabled,
          onToggle: setDarkModeEnabled,
        },
      ],
    },
    {
      title: 'Cuenta',
      items: [
        {
          id: 'changePassword',
          title: 'Cambiar Contraseña',
          subtitle: 'Actualizar tu contraseña',
          icon: 'lock',
          type: 'navigation',
          onPress: () => navigation.navigate('ChangePassword'),
        },
        {
          id: 'editProfile',
          title: 'Editar Perfil',
          subtitle: 'Modificar información personal',
          icon: 'edit',
          type: 'navigation',
          onPress: () => navigation.navigate('EditProfile'),
        },
      ],
    },
    {
      title: 'Soporte',
      items: [
        {
          id: 'help',
          title: 'Ayuda y Soporte',
          subtitle: 'Obtener ayuda con la aplicación',
          icon: 'help',
          type: 'navigation',
          onPress: () => {
            Alert.alert(
              'Ayuda y Soporte',
              'Para obtener ayuda, contacta al administrador del sistema o consulta la documentación.'
            );
          },
        },
        {
          id: 'about',
          title: 'Acerca de',
          subtitle: 'Información de la aplicación',
          icon: 'info',
          type: 'navigation',
          onPress: () => {
            Alert.alert(
              'AutoGestión CIES',
              'Versión 1.0.0\n\nSistema de gestión del Centro de Industria, Empresa y Servicios del SENA.\n\nDesarrollado por el equipo de desarrollo del CIES.'
            );
          },
        },
        {
          id: 'privacy',
          title: 'Política de Privacidad',
          subtitle: 'Ver política de privacidad',
          icon: 'privacy-tip',
          type: 'navigation',
          onPress: () => {
            Alert.alert(
              'Política de Privacidad',
              'La información personal se maneja de acuerdo con las políticas institucionales del SENA.'
            );
          },
        },
      ],
    },
    {
      title: 'Aplicación',
      items: [
        {
          id: 'clearCache',
          title: 'Limpiar Caché',
          subtitle: 'Eliminar datos temporales',
          icon: 'clear',
          type: 'action',
          onPress: () => {
            Alert.alert(
              'Limpiar Caché',
              '¿Estás seguro de que quieres limpiar el caché de la aplicación?',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Limpiar',
                  style: 'destructive',
                  onPress: () => {
                    // Implementar limpieza de caché
                    Alert.alert('Caché limpiado', 'El caché se ha limpiado correctamente.');
                  },
                },
              ]
            );
          },
        },
        {
          id: 'logout',
          title: 'Cerrar Sesión',
          subtitle: 'Salir de la aplicación',
          icon: 'logout',
          type: 'action',
          isDestructive: true,
          onPress: () => {
            Alert.alert(
              'Cerrar Sesión',
              '¿Estás seguro de que quieres cerrar sesión?',
              [
                { text: 'Cancelar', style: 'cancel' },
                {
                  text: 'Cerrar Sesión',
                  style: 'destructive',
                  onPress: () => navigation.navigate('Login'),
                },
              ]
            );
          },
        },
      ],
    },
  ];

  const renderSettingItem = (item: any, sectionIndex: number, itemIndex: number) => {
    const isLast = itemIndex === menuSections[sectionIndex].items.length - 1;

    return (
      <View key={item.id} style={[styles.settingItem, isLast && styles.lastItem]}>
        <View style={styles.settingItemContent}>
          <View style={[styles.settingIcon, item.isDestructive && styles.destructiveIcon]}>
            <Icon 
              name={item.icon} 
              size={24} 
              color={item.isDestructive ? '#DC3545' : '#6AB344'} 
            />
          </View>
          
          <View style={styles.settingText}>
            <Text style={[styles.settingTitle, item.isDestructive && styles.destructiveText]}>
              {item.title}
            </Text>
            <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
          </View>

          {item.type === 'switch' && (
            <Switch
              value={item.value}
              onValueChange={item.onToggle}
              trackColor={{ false: '#E0E0E0', true: '#6AB344' }}
              thumbColor={item.value ? '#FFFFFF' : '#FFFFFF'}
            />
          )}

          {(item.type === 'navigation' || item.type === 'action') && (
            <TouchableOpacity onPress={item.onPress}>
              <Icon name="chevron-right" size={20} color="#BDBDBD" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        {menuSections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <View style={styles.sectionContent}>
              {section.items.map((item, itemIndex) => 
                renderSettingItem(item, sectionIndex, itemIndex)
              )}
            </View>
          </View>
        ))}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            AutoGestión CIES v1.0.0
          </Text>
          <Text style={styles.footerText}>
            SENA - Centro de Industria, Empresa y Servicios
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2D5016',
    marginBottom: 8,
    marginHorizontal: 16,
  },
  sectionContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  settingItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  destructiveIcon: {
    backgroundColor: '#FFEBEE',
  },
  settingText: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212121',
    marginBottom: 2,
  },
  destructiveText: {
    color: '#DC3545',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#757575',
  },
  footer: {
    padding: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9E9E9E',
    textAlign: 'center',
    marginBottom: 4,
  },
});

export default Menu;
