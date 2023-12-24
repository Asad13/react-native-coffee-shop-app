/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../theme/theme';
import {BlurView} from '@react-native-community/blur';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import CustomIcon from '../components/CustomIcon';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView
            overlayColor=""
            blurAmount={15}
            style={styles.blurViewStyle}
          />
        ),
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="home"
              size={25}
              style={{
                color: focused
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Favourites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="like"
              size={25}
              style={{
                color: focused
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="cart"
              size={25}
              style={{
                color: focused
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex,
              }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={OrderHistoryScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <CustomIcon
              name="bell"
              size={25}
              style={{
                color: focused
                  ? COLORS.primaryOrangeHex
                  : COLORS.primaryLightGreyHex,
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    height: 80,
    backgroundColor: COLORS.primaryBlackRGBA,
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    elevation: 0,
  },
  blurViewStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigator;
