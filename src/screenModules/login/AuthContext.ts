import React from 'react';

export type AuthContextData = {
  token: string | null;
  setToken: Function;
};
export const AuthContext = React.createContext<AuthContextData>({
  token: null,
  setToken: () => {},
});
export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
