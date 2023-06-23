import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/core';
import {API_BASE_URL, DEFAULT_PROFILE_PICTURE} from '../../../env';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLOR} from '../../styles';

const TambahMenu = () => {
  const navigation = useNavigation();

  const [password, setPassword] = useState({value: '', error: false});
  const [username, setUsername] = useState({value: '', error: false});
  // const [checked, setChecked] = useState(false);
  const [icon, setIcon] = useState({
    icon: 'eye',
    status: true,
  });

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
        if (res.code == 200) {
          navigation.replace('HomeStack');
        } else {
          alert(res.message);
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: '#000000',
          marginTop: hp(2),
          marginBottom: hp(2),
          alignSelf: 'center',
        }}>
        Tambah Menu
      </Text>
      <View style={styles.groupinput}>
        <TextInput label="Nama" style={styles.input} />
        <TextInput label="Harga" style={styles.input} />
        <TextInput label="Deskripsi" style={styles.input} />
        <View style={{borderWidth: 1, padding: wp(2), width: wp(80)}}>
          <Text style={{color: 'grey', marginBottom: wp(2), marginLeft: wp(1)}}>
            Gambar Menu
          </Text>
          <Button
            mode="outlined"
            buttonColor="#dfdfdf"
            textColor="black"
            style={{borderRadius: wp(2)}}>
            Pilih Gambar
          </Button>
          <Text style={{color: 'grey', marginBottom: wp(2), marginLeft: wp(1)}}>
            No File Chosen
          </Text>
        </View>
        <Button
          mode="contained"
          onPress={loginpress}
          style={styles.buttonMasuk}
          compact={false}>
          <Text style={{color: '#F4F9F9'}}>Submit</Text>
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
    width: wp(80),
    marginBottom: wp(5),
    borderWidth: 1,
    borderBottomColor: 'black',
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

export default TambahMenu;
