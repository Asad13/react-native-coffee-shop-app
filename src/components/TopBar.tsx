import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradientBgIcon from './GradientBgIcon';
import CustomIcon from './CustomIcon';

interface TopBarProps {
  title?: string;
  iconName?: string;
  iconColor?: string;
  iconSize?: number;
  onPress?: () => void;
  disabled?: boolean;
  isWithoutIcon?: boolean;
  enableBackHandler?: boolean;
  backHandler?: () => void;
}

const TopBar: React.FC<TopBarProps> = ({
  title,
  iconName,
  iconColor,
  iconSize,
  onPress,
  disabled,
  isWithoutIcon = false,
  enableBackHandler = false,
  backHandler,
}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const btnIconColor =
    iconColor !== undefined
      ? iconColor
      : isDarkMode
      ? COLORS.primaryLightGreyHex
      : COLORS.primaryBlackHex;

  return (
    <View style={styles.container}>
      {enableBackHandler ? (
        <TouchableOpacity
          onPress={backHandler !== undefined ? backHandler : () => {}}>
          <GradientBgIcon
            name="left"
            size={FONTSIZE.size_18}
            color={COLORS.primaryLightGreyHex}
          />
        </TouchableOpacity>
      ) : (
        <GradientBgIcon
          name="menu"
          color={COLORS.primaryLightGreyHex}
          size={FONTSIZE.size_16}
        />
      )}
      <Text style={styles.title}>{title}</Text>
      {isWithoutIcon ? (
        <View style={styles.emptyView} />
      ) : (
        <TouchableOpacity
          onPress={onPress}
          style={styles.btn}
          disabled={disabled}>
          <CustomIcon
            name={iconName as string}
            color={btnIconColor}
            size={iconSize !== undefined ? iconSize : FONTSIZE.size_16}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.space_16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  btn: {
    padding: SPACING.space_4,
  },
  emptyView: {
    width: 36,
    height: 36,
  },
});

export default TopBar;
