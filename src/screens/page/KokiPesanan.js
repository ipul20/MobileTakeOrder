import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {API_BASE_URL, BASE_URL} from '../../../env';
import {COLOR, COLOR_GRAY} from '../../styles';

export default function KokiPesanan({navigation}) {
  const [loading, setLoading] = useState(0);
  const [pesanan, setPesanan] = useState([]);
  const [reload, setReload] = useState(1);
  const handleSelesai = id => {
    Alert.alert(
      'Peringatan!',
      'Pesanan Selesai Di buat?',
      [
        {
          text: 'YA',
          onPress: async () => {
            konfirmasiPesanan(id, 3);
          },
          style: 'cancel',
        },
        {
          text: 'Batal',
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  const handleCancel = id => {
    Alert.alert(
      'Peringatan!',
      'Yakin Ingin Membatalkan Pesanan?',
      [
        {
          text: 'YA',
          onPress: async () => {
            konfirmasiPesanan(id, 5);
          },
          style: 'cancel',
        },
        {
          text: 'Batal',
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );
  };
  const konfirmasiPesanan = async (id, status) => {
    setLoading(true);

    try {
      let res = await fetch(API_BASE_URL + '/konfirmasi-pesanan', {
        method: 'post',
        body: JSON.stringify({
          id: id,
          status: status,
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
        alert('Update PesananBerhasil');
        setReload(reload + 1);
        // navigation.push('MainScreen');
        // navigation.goBack();
      }
    } catch (error) {
      console.log('error upload', error);
      alert('Tambah Pesanan gagal :', error);
      setLoading(false);
    }
  };
  const getPesanan = async () => {
    try {
      const response = await fetch(
        'https://order.portalabsen.com/api/daftar-pesanan',
      );
      const json = await response.json();
      console.log('daftar', json.data);
      setPesanan(json.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getPesanan();
      //Put your Data loading function here instead of my loadData()
    });

    getPesanan();
    return unsubscribe;
  }, [reload, navigation]);
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          minHeight: hp(100),
          paddingBottom: hp(25),
          backgroundColor: 'white',
        }}>
        {pesanan.length == 0 && (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: wp(10),
            }}>
            <Image
              source={require('../../assets/icon/tidak-ada.png')}
              style={{
                width: wp(50),
                height: wp(50),
                borderRadius: wp(1),
              }}
            />
            <Text>Tidak Ada Pesanan</Text>
          </View>
        )}
        {pesanan.map(v => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('DetailTakeaway', {detail: v.detail})
            }
            style={{
              flexDirection: 'row',
              paddingVertical: wp(2),
              paddingHorizontal: wp(4),
              borderBottomColor: COLOR_GRAY.LIGHT,
              borderBottomWidth: 1,
              width: ' 100%',
              justifyContent: 'space-between',
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginTop: wp(2),
                  marginRight: wp(3),
                  padding: wp(1),
                }}>
                <Image
                  source={require('../../assets/image/user.png')}
                  style={{
                    width: wp(20),
                    height: wp(20),
                    borderRadius: wp(1),
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                }}>
                <View
                  style={{
                    marginRight: wp(2),
                  }}>
                  <Text style={{fontSize: wp(5), fontWeight: 'bold'}}>
                    {v.jenis}
                  </Text>
                </View>
                <View style={{}}>
                  <Text style={{fontSize: wp(4), fontWeight: 'bold'}}>
                    Nama= {v.user?.name ?? 'non member'}
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                width: wp(31),
                alignSelf: 'center',
                flexDirection: 'row',
              }}>
              {v.status == 2 && (
                <>
                  <Button
                    mode="contained"
                    onPress={async () => {
                      await handleSelesai(v.id);
                    }}
                    style={{
                      borderRadius: wp(2),
                      marginLeft: wp(5),
                      backgroundColor: COLOR.PRIMARY,
                    }}>
                    Selesai
                  </Button>
                </>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
