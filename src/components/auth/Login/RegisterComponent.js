import React, {useState, useContext} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {COLOR, COLOR_GRAY} from '../../../styles';
import {useNavigation} from '@react-navigation/native';
import {ContextType as ContextUser} from './../../../context/ContextUser';

export default function RegisterComponent() {
  const navigation = useNavigation();

  const userContext = useContext(ContextUser);
  const {registerUser} = userContext;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [waNumber, setWaNumber] = useState('');
  const [loadingRegister, setLoadingRegister] = useState(false);

  const isEmpty = text => {
    return text === null ? true : text.length === 0;
  };

  const isLength = (text, length) => {
    return text.length < length;
  };

  const handleRegister = async () => {
    setLoadingRegister(true);
    if (isEmpty(username)) {
      Alert.alert('Username tidak boleh kosong!');
      setLoadingRegister(false);
    } else if (isEmpty(waNumber)) {
      Alert.alert('No. WhatsApp tidak boleh kosong!');
      setLoadingRegister(false);
    } else if (isLength(password, 8)) {
      Alert.alert('Kata sandi minimal 8 karakter!');
      setLoadingRegister(false);
    } else {
      const data = await registerUser({
        username,
        password,
        no_hp: waNumber,
      });
      if (data) {
        navigation.navigate('Otp', {waNumber});
      }
      setLoadingRegister(false);
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
        Daftar akun lebih mudah dan cepat melalui WhatsApp
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
        {/* WHATSAPP */}
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
              source={require('./../../../assets/wa.png')}
              style={{height: w(6), width: w(6)}}
            />
          </View>
          <TextInput
            onChangeText={text => setWaNumber(text)}
            keyboardType="phone-pad"
            placeholder="Nomor WhatsApp"
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
        {/* WHATSAPP */}
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
        <TouchableOpacity
          disabled={loadingRegister}
          onPress={() => handleRegister()}
          style={{
            backgroundColor: loadingRegister
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
            {loadingRegister ? 'Loading...' : 'DAFTAR'}
          </Text>
        </TouchableOpacity>
        {/* REGISTER */}
      </View>
    </View>
  );
}
