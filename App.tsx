/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Forms
 * App
 * @author-Himanshu Yadav
 * @modify date 2023-09-10 19:25:13
 */

import React, {useEffect, useState, useMemo, useCallback, FC} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {AsyncKeys} from './src/constants/Constants';
import ErrorBoundary from './src/components/ErrorBoundary';
import store from './src/store';
import AppNavigator from './src/navigationRoutes';
import RNAsyncStorageFlipper from 'rn-async-storage-flipper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo, {NetworkStatusProvider} from './src/network/NetworkStatus';
import {getAsyncEncrypted} from './src/utils/AsyncUtil';
import {AuthProvider} from './src/screenModules/login/AuthContext';
import {setUserData} from './src/redux/user/Action';

const App: FC = () => {
  const [isConnectionAvailable, setConnectionAvailable] =
    useState<boolean>(true);
  const [token, setToken] = useState(null);
  useEffect(() => {
    //Enable async storage flipper plugin in dev mode
    if (__DEV__) {
      RNAsyncStorageFlipper(AsyncStorage);
    }
    const netUnsubscribeFunc = NetInfo.addEventListener(state => {
      setConnectionAvailable(state.isConnected ?? false);
    });
    checkLogin();
    return () => {
      netUnsubscribeFunc();
    };
  }, []);

  const checkLogin = useCallback(async () => {
    const userData = await getAsyncEncrypted(AsyncKeys.userData, true);
    if (userData) {
      store.dispatch(setUserData(userData));
      setToken(userData.token);
    }
  }, []);

  const authContextData = useMemo(() => {
    return {
      token: token,
      setToken: setToken,
    };
  }, [token]);

  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <NetworkStatusProvider value={isConnectionAvailable}>
          <AuthProvider value={authContextData}>
            <Provider store={store}>
              <AppNavigator />
            </Provider>
          </AuthProvider>
        </NetworkStatusProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
};

export default App;
