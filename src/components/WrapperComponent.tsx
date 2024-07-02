/**
 * @author Himanshu Yadav
 * @email himanshu.yadav@studiographene.com
 * @create date 2022-06-23 18:48:51
 * @modify date 2022-08-29 12:29:31
 * @desc A HOC to wrap screen components with provision to show and hide safe area and loader functionality
 */

import React, {
  useContext,
  useMemo,
  useState,
  useCallback,
  FunctionComponent,
} from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {
  EdgeInsets,
  SafeAreaInsetsContext,
} from 'react-native-safe-area-context';
import {NetworkStatusContext} from '../network/NetworkStatus';
import {
  MainStackScreenProps,
  WrappedScreenComponentProps,
} from '../types/navigation';
import {Colors} from '../constants/Constants';

const {height, width} = Dimensions.get('screen');

type WrapperOptions = {
  topSafeArea?: boolean;
  bottomSafeArea?: boolean;
  initialLoader?: boolean;
};

function ScreenWrapper(
  ScreenComponent: FunctionComponent<WrappedScreenComponentProps>,
  options: WrapperOptions = {},
) {
  const WrappedComponent = (props: MainStackScreenProps) => {
    const {
      topSafeArea = true,
      bottomSafeArea = true,
      initialLoader = false,
    } = options;
    const [isLoading, setLoading] = useState(initialLoader);
    const insets = useContext<EdgeInsets | null>(SafeAreaInsetsContext);
    const isConnectionAvailable = useContext(NetworkStatusContext);
    const containerStyle = useMemo(() => {
      return [
        styles.container,
        topSafeArea && {paddingTop: insets?.top},
        bottomSafeArea && {paddingBottom: insets?.bottom},
      ];
    }, [bottomSafeArea, insets?.bottom, insets?.top, topSafeArea]);

    const showLoader = useCallback(() => {
      !isLoading && setLoading(true);
    }, [isLoading]);

    const hideLoader = useCallback(() => {
      setLoading(false);
    }, []);
    return (
      <View style={containerStyle}>
        <ScreenComponent
          insets={insets}
          isLoading={isLoading}
          showLoader={showLoader}
          hideLoader={hideLoader}
          isConnectionAvailable={isConnectionAvailable}
          {...props}
        />
        {isLoading && (
          <View style={styles.loader}>
            <ActivityIndicator style={styles.loader} animating={isLoading} />
          </View>
        )}
      </View>
    );
  };
  return WrappedComponent;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  loader: {
    position: 'absolute',
    height: height,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ScreenWrapper;
