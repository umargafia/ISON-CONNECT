import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import * as Network from 'expo-network';

const useDetectInternet = () => {
  const navigate = useNavigation();

  useEffect(() => {
    const checkNetworkState = async () => {
      try {
        const networkState = await Network.getNetworkStateAsync();
        if (
          networkState.isConnected === true &&
          networkState.isInternetReachable === true
        ) {
        } else {
          navigate.replace('errorPage');
        }
      } catch (error) {
        console.log(error);
        navigate.replace('errorPage');
      }
    };

    checkNetworkState();
  }, []);
};

export default useDetectInternet;
