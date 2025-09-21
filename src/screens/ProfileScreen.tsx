import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { NavigationProps, User } from '../Api/types/entities/user.types';

interface ProfileScreenProps extends NavigationProps {}

// Assets extraídos de Figma (localhost)
const img = "http://localhost:3845/assets/e57ef17666aa648cdcee7477a9afb7ca6ebb0c30.png";
const imgBrayanStid = "http://localhost:3845/assets/ac8877dad35185087eac27f09cf90b08b1b3519e.png";
const img1 = "http://localhost:3845/assets/ea5484c34c6b35e5eda577e5532457b4aec03cee.svg";

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  // Si quieres usar datos dinámicos, puedes usar el estado y los hooks ya definidos arriba
  return (
    <ScrollView style={styles.container}>
      {/* NAV BAR */}
      <View style={styles.navBar}>
        <View style={styles.navBarContent}>
          <TouchableOpacity style={styles.menuBtn}>
            <Image source={{ uri: img }} style={styles.menuImg} />
          </TouchableOpacity>
          <View style={styles.navBarTextContainer}>
            <Text style={styles.navBarTextDashboard}>dashboard {'>'} </Text>
            <Text style={styles.navBarTextInicio}>Inicio</Text>
          </View>
          <View style={styles.notificationContainer}>
            <Image source={{ uri: img1 }} style={styles.notificationIcon} />
            <Text style={styles.notificationText}>Notificaciones</Text>
          </View>
        </View>
      </View>

      {/* CARD PERFIL */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>  
          <Image source={{ uri: imgBrayanStid }} style={styles.avatar} />
          <Text style={styles.name}>brandon sneider contreras velazques</Text>
          <Text style={styles.email}>bscontreras49@soy.sena.edu.co</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          <Text style={styles.label}>Nombre</Text>
          <Text style={styles.value}>Brandon sneider</Text>
          <Text style={styles.label}>Apellidos</Text>
          <Text style={styles.value}>contreras velazques</Text>
          <Text style={styles.label}>Documento</Text>
          <Text style={styles.value}>123527836</Text>
          <Text style={styles.label}>Correo</Text>
          <Text style={styles.value}>bscontreras49@soy.sena.edu.co</Text>
          <Text style={styles.label}>Tipo Documento</Text>
          <Text style={styles.value}>Cedula de ciudadania</Text>
          <Text style={styles.label}>Telefono</Text>
          <Text style={styles.value}>3190000000</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Cambiar Contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 8,
  },
  navBar: {
    backgroundColor: '#dfe3e8',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  navBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuBtn: {
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuImg: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
  },
  navBarTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  navBarTextDashboard: {
    fontSize: 14,
    color: '#263238',
    opacity: 0.5,
    marginRight: 5,
  },
  navBarTextInicio: {
    fontSize: 20,
    color: '#263238',
    fontWeight: 'bold',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationIcon: {
    width: 24,
    height: 24,
    marginRight: 5,
    resizeMode: 'contain',
  },
  notificationText: {
    fontSize: 14,
    color: '#000',
  },
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  card: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    marginBottom: 8,
    borderWidth: 4,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 2,
    textAlign: 'center',
    textTransform: 'capitalize',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  email: {
    fontSize: 15,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 8,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  infoContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#263238',
    marginBottom: 16,
    textAlign: 'center',
  },
  label: {
    fontSize: 11,
    color: '#2196f3',
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: '#455a64',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#43a047',
    borderRadius: 10,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default ProfileScreen;