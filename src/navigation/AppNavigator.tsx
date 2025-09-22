import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { BSIcon, SenaIcons } from '../components/ui/BSIcon';

// Screens
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../components/menu';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { VerificationCodeScreen } from '../screens/VerificationCodeScreen';
import { NewPasswordScreen } from '../screens/NewPasswordScreen';
import HomeScreen from '../screens/HomeScreen';

// Types
import { AuthStackParamList, RootStackParamList } from './types';

const Stack = createStackNavigator<RootStackParamList>();
const AuthStack = createStackNavigator<AuthStackParamList>();
const Tab = createBottomTabNavigator();

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
    <Stack.Screen name="Main" component={HomeScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
    <Stack.Screen name="Settings" component={SettingsScreen} />
    <Stack.Screen name="EditProfile" component={ProfileScreen} />
    <Stack.Screen name="ChangePassword" component={ProfileScreen} />
    {/* Agrega aquí más pantallas protegidas según tu app */}
  </Stack.Navigator>
);

// Main App Navigator con lógica de autenticación usando AuthContext
const AppNavigator: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // o un splash

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
