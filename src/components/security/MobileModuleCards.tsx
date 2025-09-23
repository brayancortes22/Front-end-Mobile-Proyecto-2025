import React from 'react';
import { View, Text, Pressable, ScrollView } from 'react-native';
import styles from '../../styles/security/MobileModuleCards.styles';

interface ModuleCard {
  name: string;
  status: string;
  description: string;
  onAdjust?: () => void;
}

interface MobileModuleCardsProps {
  modules: ModuleCard[];
  onRegisterForm?: () => void;
  onRegisterModule?: () => void;
}

const MobileModuleCards: React.FC<MobileModuleCardsProps> = ({ modules, onRegisterForm, onRegisterModule }) => (
  <ScrollView contentContainerStyle={styles.container}>
    <Text style={styles.titulo}>Gestión de Módulos-Sena</Text>
    <View style={styles.botonRegistrarParent}>
      <Pressable style={styles.botonRegistrar} onPress={onRegisterForm}>
        {/* Aquí va el ícono de registro de formulario */}
        <Text style={styles.registroFormulario}>Registro Formulario</Text>
      </Pressable>
      <Pressable style={styles.botonRegistrar} onPress={onRegisterModule}>
        {/* Aquí va el ícono de registro de módulo */}
        <Text style={styles.registroFormulario}>Registro Módulo</Text>
      </Pressable>
    </View>
    {/* Filtros y búsqueda */}
    <View style={styles.buscar}>
      <View style={styles.zoomInParent}>
        {/* Aquí va el ícono de búsqueda */}
        <Text style={styles.buscarPorNombre}>Buscar por nombre</Text>
      </View>
      <View style={styles.botonRegistrarParent}>
        <Pressable style={styles.filtro}><Text style={styles.todosLosUsuarios}>Todos los usuarios</Text></Pressable>
        <Pressable style={styles.filtro}><Text style={styles.todosLosUsuarios}>Todos los estados</Text></Pressable>
      </View>
    </View>
    <View style={styles.tarjetas}>
      {modules.map((mod, i) => (
        <View key={i} style={styles.tarjetaRoles}>
          <View style={styles.frameParent}>
            <View style={mod.name === 'Seguridad' ? styles.seguridadWrapper : styles.gestionAcademicaWrapper}>
              <Text style={styles.seguridadTypo}>{mod.name}</Text>
            </View>
            <View style={styles.estados}>
              <Text style={styles.activo}>{mod.status}</Text>
            </View>
          </View>
          <Text style={styles.administracionDeProcesos}>{mod.description}</Text>
          <View style={styles.tarjetaRolesInner}>
            <Pressable style={styles.ajustarWrapper} onPress={mod.onAdjust}>
              <Text style={styles.ajustar}>Ajustar</Text>
            </Pressable>
          </View>
        </View>
      ))}
    </View>
  </ScrollView>
);

export default MobileModuleCards;
