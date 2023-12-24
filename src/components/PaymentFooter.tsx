import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {
  SPACING,
  COLORS,
  BORDERRADIUS,
  FONTFAMILY,
  FONTSIZE,
} from '../theme/theme';

interface PaymentFooterProps {
  text: string;
  btnText: string;
  price: number;
  onPress: () => void;
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  text,
  btnText,
  price,
  onPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.priceText}>
          $ <Text style={styles.price}>{price}</Text>
        </Text>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text style={styles.btnText}>{btnText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: SPACING.space_10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flexBasis: 70,
    flexGrow: 1,
    maxWidth: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_12,
    color: COLORS.secondaryLightGreyHex,
  },
  priceText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
  price: {
    color: COLORS.primaryWhiteHex,
    fontSize: FONTSIZE.size_14,
  },
  btnContainer: {
    flexBasis: 180,
    flexGrow: 2,
    maxWidth: 220,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
  },
  btn: {
    paddingVertical: SPACING.space_16,
    paddingHorizontal: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
  },
  btnText: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
    textAlign: 'center',
  },
});

export default PaymentFooter;
