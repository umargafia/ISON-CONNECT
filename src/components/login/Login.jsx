import { Text, TouchableOpacity, View } from 'react-native';

import MyInput from '../global/MyInput';
import Row from '../global/Row';
import MyButton from '../global/Mybutton';
import styles from './loginStyle';
import { useLogin } from './useLogin';

const Login = () => {
  const {
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
  } = useLogin();

  return (
    <View style={styles.container}>
      {currentUser?.phoneNumber ? (
        <>
          <Text style={styles.headerText}>Welcome back </Text>
          <Text style={[styles.headerText, styles.name]}>{user?.name}</Text>
        </>
      ) : (
        <Text style={styles.headerText}>Welcome back!</Text>
      )}

      {!currentUser?.phoneNumber && (
        <MyInput
          text="Phone Number"
          style={styles.inputStyle}
          icon="person"
          error={error.phoneNumber}
          props={{ value: phone, onChangeText: handlePhoneChange }}
        />
      )}
      <MyInput
        text="Password"
        style={styles.inputStyle}
        icon="lock-closed"
        password
        error={error.password}
        props={{ value: password, onChangeText: handlePasswordChange }}
      />
      <Text style={styles.errText}>{error.message}</Text>
      <Row style={styles.row}>
        <MyButton
          text={isLoading ? 'Loading...' : 'Login'}
          style={[
            isSupported ? styles.loginButton : styles.loginButtonNotSupported,
          ]}
          color={'white'}
          onPress={handleLogin}
        />
        {isSupported && (
          <MyButton
            iconButton="finger-print"
            style={styles.fingerButton}
            onPress={handleBiometricAuth}
          />
        )}
      </Row>
      <TouchableOpacity onPress={handleForgetPassword}>
        <Row>
          <Text style={styles.text}>Forgot Password?</Text>
          <Text style={[styles.text, styles.link]}>Recover</Text>
        </Row>
      </TouchableOpacity>
      {showSwitch && (
        <TouchableOpacity onPress={handleLoginWithPhone}>
          <Text style={[styles.text, styles.link]}>
            Sign in with a new phone number
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Login;
