import React, {useState} from 'react';
import {View, Text, Image, Alert} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {COLOR, COLOR_GRAY} from '../../styles';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ScrollView, Keyboard} from 'react-native';

export default function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [waNumber, setWaNumber] = useState('');
  const [loadingRegister, setLoadingRegister] = useState(false);

  const isEmpty = text => {
    return text === null ? true : text.length === 0;
  };

  const validateEmail = email => {
    const regexEmail =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regexEmail.test(String(email).toLowerCase());
  };

  const isLength = (text, length) => {
    return text.length < length;
  };

  const handleRegister = async () => {
    setLoadingRegister(true);
    if (isEmpty(username)) {
      Alert.alert('Username tidak boleh kosong!');
      setLoadingRegister(false);
    } else if (!validateEmail(email)) {
      Alert.alert('Format email salah!', 'danger');
      setLoadingRegister(false);
    } else if (isLength(password, 8)) {
      Alert.alert('Kata sandi minimal 8 karakter!');
      setLoadingRegister(false);
    } else {
      const data = await registerUser({
        name,
        email,
        password,
        password_confirmation: passwordConfirm,
      });
      if (data) {
        Alert.alert('Berhasil Daftar!');
        navigation.goBack();
      }
      setLoadingRegister(false);
    }
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
        <View
          style={{
            width: w(80),
            height: w(50),
            marginTop: w(30),
            borderRadius: w(10),
            backgroundColor: '#FCE2EA',
            alignSelf: 'center',
          }}>
          <Image
            style={{
              height: w(60),
              resizeMode: 'contain',
              aspectRatio: 1,
              marginTop: -w(10),
              alignSelf: 'center',
            }}
            source={require('./../../assets/IntroImage.png')}
          />
        </View>

        <Text
          style={{
            marginTop: w(6),
            color: COLOR.GRAY,
            fontWeight: 'bold',
            width: w(65),
            alignSelf: 'center',
            textAlign: 'center',
          }}>
          Daftar akun lebih mudah dan cepat melalui Wahatsapp
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
                source={require('./../../assets/user.png')}
                style={{height: w(8), width: w(8), marginTop: w(1.5)}}
              />
            </View>
            <TextInput
              onChangeText={text => setUsername(text)}
              autoCapitalize="none"
              placeholder="Username"
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
                source={require('./../../assets/wa.png')}
                style={{height: w(6), width: w(6)}}
              />
            </View>
            <TextInput
              onChangeText={text => setWaNumber(text)}
              keyboardType="phone-pad"
              placeholder="WhatsApp Number"
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
                source={require('./../../assets/password.png')}
                style={{height: w(6), width: w(6)}}
              />
            </View>
            <TextInput
              onChangeText={text => setPassword(text)}
              autoCapitalize="none"
              placeholder="Password"
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
            onPress={() => this.props.navigation.replace('Otp')}
            style={{
              backgroundColor: COLOR.PRIMARY,
              height: w(10),
              width: w(70),
              borderRadius: w(2),
              marginTop: w(6),
              alignSelf: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: w(3.5), color: COLOR.WHITE}}>Register</Text>
          </TouchableOpacity>
          {/* REGISTER */}
          {/* LOGIN */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: w(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: w(4), color: '#AFAFAF'}}>
              Sudah memiliki akun?
            </Text>
            <TouchableOpacity style={{marginLeft: w(1)}}>
              <Text style={{fontSize: w(4), color: COLOR.PRIMARY}}>Login</Text>
            </TouchableOpacity>
          </View>
          {/* LOGIN */}
        </View>
      </View>
    </ScrollView>
  );
}
