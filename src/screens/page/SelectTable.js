import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, Alert} from 'react-native';
import {Button} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLOR_GRAY} from '../../styles';
import {COLOR} from '../../styles/index';
import {API_BASE_URL} from '../../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function SelectTable({navigation}) {
  const [table, setTable] = useState([
    {
      nomor: 1,
      status: false,
    },
    {
      nomor: 2,
      status: false,
    },
    {
      nomor: 3,
      status: false,
    },
    {
      nomor: 4,
      status: false,
    },
    {
      nomor: 5,
      status: false,
    },
    {
      nomor: 6,
      status: true,
    },
    {
      nomor: 7,
      status: false,
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [select, setSelect] = useState(null);
  const getStatusTable = async () => {
    try {
      const response = await fetch(API_BASE_URL + '/cek-table');
      const json = await response.json();
      console.log(json.data);
      setTable(json.data);
    } catch (error) {
      console.error(error);
    }
  };
  const Reservasi = async () => {
    const user_id = await AsyncStorage.getItem('id');
    console.log(user_id);
    setLoading(true);

    try {
      let res = await fetch(API_BASE_URL + '/pesan', {
        method: 'post',
        body: JSON.stringify({
          jenis: 'reservasi',
          meja: select,
          user_id: user_id,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      let result = await res.json();
      setLoading(false);
      console.log('respon', result);
      if (result.status == true) {
        Alert.alert('Pemberitahuan', 'Reservasi Berhasil');
        navigation.replace('MainScreen', {screen: 'Riwayat', initial: false});

        // navigation.push('MainScreen');
        // navigation.goBack();
      } else {
        Alert.alert('Reservasi Gagal!', result.message);
        navigation.replace('MainScreen', {screen: 'Riwayat', initial: false});
      }
    } catch (error) {
      console.log('error upload', error);
      alert('Tambah Pesanan gagal :', error);
      setLoading(false);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // getMenu();
      //Put your Data loading function here instead of my loadData()
    });

    getStatusTable();
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: wp(5),
        paddingVertical: wp(5),
      }}>
      <View
        style={{
          flexDirection: 'column',
          flexWrap: 'wrap',
          // justifyContent: 'space-between',
          alignContent: 'space-between',
          height: hp(75),
        }}>
        {table.map(v => (
          <TouchableOpacity
            disabled={v.status}
            onPress={() => setSelect(v.nomor)}
            style={{
              backgroundColor:
                select == v.nomor ? 'green' : v.status ? 'red' : 'white',
              display: 'flex',
              borderWidth: 1,
              height: wp(28),
              width: wp(28),
              justifyContent: 'center',
              alignItems: 'center',
              margin: hp(2),
              alignSelf: 'flex-end',
            }}>
            <Text>{v.nomor}</Text>
          </TouchableOpacity>
        ))}
        <View
          style={{
            borderWidth: 1,
            height: wp(30),
            width: wp(50),
            justifyContent: 'center',
            alignItems: 'center',
            margin: wp(2),
          }}>
          <Text>Kasir</Text>
        </View>
      </View>
      <View
        style={{
          height: wp(7),
          marginVertical: wp(1),
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: wp(5),
            height: wp(5),
            backgroundColor: 'red',
            margin: wp(2),
          }}></View>
        <Text>tidak tersedia</Text>
        <View
          style={{
            width: wp(5),
            height: wp(5),
            borderWidth: 1,
            margin: wp(2),
          }}></View>
        <Text>tersedia</Text>
        <View
          style={{
            width: wp(5),
            height: wp(5),
            margin: wp(2),
            backgroundColor: 'green',
          }}></View>
        <Text>Pilihan Anda</Text>
      </View>
      {select ? (
        <TouchableOpacity
          onPress={Reservasi}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: wp(5),
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            backgroundColor: COLOR.PRIMARY,

            elevation: 3,
          }}>
          <Text style={{color: 'white', fontWeight: 'bold', fontSize: wp(4)}}>
            Reservasi Kursi {select}
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}
