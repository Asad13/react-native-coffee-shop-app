import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import CustomIcon from './CustomIcon';
import {BORDERRADIUS, COLORS, FONTSIZE, SPACING} from '../theme/theme';

interface AddButtonProps {
  onPress: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({onPress}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
        <CustomIcon
          name="add"
          size={FONTSIZE.size_14}
          color={COLORS.primaryWhiteHex}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_10,
  },
});

export default AddButton;
