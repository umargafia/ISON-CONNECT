import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Theme } from '../constant/Theme';
import MyButton from '../components/global/Mybutton';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';

const theme = Theme();
export default function ErrorPage() {
  const navigation = useNavigation();
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/error.png')}
            style={styles.image}
          />
        </View>
        <Text style={styles.text}>
          Something went wrong, please check your internet connection and try
          agin later
        </Text>
        <MyButton
          text="Back to Home"
          style={styles.button}
          onPress={() => navigation.replace('welcomePage')}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    height: theme.window.windowHeight / 3,
    width: 300,
    resizeMode: 'contain',
  },
  text: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    alignSelf: 'stretch',
    marginHorizontal: '20%',
    marginTop: 20,
  },
});
