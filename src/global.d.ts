import 'react-native';

declare module 'react-native' {
  // Extend existing prop types to allow className for NativeWind
  interface ViewProps {
    className?: string;
  }
  interface TextProps {
    className?: string;
  }
  interface ImageProps {
    className?: string;
  }
}

declare module 'nativewind' {
  import { ComponentType } from 'react';
  export function styled<T extends ComponentType<any>>(component: T): T;
}
