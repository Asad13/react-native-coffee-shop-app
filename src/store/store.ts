import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CoffeeData from '../data/CoffeeData';
import BeansData from '../data/BeansData';

export const useStore = create(
  persist(
    (set: any) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice: 0,
      FavoritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (cartItem: any) =>
        set(
          produce((state: any) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === cartItem.id) {
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === cartItem.size) {
                    if (state.CartList[i].prices[j].quantity !== undefined) {
                      state.CartList[i].prices[j].quantity++;
                    } else {
                      state.CartList[i].prices[j].quantity = 1;
                    }
                    state.CartPrice += parseFloat(
                      state.CartList[i].prices[j].price,
                    );
                    state.CartPrice = Math.round(state.CartPrice * 100) / 100;
                    return;
                  }
                }
              }
            }

            state.CartList.unshift({...cartItem});

            const priceIndex = state.CartList[0].prices.findIndex(
              (value: any) => value.size === cartItem.size,
            );

            // state.CartList[0].prices[priceIndex].quantity = 1;
            state.CartPrice += parseFloat(
              state.CartList[0].prices[priceIndex].price,
            );
            state.CartPrice = Math.round(state.CartPrice * 100) / 100;
            delete state.CartList[0].size;
          }),
        ),
      removeFromCart: (cartItem: any) =>
        set(
          produce((state: any) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === cartItem.id) {
                const priceIndex = state.CartList[i].prices.findIndex(
                  (value: any) => value.size === cartItem.size,
                );
                if (state.CartList[i].prices[priceIndex].quantity > 0) {
                  state.CartList[i].prices[priceIndex].quantity--;
                  state.CartPrice -= parseFloat(
                    state.CartList[i].prices[priceIndex].price,
                  );
                  state.CartPrice = Math.round(state.CartPrice * 100) / 100;
                }

                let total = 0;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  total += state.CartList[i].prices[j].quantity;
                }

                if (total === 0) {
                  state.CartList.splice(i, 1);
                }

                return;
              }
            }
          }),
        ),
      deleteSizeFromCart: (cartItem: {id: string; size: string}) =>
        set(
          produce((state: any) => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === cartItem.id) {
                const priceIndex = state.CartList[i].prices.findIndex(
                  (value: any) => value.size === cartItem.size,
                );
                if (state.CartList[i].prices[priceIndex].quantity > 0) {
                  state.CartPrice -=
                    state.CartList[i].prices[priceIndex].quantity *
                    parseFloat(state.CartList[i].prices[priceIndex].price);
                  state.CartPrice = Math.round(state.CartPrice * 100) / 100;
                  state.CartList[i].prices[priceIndex].quantity = 0;
                }

                let total = 0;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  total += state.CartList[i].prices[j].quantity;
                }

                if (total === 0) {
                  state.CartList.splice(i, 1);
                }

                return;
              }
            }
          }),
        ),
      emptyCart: () =>
        set(
          produce((state: any) => {
            state.CartList = [];
            state.CartPrice = 0;
          }),
        ),
      emptyFavorites: () =>
        set(
          produce((state: any) => {
            for (let i = 0; i < state.FavoritesList.length; i++) {
              let index;
              if (state.FavoritesList[i].type === 'Coffee') {
                index = state.CoffeeList.findIndex(
                  (value: any) => state.FavoritesList[i].id === value.id,
                );
                state.CoffeeList[index].favourite =
                  !state.CoffeeList[index].favourite;
              } else {
                index = state.BeanList.findIndex(
                  (value: any) => state.FavoritesList[i].id === value.id,
                );
                state.BeanList[index].favourite =
                  !state.BeanList[index].favourite;
              }
            }
            state.FavoritesList = [];
          }),
        ),
      toggleFavorites: (item: any) =>
        set(
          produce((state: any) => {
            let index;
            if (item.type === 'Coffee') {
              index = state.CoffeeList.findIndex(
                (value: any) => item.id === value.id,
              );
              state.CoffeeList[index].favourite =
                !state.CoffeeList[index].favourite;
            } else {
              index = state.BeanList.findIndex(
                (value: any) => item.id === value.id,
              );
              state.BeanList[index].favourite =
                !state.BeanList[index].favourite;
            }

            for (let i = 0; i < state.FavoritesList.length; i++) {
              if (state.FavoritesList[i].id === item.id) {
                state.FavoritesList.splice(i, 1);
                return;
              }
            }

            state.FavoritesList.unshift({...item, favourite: true});
          }),
        ),
      addToOrderHistory: () =>
        set(
          produce((state: any) => {
            state.OrderHistoryList.unshift({
              OrderDate: new Date().toISOString(),
              CartList: state.CartList,
              CartListPrice: state.CartPrice,
            });

            state.CartList = [];
            state.CartPrice = 0;
          }),
        ),
    }),
    {
      name: 'coffee-app',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
