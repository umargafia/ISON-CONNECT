import { Animated, StyleSheet, View } from 'react-native';
import React from 'react';
import { Theme } from '../../constant/Theme';

const theme = Theme();
export default function Paginator({ data, scrollX }) {
  return (
    <View style={{ flexDirection: 'row', height: 64, paddingTop: 20 }}>
      {data.map((_, i) => {
        const inputRange = [
          (i - 1) * theme.window.windowWidth,
          i * theme.window.windowWidth,
          (i + 1) * theme.window.windowWidth,
        ];

        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: 'clamp',
        });

        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: 'clamp',
        });

        return (
          <Animated.View
            style={[styles.dot, { width: dotWidth, opacity }]}
            key={i.toString()}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  dot: {
    height: 10,
    borderRadius: 5,
    backgroundColor: theme.palette.primary,
    marginHorizontal: 8,
  },
});
