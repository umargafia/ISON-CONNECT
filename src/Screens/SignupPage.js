import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import WebView from 'react-native-webview';

import Loader from '../components/global/Loader';
import Urls from '../constant/Urls';
import { useNavigation } from '@react-navigation/native';
import useDetectInternet from '../constant/detectInternet';

const urls = Urls();
const SignupPage = () => {
  useDetectInternet();
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigation();

  const handleWebViewLoadStart = () => {
    setLoading(true);
  };

  const handleWebViewLoadEnd = () => {
    setLoading(false);
  };

  const handleWebViewError = (syntheticEvent) => {
    navigate.replace('errorPage');
  };

  return (
    <>
      <StatusBar style="dark" />

      <View style={styles.container}>
        {isLoading && <Loader />}
        <WebView
          source={{ uri: urls.signup }}
          onLoadStart={handleWebViewLoadStart}
          onLoadEnd={handleWebViewLoadEnd}
          style={isLoading && styles.webview}
          onError={handleWebViewError}
          onHttpError={handleWebViewError}
        />
      </View>
    </>
  );
};

export default SignupPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
  },

  webview: {
    display: 'none',
  },
});
