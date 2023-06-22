import React, {useState, useContext} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';

import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ScrollView, Keyboard} from 'react-native';
import {COLOR, COLOR_GRAY} from '../../../styles';
import {useNavigation} from '@react-navigation/native';
import {ContextType as ContextUser} from './../../../context/ContextUser';

export default function LoginComponent() {
  const navigation = useNavigation();

  const userContext = useContext(ContextUser);
  const {loginUser} = userContext;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loadingLogin, setLoadingLogin] = useState(false);

  const isEmpty = text => {
    return text === null ? true : text.length === 0;
  };

  const handleLogin = async () => {
    setLoadingLogin(true);
    if (isEmpty(username)) {
      Alert.alert('Username tidak boleh kosong!');
      setLoadingLogin(false);
    } else if (isEmpty(password)) {
      Alert.alert('Kata sandi tidak boleh kosong!');
      setLoadingLogin(false);
    } else {
      const data = await loginUser({
        username,
        password,
      });
      if (data) {
        navigation.replace('MainScreen');
      }
      setLoadingLogin(false);
    }
  };

  return (
    <View style={{zIndex: +10}}>
      <Text
        style={{
          marginTop: w(10),
          color: COLOR.GRAY,
          fontWeight: 'bold',
          width: w(65),
          alignSelf: 'center',
          textAlign: 'center',
        }}>
        Login untuk masuk ke Aplikasi
      </Text>
      <View
        style={{
          width: w(100),
          marginTop: w(6),
        }}>
        {/* USERNAME */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View
            style={{
              height: w(10),
              width: w(10),
              borderRadius: w(2),
              backgroundColor: '#EAEAEA',
              alignItems: 'center',
            }}>
            <Image
              source={require('./../../../assets/user.png')}
              style={{height: w(8), width: w(8), marginTop: w(1.5)}}
            />
          </View>
          <TextInput
            onChangeText={text => setUsername(text)}
            autoCapitalize="none"
            placeholder="Username"
            placeholderTextColor={COLOR.GRAY}
            style={{
              backgroundColor: '#EAEAEA',
              paddingHorizontal: w(4),
              height: w(10),
              width: w(60),
              borderRadius: w(2),
              marginLeft: w(1),
              fontSize: w(3.5),
            }}
          />
        </View>
        {/* USERNAME */}
        {/* PASSWORD */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: w(2),
          }}>
          <View
            style={{
              height: w(10),
              width: w(10),
              borderRadius: w(2),
              backgroundColor: '#EAEAEA',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={require('./../../../assets/password.png')}
              style={{height: w(6), width: w(6)}}
            />
          </View>
          <TextInput
            onChangeText={text => setPassword(text)}
            autoCapitalize="none"
            placeholder="Kata Sandi"
            placeholderTextColor={COLOR.GRAY}
            secureTextEntry={true}
            style={{
              backgroundColor: '#EAEAEA',
              paddingHorizontal: w(4),
              height: w(10),
              width: w(60),
              borderRadius: w(2),
              marginLeft: w(1),
              fontSize: w(3.5),
            }}
          />
        </View>
        {/* PASSWORD */}
        {/* REGISTER */}
        {/* REGISTER */}
        <TouchableOpacity
          disabled={loadingLogin}
          onPress={() => handleLogin()}
          style={{
            backgroundColor: loadingLogin
              ? COLOR_GRAY.NORMAL2
              : COLOR.SECONDARY,
            height: w(10),
            width: w(70),
            borderRadius: w(2),
            marginTop: w(6),
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{fontSize: w(3.5), fontWeight: 'bold', color: COLOR.WHITE}}>
            {loadingLogin ? 'Loading...' : 'MASUK'}
          </Text>
        </TouchableOpacity>
        {/* REGISTER */}
      </View>
    </View>
  );
}
