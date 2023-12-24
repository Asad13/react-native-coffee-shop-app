import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import SplashScreen from 'react-native-splash-screen';
import TabNavigator from './src/navigators/TabNavigator';
import DeatilsScreen from './src/screens/DeatilsScreen';
import PaymentScreen from './src/screens/PaymentScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen
            name="Tab"
            component={TabNavigator}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Details"
            component={DeatilsScreen}
            options={{animation: 'slide_from_bottom'}}
          />
          <Stack.Screen
            name="Payment"
            component={PaymentScreen}
            options={{animation: 'slide_from_bottom'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
};

export default App;
