import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';

interface CategoryItemProps {
  value: string;
  onPress: () => void;
  isSelected: boolean;
}

const CategoryItem: React.FC<CategoryItemProps> = ({
  value,
  onPress,
  isSelected,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          isSelected ? styles.categorySelectedContainer : {},
        ]}>
        <Text
          style={[styles.text, isSelected ? styles.categorySelectedText : {}]}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: COLORS.secondaryDarkGreyHex,
    borderRadius: SPACING.space_30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_12,
  },
  categorySelectedContainer: {
    backgroundColor: COLORS.primaryOrangeHex,
    borderColor: COLORS.primaryOrangeHex,
  },
  text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryLightGreyHex,
  },
  categorySelectedText: {
    color: COLORS.primaryWhiteHex,
  },
});

export default CategoryItem;
