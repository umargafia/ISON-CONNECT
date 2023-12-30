import { Animated, FlatList, StyleSheet, View } from 'react-native';
import React, { useRef, useState } from 'react';

import { SlidesList } from '../constant/SliderList';
import SliderItem from '../components/slider/SliderItem';
import Paginator from '../components/slider/Paginator';
import NextButton from '../components/slider/NextButton';
import { Theme } from '../constant/Theme';
import { StatusBar } from 'expo-status-bar';

const MySlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const slideRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={{ flex: 3 }}>
          <FlatList
            data={SlidesList}
            renderItem={({ item }) => <SliderItem item={item} />}
            horizontal
            ref={slideRef}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            bounces={false}
            keyExtractor={(item) => item.key}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              {
                useNativeDriver: false,
              }
            )}
            scrollEventThrottle={32}
            onViewableItemsChanged={viewableItemsChanged}
            viewabilityConfig={viewConfig}
          />
        </View>
        <Paginator data={SlidesList} scrollX={scrollX} />
        <NextButton
          percentage={(currentIndex + 1) * (100 / SlidesList.length)}
          scrollRef={slideRef}
        />
      </View>
    </>
  );
};

export default MySlider;
const theme = Theme();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
