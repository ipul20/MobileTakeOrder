import React, {useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {API_BASE_URL, BASE_URL} from '../../../env';
import {COLOR, COLOR_GRAY} from '../../styles';

export default function DetailTakeaway({route}) {
  console.log('detail', route.detail);
  const {detail} = route.params;
  const [pesanan, setPesanan] = useState(detail ?? []);
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          minHeight: hp(100),
          paddingBottom: hp(25),
        }}>
        {pesanan.map(v => (
          <View
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
                    {v.nama}
                  </Text>
                </View>
                <View>
                  <Text style={{fontSize: wp(3), fontWeight: 'bold'}}>
                    {v.banyak} pcs
                  </Text>
                </View>
              </View>
            </View>

            <View
              style={{
                alignItems: 'center',
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}></View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
