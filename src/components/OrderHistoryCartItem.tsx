import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import type {ImageProps} from 'react-native';
import {
  BORDERRADIUS,
  FONTFAMILY,
  FONTSIZE,
  COLORS,
  SPACING,
} from '../theme/theme';

interface OrderHistoryCartItemProps {
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  prices: [
    {size: string; price: string; currency: string; quantity: number},
    {size: string; price: string; currency: string; quantity: number},
    {size: string; price: string; currency: string; quantity: number},
  ];
  type: string;
}

const OrderHistoryCartItem: React.FC<OrderHistoryCartItemProps> = ({
  name,
  imagelink_square,
  special_ingredient,
  prices,
  type,
}) => {
  const variations = prices.filter((item: any) => item.quantity > 0);

  const totalPrice = variations.reduce(
    (total: number, item: any) => (total += item.price * item.quantity),
    0,
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={imagelink_square} style={styles.image} />
        <View>
          <Text>{name}</Text>
          <Text>{special_ingredient}</Text>
        </View>
        <View>
          <Text>Total</Text>
          <Text style={styles.commonTextStyle}>
            $ <Text style={styles.amountTextStyle}>{totalPrice}</Text>
          </Text>
        </View>
      </View>
      <View>
        {variations.map((item: any) => (
          <View key={item.size} style={styles.sizeRow}>
            <View style={styles.box1}>
              <Text
                style={[
                  styles.sizeText,
                  {
                    fontSize:
                      type === 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_16,
                  },
                ]}>
                {item.size}
              </Text>
            </View>
            <View style={styles.amountContainer}>
              <View style={styles.box2}>
                <Text style={styles.sizeCurrency}>
                  {item.currency}{' '}
                  <Text style={styles.sizePrice}>{item.price}</Text>
                </Text>
              </View>
              <View style={styles.box3}>
                <Text style={styles.sign}>X</Text>
              </View>
              <View style={styles.box4}>
                <Text style={[styles.commonTextStyle, styles.amountTextStyle]}>
                  {item.quantity}
                </Text>
              </View>
            </View>
            <View style={styles.box3}>
              <Text style={styles.sign}>=</Text>
            </View>
            <View style={styles.box1}>
              <Text style={styles.commonTextStyle}>
                ${' '}
                <Text style={styles.amountTextStyle}>
                  {item.price * item.quantity}
                </Text>
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.space_12,
    borderWidth: 1,
    borderColor: COLORS.primaryLightGreyHex,
    borderRadius: BORDERRADIUS.radius_15,
    padding: SPACING.space_12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: BORDERRADIUS.radius_15,
    overflow: 'hidden',
  },
  commonTextStyle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryOrangeHex,
  },
  amountTextStyle: {
    color: COLORS.primaryWhiteHex,
  },
  sizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.space_4,
    paddingHorizontal: SPACING.space_16,
  },
  box1: {
    width: 70,
    alignItems: 'center',
  },
  box2: {
    width: 60,
    alignItems: 'center',
  },
  box3: {
    width: 10,
    alignItems: 'center',
  },
  box4: {
    width: 30,
    alignItems: 'center',
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
    textAlign: 'left',
  },
  sizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryOrangeHex,
  },
  sizePrice: {
    color: COLORS.primaryWhiteHex,
  },
  amountContainer: {
    flexDirection: 'row',
    gap: SPACING.space_8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sign: {
    fontFamily: FONTFAMILY.poppins_bold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
});

export default OrderHistoryCartItem;
