import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import LottieView from 'lottie-react-native';
import {COLORS, FONTFAMILY, FONTSIZE} from '../theme/theme';
import {LOTTIE_COFFEE_CUP_PATH} from '../constants/lottie-animations-paths';

interface LottieAnimationProps {
  feedback?: string;
  source?: {uri: string};
  autoPlay?: boolean;
  loop?: boolean;
}

const LottieAnimation: React.FC<LottieAnimationProps> = ({
  feedback,
  source = LOTTIE_COFFEE_CUP_PATH,
  autoPlay = true,
  loop = true,
}) => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.lottie}
        source={source}
        autoPlay={autoPlay}
        loop={loop}
      />
      {feedback !== undefined && (
        <Text style={styles.feedback}>{feedback}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  lottie: {
    height: 300,
  },
  feedback: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryOrangeHex,
    textAlign: 'center',
  },
});

export default LottieAnimation;
