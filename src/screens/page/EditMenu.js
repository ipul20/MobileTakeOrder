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

export default function EditMenu({route}) {
  const {nama, harga, deskripsi, id} = route.params;
  const jenis = '';
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    id: id,
    nama: nama,
    harga: harga,
    deskripsi: deskripsi,
    gambar: '',
    nama_gambar: '',
  });
  const options = {
    mediaType: 'photo',
  };
  const PilihGambar = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) {
      } else if (response.error) {
      } else {
        setForm({
          ...form,
          gambar: response.assets[0].uri,
          nama_gambar: response.assets[0].fileName,
          type_gambar: response.assets[0].type,
        });
      }
    });
  };
  const Submit = async () => {
    setLoading(true);
    const data = new FormData();
    if (form.gambar !== '') {
      data.append('gambar', {
        uri: form.gambar,
        name: form.nama_gambar,
        type: form.type_gambar,
      });
    }
    data.append('id', form.id);
    data.append('nama', form.nama);
    data.append('harga', form.harga);
    data.append('deskripsi', form.deskripsi);
    try {
      let res = await fetch(API_BASE_URL + '/menu-edit', {
        method: 'post',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });
      let result = await res.json();
      setLoading(false);
      console.log('respon', result);
      if (result.status == true) {
        alert('Edit Data Menu Berhasil');
        navigation.goBack();
      }
    } catch (error) {
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
        Edit Menu
      </Text>
      <View style={styles.groupinput}>
        <TextInput
          label="Nama"
          style={styles.input}
          onChangeText={v =>
            setForm({
              ...form,
              nama: v,
            })
          }
          value={form.nama}
        />
        <TextInput
          label="Harga"
          style={styles.input}
          onChangeText={v =>
            setForm({
              ...form,
              harga: v,
            })
          }
          keyboardType="numeric"
          value={form.harga}
        />
        <TextInput
          label="Deskripsi"
          style={styles.input}
          onChangeText={v =>
            setForm({
              ...form,
              deskripsi: v,
            })
          }
          value={form.deskripsi}
        />
        <View style={{borderWidth: 1, padding: wp(2), width: wp(80)}}>
          <Text style={{color: 'grey', marginBottom: wp(2), marginLeft: wp(1)}}>
            Gambar Menu
          </Text>
          <Button
            mode="outlined"
            buttonColor="#dfdfdf"
            textColor="black"
            style={{borderRadius: wp(2)}}
            onPress={() => PilihGambar()}>
            Pilih Gambar
          </Button>
          <Text style={{color: 'grey', marginBottom: wp(2), marginLeft: wp(1)}}>
            *kosongkan bila tidak ingin diganti
          </Text>
        </View>
        <Button
          loading={loading}
          disabled={loading}
          mode="contained"
          style={styles.buttonMasuk}
          compact={false}
          onPress={() => Submit()}>
          <Text style={{color: '#F4F9F9'}}>Update</Text>
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
