import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';

import { Theme } from '../../constant/Theme';
import MyIcon from './MyIcon';

const theme = Theme();
const MyButton = ({
  text,
  onPress,
  style,
  background,
  color,
  iconButton,
  iconColor,
}) => {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: '#ccc' }}
      style={[
        styles.container,
        background && { backgroundColor: background },
        style,
      ]}
    >
      {!iconButton && (
        <Text style={[styles.text, color && { color }]}>{text}</Text>
      )}
      {iconButton && (
        <MyIcon
          name={iconButton}
          color={iconColor ? iconColor : theme.palette.white}
        />
      )}
    </Pressable>
  );
};

export default MyButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.palette.primary,
    padding: 10,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    ...theme.shadow,
    borderRadius: 10,
    paddingVertical: 20,
    margin: 10,
  },
  text: {
    color: theme.palette.white,
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 600,
    fontSize: 18,
  },
});
