import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Mybutton from '../components/global/Mybutton';
import { Theme } from '../constant/Theme';
import { useNavigation } from '@react-navigation/native';
import { getEncryptedData } from '../constant/SaveData';
import { loginSuccess } from '../store/authSlice';
import { StatusBar } from 'expo-status-bar';

const theme = Theme();
const WelcomePage = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const currentUser = await getEncryptedData();
      if (currentUser) {
        dispatch(loginSuccess(currentUser));
      }
    })();
  }, []);
  function navigateToLogin() {
    navigation.navigate('loginPage');
  }
  function navigateToSignup() {
    navigation.navigate('signup');
  }
  return (
    <>
      <StatusBar style="light" />
      <View style={styles.container}>
        <ImageBackground
          source={require('../../assets/background.png')}
          style={styles.backgroundImage}
        >
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)']}
            style={styles.linearGradient}
          >
            <View style={styles.innerContainer}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={require('../../assets/logo.png')}
                />
              </View>

              <View style={{ alignSelf: 'stretch' }}>
                <Mybutton
                  text="login"
                  onPress={navigateToLogin}
                  color="white"
                />
                <Mybutton
                  text="Register"
                  background={theme.palette.primary}
                  onPress={navigateToSignup}
                  color="white"
                />
              </View>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
    </>
  );
};

export default WelcomePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  linearGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    paddingVertical: theme.window.windowWidth * 0.1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: theme.palette.primary,
    transform: [{ translateY: -40 }],
    textTransform: 'uppercase',
  },
  image: {
    width: '50%',
    height: theme.window.windowWidth > 400 ? 300 : 150,
    resizeMode: 'contain',
  },
});
