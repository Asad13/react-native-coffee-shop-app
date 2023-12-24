import React, {type PropsWithChildren} from 'react';
import {StyleSheet, View} from 'react-native';
import {SPACING} from '../../theme/theme';

interface ContainerProps extends PropsWithChildren {
  containerStyle?: any;
}

const Container: React.FC<ContainerProps> = ({children, containerStyle}) => {
  return <View style={[styles.container, containerStyle]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: SPACING.space_12,
    flexGrow: 1,
  },
});

export default Container;
