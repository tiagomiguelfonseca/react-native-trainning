/**
 * @author Rahul Rajput
 * @email rahul@studiographene.com
 * @create date 2020-05-06 09:52:09
 * @modify date 2022-11-29 12:18:31
 * @desc [Registration screen]
 */

import React, {useCallback, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import SGHeader from '../../components/SGHeader';
import WrappedComponent from '../../components/WrapperComponent';
import SGTouchable from '../../components/SGTouchable';
import {AuthContext} from './AuthContext';
import {Texts} from '../../constants/Strings';
import {register} from '../../redux/user/Action';
import {useReduxDispatch} from '../../store';
import {ScreenNames} from '../../constants/Constants';

//type imports
import {UserData} from '../../types/user';
import {StackScreenComponent} from '../../types/navigation';
const Register: StackScreenComponent = () => {
  const navigation = useNavigation();
  const dispatch = useReduxDispatch();
  const {setToken} = useContext(AuthContext);
  const onLoginPress = useCallback(() => {
    const onSuccess = (userData: UserData) => {
      setToken(userData?.token);
    };
    dispatch(register(onSuccess));
  }, [dispatch, setToken]);
  return (
    <>
      <SGHeader title={Texts.register} />
      <View style={styles.container}>
        <Text>Register screen</Text>
        <SGTouchable
          onPress={() => {
            navigation.navigate(ScreenNames.LoginScreen);
          }}>
          <Text>Goto Login</Text>
          <SGTouchable onPress={onLoginPress}>
            <Text style={styles.registerText}>Login</Text>
          </SGTouchable>
        </SGTouchable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    marginTop: 50,
    fontWeight: '500',
    fontSize: 20,
  },
});

export default WrappedComponent(Register);
