import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import React from 'react';

import { Theme } from '../constant/Theme';
import Login from '../components/login/Login';
import ExpoStatusBar from 'expo-status-bar/build/ExpoStatusBar';
import useDetectInternet from '../constant/detectInternet';

const theme = Theme();
const LoginPage = () => {
  useDetectInternet();

  return (
    <>
      <ExpoStatusBar style="light" />
      <View style={styles.container}>
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <View style={styles.topContainer}>
            <ImageBackground
              source={require('../../assets/background.png')}
              style={styles.backgroundImage}
            ></ImageBackground>
          </View>
          <View style={styles.bottomContainer}>
            <ScrollView>
              <View style={styles.innerContainer}>
                <Image
                  style={styles.image}
                  source={require('../../assets/logo.png')}
                  s
                />
              </View>
              <Login />
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default LoginPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  topContainer: {
    height: theme.window.windowHeight / 3,
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainer: {
    alignSelf: 'center',
    paddingTop: 20,
  },
  image: {
    height: 120,
    width: 200,
    resizeMode: 'contain',
    marginTop: 2,
  },

  bottomContainer: {
    flex: 1,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    overflow: 'hidden',
    zIndex: 20,
    backgroundColor: '#fff',
    transform: [{ translateY: -40 }],
  },
});
