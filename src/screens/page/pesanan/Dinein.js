import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button, Modal} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {API_BASE_URL} from '../../../../env';
export default function Dinein({navigation}) {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [modal, setModal] = useState({
    pesan: false,
    dinein: false,
    member: false,
  });
  const [pesan, setPesan] = useState({user_id: 0, meja: 0});
  const hideModal = jenis => {
    if (jenis == 'dinein') {
      setModal({...modal, dinein: false});
    } else if (jenis == 'pesan') {
      setModal({...modal, pesan: false});
    } else if ((jenis = 'member')) {
      setModal({...modal, member: false});
    }
  };
  const showModal = (jenis, meja = null) => {
    if (jenis == 'pesan') {
      setPesan({...pesan, meja: meja});
      setModal({...modal, pesan: true});
    } else if (jenis == 'dinein') {
      setModal({...modal, dinein: true});
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
        navigation.replace('SelectMenu');
        // navigation.push('MainScreen');
        // navigation.goBack();
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
          height: hp(80),
        }}>
        {table.map(v => (
          <TouchableOpacity
            disabled={v.status && v.jenis == 'reservasi' ? true : false}
            style={{
              backgroundColor:
                v.status && v.jenis == 'reservasi'
                  ? 'red'
                  : v.status && v.jenis != 'reservasi'
                  ? 'green'
                  : 'white',
              display: 'flex',
              borderWidth: 1,
              height: hp(15),
              width: hp(15),
              justifyContent: 'center',
              alignItems: 'center',
              margin: hp(2),
              alignSelf: 'flex-end',
            }}
            onPress={() => {
              if (v.status && v.jenis != 'reservasi') {
                showModal('dinein');
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
            height: hp(15),
            width: hp(25),
            justifyContent: 'center',
            alignItems: 'center',
            margin: hp(2),
          }}>
          <Text>Kasir</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'yellow',
          flex: 1,
        }}>
        <Button></Button>
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
            mode="outlined"
            onPress={() => showModal('member')}
            style={{marginRight: wp(2)}}>
            Member
          </Button>
          <Button
            mode="outlined"
            onPress={async () => {
              await setPesan({...pesan, user_id: 0});
              submitPesanan();
            }}>
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
        <View style={{flexDirection: 'row', marginTop: wp(5)}}>
          <Button
            mode="outlined"
            onPress={() => console.log('pesan')}
            style={{marginRight: wp(2)}}>
            Member
          </Button>
          <Button
            mode="outlined"
            onPress={async () => {
              await setPesan({...pesan, user_id: 0});
              submitPesanan();
            }}>
            Non Member
          </Button>
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
        <View style={{flexDirection: 'row', marginTop: wp(5)}}>
          <Button
            mode="outlined"
            onPress={() => console.log('pesan')}
            style={{marginRight: wp(2)}}>
            Member nama
          </Button>
          <Button
            mode="outlined"
            onPress={async () => {
              await setPesan({...pesan, user_id: 0});
              submitPesanan();
            }}>
            Non Member
          </Button>
        </View>
      </Modal>
    </View>
  );
}
