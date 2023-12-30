import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import WebView from 'react-native-webview';

import Loader from '../components/global/Loader';
import Urls from '../constant/Urls';

const urls = Urls();
const ForgetPassword = () => {
  const [isLoading, setLoading] = useState(true);
  const handleWebViewLoadStart = () => {
    setLoading(true);
  };

  const handleWebViewLoadEnd = () => {
    setLoading(false);
  };

  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {isLoading && <Loader />}
        <WebView
          source={{ uri: urls.forgetPassword }}
          onLoadStart={handleWebViewLoadStart}
          onLoadEnd={handleWebViewLoadEnd}
          style={isLoading && styles.webview}
        />
      </View>
    </>
  );
};

export default ForgetPassword;

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
