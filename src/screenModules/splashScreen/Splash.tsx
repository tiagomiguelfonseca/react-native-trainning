import React from 'react';
import {View, StyleSheet} from 'react-native';
import WrappedComponent from '../../components/WrapperComponent';
import {StackScreenComponent} from '../../types/navigation';
import InstagramImage from '../../assets/svgs/instagramLogo.svg';

const Splash: StackScreenComponent = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          {InstagramImage && <InstagramImage height={50} width={50} />}
        </View>
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
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WrappedComponent(Splash);
