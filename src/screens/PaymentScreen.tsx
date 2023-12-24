import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {useStore} from '../store/store';
import Layout from '../components/Layout';
import {Container, ScrollContainer, GradientContainer, Card} from '../ui';
import TopBar from '../components/TopBar';
import PaymentFooter from '../components/PaymentFooter';
import CustomIcon from '../components/CustomIcon';
import PaymentMethodItem from '../components/PaymentMethodItem';
import LottieAnimation from '../components/LottieAnimation';
import {LOTTIE_SUCCESSFUL_PATH} from '../constants/lottie-animations-paths';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';

const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const PaymentScreen = ({navigation}: any): JSX.Element => {
  const {CartPrice, addToOrderHistory} = useStore((state: any) => state);
  const [paymentMethod, setPaymentMethod] = useState<string>('Credit Card');
  const [showAnimation, setShowAnimation] = useState<boolean>(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode
      ? COLORS.darkModeAppBgColor
      : COLORS.lightModeAppBgColor,
  };

  return (
    <Layout>
      {showAnimation && (
        <View style={styles.paymentSuccessAnimation}>
          <LottieAnimation source={LOTTIE_SUCCESSFUL_PATH} loop={false} />
        </View>
      )}
      <Container>
        <TopBar
          title="Payment"
          isWithoutIcon={true}
          enableBackHandler={true}
          backHandler={() => {
            navigation.pop();
          }}
        />
        <ScrollContainer>
          <View style={styles.scrollInnerContainer}>
            <View
              style={[
                styles.cardContainer,
                {
                  borderColor:
                    paymentMethod === 'Credit Card'
                      ? COLORS.primaryOrangeHex
                      : COLORS.primaryLightGreyHex,
                },
              ]}>
              <TouchableOpacity
                onPress={() => {
                  setPaymentMethod('Credit Card');
                }}>
                <Text style={styles.creditCardHeading}>Credit Card</Text>
                <Card>
                  <GradientContainer containerStyle={styles.card}>
                    <View
                      style={[styles.cardRow, styles.cardElementPositioning]}>
                      <CustomIcon
                        name="chip"
                        size={FONTSIZE.size_20 * 2}
                        color={COLORS.primaryOrangeHex}
                      />
                      <CustomIcon
                        name="visa"
                        size={FONTSIZE.size_30 * 2}
                        color={COLORS.primaryWhiteHex}
                      />
                    </View>
                    <View style={[styles.cardRow, styles.cardNumberContainer]}>
                      <Text style={styles.cardNumText}>4000</Text>
                      <Text style={styles.cardNumText}>0842</Text>
                      <Text style={styles.cardNumText}>0044</Text>
                      <Text style={styles.cardNumText}>7532</Text>
                    </View>
                    <View
                      style={[styles.cardRow, styles.cardElementPositioning]}>
                      <View>
                        <Text>Card Holder Name</Text>
                        <Text>John Doe</Text>
                      </View>
                      <View>
                        <Text>Expiry Date</Text>
                        <Text>12/25</Text>
                      </View>
                    </View>
                  </GradientContainer>
                </Card>
              </TouchableOpacity>
            </View>
            {PaymentList.map((item: any) => (
              <TouchableOpacity
                key={item.name}
                style={[
                  styles.cardContainer,
                  {
                    borderColor:
                      paymentMethod === item.name
                        ? COLORS.primaryOrangeHex
                        : COLORS.primaryLightGreyHex,
                  },
                ]}
                onPress={() => {
                  setPaymentMethod(item.name);
                }}>
                <PaymentMethodItem
                  name={item.name}
                  icon={item.icon}
                  isIcon={item.isIcon}
                />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollContainer>
        <View style={[styles.paymentFooterContainer, backgroundStyle]}>
          <PaymentFooter
            text="Bill"
            btnText={`Pay from ${paymentMethod}`}
            price={CartPrice}
            onPress={() => {
              addToOrderHistory();
              setShowAnimation(true);
              setTimeout(() => {
                setShowAnimation(false);
                navigation.navigate('History');
              }, 2000);
            }}
          />
        </View>
      </Container>
    </Layout>
  );
};

const styles = StyleSheet.create({
  scrollInnerContainer: {
    gap: SPACING.space_16,
    paddingBottom: 80,
  },
  cardContainer: {
    borderWidth: 2,
    borderColor: COLORS.primaryLightGreyHex,
    borderRadius: BORDERRADIUS.radius_20,
    padding: SPACING.space_12,
  },
  creditCardHeading: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_8,
    marginBottom: SPACING.space_8,
  },
  card: {
    borderRadius: BORDERRADIUS.radius_15,
    gap: SPACING.space_16,
    paddingHorizontal: SPACING.space_20,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardElementPositioning: {
    justifyContent: 'space-between',
  },
  cardNumberContainer: {
    gap: SPACING.space_8,
  },
  cardNumText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
    letterSpacing: 4,
  },
  paymentFooterContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: SPACING.space_12,
    right: SPACING.space_12,
    zIndex: 10,
    height: 80,
  },
  paymentSuccessAnimation: {
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

export default PaymentScreen;
