import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import { Theme } from '../../constant/Theme';

const theme = Theme();

const SliderItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={item.image} style={styles.image} />
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </View>
  );
};

export default SliderItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    width: theme.window.windowWidth,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    flex: 0.3,
    minHeight: 55,
  },
  imageContainer: {
    width: theme.window.windowWidth,
    height: theme.window.windowHeight / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    resizeMode: 'contain',
    flex: 0.7,
    justifyContent: 'center',
    borderRadius: 10,
  },
  title: {
    fontWeight: 800,
    fontSize: 28,
    marginBottom: 10,
    textAlign: 'center',
    color: theme.palette.black,
    textTransform: 'uppercase',
    marginTop: 20,
    marginBottom: 20,
  },
  description: {
    color: '#62656b',
    paddingHorizontal: 64,
    fontWeight: 600,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
});
