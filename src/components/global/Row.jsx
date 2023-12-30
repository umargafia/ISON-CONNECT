import { StyleSheet, View } from 'react-native';
import React from 'react';

const Row = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Row;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
