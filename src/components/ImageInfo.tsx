import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import type {ImageProps} from 'react-native';
import GradientBgIcon from './GradientBgIcon';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';

interface ImageInfoProps {
  enableBackHandler: boolean;
  imagelink_portrait: ImageProps;
  type: string;
  // id: string;
  favourite: boolean;
  name: string;
  special_ingredient: string;
  ingredients: string;
  average_rating: number;
  ratings_count: string;
  roasted: string;
  backHandler?: any;
  toggleFavorite: any;
  imageContainerStyle?: any;
}

const ImageInfo: React.FC<ImageInfoProps> = ({
  enableBackHandler,
  imagelink_portrait,
  type,
  // id,
  favourite,
  name,
  special_ingredient,
  ingredients,
  average_rating,
  ratings_count,
  roasted,
  backHandler,
  toggleFavorite,
  imageContainerStyle,
}) => {
  const appBarJustifyContent = enableBackHandler
    ? styles.justifySpaceBetween
    : styles.justifyEnd;

  return (
    <View style={imageContainerStyle ? imageContainerStyle : {}}>
      <ImageBackground source={imagelink_portrait} style={[styles.image]}>
        <View style={[styles.appBarContainer, appBarJustifyContent]}>
          {enableBackHandler && (
            <TouchableOpacity
              onPress={backHandler !== undefined ? backHandler : () => {}}>
              <GradientBgIcon
                name="left"
                size={FONTSIZE.size_18}
                color={COLORS.primaryLightGreyHex}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={toggleFavorite}>
            <CustomIcon
              name="like"
              size={36}
              color={
                favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex
              }
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.imageBottomContainer]}>
          <View style={styles.imageBottomInnerContainer}>
            <View>
              <Text style={styles.heading}>{name}</Text>
              <Text style={styles.subHeading}>{special_ingredient}</Text>
            </View>
            <View style={styles.iconsContainer}>
              <View style={styles.iconContainer}>
                <CustomIcon
                  name={type === 'Bean' ? 'bean' : 'beans'}
                  size={type === 'Bean' ? FONTSIZE.size_18 : FONTSIZE.size_24}
                  color={COLORS.primaryOrangeHex}
                />
                <Text>{type}</Text>
              </View>
              <View style={styles.iconContainer}>
                <CustomIcon
                  name={type === 'Bean' ? 'location' : 'drop'}
                  size={FONTSIZE.size_16}
                  color={COLORS.primaryOrangeHex}
                />
                <Text style={styles.ingredientsText}>{ingredients}</Text>
              </View>
            </View>
          </View>
          <View style={styles.imageBottomInnerContainer}>
            <View style={styles.ratingContainer}>
              <CustomIcon
                name={'star'}
                color={COLORS.primaryOrangeHex}
                size={FONTSIZE.size_20}
              />
              <Text style={styles.ratingText}>{average_rating}</Text>
              <Text style={styles.ratingCountText}>({ratings_count})</Text>
            </View>
            <View style={styles.roastedContainer}>
              <Text style={styles.roastedText}>{roasted}</Text>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    aspectRatio: 20 / 25,
    justifyContent: 'space-between',
  },
  appBarContainer: {
    flexDirection: 'row',
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_16,
  },
  justifySpaceBetween: {justifyContent: 'space-between'},
  justifyEnd: {justifyContent: 'flex-end'},
  imageBottomContainer: {
    backgroundColor: COLORS.primaryBlackRGBA,
    paddingHorizontal: SPACING.space_12,
    paddingVertical: SPACING.space_24,
    borderTopLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    gap: SPACING.space_10,
  },
  imageBottomInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  heading: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryWhiteHex,
  },
  subHeading: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  iconsContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
  },
  iconContainer: {
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.primaryDarkGreyHex,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientsText: {
    marginTop: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: SPACING.space_10,
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhiteHex,
  },
  ratingCountText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightGreyHex,
  },
  roastedContainer: {
    backgroundColor: COLORS.primaryDarkGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    paddingVertical: SPACING.space_10,
    paddingHorizontal: SPACING.space_12,
  },
  roastedText: {},
});

export default ImageInfo;
