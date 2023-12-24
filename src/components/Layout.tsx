import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  useColorScheme,
  View,
} from 'react-native';
import {COLORS} from '../theme/theme';

const Layout = ({children}: PropsWithChildren): JSX.Element => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? COLORS.darkModeAppBgColor
      : COLORS.lightModeAppBgColor,
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <StatusBar backgroundColor={COLORS.primaryBlackHex} /> */}
      <View style={[styles.container, backgroundStyle]}>{children}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});

export default Layout;
