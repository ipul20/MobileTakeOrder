import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import {Button, Modal} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {API_BASE_URL} from '../../../../env';
import {COLOR} from '../../../styles/index';
export default function Dinein({navigation}) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState({
    pesan: false,
    dinein: false,
    member: false,
    reservasi: false,
  });
  const [pesan, setPesan] = useState({user_id: 0, meja: 0});
  const [idmeja, setIdmeja] = useState(null);
  const hideModal = jenis => {
    if (jenis == 'dinein') {
      setModal({...modal, dinein: false});
    } else if (jenis == 'pesan') {
      setModal({...modal, pesan: false});
    } else if (jenis == 'member') {
      setModal({...modal, member: false});
    } else if (jenis == 'reservasi') {
      setModal({...modal, reservasi: false});
    }
  };
  const showModal = (jenis, meja = null) => {
    if (jenis == 'pesan') {
      setPesan({...pesan, meja: meja});
      setModal({...modal, pesan: true});
    } else if (jenis == 'dinein') {
      setModal({...modal, dinein: true});
    } else if (jenis == 'reservasi') {
      setModal({...modal, reservasi: true});
    } else if (jenis == 'member') {
      setModal({...modal, member: true});
    }
  };
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

  const submitPesanan = async () => {
    setLoading(true);

    try {
      let res = await fetch(API_BASE_URL + '/pesan', {
        method: 'post',
        body: JSON.stringify({
          jenis: 'dineIn',
          meja: pesan.meja,
          user_id: pesan.user_id,
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
        alert('Tambah Pesanan Berhasil');
        navigation.replace('SelectMenu', {pesan: []});
        // navigation.push('MainScreen');
        // navigation.goBack();
      }
    } catch (error) {
      console.log('error upload', error);
      alert('Tambah Pesanan gagal :', error);
      setLoading(false);
    }
  };

  const konfirmasiReservasi = async () => {
    setLoading(true);

    try {
      let res = await fetch(API_BASE_URL + '/konfirmasi-reservasi', {
        method: 'post',
        body: JSON.stringify({
          id: idmeja,
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
        alert('Konfirmasi Reservasi Berhasil');
        navigation.replace('SelectMenu', {pesan: []});
        // navigation.push('MainScreen');
        // navigation.goBack();
      }
    } catch (error) {
      console.log('error upload', error);
      alert('Konfirmasi Reservasi gagal :', error);
      setLoading(false);
    }
  };
  const Bayar = async id => {
    try {
      const response = await fetch(
        `https://order.portalabsen.com/api/cek-pesanan/${id}`,
      );
      const json = await response.json();
      let detail = json.data.detail;
      detail = detail.map(({menu_id, nama, banyak, harga, menu}) => {
        return {
          id: menu_id,
          nama,
          banyak: banyak,
          harga,
          gambar: menu.gambar,
        };
      });
      navigation.navigate('Cart', {pesan: detail});
      // setRiwayat({
      //   selesai: json.data.selesai,
      //   belum: json.data.belum,
      // });
    } catch (error) {
      console.error(error);
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
          height: hp(78),
        }}>
        {table.map(v => (
          <TouchableOpacity
            style={{
              backgroundColor:
                v.status && v.jenis == 'reservasi'
                  ? 'red'
                  : v.status && v.jenis == 'dineIn'
                  ? 'green'
                  : 'white',
              display: 'flex',
              borderWidth: 1,
              height: wp(28),
              width: wp(28),
              justifyContent: 'center',
              alignItems: 'center',
              margin: hp(2),
              alignSelf: 'flex-end',
            }}
            onPress={() => {
              setIdmeja(v.id);

              if (v.status && v.jenis == 'dineIn') {
                showModal('dinein');
              } else if (v.status && v.jenis == 'reservasi') {
                showModal('reservasi');
              } else if (!v.status) {
                showModal('pesan', v.nomor);
              }
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
          justifyContent: 'space-around',
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: wp(5),
              height: wp(5),
              backgroundColor: 'red',
              margin: wp(2),
            }}></View>
          <Text>Reservasi</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: wp(5),
              height: wp(5),
              margin: wp(2),
              backgroundColor: 'green',
            }}></View>
          <Text>DineIn</Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: wp(5),
              height: wp(5),
              borderWidth: 1,
              margin: wp(2),
            }}></View>
          <Text>tersedia</Text>
        </View>
      </View>
      <Modal
        visible={modal.pesan}
        onDismiss={() => hideModal('pesan')}
        contentContainerStyle={{
          backgroundColor: 'white',
          alignSelf: 'center',
          padding: 20,
          width: wp(80),
          alignItems: 'center',
        }}>
        <Text style={{fontSize: wp(4), fontWeight: 'bold'}}>
          Input Pesanan DineIn Meja {pesan.meja}
        </Text>
        <View style={{flexDirection: 'row', marginTop: wp(5)}}>
          <Button
            onPress={() => showModal('member')}
            mode="contained"
            style={{
              marginRight: wp(2),
              backgroundColor: COLOR.PRIMARY,
              borderRadius: wp(2),
            }}>
            Member
          </Button>
          <Button
            mode="contained"
            style={{
              backgroundColor: COLOR.PRIMARY,
              borderRadius: wp(2),
            }}
            onPress={async () => {
              await setPesan({...pesan, user_id: 0});
              submitPesanan();
            }}>
            {' '}
            Non Member
          </Button>
        </View>
      </Modal>
      <Modal
        visible={modal.dinein}
        onDismiss={() => hideModal('dinein')}
        contentContainerStyle={{
          backgroundColor: 'white',
          alignSelf: 'center',
          padding: 20,
          width: wp(80),
          alignItems: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Text>Pesanan Dine In {idmeja}</Text>
          <View style={{flexDirection: 'row', marginTop: wp(5)}}>
            <Button
              mode="contained"
              style={{
                marginRight: wp(2),
                backgroundColor: COLOR.PRIMARY,
                borderRadius: wp(2),
              }}
              onPress={() => Bayar(idmeja)}>
              Bayar
            </Button>
            <Button
              mode="contained"
              style={{
                backgroundColor: COLOR.PRIMARY,
                borderRadius: wp(2),
              }}>
              Pindah Meja
            </Button>
          </View>
        </View>
      </Modal>
      <Modal
        visible={modal.member}
        onDismiss={() => hideModal('member')}
        contentContainerStyle={{
          backgroundColor: 'white',
          alignSelf: 'center',
          padding: 20,
          width: wp(80),
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center', marginTop: wp(1)}}>
          <Text
            style={{
              marginBottom: wp(5),
              fontWeight: 'bold',
              fontSize: wp(5),
            }}>
            Cari Member
          </Text>
          <Text
            style={{
              alignSelf: 'flex-start',
              marginBottom: wp(1),
              fontWeight: 'bold',
            }}>
            Username/Nomor hp Member
          </Text>
          <TextInput
            editable
            multiline
            numberOfLines={4}
            maxLength={40}
            onChangeText={text => console.log(text)}
            style={{
              padding: 10,
              borderWidth: 1,
              height: wp(10),
              width: wp(65),
              marginBottom: wp(2),
              borderRadius: wp(2),
            }}
          />
          <Button
            mode="contained"
            onPress={async () => {}}
            style={{borderRadius: wp(2), backgroundColor: COLOR.PRIMARY}}>
            Cari Member
          </Button>
        </View>
      </Modal>
      <Modal
        visible={modal.reservasi}
        onDismiss={() => hideModal('reservasi')}
        contentContainerStyle={{
          backgroundColor: 'white',
          alignSelf: 'center',
          padding: 20,
          width: wp(80),
          alignItems: 'center',
        }}>
        <Text>Reservasi</Text>
        <View style={{flexDirection: 'row', marginTop: wp(5)}}>
          <Button
            mode="contained"
            onPress={async () => {
              await konfirmasiReservasi();
            }}
            style={{borderRadius: wp(2), backgroundColor: COLOR.PRIMARY}}>
            Konfirmasi Kedatangan
          </Button>
        </View>
      </Modal>
    </View>
  );
}
