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
import {API_BASE_URL, BASE_URL} from '../../../../env';
import {COLOR, COLOR_GRAY} from '../../../styles';

export default function Takeaway({navigation}) {
  const [loading, setLoading] = useState(false);
  const [pesanan, setPesanan] = useState([]);
  const [reload, setReload] = useState(1);
  const getPesanan = async () => {
    try {
      const response = await fetch(
        'https://order.portalabsen.com/api/daftar-pesanan-takeaway',
      );
      const json = await response.json();
      console.log('daftar', json.data);
      setPesanan(json.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleKonfirmasi = id => {
    Alert.alert(
      'Peringatan!',
      'Yakin Ingin Konfirmasi Pesanan?',
      [
        {
          text: 'YA',
          onPress: async () => {
            konfirmasiPesanan(id, 2);
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
        }}>
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
                  source={require('../../../assets/image/user.png')}
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
                  width: wp(35),
                }}>
                <View style={{}}>
                  <Text style={{fontSize: wp(5), fontWeight: 'bold'}}>
                    {v.jenis}
                  </Text>
                  <Text style={{fontSize: wp(4), fontWeight: 'bold'}}>
                    Nama= {v.user.name}
                  </Text>
                  <Text
                    style={{fontSize: wp(4), fontWeight: 'bold'}}
                    numberOfLines={1}
                    adjustsFontSizeToFit>
                    status={' '}
                    {v.status == 0
                      ? 'Menunggu Konfirmasi'
                      : v.status == 2
                      ? 'Sedang Dibuat'
                      : 'selesai dibuat'}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  width: wp(31),
                  alignSelf: 'center',
                  flexDirection: 'row',
                }}>
                {v.status == 0 && (
                  <>
                    <IconButton
                      mode="contained"
                      style={{borderRadius: wp(2)}}
                      icon={require('../../../assets/icon/whatsapp.png')}
                      iconColor={MD3Colors.error50}
                      size={wp(3.5)}
                      onPress={() => console.log('dd')}
                    />
                    <IconButton
                      mode="contained"
                      style={{borderRadius: wp(2), padding: 0}}
                      icon={require('../../../assets/icon/confirm.png')}
                      iconColor={MD3Colors.error50}
                      size={wp(3.5)}
                      onPress={() => handleKonfirmasi(v.id)}
                    />
                    <IconButton
                      mode="contained"
                      style={{borderRadius: wp(2)}}
                      icon={require('../../../assets/icon/cancel.png')}
                      iconColor={MD3Colors.error50}
                      size={wp(3.5)}
                      onPress={() => handleCancel(v.id)}
                    />
                  </>
                )}
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
                {v.status == 3 && (
                  <>
                    <Button
                      mode="contained"
                      onPress={async () => {
                        navigation.navigate('BayarTakeaway', {id: v.id});
                      }}
                      style={{
                        borderRadius: wp(2),
                        marginLeft: wp(5),
                        backgroundColor: COLOR.PRIMARY,
                      }}>
                      Bayar
                    </Button>
                  </>
                )}
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
