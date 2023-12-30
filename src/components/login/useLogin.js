import { Alert } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import * as LocalAuthentication from 'expo-local-authentication';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { saveEncryptedData } from '../../constant/SaveData';
import { logout } from '../../store/authSlice';
import { sendPostRequest } from '../../constant/Api';
import useDetectInternet from '../../constant/detectInternet';

export const useLogin = () => {
  const [error, setError] = useState({
    phoneNumber: '',
    password: '',
    message: '',
  });
  const [password, setPassword] = useState('');
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [fingerprint, setFingerprint] = useState(false);
  const [hasLoggedInBefore, setHasLoginBefore] = useState(false);
  const [phone, setPhone] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [user, setUser] = useState('');
  const navigation = useNavigation();
  const { user: currentUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showSwitch, setShowSwitch] = useState(true);
  const [isSupported, setSupport] = useState(false);
  useDetectInternet();

  useEffect(() => {
    (async () => {
      //check if the user login before
      setHasLoginBefore(currentUser.phoneNumber ? true : false);
      setUser(currentUser);
      setPhone(currentUser.phoneNumber ? currentUser.phoneNumber : '');

      // check if the device has fingerprint sensors
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);

      //check if there is any fingerprint save in the device
      const enroll = await LocalAuthentication.isEnrolledAsync();
      if (enroll) {
        setFingerprint(true);
      }

      //tell the device if its supported
      if (hasLoggedInBefore && isBiometricSupported && fingerprint) {
        setSupport(true);
      }
    })();
  }, [hasLoggedInBefore, isBiometricSupported, fingerprint]);

  const handleBiometricAuth = async () => {
    try {
      //  authenticate the user using the fingerprint sensor
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Fingerprint',
        disableDeviceFallback: true,
        cancelLabel: 'Cancel',
      });

      if (biometricAuth.success) {
        //if the device authentication is successful login the user automatic
        navigation.replace('home', {
          phone: user.phoneNumber,
          password: user.password,
        });

        return;
      }
    } catch (error) {
      Alert.alert('Error', 'something went wrong ');
    }
  };

  async function handleLogin() {
    //validates the inputs
    if (password.trim().length === 0) {
      setError((prev) => ({
        ...prev,
        password: 'password cannot be empty',
      }));
    }

    if (phone.trim().length === 0) {
      setError((prev) => ({
        ...prev,
        phoneNumber: 'phone number cannot be empty',
      }));
    }
    if (password.trim().length === 0 || phone.trim().length === 0) {
      return;
    }

    setLoading(true);

    //check if phone and password are correct

    let response;
    if (user.phoneNumber) {
      response = await sendPostRequest(user.phoneNumber, password);
    } else {
      response = await sendPostRequest(phone, password);
    }

    //validate if user credentials are right
    if (response?.status !== 'success') {
      setError((prec) => ({
        ...prec,
        message: 'Incorrect phone number or password',
      }));
      setLoading(false);
      return;
    }

    //save the user to the device
    saveEncryptedData(response, password);
    setLoading(false);
    navigation.replace('home', { phone, password });
  }

  function handlePasswordChange(text) {
    setPassword(text);
    setError((prev) => ({
      ...prev,
      password: '',
      message: '',
    }));
  }

  function handlePhoneChange(text) {
    setPhone(text);
    setError((prev) => ({
      ...prev,
      phoneNumber: '',
      message: '',
    }));
  }

  function handleLoginWithPhone() {
    dispatch(logout());
    setPhone('');
    setShowSwitch(false);
  }

  function handleForgetPassword() {
    navigation.navigate('forgetPassword');
  }

  return {
    error,
    password,
    phone,
    isLoading,
    currentUser,
    showSwitch,
    isSupported,
    user,
    handleBiometricAuth,
    handlePhoneChange,
    handlePasswordChange,
    handleLogin,
    handleForgetPassword,
    handleLoginWithPhone,
  };
};
