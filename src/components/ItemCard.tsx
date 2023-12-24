import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import type {ImageProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Card from '../ui/Card';
import {
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
  BORDERRADIUS,
} from '../theme/theme';
import CustomIcon from './CustomIcon';
import AddButton from './AddButton';

interface IItem {
  id: string;
  name: string;
  description: string;
  roasted: string;
  imagelink_square: ImageProps;
  imagelink_portrait: ImageProps;
  ingredients: string;
  special_ingredient: string;
  prices: [
    {size: string; price: string; currency: string; quantity: number},
    {size: string; price: string; currency: string; quantity: number},
    {size: string; price: string; currency: string; quantity: number},
  ];
  average_rating: number;
  ratings_count: string;
  favourite: boolean;
  type: string;
  index: number;
}

interface ItemCardProps {
  item: IItem;
  addToCart: () => void;
  onPress: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({item, addToCart, onPress}) => {
  return (
    <Card>
      <TouchableOpacity onPress={onPress} style={styles.touchableContainer}>
        <LinearGradient
          style={styles.container}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}>
          <ImageBackground source={item.imagelink_square} style={styles.image}>
            <View style={styles.ratingContainer}>
              <CustomIcon
                name="star"
                color={COLORS.primaryOrangeHex}
                size={FONTSIZE.size_16}
              />
              <Text style={styles.cardRatingText}>{item.average_rating}</Text>
            </View>
          </ImageBackground>
          <Text style={styles.text}>{item.name}</Text>
          <Text style={[styles.text, styles.subText]}>
            {item.special_ingredient}
          </Text>
          <View style={styles.footerContainer}>
            <Text style={styles.priceText}>
              {item.prices[1].currency}{' '}
              <Text style={styles.price}>{item.prices[1].price}</Text>
            </Text>
            <AddButton onPress={addToCart} />
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Card>
  );
};

const styles = StyleSheet.create({
  touchableContainer: {
    borderRadius: BORDERRADIUS.radius_25,
  },
  container: {
    padding: SPACING.space_16,
    borderRadius: BORDERRADIUS.radius_25,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: BORDERRADIUS.radius_15,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.space_10,
    backgroundColor: COLORS.primaryBlackRGBA,
    position: 'absolute',
    top: 0,
    right: 0,
    borderBottomLeftRadius: BORDERRADIUS.radius_15,
    borderTopRightRadius: BORDERRADIUS.radius_15,
  },
  cardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhiteHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_14,
  },
  text: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_14,
    color: COLORS.primaryLightGreyHex,
  },
  subText: {
    fontSize: FONTSIZE.size_12,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_10,
  },
  priceText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
  },
  price: {
    color: COLORS.primaryLightGreyHex,
  },
});

export default ItemCard;
