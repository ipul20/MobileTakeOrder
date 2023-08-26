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
import {launchImageLibrary} from 'react-native-image-picker';

export default function TambahUser({route}) {
  const {role} = route.params;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    nama: '',
    harga: '',
    deskripsi: '',
    gambar: '',
    nama_gambar: '',
    username: null,
    password: null,
    name: null,
    no_hp: null,
    role: role,
  });
  const options = {
    mediaType: 'photo',
  };

  const registerpress = () => {
    fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
        name: form.name,
        role: role,
      }),
    })
      .then(res => res.json())
      .then(async res => {
        console.log('respon', res);
        if (res.status == true) {
          alert('registrasi berhasil');
          navigation.goBack();
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
  const Submit = async () => {
    setLoading(true);
    const data = new FormData();
    data.append('gambar', {
      uri: form.gambar,
      name: form.nama_gambar,
      type: form.type_gambar,
    });
    data.append('nama', form.nama);
    data.append('kategori', role);
    data.append('harga', form.harga);
    data.append('deskripsi', form.deskripsi);
    try {
      let res = await fetch(API_BASE_URL + '/menu-store', {
        method: 'post',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      let result = await res.json();
      setLoading(false);

      if (result.status == true) {
        alert('Tambah Data Menu Berhasil');

        navigation.goBack();
      }
    } catch (error) {
      // console.log('error upload', error);
      alert('Gagal Upload Gambar :', error);
      setLoading(false);
    }
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
        Tambah Data {role}
      </Text>
      <View style={styles.groupinput}>
        <TextInput
          label="Nama"
          style={styles.input}
          onChangeText={v =>
            setForm({
              ...form,
              name: v,
            })
          }
          value={form.name}
        />
        <TextInput
          label="Username"
          style={styles.input}
          onChangeText={v =>
            setForm({
              ...form,
              username: v,
            })
          }
          value={form.username}
        />
        <TextInput
          label="Password"
          style={styles.input}
          onChangeText={v =>
            setForm({
              ...form,
              password: v,
            })
          }
          value={form.password}
        />

        <Button
          loading={loading}
          disabled={loading}
          mode="contained"
          style={styles.buttonMasuk}
          compact={false}
          onPress={() => registerpress()}>
          <Text style={{color: '#F4F9F9'}}>Submit</Text>
        </Button>
      </View>
    </View>
  );
}

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
