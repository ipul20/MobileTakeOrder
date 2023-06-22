import {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CheckUser({navigation}) {
  useEffect(() => {
    getUserToken();
  }, []);

  const getUserToken = async () => {
    await AsyncStorage.getItem('userToken', (err, userToken) => {
      if (userToken) {
        navigation.replace('MainScreen');
      } else {
        navigation.replace('Login');
      }
    });
  };
  return null;
}
