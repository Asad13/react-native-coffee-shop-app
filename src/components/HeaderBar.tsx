import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import GradientBgIcon from './GradientBgIcon';
import ProfilePic from './ProfilePic';

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  return (
    <View style={styles.container}>
      <GradientBgIcon
        name="menu"
        color={COLORS.primaryLightGreyHex}
        size={FONTSIZE.size_16}
      />
      <Text style={styles.title}>{title}</Text>
      <ProfilePic />
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
});

export default HeaderBar;
