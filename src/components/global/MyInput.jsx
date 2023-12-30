import { StyleSheet, Text, TextInput, View } from 'react-native';
import React from 'react';

import { Theme } from '../../constant/Theme';
import MyIcon from './MyIcon';

const theme = Theme();
const MyInput = ({ text, style, icon, password, error, props }) => {
  return (
    <View style={[styles.container, style]}>
      <MyIcon name={icon} style={styles.icon} />
      <TextInput
        style={[styles.input, error && { borderColor: theme.palette.red }]}
        placeholder={text}
        secureTextEntry={password ? true : false}
        {...props}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default MyInput;

const styles = StyleSheet.create({
  container: {},
  input: {
    borderColor: 'gray',
    borderWidth: 3,
    padding: 10,
    borderRadius: 10,
    fontSize: 20,
    paddingLeft: 40,
  },
  icon: {
    transform: [{ translateY: 41 }, { translateX: 10 }],
    opacity: 0.8,
  },
  errorText: {
    marginLeft: 10,
    color: theme.palette.red,
  },
});
