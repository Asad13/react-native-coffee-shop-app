import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import type {ImageProps} from 'react-native';
import CustomIcon from './CustomIcon';
import {COLORS, FONTSIZE, SPACING, FONTFAMILY} from '../theme/theme';

interface PaymentMethodItemProps {
  name: string;
  icon: string | ImageProps;
  isIcon: boolean;
}
const PaymentMethodItem: React.FC<PaymentMethodItemProps> = ({
  name,
  icon,
  isIcon,
}) => {
  return (
    <View style={styles.container}>
      {isIcon ? (
        <CustomIcon
          name={name.toLowerCase()}
          size={FONTSIZE.size_30}
          color={COLORS.primaryOrangeHex}
        />
      ) : (
        <Image source={icon as ImageProps} style={styles.image} />
      )}
      <View style={styles.infoContainer}>
        <Text>{name}</Text>
        {name === 'Wallet' && (
          <Text style={styles.commonTextStyle}>
            $ <Text style={styles.amountTextStyle}>100.50</Text>
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: SPACING.space_16,
    alignItems: 'center',
  },
  image: {
    width: FONTSIZE.size_30,
    height: FONTSIZE.size_30,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  commonTextStyle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryOrangeHex,
  },
  amountTextStyle: {
    color: COLORS.primaryWhiteHex,
  },
});

export default PaymentMethodItem;
