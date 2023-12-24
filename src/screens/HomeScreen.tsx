import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import type {ImageProps} from 'react-native';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import Toast from 'react-native-toast-message';
import Layout from '../components/Layout';
import {useStore} from '../store/store';
import HeaderBar from '../components/HeaderBar';
import CategoryItem from '../components/CategoryItem';
import ItemCard from '../components/ItemCard';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import ScrollContainer from '../ui/ScrollContainer';

interface ICategory {
  id: string;
  value: string;
}

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

const getCoffeeCategories = (CoffeeList: any[]) => {
  const categories: ICategory[] = [{id: 'All', value: 'All'}];

  const addedCategories: any[] = [];
  for (let i = 0; i < CoffeeList.length; i++) {
    if (!addedCategories.includes(CoffeeList[i].name)) {
      addedCategories.push(CoffeeList[i].name);
      categories.push({
        id: CoffeeList[i].name,
        value: CoffeeList[i].name,
      });
    }
  }

  return categories;
};

const getSelectedCoffees = (category: string, data: any[]) => {
  if (category.toLowerCase() === 'All'.toLowerCase()) {
    return data;
  } else {
    return data.filter(
      (item: any) => item.name.toLowerCase() === category.toLowerCase(),
    );
  }
};

const getSelectedCoffeesFromSearch = (search: string, data: any[]) => {
  return data.filter((item: any) =>
    item.name.toLowerCase().includes(search.toLowerCase()),
  );
};

const HomeScreen = ({navigation}: any): JSX.Element => {
  const CoffeeList = useStore((state: any) => state.CoffeeList);
  const BeanList = useStore((state: any) => state.BeanList);
  const addToCart = useStore((state: any) => state.addToCart);
  const categories = getCoffeeCategories(CoffeeList);
  const [search, setSearch] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>(
    categories[0].id,
  );

  const [selectedCoffees, setSelectedCoffees] = useState(
    getSelectedCoffees(selectedCategory, CoffeeList),
  );

  const coffeeFlatListRef = useRef<FlatList>(null);

  const [coffeeListHeight, setCoffeeListHeight] = useState<number>(40);

  const bottomTabBarHeight = useBottomTabBarHeight();

  const handleCategorySearch = (value: string) => {
    if (value.length === 0) {
      setSelectedCoffees(getSelectedCoffees(selectedCategory, CoffeeList));
    } else {
      let timer;
      clearTimeout(timer);
      timer = setTimeout(() => {
        const coffees = getSelectedCoffees(selectedCategory, CoffeeList);
        setSelectedCoffees(getSelectedCoffeesFromSearch(value, coffees));
      }, 300);
    }
  };

  const categoryRenderItem = ({item}: {item: ICategory}) => {
    const isSelected = selectedCategory === item.id;

    return (
      <CategoryItem
        value={item.value}
        onPress={() => {
          coffeeFlatListRef?.current?.scrollToOffset({
            offset: 0,
            animated: true,
          });
          setSelectedCategory(item.id);
          setSelectedCoffees(getSelectedCoffees(item.id, CoffeeList));
        }}
        isSelected={isSelected}
      />
    );
  };

  const renderItem = ({item}: {item: IItem}) => {
    return (
      <ItemCard
        item={item}
        addToCart={() => {
          const cartItem = {...item, size: item.prices[1].size};
          // const priceIndex = cartItem.prices.findIndex(
          //   (value: any) => value.size === item.prices[1].size,
          // );
          cartItem.prices[1].quantity = 1;

          addToCart(cartItem);
          Toast.show({
            type: 'success',
            text1: `${cartItem.type} - ${cartItem.name}`,
            text2:
              cartItem.type === 'Coffee'
                ? `One ${item.prices[1].size}-sized ${cartItem.name} ${cartItem.type} is added to your cart`
                : `${item.prices[1].size} ${cartItem.name} is added to your cart`,
          });
        }}
        onPress={() => {
          navigation.push('Details', {
            index: item.index,
            id: item.id,
            type: item.type,
          });
        }}
      />
    );
  };

  return (
    <Layout>
      <ScrollContainer containerStyle={{paddingBottom: bottomTabBarHeight}}>
        <HeaderBar />
        <Text style={styles.title}>Find the best{'\n'}coffee for you</Text>
        <View style={styles.searchContainer}>
          <View style={styles.iconContainer}>
            <CustomIcon
              name="search"
              size={FONTSIZE.size_16}
              color={COLORS.primaryBlackHex}
            />
          </View>
          <TextInput
            value={search}
            placeholder="Search Coffee"
            style={styles.searchBox}
            onChangeText={value => {
              setSearch(value);
              handleCategorySearch(value);
            }}
          />
          {search !== undefined && search.length > 0 ? (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={() => {
                setSearch('');
                setSelectedCoffees(
                  getSelectedCoffees(selectedCategory, CoffeeList),
                );
              }}>
              <CustomIcon
                name="close"
                size={FONTSIZE.size_16}
                color={COLORS.primaryBlackHex}
              />
            </TouchableOpacity>
          ) : (
            <View style={styles.iconContainer} />
          )}
        </View>
        <FlatList
          data={categories}
          horizontal={true}
          renderItem={categoryRenderItem}
          keyExtractor={item => item.id}
          extraData={selectedCategory}
          contentContainerStyle={styles.horizontalListContainer}
        />
        <FlatList
          ref={coffeeFlatListRef}
          data={selectedCoffees}
          horizontal={true}
          renderItem={renderItem}
          onLayout={event => {
            const {height} = event.nativeEvent.layout;
            if (selectedCoffees.length > 0) {
              setCoffeeListHeight(height);
            }
          }}
          ListEmptyComponent={
            <View
              style={[styles.emptyListContainer, {height: coffeeListHeight}]}>
              <Text style={styles.emptyListText}>No Coffee Found</Text>
            </View>
          }
          keyExtractor={item => item.id}
          extraData={selectedCategory}
          contentContainerStyle={styles.horizontalListContainer}
        />
        <Text style={styles.subHeading}>Beans</Text>
        <FlatList
          data={BeanList}
          horizontal={true}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.horizontalListContainer}
        />
      </ScrollContainer>
    </Layout>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: FONTSIZE.size_28,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    padding: SPACING.space_16,
  },
  searchContainer: {
    margin: SPACING.space_16,
    paddingHorizontal: SPACING.space_16,
    paddingVertical: SPACING.space_2,
    backgroundColor: COLORS.primaryLightGreyHex,
    borderRadius: BORDERRADIUS.radius_10,
    flexDirection: 'row',
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: SPACING.space_10,
  },
  searchBox: {
    flex: 1,
    height: 45,
  },
  iconContainer: {
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalListContainer: {
    gap: SPACING.space_16,
    paddingHorizontal: SPACING.space_16,
    paddingVertical: SPACING.space_12,
  },
  subHeading: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
    paddingLeft: SPACING.space_16,
    paddingTop: SPACING.space_16,
  },
  emptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_12 * 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyListText: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhiteHex,
  },
});

export default HomeScreen;
