import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {useStore} from '../store/store';
import Layout from '../components/Layout';
import {Container, ScrollContainer, Card} from '../ui';
import TopBar from '../components/TopBar';
import ImageInfo from '../components/ImageInfo';
import LottieAnimation from '../components/LottieAnimation';
import {LOTTIE_COFFEE_CUP_PATH} from '../constants/lottie-animations-paths';
import {BORDERRADIUS, COLORS, SPACING} from '../theme/theme';

const FavoritesScreen = ({navigation}: any): JSX.Element => {
  const {FavoritesList, toggleFavorites, emptyFavorites} = useStore(
    (state: any) => state,
  );
  const bottomTabBarHeight = useBottomTabBarHeight();

  return (
    <Layout>
      <ScrollContainer containerStyle={{paddingBottom: bottomTabBarHeight}}>
        <TopBar
          title="Favorites"
          iconName="close"
          onPress={() => {
            emptyFavorites();
          }}
          disabled={FavoritesList.length === 0}
        />
        <Container containerStyle={styles.container}>
          {FavoritesList.length > 0 ? (
            <View style={styles.favoriteListContainer}>
              {FavoritesList.map((item: any) => (
                <Card key={item.id} containerStyle={styles.favoriteListItem}>
                  <TouchableOpacity
                    style={styles.touchableContainer}
                    onPress={() => {
                      navigation.push('Details', {
                        index: item.index,
                        id: item.id,
                        type: item.type,
                      });
                    }}>
                    <ImageInfo
                      enableBackHandler={false}
                      imagelink_portrait={item.imagelink_portrait}
                      type={item.type}
                      favourite={item.favourite}
                      name={item.name}
                      special_ingredient={item.special_ingredient}
                      ingredients={item.ingredients}
                      average_rating={item.average_rating}
                      ratings_count={item.ratings_count}
                      roasted={item.roasted}
                      toggleFavorite={() => {
                        toggleFavorites(item);
                      }}
                      imageContainerStyle={styles.imageContainerStyle}
                    />
                  </TouchableOpacity>
                </Card>
              ))}
            </View>
          ) : (
            <LottieAnimation
              source={LOTTIE_COFFEE_CUP_PATH}
              feedback="No Favorite Item"
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
  },
  favoriteListContainer: {
    gap: SPACING.space_16,
  },
  favoriteListItem: {
    borderWidth: 2,
    borderColor: COLORS.primaryLightGreyHex,
  },
  touchableContainer: {
    borderRadius: BORDERRADIUS.radius_25,
  },
  imageContainerStyle: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
  },
});

export default FavoritesScreen;
