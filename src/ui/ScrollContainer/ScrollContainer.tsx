import React, {type PropsWithChildren} from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import type {ScrollViewProps} from 'react-native';

interface ScrollContainerProps extends PropsWithChildren {
  containerStyle?: any;
  scrollViewOptions?: ScrollViewProps;
}

const ScrollContainer: React.FC<ScrollContainerProps> = ({
  children,
  containerStyle,
  scrollViewOptions,
}) => {
  const showsVerticalScrollIndicator =
    scrollViewOptions?.showsVerticalScrollIndicator;
  delete scrollViewOptions?.showsVerticalScrollIndicator;

  const showsHorizontalScrollIndicator =
    scrollViewOptions?.showsHorizontalScrollIndicator;
  delete scrollViewOptions?.showsHorizontalScrollIndicator;

  const keyboardShouldPersistTaps =
    scrollViewOptions?.keyboardShouldPersistTaps;
  delete scrollViewOptions?.keyboardShouldPersistTaps;

  const contentContainerStyle = scrollViewOptions?.contentContainerStyle;
  delete scrollViewOptions?.contentContainerStyle;

  return (
    <View style={[styles.container, containerStyle]}>
      <ScrollView
        showsVerticalScrollIndicator={
          showsVerticalScrollIndicator !== undefined
            ? showsVerticalScrollIndicator
            : false
        }
        showsHorizontalScrollIndicator={
          showsHorizontalScrollIndicator !== undefined
            ? showsHorizontalScrollIndicator
            : false
        }
        keyboardShouldPersistTaps={
          keyboardShouldPersistTaps !== undefined
            ? keyboardShouldPersistTaps
            : 'always'
        }
        contentContainerStyle={[
          styles.scrollViewContainer,
          contentContainerStyle,
        ]}
        {...scrollViewOptions}>
        {children}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
});

export default ScrollContainer;
