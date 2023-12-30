import { Alert } from 'react-native';
import Urls from './Urls';

const urls = Urls();
export async function sendPostRequest(phoneNumber, password) {
  const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Token ${currentDate}`,
    },
    body: JSON.stringify({
      phone: phoneNumber,
      accesspass: password,
    }),
  };

  try {
    const response = await fetch(urls.api, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    // Handle any error that occurred during the request
    Alert.alert('Error', 'something went wrong ');
    return;
  }
}
