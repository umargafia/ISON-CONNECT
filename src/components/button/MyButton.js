import { Pressable, StyleSheet, Text } from 'react-native';
import React from 'react';
import { KColors } from '../../constant/Colors';

const MyButton = ({ title, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: KColors.primary,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  text: {
    color: KColors.white,
    textTransform: 'uppercase',
  },
});
