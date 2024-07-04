import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  Keyboard,
} from 'react-native';
import {AuthContext} from './AuthContext';
import {useDispatch} from 'react-redux';
import {login} from '../../redux/user/Action';
const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const {setToken} = useContext(AuthContext);
  const dispatch = useDispatch();

  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // const isEmailValid = () =>
  //   emailPattern.test(username) ? setModalOpen(false) : setModalOpen(true);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const onLoginPress = useCallback(() => {
    const onSuccess = (userData: {token: any}) => {
      setToken(userData?.token);
    };
    emailPattern.test(username) && password
      ? dispatch(login(onSuccess, username))
      : setModalOpen(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, password, setToken, username]);

  return (
    <View style={styles.container}>
      {!isKeyboardVisible && (
        <Image
          source={require('../../assets/images/inst.png')}
          style={styles.logo}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Phone number, username, or email"
        placeholderTextColor="#aaa"
        value={username}
        onChangeText={setUsername}
        inputMode="email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.loginButton} onPress={onLoginPress}>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>
      <Text style={styles.forgotPassword}>Forgot password?</Text>
      <View style={styles.separatorContainer}>
        <View style={styles.separatorLine} />
        <Text style={styles.separatorText}>OR</Text>
        <View style={styles.separatorLine} />
      </View>
      <TouchableOpacity style={styles.facebookButton}>
        <Image
          source={require('../../assets/images/facebook.png')}
          style={styles.facebookLogo}
        />
        <Text style={styles.facebookButtonText}>Log in with Facebook</Text>
      </TouchableOpacity>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signupButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalOpen}
        style={styles.modal}
        transparent={true}
        animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalText}>Email or password is incorrect</Text>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalOpen(false)}>
            <Text style={styles.loginButtonText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 60,
    marginBottom: 40,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fafafa',
  },
  loginButton: {
    width: '100%',
    height: 40,
    backgroundColor: '#3897f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: '#3897f0',
    marginTop: 15,
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginVertical: 20,
  },
  separatorLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  separatorText: {
    marginHorizontal: 10,
    color: '#aaa',
  },
  facebookButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  facebookButtonText: {
    color: '#3b5998',
    marginLeft: 10,
  },
  signupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signupText: {
    color: '#aaa',
  },
  signupButton: {
    color: '#3897f0',
  },
  facebookLogo: {
    width: 20,
    height: 20,
  },
  modalContainer: {
    flex: 1,
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.92)',
  },
  modalButton: {
    width: 200,
    height: 40,
    backgroundColor: '#3897f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  modal: {
    backgroundColor: 'red',
    opacity: 0.6,
  },
  modalText: {
    color: '#fff',
  },
});
export default LoginScreen;
