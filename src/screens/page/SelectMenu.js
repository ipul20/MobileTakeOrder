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
import {black} from 'react-native-paper/lib/typescript/src/styles/themes/v2/colors';
import {BASE_URL} from '../../../env';

export default function SelectMenu({navigation}) {
  const [pesanan, setPesanan] = useState([{id: 1, banyak: 2}]);
  const [cart, setCart] = useState([1, 2, 3, 4]);
  const FindOrder = id =>
    pesanan.find(obj => {
      return obj.id === id;
    });
  const [total, setTotal] = useState({
    name: 'cart',
    badge: '1',
    onPress: () => console.log('Right Phone !'),
    isBadgeLeft: true,
  });
  const sumTotal = () => {
    let sum = pesanan.reduce(function (total, current) {
      (total = total + current.banyak), 0;
    }, 0);
    setTotal({
      name: 'cart',
      badge: String(sum),
      onPress: () => console.log('Right Phone !'),
      isBadgeLeft: true,
    });
  };
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

  const increment = id => {
    setPesanan(current =>
      current.map(obj => {
        if (obj.id === id) {
          return {...obj, id: id, banyak: obj.banyak + 1};
        }

        return obj;
      }),
    );
  };

  const [menu, setMenu] = useState([
    {
      id: 1,
      nama: 'Mie Bakso',
      harga: 5000,
    },
    {
      id: 2,
      nama: 'Mie Ayam',
      harga: 15000,
    },
    {
      id: 3,
      nama: 'Bakso Urat',
      harga: 10000,
    },
  ]);

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
        onLeftPress={() => console.log('Left!')}
        rightIcons={[total]}
      />
      <ScrollView
        contentContainerStyle={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          paddingBottom: wp(15),
        }}>
        {menu.map(v => (
          <View
            key={v.id}
            style={{
              width: wp(45),
              margin: wp(2),
              backgroundColor: 'red',
              paddingBottom: wp(2),
              paddingTop: wp(2),
              borderRadius: wp(1),
              alignItems: 'center',
              flexDirection: 'column',
            }}>
            <View
              style={{
                width: wp(40),
                height: wp(40),
              }}>
              <Image
                source={require('../../assets/image/bakso.jpeg')}
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
                backgroundColor: 'yellow',
                alignSelf: 'flex-start',
                marginLeft: wp(2),
                marginBottom: wp(2),
              }}>
              <Text style={{fontSize: wp(5), fontWeight: '700'}}>{v.nama}</Text>
              <Text style={{fontSize: wp(3.5), fontWeight: '500'}}>
                Rp.5000
              </Text>
            </View>
            {FindOrder(v.id) ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <IconButton
                  mode="contained"
                  icon={require('../../assets/icon/mines.png')}
                  size={15}
                  onPress={() => decrement(v.id)}
                />

                <Text style={{fontSize: wp(4), marginHorizontal: wp(2)}}>
                  {FindOrder(v.id).banyak}
                </Text>
                <IconButton
                  mode="contained"
                  icon={require('../../assets/icon/plus.png')}
                  size={15}
                  onPress={() => increment(v.id)}
                />
              </View>
            ) : (
              <Button
                mode="contained"
                style={{
                  width: '90%',
                  backgroundColor: 'green',
                }}
                onPress={() => {
                  setPesanan([
                    ...pesanan,
                    {
                      id: v.id,
                      banyak: 1,
                    },
                  ]);
                }}>
                Tambah
              </Button>
            )}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  bar: {
    backgroundColor: 'black',
    height: hp(6),
    paddingHorizontal: wp(5),
  },
});
