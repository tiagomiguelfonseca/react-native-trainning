import React, {useCallback, useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WrappedComponent from '../../components/WrapperComponent';
import SGTouchable from '../../components/SGTouchable';
import {useNavigation} from '@react-navigation/native';
import {ScreenNames} from '../../constants/Constants';
import {Texts} from '../../constants/Strings';
import SGHeader from '../../components/SGHeader';
import Config from 'react-native-config';
import {AuthContext, AuthContextData} from './AuthContext';
import {login} from '../../redux/user/Action';
import {useReduxDispatch} from '../../store';

//type imports
import {UserData} from '../../types/user';
import {StackScreenComponent} from '../../types/navigation';

const Login: StackScreenComponent = () => {
  const navigation = useNavigation();
  const dispatch = useReduxDispatch();
  const {setToken} = useContext<AuthContextData>(AuthContext);
  const onPress = useCallback(() => {
    const screenName = ScreenNames.RegisterScreen;
    navigation.navigate(screenName);
  }, [navigation]);

  const onLoginPress = useCallback(() => {
    const onSuccess = (userData: UserData) => {
      setToken(userData?.token);
    };
    dispatch(login(onSuccess));
  }, [dispatch, setToken]);

  return (
    <>
      <SGHeader title={Texts.login} />
      <View style={styles.container}>
        <Text>Login Screen</Text>
        <Text>{Config?.WELCOME_MESSAGE}</Text>
        <SGTouchable onPress={onPress}>
          <Text>Go to Register</Text>
        </SGTouchable>
        <SGTouchable onPress={onLoginPress}>
          <Text style={styles.loginText}>Login</Text>
        </SGTouchable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    marginTop: 50,
    fontWeight: '500',
    fontSize: 20,
  },
});

export default WrappedComponent(Login);
