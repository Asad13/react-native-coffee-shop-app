import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useStore} from '../store/store';
import Layout from '../components/Layout';
import {Container, ScrollContainer} from '../ui';
import TopBar from '../components/TopBar';
import OrderHistoryItemCard from '../components/OrderHistoryItemCard';
import LottieAnimation from '../components/LottieAnimation';
import {
  LOTTIE_COFFEE_CUP_PATH,
  LOTTIE_DOWNLOAD_PATH,
} from '../constants/lottie-animations-paths';
import {COLORS, SPACING} from '../theme/theme';

const OrderHistoryScreen = (): JSX.Element => {
  const {OrderHistoryList} = useStore((state: any) => state);
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <Layout>
      {showAnimation && (
        <View style={styles.downloadAnimationContainer}>
          <LottieAnimation source={LOTTIE_DOWNLOAD_PATH} loop={false} />
        </View>
      )}
      <Container containerStyle={{paddingBottom: bottomTabBarHeight}}>
        <TopBar
          title="Order History"
          iconName="star"
          disabled={OrderHistoryList.length === 0}
          onPress={() => {
            setShowAnimation(true);
            setTimeout(() => {
              setShowAnimation(false);
            }, 2000);
          }}
        />
        {OrderHistoryList.length === 0 && (
          <LottieAnimation source={LOTTIE_COFFEE_CUP_PATH} />
        )}
        {OrderHistoryList.length > 0 && (
          <ScrollContainer>
            <View style={styles.scrollInnerContainer}>
              {OrderHistoryList.map((item: any, index: number) => (
                <OrderHistoryItemCard
                  key={index.toString()}
                  orderDate={item.OrderDate}
                  cartPrice={item.CartListPrice}
                  cart={item.CartList}
                />
              ))}
            </View>
          </ScrollContainer>
        )}
      </Container>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollInnerContainer: {
    gap: SPACING.space_16,
  },
  downloadAnimationContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primaryBlackRGBA,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 11,
  },
});

export default OrderHistoryScreen;
