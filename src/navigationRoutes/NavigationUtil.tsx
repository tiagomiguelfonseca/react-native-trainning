/**
 * @author Himanshu Yadav
 * @email himanshu.yadav@studiographene.com
 * @create date 2022-06-23 18:52:03
 * @modify date 2022-08-28 17:21:10
 * @desc Util file for navigators which contains screenOptions to apply on navigators screens, i.e. headerShown
 */

import React from 'react';
import {Route} from '@react-navigation/native';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {DrawerNavigationOptions} from '@react-navigation/drawer';
import {Colors, ScreenNames} from '../constants/Constants';
import ProfileIcon from '../assets/svgs/profile.svg';
import DiscoveryIcon from '../assets/svgs/discovery.svg';

export const stackScreenOptions: NativeStackNavigationOptions = {
  headerShown: false,
  animation: 'slide_from_right',
};

type TabScreenOptionsParam = {
  route: Route<string>;
};

type TabBarIconParam = {
  color: string;
};

export const tabScreenOptions = ({route}: TabScreenOptionsParam) => ({
  tabBarIcon: ({color}: TabBarIconParam) => {
    if (route.name === ScreenNames.Discovery) {
      return <DiscoveryIcon height={30} width={30} fill={color} />;
    } else if (route.name === ScreenNames.Profile) {
      return <ProfileIcon height={30} width={30} fill={color} />;
    }
  },
  tabBarActiveTintColor: Colors.glOrange,
  tabBarInactiveTintColor: Colors.glGrey,
  headerShown: false,
});

export const drawerScreenOptions: DrawerNavigationOptions = {
  drawerType: 'front',
  headerShown: false,
};
