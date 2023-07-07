import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Appbar, Button, IconButton} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import ActionBar from 'react-native-action-bar';
import {BASE_URL} from '../../../env';
import {COLOR, COLOR_GRAY} from '../../styles';
export default function SelectMenu({navigation}) {
  const [pesanan, setPesanan] = useState([]);
  const [cart, setCart] = useState([1, 2, 3, 4]);

  //cari order
  const FindOrder = id =>
    pesanan.find(obj => {
      return obj.id === id;
    });
  const [total, setTotal] = useState({item: 0, harga: 0});

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
    console.log(pesanan);
  };

  //func increment pesanan
  const increment = id => {
    setPesanan(current =>
      current.map(obj => {
        if (obj.id === id) {
          return {...obj, id: id, banyak: obj.banyak + 1};
        }

        return obj;
      }),
    );
    console.log(pesanan);
  };

  //usestate menu
  const [menu, setMenu] = useState({
    makan: [],
    minuman: [],
  });

  const getMenu = async () => {
    try {
      const response = await fetch('https://order.portalabsen.com/api/menu');
      const json = await response.json();
      console.log(json.data);
      setMenu({
        makanan: json.data.makanan,
        minuman: json.data.minuman,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMenu();
  }, [navigation]);

  //hitung jumlah item jika pesanan berubah
  useEffect(() => {
    sumTotal();
  }, [pesanan]);

  return (
    <View>
      <ActionBar
        containerStyle={styles.bar}
        title={'Pilih Menu'}
        leftIconName={'back'}
        onLeftPress={() => navigation.goBack()}
        rightIcons={[
          {
            name: 'cart',
            badge: `${String(total.item)}`,
            onPress: () => navigation.navigate('Cart', {pesan: pesanan}),
            isBadgeLeft: true,
          },
        ]}
      />
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingBottom: total.item ? hp(20) : hp(7),
        }}>
        <View style={{width: wp(100)}}>
          <Text style={{fontSize: wp(5), fontWeight: '600', margin: wp(2)}}>
            Makanan
          </Text>
        </View>
        {menu.makanan?.map(v => (
          <View
            key={v.id}
            style={{
              width: wp(45),

              margin: wp(2),
              backgroundColor: COLOR_GRAY.LIGHTEST,
              paddingBottom: wp(2),
              paddingTop: wp(2),
              borderRadius: wp(1),
              alignItems: 'center',
              flexDirection: 'column',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}>
            <View
              style={{
                width: wp(40),
                height: wp(40),
              }}>
              <Image
                source={{uri: `${BASE_URL}/gambar/${v.gambar}`}}
                style={{
                  width: '100%',
                  height: '100%',
                  marginBottom: wp(2),
                  borderRadius: wp(1),
                }}
              />
            </View>
            <View
              style={{
                alignSelf: 'flex-start',
                marginLeft: wp(2),
                marginBottom: wp(2),
                height: wp(18),
              }}>
              <Text style={{fontSize: wp(5), fontWeight: '700'}}>{v.nama}</Text>
              <Text style={{fontSize: wp(3.5), fontWeight: '500'}}>
                Rp.{v.harga.toLocaleString()}
              </Text>
            </View>

            {FindOrder(v.id) ? (
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
            ) : (
              <Button
                mode="outlined"
                textColor={COLOR.PRIMARY}
                style={{
                  width: '90%',
                  borderColor: COLOR.PRIMARY,
                }}
                onPress={() => {
                  setPesanan([
                    ...pesanan,
                    {
                      id: v.id,
                      banyak: 1,
                      harga: v.harga,
                      nama: v.nama,
                      gambar: v.gambar,
                    },
                  ]);
                }}>
                Tambah
              </Button>
            )}
          </View>
        ))}
        <View style={{width: wp(100)}}>
          <Text style={{fontSize: wp(5), fontWeight: '600', margin: wp(2)}}>
            Minuman
          </Text>
        </View>
        {menu.minuman?.map(v => (
          <View
            key={v.id}
            style={{
              width: wp(45),
              margin: wp(2),
              backgroundColor: COLOR_GRAY.LIGHTEST,
              paddingBottom: wp(2),
              paddingTop: wp(2),
              borderRadius: wp(1),
              alignItems: 'center',
              flexDirection: 'column',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,

              elevation: 3,
            }}>
            <View
              style={{
                width: wp(40),
                height: wp(40),
              }}>
              <Image
                source={{uri: `${BASE_URL}/gambar/${v.gambar}`}}
                style={{
                  width: '100%',
                  height: '100%',
                  marginBottom: wp(2),
                  borderRadius: wp(1),
                }}
              />
            </View>
            <View
              style={{
                alignSelf: 'flex-start',
                marginLeft: wp(2),
                marginBottom: wp(2),
              }}>
              <Text style={{fontSize: wp(5), fontWeight: '700'}}>{v.nama}</Text>
              <Text style={{fontSize: wp(3.5), fontWeight: '500'}}>
                Rp.{v.harga.toLocaleString()}
              </Text>
            </View>
            {FindOrder(v.id) ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
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
            ) : (
              <Button
                mode="outlined"
                textColor={COLOR.PRIMARY}
                style={{
                  width: '90%',
                  borderColor: COLOR.PRIMARY,
                }}
                onPress={() => {
                  setPesanan([
                    ...pesanan,
                    {
                      id: v.id,
                      banyak: 1,
                      harga: v.harga,
                    },
                  ]);
                }}>
                Tambah
              </Button>
            )}
          </View>
        ))}
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: hp(15),
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
          display: `${total.item ? 'flex' : 'none'}`,
        }}>
        <TouchableOpacity
          style={{
            height: wp(15),
            width: wp(80),
            // backgroundColor: COLOR_GRAY.LIGHTEST,
            borderRadius: wp(3),
            paddingHorizontal: wp(4),
            paddingVertical: wp(2),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
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
          onPress={() => navigation.navigate('Cart', {pesan: pesanan})}>
          <Text style={{color: 'white', fontWeight: '700'}}>
            {total.item} Item
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: '900'}}>
              {total.harga.toLocaleString()}
            </Text>
            <IconButton
              icon={require('../../assets/icon/cart.png')}
              size={wp(7)}
            />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'black',
    height: hp(7),
    paddingHorizontal: wp(5),
  },
});
