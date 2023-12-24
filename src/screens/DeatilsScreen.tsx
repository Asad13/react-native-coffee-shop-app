import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Layout from '../components/Layout';
import {useStore} from '../store/store';
import ImageInfo from '../components/ImageInfo';
import {
  BORDERRADIUS,
  COLORS,
  SPACING,
  FONTFAMILY,
  FONTSIZE,
} from '../theme/theme';
import ScrollContainer from '../ui/ScrollContainer';
import PaymentFooter from '../components/PaymentFooter';

const DeatilsScreen = ({navigation, route}: any): JSX.Element => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const addToCart = useStore((state: any) => state.addToCart);
  const toggleFavorites = useStore((state: any) => state.toggleFavorites);

  const {id, type} = route.params;

  let itemDetails: any;
  if (type === 'Coffee') {
    itemDetails = CoffeeList.find((item: any) => item.id === id);
  } else {
    itemDetails = BeanList.find((item: any) => item.id === id);
  }

  const [showFullDesc, setShowFullDesc] = useState<boolean>(false);
  const [selectedSize, setSelectedSize] = useState(itemDetails.prices[1]);

  const backHandler = () => {
    navigation.pop();
  };

  const toggleFavorite = () => {
    toggleFavorites({...itemDetails});
  };

  return (
    <Layout>
      <ScrollContainer>
        <ImageInfo
          enableBackHandler={true}
          imagelink_portrait={itemDetails.imagelink_portrait}
          type={itemDetails.type}
          // id={itemDetails.id}
          favourite={itemDetails.favourite}
          name={itemDetails.name}
          special_ingredient={itemDetails.special_ingredient}
          ingredients={itemDetails.ingredients}
          average_rating={itemDetails.average_rating}
          ratings_count={itemDetails.ratings_count}
          roasted={itemDetails.roasted}
          backHandler={backHandler}
          toggleFavorite={toggleFavorite}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.subHeading}>Description</Text>
          {showFullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setShowFullDesc(false);
              }}>
              <Text style={styles.description}>{itemDetails.description}</Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setShowFullDesc(true);
              }}>
              <Text numberOfLines={3} style={styles.description}>
                {itemDetails.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.subHeading}>Size</Text>
          <View style={styles.sizesContainer}>
            {itemDetails.prices.map((item: any) => (
              <View
                key={item.size}
                style={[
                  styles.sizeContainer,
                  selectedSize.size === item.size
                    ? styles.selectedSizeContainer
                    : {},
                ]}>
                <TouchableOpacity
                  style={styles.sizeBtn}
                  onPress={() => {
                    setSelectedSize(item);
                  }}>
                  <Text
                    style={[
                      styles.sizeText,
                      selectedSize.size === item.size
                        ? styles.selectedSizeTextColor
                        : {},
                    ]}>
                    {item.size}
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <PaymentFooter
            text="Price"
            btnText="Add to Cart"
            price={selectedSize.price}
            onPress={() => {
              const cartItem = {...itemDetails, size: selectedSize.size};
              const priceIndex = cartItem.prices.findIndex(
                (value: any) => value.size === cartItem.size,
              );
              cartItem.prices[priceIndex].quantity = 1;
              addToCart(cartItem);
              navigation.navigate('Cart');
            }}
          />
        </View>
      </ScrollContainer>
    </Layout>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: SPACING.space_12,
    paddingTop: SPACING.space_16,
    flex: 1,
  },
  subHeading: {
    marginTop: SPACING.space_10,
    marginBottom: SPACING.space_4,
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightGreyHex,
  },
  description: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_12,
    color: COLORS.primaryWhiteHex,
    letterSpacing: 0.5,
  },
  sizesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: SPACING.space_12,
  },
  sizeContainer: {
    backgroundColor: COLORS.primaryLightGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 2,
    borderColor: 'transparent',
    flex: 1,
  },
  sizeBtn: {
    borderRadius: BORDERRADIUS.radius_10,
    paddingVertical: SPACING.space_8,
  },
  selectedSizeContainer: {
    borderColor: COLORS.primaryOrangeHex,
  },
  sizeText: {
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  selectedSizeTextColor: {
    color: COLORS.primaryOrangeHex,
  },
});

export default DeatilsScreen;
