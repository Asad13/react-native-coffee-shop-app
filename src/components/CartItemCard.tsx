import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import type {ImageProps} from 'react-native';
import {Card, GradientContainer} from '../ui';
import {
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
  BORDERRADIUS,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface CartItemCardProps {
  id: string;
  name: string;
  imagelink_square: ImageProps;
  special_ingredient: string;
  prices: [
    {size: string; price: string; currency: string; quantity: number},
    {size: string; price: string; currency: string; quantity: number},
    {size: string; price: string; currency: string; quantity: number},
  ];
  type: string;
  // index: number;
  incrementItem: (cartItem: any) => void;
  decrementItem: (cartItem: any) => void;
  deleteSizeFromCart: (cartItem: any) => void;
  onPress: () => void;
}

const CartItemCard: React.FC<CartItemCardProps> = ({
  id,
  name,
  imagelink_square,
  special_ingredient,
  prices,
  type,
  incrementItem,
  decrementItem,
  deleteSizeFromCart,
  onPress,
}) => {
  const variations = prices.filter((item: any) => item.quantity > 0);
  return (
    <Card>
      <TouchableOpacity onPress={onPress}>
        <GradientContainer>
          <View style={styles.itemIntroContainer}>
            <Image source={imagelink_square} style={styles.image} />
            <View style={styles.itemIntroTextContainer}>
              <View>
                <Text style={styles.text}>{name}</Text>
                <Text style={styles.subText}>{special_ingredient}</Text>
              </View>
              <View style={styles.typeTextContainer}>
                <Text style={styles.typeText}>{type}</Text>
              </View>
            </View>
          </View>
          <View style={styles.details}>
            {variations.map((item: any) => (
              <View key={item.size} style={styles.sizeRow}>
                <View style={styles.sizeBox}>
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
                <Text style={styles.sizeCurrency}>
                  {item.currency}{' '}
                  <Text style={styles.sizePrice}>{item.price}</Text>
                </Text>
                <View style={styles.amountController}>
                  <TouchableOpacity
                    style={styles.cartItemIcon}
                    onPress={() => {
                      decrementItem({id: id, size: item.size});
                    }}>
                    <CustomIcon
                      name="minus"
                      color={COLORS.primaryWhiteHex}
                      size={FONTSIZE.size_10}
                    />
                  </TouchableOpacity>
                  <View style={styles.cartItemQuantityContainer}>
                    <Text style={styles.cartItemQuantityText}>
                      {item.quantity}
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.cartItemIcon}
                    onPress={() => {
                      incrementItem({id: id, size: item.size});
                    }}>
                    <CustomIcon
                      name="add"
                      color={COLORS.primaryWhiteHex}
                      size={FONTSIZE.size_10}
                    />
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={styles.deleteBtn}
                  onPress={() => {
                    deleteSizeFromCart({id: id, size: item.size});
                  }}>
                  <CustomIcon
                    name="close"
                    color={COLORS.primaryWhiteHex}
                    size={FONTSIZE.size_10}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </GradientContainer>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  itemIntroContainer: {
    flexDirection: 'row',
    gap: SPACING.space_16,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: BORDERRADIUS.radius_15,
    overflow: 'hidden',
  },
  itemIntroTextContainer: {
    paddingVertical: SPACING.space_8,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
  },
  subText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
    marginTop: SPACING.space_2,
  },
  typeTextContainer: {
    backgroundColor: COLORS.primaryOrangeHex,
  },
  typeText: {
    paddingHorizontal: SPACING.space_8,
    paddingVertical: SPACING.space_4 + SPACING.space_2,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    textAlign: 'center',
  },
  details: {
    paddingTop: SPACING.space_16,
  },
  sizeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: SPACING.space_4,
  },
  amountController: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: SPACING.space_4,
  },
  sizeBox: {
    backgroundColor: COLORS.primaryLightGreyHex,
    height: 40,
    width: 70,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightGreyHex,
  },
  sizeCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryOrangeHex,
  },
  sizePrice: {
    color: COLORS.primaryWhiteHex,
  },
  cartItemIcon: {
    backgroundColor: COLORS.primaryOrangeHex,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
  },
  cartItemQuantityContainer: {
    backgroundColor: COLORS.primaryLightGreyHex,
    width: 60,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    borderColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    paddingVertical: SPACING.space_4,
  },
  cartItemQuantityText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  deleteBtn: {
    padding: SPACING.space_4,
  },
});

export default CartItemCard;
