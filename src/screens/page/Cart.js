import React, {useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {IconButton, MD3Colors} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {BASE_URL} from '../../../env';
import {COLOR} from '../../styles';
export default function Cart({navigation, route}) {
  const {pesan} = route.params;
  console.log(pesan);
  const [pesanan, setPesanan] = useState(pesan ?? []);

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
        <IconButton
          icon={require('../../assets/icon/back.png')}
          size={wp(7)}
          onPress={() => navigation.goBack()}
          style={{zIndex: 1, elevation: 1}}
        />
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
            Your Cart
          </Text>
        </View>
      </View>
      <ScrollView>
        {pesanan?.map(v => (
          <>
            <View
              style={{
                flexDirection: 'column',
                height: hp(10),
                width: wp(95),
                borderRadius: wp(2),
                padding: wp(2),
                marginBottom: wp(1),
                borderWidth: 1,
              }}>
              <View style={{flexDirection: 'row'}}>
                <Text>Nama</Text>
                <Text>Rp.{parseInt(v.harga * v.banyak).toLocaleString()}</Text>
              </View>
              <View
                style={{
                  width: ' 100%',
                  flexDirection: 'row',
                  backgroundColor: 'red',
                  justifyContent: 'space-between',
                }}>
                <Image
                  source={{uri: `${BASE_URL}/gambar/${v.gambar}`}}
                  style={{
                    width: '30%',
                    borderRadius: wp(1),
                  }}
                />
                <View style={{flexDirection: 'row'}}>
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
      </ScrollView>
      {/* <View
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
          <Text style={{color: 'white', fontWeight: '700'}}>Item</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: 'white', fontWeight: '900'}}></Text>
            <IconButton
              icon={require('../../assets/icon/cart.png')}
              size={wp(7)}
            />
          </View>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}
