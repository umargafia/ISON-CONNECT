import { View, StyleSheet, BackHandler } from 'react-native';
import { WebView } from 'react-native-webview';
import React, { useRef, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import Loader from '../components/global/Loader';
import Urls from '../constant/Urls';

const urls = Urls();
export default function Home({ route, navigation }) {
  const [visited, setVisited] = useState(false);
  const { phone, password } = route.params;
  const webViewRef = useRef(null);
  const [isLoading, setLoading] = useState(true);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (canGoBack) {
        webViewRef.current.goBack();
        return true; // Prevent default Android back button behavior
      }
      return false; // Use default Android back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove(); // Clean up the event listener on unmount
  }, [canGoBack]);

  const handleWebViewLoadStart = () => {
    setLoading(true);
  };

  const handleWebViewLoad = () => {
    const script = `
        document.getElementById('phonelogin').value = '${phone}';
        document.getElementById('passwordlogin').value = '${password}';
        document.getElementById('submit-btn').click();
      `;
    webViewRef.current.injectJavaScript(script);

    visited && setLoading(false);
    setVisited(true);
  };

  const handleWebViewNavigationStateChange = (newNavState) => {
    setCanGoBack(newNavState.canGoBack);

    if (newNavState.url === urls.home) {
      setLoading(false);
    }

    if (newNavState.url === urls.login && visited === true) {
      navigation.replace('welcomePage');
    }
  };

  const handleShouldStartLoadWithRequest = (event) => {
    setLoading(true);
    return true;
  };
  return (
    <>
      <StatusBar style="dark" />
      <View style={styles.container}>
        {isLoading && <Loader />}
        <WebView
          ref={webViewRef}
          source={{ uri: urls.login }}
          onLoad={handleWebViewLoad}
          onLoadStart={handleWebViewLoadStart}
          style={isLoading && styles.webview}
          onNavigationStateChange={handleWebViewNavigationStateChange}
          startInLoadingState={true}
          onShouldStartLoadWithRequest={handleShouldStartLoadWithRequest}
          renderLoading={() => <Loader />}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
  },
  webview: {
    display: 'none',
  },
});
