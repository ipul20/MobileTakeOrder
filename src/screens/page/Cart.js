import {Picker} from '@react-native-picker/picker';
import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {API_BASE_URL, BASE_URL} from '../../../env';
import {COLOR, COLOR_GRAY} from '../../styles';
export default function Cart({navigation, route}) {
  const {pesan} = route.params;
  const {PesananId} = route.params ?? '';
  const {meja} = route.params;
  const {jenis} = route.params ?? '';

  console.log('pesananddd', pesan);
  const [loading, setLoading] = useState(false);
  const [pesanan, setPesanan] = useState(pesan ?? []);

  const [total, setTotal] = useState({item: 0, harga: 0});
  const [metode, setMetode] = useState();

  //sum total item dan harga
  const sumTotal = () => {
    const sum = pesanan.reduce(
      (total, current) => (total = total + current.banyak),
      0,
    );
    const harga = pesanan.reduce(
      (total, current) => (total = total + current.harga * current.banyak),
      0,
    );
    setTotal({item: sum, harga: harga});
  };
  //cek pesanan
  const FindOrder = id =>
    pesanan.find(obj => {
      return obj.id === id;
    });
  //func decrement pesanan
  const decrement = id => {
    let check = FindOrder(id).banyak;
    if (check == 1) {
      setPesanan(pesanan =>
        pesanan.filter(v => {
          return v.id !== id;
        }),
      );
    } else {
      setPesanan(current =>
        current.map(obj => {
          if (obj.id === id) {
            return {...obj, id: id, banyak: check - 1};
          }

          return obj;
        }),
      );
    }
  };

  //func increment pesanan
  const increment = id => {
    setPesanan(current =>
      current.map(obj => {
        if (obj.id === id) {
          return {...obj, id: id, banyak: parseInt(obj.banyak) + 1};
        }

        return obj;
      }),
    );
    console.log(pesanan);
  };

  const checkout = async () => {
    setLoading(true);

    try {
      let res = await fetch(API_BASE_URL + '/bayar', {
        method: 'post',
        body: JSON.stringify({
          id: 78,
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
        setPesanan([]);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'HomeAdmin',
            },
          ],
        });
        // navigation.push('MainScreen');
        // navigation.goBack();
      }
    } catch (error) {
      console.log('error upload', error);
      alert('Tambah Pesanan gagal :', error);
      setLoading(false);
    }
  };
  const updatePesanan = async id => {
    setLoading(true);

    try {
      let res = await fetch(API_BASE_URL + '/tambah-pesanan', {
        method: 'post',
        body: JSON.stringify({
          id: 147,
          pesanan: pesanan,
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
        setPesanan([]);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'HomeAdmin',
            },
          ],
        });
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
    sumTotal();
  }, [pesanan]);
  useEffect(() => {
    setPesanan(pesan);
  }, [pesan]);
  return (
    <View>
      <View
        style={{
          height: wp(18),
          borderBottomColor: 'grey',
          width: '100%',
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          alignItems: 'center',
          elevation: 3,
        }}>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: 0,
            elevation: 0,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              fontSize: wp(5),
              fontWeight: 'bold',
            }}>
            Daftar Pesanan Dine In
          </Text>
        </View>
      </View>
      <ScrollView
        contentContainerStyle={{
          minHeight: hp(100),
          paddingBottom: hp(25),
        }}>
        {pesanan?.map(v => (
          <>
            <View
              style={{
                flexDirection: 'column',
                height: hp(20),
                paddingVertical: wp(2),
                paddingHorizontal: wp(3),
                borderBottomColor: COLOR_GRAY.LIGHT,
                borderBottomWidth: 1,
                marginBottom: wp(1),
              }}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    width: wp(65),
                    marginRight: wp(2),
                  }}>
                  <Text style={{fontSize: wp(5), fontWeight: 'bold'}}>
                    {v.nama}
                  </Text>
                </View>
                <View>
                  <Text style={{fontSize: wp(4), fontWeight: 'bold'}}>
                    Rp.{parseInt(v.harga * v.banyak).toLocaleString()}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: ' 100%',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View
                  style={{
                    marginTop: wp(2),
                    width: wp(30),
                  }}>
                  <Image
                    source={{uri: `${BASE_URL}/gambar/${v.gambar}`}}
                    style={{
                      width: wp(25),
                      height: wp(20),
                      borderRadius: wp(1),
                    }}
                  />
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <IconButton
                      mode="contained"
                      icon={require('../../assets/icon/mines.png')}
                      size={wp(3.5)}
                      onPress={() => decrement(v.id)}
                    />

                    <Text style={{fontSize: wp(4), marginHorizontal: wp(2)}}>
                      {FindOrder(v.id).banyak}
                    </Text>
                    <IconButton
                      mode="contained"
                      icon={require('../../assets/icon/plus.png')}
                      size={wp(3.5)}
                      onPress={() => increment(v.id)}
                    />
                  </View>
                  <IconButton
                    mode="contained"
                    style={{borderRadius: wp(2)}}
                    icon={require('../../assets/icon/delete.png')}
                    iconColor={MD3Colors.error50}
                    size={wp(5)}
                    onPress={() => showAlert(v.nama, v.id)}
                  />
                </View>
              </View>
            </View>
          </>
        ))}
        <View
          style={{
            paddingHorizontal: wp(5),
            paddingVertical: wp(7),
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontSize: wp(3.5), fontWeight: 'bold'}}>Harga</Text>
            <Text style={{fontSize: wp(3.5), fontWeight: 'bold'}}>
              Rp {parseInt(total.harga).toLocaleString()}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: wp(3.5), fontWeight: 'bold'}}>
              Biaya Layanan & lainnyas
            </Text>
            <Text style={{fontSize: wp(3.5), fontWeight: 'bold'}}>Rp. 0</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: wp(3.5), fontWeight: 'bold'}}>
              Total Pembayaran
            </Text>
            <Text style={{fontSize: wp(3.5), fontWeight: 'bold'}}>
              Rp {parseInt(total.harga).toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: hp(4),
          left: 0,
          height: wp(55),
          width: wp(100),
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: wp(10),
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: -3,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          elevation: 3,
          borderTopWidth: 1,
        }}>
        <TouchableOpacity
          disabled={loading}
          style={{
            height: wp(15),
            width: wp(90),
            marginBottom: wp(2),
            // backgroundColor: COLOR_GRAY.LIGHTEST,
            borderRadius: wp(3),
            paddingHorizontal: wp(4),
            paddingVertical: wp(2),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 4,
            borderColor: COLOR.PRIMARY,
            backgroundColor: COLOR.PRIMARY,
            borderWidth: 1,
          }}
          onPress={() => {
            navigation.navigate('SelectMenu', {pesan: pesanan});
          }}>
          <View style={{alignSelf: 'center'}}>
            <Text style={{color: 'white', fontWeight: '700', fontSize: wp(5)}}>
              Tambah Pesanan
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loading}
          style={{
            height: wp(15),
            width: wp(90),
            marginBottom: wp(2),
            // backgroundColor: COLOR_GRAY.LIGHTEST,
            borderRadius: wp(3),
            paddingHorizontal: wp(4),
            paddingVertical: wp(2),
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,
            elevation: 4,
            borderColor: COLOR.PRIMARY,
            backgroundColor: COLOR.PRIMARY,
            borderWidth: 1,
          }}
          onPress={() => updatePesanan()}>
          <View style={{alignSelf: 'center'}}>
            <Text style={{color: 'white', fontWeight: '700', fontSize: wp(5)}}>
              Update Pesanan
            </Text>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            width: wp(90),
          }}>
          <TouchableOpacity
            disabled={loading}
            style={{
              height: wp(15),
              width: wp(40),
              // backgroundColor: COLOR_GRAY.LIGHTEST,
              borderRadius: wp(3),
              paddingHorizontal: wp(4),
              paddingVertical: wp(2),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 4,
              borderColor: COLOR.PRIMARY,
              backgroundColor: COLOR.PRIMARY,
              borderWidth: 1,
            }}
            onPress={() => navigation.replace('Pesanan')}>
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{color: 'white', fontWeight: '700', fontSize: wp(3)}}>
                Menu Pesanan
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={loading}
            style={{
              height: wp(15),
              width: wp(40),
              // backgroundColor: COLOR_GRAY.LIGHTEST,
              borderRadius: wp(3),
              paddingHorizontal: wp(4),
              paddingVertical: wp(2),
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 4,
              borderColor: COLOR.PRIMARY,
              backgroundColor: COLOR.PRIMARY,
              borderWidth: 1,
            }}
            onPress={() => checkout()}>
            <View style={{alignSelf: 'center'}}>
              <Text
                style={{color: 'white', fontWeight: '700', fontSize: wp(5)}}>
                Bayar
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
