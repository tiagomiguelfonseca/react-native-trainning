/**
 * @author Himanshu Yadav
 * @email himanshu.yadav@studiographene.com
 * @create date 2022-06-23 18:50:49
 * @modify date 2022-11-29 11:42:10
 * @desc Main file which contains navigators(Stack and Bottom Tabs) created using react-navigation v6.
 */

import React, {useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ScreenNames} from '../constants/Constants';
import {
  stackScreenOptions,
  tabScreenOptions,
  drawerScreenOptions,
} from './NavigationUtil';

//Screen Imports
import Discovery from '../screenModules/discovery/Discovery';
import Homepage from '../screenModules/homePage/Homepage';
import Profile from '../screenModules/profile/Profile';
import LoginScreen from '../screenModules/login/Login';
import RegisterScreen from '../screenModules/login/Register';
import {AuthContext} from '../screenModules/login/AuthContext';
import SplashScreen from '../screenModules/splashScreen/Splash';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const HomepageStack = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name={ScreenNames.Homepage} component={Homepage} />
    </Stack.Navigator>
  );
};

const MainTab = () => {
  return (
    <Tab.Navigator screenOptions={tabScreenOptions}>
      <Tab.Screen name={ScreenNames.Profile} component={Profile} />
      <Tab.Screen name={ScreenNames.Discovery} component={Discovery} />
    </Tab.Navigator>
  );
};

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name={ScreenNames.Profile} component={Profile} />
      <Stack.Screen name={ScreenNames.Discovery} component={Discovery} />
    </Stack.Navigator>
  );
};

const MainDrawer = () => {
  return (
    <Drawer.Navigator screenOptions={drawerScreenOptions}>
      <Drawer.Screen name={ScreenNames.MyTabs} component={MainTab} />
      <Drawer.Screen name={ScreenNames.MyStack} component={MainStack} />
    </Drawer.Navigator>
  );
};

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name={ScreenNames.LoginScreen} component={LoginScreen} />
      <Stack.Screen
        name={ScreenNames.RegisterScreen}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};

const Splash = () => {
  return (
    <Stack.Navigator screenOptions={stackScreenOptions}>
      <Stack.Screen name={ScreenNames.SplashScreen} component={SplashScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const [isLoading, setIsLoading] = React.useState(true);
  const {token} = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return (
    <NavigationContainer>
      <HomepageStack />
      {isLoading ? <Splash /> : token ? <MainDrawer /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
