import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Card, GradientContainer} from '../ui';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import OrderHistoryCartItem from './OrderHistoryCartItem';

interface OrderHistoryItemCardProps {
  orderDate: string;
  cartPrice: number;
  cart: any;
}

const OrderHistoryItemCard: React.FC<OrderHistoryItemCardProps> = ({
  orderDate,
  cartPrice,
  cart,
}) => {
  return (
    <Card>
      <GradientContainer containerStyle={styles.container}>
        <View style={styles.orderHistoryCardHeader}>
          <View>
            <Text>Order Date</Text>
            <Text
              style={[
                styles.commonTextStyle,
                styles.amountTextStyle,
              ]}>{`${new Date(orderDate).toDateString()}  ${new Date(
              orderDate,
            ).toLocaleTimeString()}`}</Text>
          </View>
          <View>
            <Text>Total Price</Text>
            <Text style={styles.commonTextStyle}>
              $ <Text style={styles.amountTextStyle}>{cartPrice}</Text>
            </Text>
          </View>
        </View>
        <View style={styles.orderHistoryCartItemContainer}>
          {cart.map((item: any) => (
            <OrderHistoryCartItem
              key={item.id}
              name={item.name}
              imagelink_square={item.imagelink_square}
              special_ingredient={item.special_ingredient}
              prices={item.prices}
              type={item.type}
            />
          ))}
        </View>
      </GradientContainer>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: SPACING.space_16,
  },
  orderHistoryCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  orderHistoryCartItemContainer: {
    gap: SPACING.space_20,
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

export default OrderHistoryItemCard;
