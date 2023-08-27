import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  // TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {TextInput, Button} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {API_BASE_URL, DEFAULT_PROFILE_PICTURE} from '../../../env';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLOR} from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState({value: '', error: false});
  const [username, setUsername] = useState({value: '', error: false});
  // const [checked, setChecked] = useState(false);
  const [icon, setIcon] = useState({
    icon: 'eye',
    status: true,
  });

  const showPass = e => {
    if (icon.icon == 'eye') {
      setIcon({
        ...icon,
        icon: 'eye-off',
        status: false,
      });
    } else {
      setIcon({
        ...icon,
        icon: 'eye',
        status: true,
      });
    }
  };

  const cekNull = e => {
    if (e == '') {
      return true;
    }
  };

  const validasiNull = () => {
    {
      cekNull(password.value)
        ? setPassword({
            ...password,
            error: true,
          })
        : setPassword({
            ...password,
            error: false,
          });
    }
    {
      cekNull(confirm.value)
        ? setConfirm({
            ...confirm,
            error: true,
          })
        : setConfirm({
            ...confirm,
            error: false,
            message: 'confirm password invalid!',
          });
    }
  };
  const loginpress = () => {
    fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }),
    })
      .then(res => res.json())
      .then(async res => {
        console.log('respon', res);
        if (res.status == true) {
          await AsyncStorage.setItem('id', res.data.id.toString());
          await AsyncStorage.setItem('name', res.data.name.toString());
          await AsyncStorage.setItem('role', res.data.role.toString());
          alert('login Berhasil');
          if (res.data.role == 'user') {
            navigation.replace('MainScreen');
          } else if (res.data.role == 'admin') {
            navigation.replace('HomeAdmin');
          } else if (res.data.role == 'koki') {
            navigation.replace('HomeKoki');
          }
        } else {
          alert(res.message);
        }
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        // ADD THIS THROW error
        throw error;
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login Akun</Text>
      <View style={styles.logo}>
        <Image
          source={DEFAULT_PROFILE_PICTURE}
          style={{alignSelf: 'center'}}
          resizeMode={'center'}
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#000000',
          marginTop: hp(2),
          marginBottom: hp(2),
          alignSelf: 'center',
        }}>
        Warung Bakso Solo
      </Text>
      <View style={styles.groupinput}>
        <TextInput
          outlineColor="#0095da"
          style={styles.input}
          label="Username"
          mode="outlined"
          value={username.value}
          onChangeText={text => setUsername({value: text, error: false})}
          left={<TextInput.Icon name="account" color="#0095DA" />}
          theme={{colors: {primary: COLOR.PRIMARY}}}
        />
        <TextInput
          outlineColor="#0095da"
          style={styles.input}
          label="Password"
          mode="outlined"
          secureTextEntry={icon.status}
          value={password.value}
          onChangeText={text => setPassword({value: text, error: false})}
          theme={{colors: {primary: COLOR.PRIMARY}}}
          left={<TextInput.Icon name="lock" color="#0095DA" />}
          right={
            <TextInput.Icon
              name={icon.icon}
              color="#0095DA"
              onPress={e => showPass()}
            />
          }
        />

        {/* <View
          style={{width: '35%', height: 30, left: 88, flexDirection: 'row'}}>
          <Text style={{fontWeight: 'bold'}}>Belum Punya Akun ?</Text>
          <TouchableOpacity>
            <Text>Daftar</Text>
          </TouchableOpacity>
        </View> */}
        <Button
          mode="contained"
          onPress={loginpress}
          style={styles.buttonMasuk}
          compact={false}>
          <Text style={{color: '#F4F9F9'}}>MASUK</Text>
        </Button>
        <Button
          mode="contained"
          style={styles.buttonDaftar}
          compact={false}
          onPress={() => navigation.navigate('Register')}>
          <Text style={{color: '#0095da'}}>Daftar</Text>
        </Button>

        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('HomeAdmin');
          }}
          style={styles.buttonDaftar}
          compact={false}>
          <Text style={{color: '#0095da'}}>Menu Admin</Text>
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('HomeKoki');
          }}
          style={styles.buttonDaftar}
          compact={false}>
          <Text style={{color: '#0095da'}}>Menu Koki</Text>
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            navigation.navigate('MainScreen');
          }}
          style={styles.buttonDaftar}
          compact={false}>
          <Text style={{color: '#0095da'}}>Menu User</Text>
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0095DA',
    top: 12,
    alignSelf: 'center',
    top: 38,
  },
  logo: {
    marginTop: hp(7),
    height: hp(15),
    width: wp(60),
    borderRadius: wp(20),
    alignSelf: 'center',
    justifyContent: 'center',
  },
  groupinput: {
    width: '100%',
    height: '90%',
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    width: '95%',
    marginTop: 10,
    borderTopColor: '#0095DA',
    width: 281,
  },
  buttonDaftar: {
    width: '80%',
    backgroundColor: 'white',
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 7,
    borderColor: '#0095DA',
    borderWidth: 1,
  },
  buttonMasuk: {
    width: '80%',
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 7,
    backgroundColor: '#0095DA',
    borderWidth: 2,
    marginTop: 20,
  },
});

export default Login;
