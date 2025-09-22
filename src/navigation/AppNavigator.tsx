import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BSIcon, SenaIcons } from '../components/ui/BSIcon';

// Screens
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../components/menu';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { VerificationCodeScreen } from '../screens/VerificationCodeScreen';
import { NewPasswordScreen } from '../screens/NewPasswordScreen';

// Types
import { AuthStackParamList, RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator();

// Tab Navigator para las pantallas principales (puedes agregar lógica para menú dinámico por rol aquí)
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          switch (route.name) {
            case 'Home':
              iconName = SenaIcons.home;
              break;
            case 'Profile':
              iconName = SenaIcons.profile;
              break;
            case 'Settings':
              iconName = SenaIcons.settings;
              break;
            default:
              iconName = SenaIcons.home;
          }
          return <BSIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#00A859',
        tabBarInactiveTintColor: '#9E9E9E',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#E0E0E0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      {/* Aquí puedes agregar las pantallas según el menú dinámico por rol */}
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: 'Perfil' }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{ tabBarLabel: 'Configuración' }} />
    </Tab.Navigator>
  );
};

// Login Screen Component
const LoginScreenComponent = ({ navigation }: any) => {
  return <LoginScreen navigation={navigation} />;
};


// AuthStack: solo pantallas públicas
const AuthStackNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreenComponent} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    <AuthStack.Screen name="VerificationCode" component={VerificationCodeScreen} />
    <AuthStack.Screen name="NewPassword" component={NewPasswordScreen} />
  </AuthStack.Navigator>
);

// AppStack: pantallas protegidas
const AppStackNavigator = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={MainTabNavigator} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="EditProfile" component={ProfileScreen} />
    <Stack.Screen name="ChangePassword" component={ProfileScreen} />
    {/* Agrega aquí más pantallas protegidas según tu app */}
  </Stack.Navigator>
);

// Main App Navigator con lógica de autenticación
const AppNavigator: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        setIsAuthenticated(!!token);
      } catch (error) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkToken();
  }, []);

  if (loading) {
    // Puedes mostrar un splash o loader aquí
    return null;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
