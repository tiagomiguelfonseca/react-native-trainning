// import {CompositeNavigationProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {FunctionComponent} from 'react';
// import type {RouteProp} from '@react-navigation/native';
import {EdgeInsets} from 'react-native-safe-area-context';
// import {User} from './users';

export type MainStackParamsList = {
  RegisterScreen: undefined;
  LoginScreen: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends MainStackParamsList {}
  }
}

export type MainStackScreenProps = NativeStackScreenProps<MainStackParamsList>;

export type WrappedScreenComponentProps = MainStackScreenProps & {
  insets: EdgeInsets | null;
  isLoading: boolean;
  showLoader: Function;
  hideLoader: Function;
  isConnectionAvailable: boolean;
};

export type StackScreenComponent =
  FunctionComponent<WrappedScreenComponentProps>;
