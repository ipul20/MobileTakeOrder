import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {API_BASE_URL, BASE_URL} from '../../../env';
import {COLOR, COLOR_GRAY} from '../../styles';

export default function KokiPesanan({navigation}) {
  const [pesanan, setPesanan] = useState([]);
  const [reload, setReload] = useState(1);
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
                    Nama= {v.user.name}
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
              }}></View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
