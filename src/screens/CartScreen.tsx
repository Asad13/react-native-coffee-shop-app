import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useStore} from '../store/store';
import Layout from '../components/Layout';
import {Container, ScrollContainer} from '../ui';
import TopBar from '../components/TopBar';
import LottieAnimation from '../components/LottieAnimation';
import CartItemCard from '../components/CartItemCard';
import PaymentFooter from '../components/PaymentFooter';
import {LOTTIE_COFFEE_CUP_PATH} from '../constants/lottie-animations-paths';

const CartScreen = ({navigation}: any): JSX.Element => {
  const {
    CartList,
    emptyCart,
    addToCart,
    removeFromCart,
    deleteSizeFromCart,
    CartPrice,
  } = useStore((state: any) => state);

  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <Layout>
      <ScrollContainer containerStyle={{paddingBottom: bottomTabBarHeight}}>
        <TopBar
          title="Cart"
          iconName="close"
          onPress={() => {
            emptyCart();
          }}
          disabled={CartList.length === 0}
        />
        <Container containerStyle={styles.container}>
          {CartList.length > 0 ? (
            <View>
              {CartList.map((item: any) => (
                <View key={item.id}>
                  <CartItemCard
                    id={item.id}
                    name={item.name}
                    imagelink_square={item.imagelink_square}
                    special_ingredient={item.special_ingredient}
                    prices={item.prices}
                    type={item.type}
                    incrementItem={addToCart}
                    decrementItem={removeFromCart}
                    deleteSizeFromCart={deleteSizeFromCart}
                    onPress={() => {
                      navigation.push('Details', {
                        index: item.index,
                        id: item.id,
                        type: item.type,
                      });
                    }}
                  />
                </View>
              ))}
            </View>
          ) : (
            <LottieAnimation
              source={LOTTIE_COFFEE_CUP_PATH}
              feedback="Cart is Empty"
            />
          )}
          {CartList.length > 0 && (
            <PaymentFooter
              text="Total Price"
              btnText="Pay"
              price={CartPrice}
              onPress={() => {
                navigation.push('Payment');
              }}
            />
          )}
        </Container>
      </ScrollContainer>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default CartScreen;
