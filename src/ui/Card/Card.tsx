import React, {type PropsWithChildren} from 'react';
import {StyleSheet, View, Platform, useColorScheme} from 'react-native';
import {COLORS, BORDERRADIUS} from '../../theme/theme';

interface CardProps extends PropsWithChildren {
  containerStyle?: any;
  lightModeShadowColor?: string;
  darkModeShadowColor?: string;
  marginBottom?: number; // important to show the shadow behind the card
  elevation?: number;
  shadowOffsetWidth?: number;
  shadowOffsetHeight?: number;
  shadowOpacity?: number;
  shadowRadius?: number;
}

const Card: React.FC<CardProps> = ({
  children,
  marginBottom,
  elevation,
  shadowOffsetWidth,
  shadowOffsetHeight,
  shadowOpacity,
  shadowRadius,
  containerStyle,
  lightModeShadowColor,
  darkModeShadowColor,
}) => {
  const basicStyle = {
    marginBottom: marginBottom !== undefined ? marginBottom : 4,
    ...Platform.select({
      ios: {
        shadowOffset: {
          width: shadowOffsetWidth !== undefined ? shadowOffsetWidth : -2,
          height: shadowOffsetHeight !== undefined ? shadowOffsetHeight : 4,
        },
        shadowOpacity:
          shadowOpacity === undefined
            ? 0.2
            : shadowOpacity > 1
            ? 1
            : shadowOpacity <= 0
            ? 0.1
            : shadowOpacity,
        shadowRadius: shadowRadius !== undefined ? shadowRadius : 3,
      },
      android: {
        elevation:
          elevation === undefined ? 5 : elevation > 11 ? 11 : elevation,
      },
    }),
  };

  let customStyle: any = {};

  if (containerStyle !== undefined) {
    customStyle = {...containerStyle};
  }

  customStyle = {
    ...customStyle,
    ...basicStyle,
  };

  const isDarkMode = useColorScheme() === 'dark';
  const shadowColor = isDarkMode
    ? darkModeShadowColor !== undefined
      ? darkModeShadowColor
      : COLORS.primaryLightGreyHex
    : lightModeShadowColor !== undefined
    ? lightModeShadowColor
    : COLORS.primaryDarkGreyHex;

  customStyle.shadowColor = shadowColor;

  return <View style={[styles.card, customStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 4,
    borderRadius: BORDERRADIUS.radius_25,
    ...Platform.select({
      ios: {
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.2,
        shadowRadius: 3,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
export default Card;
