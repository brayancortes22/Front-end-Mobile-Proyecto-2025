// Tipos para la navegación de la aplicación

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  VerificationCode: { email?: string };
  NewPassword: { email: string; code: string };
};

export type MainTabParamList = {
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
};

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  VerificationCode: { email?: string };
  NewPassword: { email: string; code: string };
  Main: undefined;
  Home: undefined;
  Profile: undefined;
  Settings: undefined;
  Admin: undefined;
  MassRegistration: undefined;
  EditProfile: undefined;
  ChangePassword: undefined;
};

// Declaración de tipos globales para React Navigation
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}