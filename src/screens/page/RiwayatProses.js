import React, {useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {API_BASE_URL, BASE_URL} from '../../../env';
import {COLOR, COLOR_GRAY} from '../../styles';
export default function RiwayatProses(props) {
  const data = props.data ?? [];
  console.log(data);
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          minHeight: hp(100),
        }}>
        {data.map(v => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailTakeaway')}
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
                    Pesanan
                  </Text>
                </View>
                <View>
                  <Text style={{fontSize: wp(3), fontWeight: 'bold'}}>
                    Jenis Pesanan = {v.jenis}
                  </Text>
                </View>
                <View style={{flexDirection: 'row'}}>
                  <Text style={{fontSize: wp(3)}}>Status = </Text>
                  <Text style={{fontSize: wp(3)}}>Status</Text>
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
