import React, {useCallback, useContext} from 'react';
import {Alert, TouchableOpacity, TouchableOpacityProps} from 'react-native';
import {NetworkStatusContext} from '../network/NetworkStatus';
import {Errors} from '../constants/Strings';
import {VoidFunction} from '../types/commonTypes';

type TouchableProps = TouchableOpacityProps & {
  checkConnection?: boolean;
  onPress: VoidFunction;
};

const SGTouchable = (props: TouchableProps) => {
  const {children, onPress = () => {}, checkConnection = true} = props;
  const isConnectionAvailable = useContext(NetworkStatusContext);
  const onTouchablePress = useCallback(() => {
    if (isConnectionAvailable) {
      onPress();
    } else {
      Alert.alert(Errors.alert, Errors.noInternet);
    }
  }, [isConnectionAvailable, onPress]);
  return (
    <TouchableOpacity
      {...props}
      onPress={checkConnection ? onTouchablePress : onPress}>
      {children}
    </TouchableOpacity>
  );
};

export default SGTouchable;
