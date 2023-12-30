import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';

import Home from './src/Screens/Home';
import WelcomePage from './src/Screens/WelcomePage';
import LoginPage from './src/Screens/LoginPage';
import SignupPage from './src/Screens/SignupPage';
import ForgetPassword from './src/Screens/ForgetPassword';
import MySlider from './src/Screens/MySlider';
import { getEncryptedData } from './src/constant/SaveData';
import ErrorPage from './src/Screens/ErrorPage';

const Stack = createNativeStackNavigator();
export default function HomeComponent() {
  const [user, setUser] = useState('');
  useEffect(() => {
    (async () => {
      const currentUser = await getEncryptedData();
      setUser(currentUser);
    })();
  }, []);

  return (
    <>
      <StatusBar style="light" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name="sliderPage"
            component={user === null ? MySlider : WelcomePage}
          />

          <Stack.Screen name="errorPage" component={ErrorPage} />
          <Stack.Screen name="welcomePage" component={WelcomePage} />
          <Stack.Screen name="loginPage" component={LoginPage} />
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="signup" component={SignupPage} />
          <Stack.Screen name="forgetPassword" component={ForgetPassword} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
