import React, {type PropsWithChildren} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, SPACING, BORDERRADIUS} from '../../theme/theme';

interface GradientContainerProps extends PropsWithChildren {
  containerStyle?: any;
  colors?: string[];
  startX?: number;
  startY?: number;
  endX?: number;
  endY?: number;
}

const GradientContainer: React.FC<GradientContainerProps> = ({
  children,
  containerStyle,
  colors,
  startX = 0,
  startY = 0,
  endX = 0,
  endY = 0,
}) => {
  return (
    <LinearGradient
      style={[styles.container, containerStyle]}
      start={{x: startX, y: startY}}
      end={{x: endX, y: endY}}
      colors={
        colors !== undefined && colors.length > 0
          ? colors
          : [COLORS.primaryGreyHex, COLORS.primaryBlackHex]
      }>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_25,
  },
});

export default GradientContainer;
