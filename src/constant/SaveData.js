import * as SecureStore from 'expo-secure-store';

// Function to encrypt and save data to device storage
export const saveEncryptedData = async (response, password) => {
  try {
    const dataAsString = JSON.stringify(response);
    await SecureStore.setItemAsync('password', password);
    await SecureStore.setItemAsync('user', dataAsString);
    return true;
  } catch (error) {
    return false;
  }
};

// Function to retrieve and decrypt data from device storage
export const getEncryptedData = async () => {
  try {
    const dataAsString = await SecureStore.getItemAsync('user');
    const password = await SecureStore.getItemAsync('password');

    if (dataAsString) {
      const dataObject = JSON.parse(dataAsString);

      return {
        phoneNumber: dataObject.phone,
        password: password,
        name: dataObject.name,
      };
    }
    return null;
  } catch (error) {
    // Handle error here
    return null;
  }
};
