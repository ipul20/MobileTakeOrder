import React, {useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {API_BASE_URL, BASE_URL} from '../../../env';
import {COLOR, COLOR_GRAY} from '../../styles';
import Pesanan from './Pesanan';
export default function RiwayatProses(props) {
  const data = props.data ?? [];
  console.log(data);
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          minHeight: hp(100),
          backgroundColor: 'white',
        }}>
        {data.map(v => (
          <View
            // onPress={() => navigation.navigate('DetailTakeaway')}
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
                {v.jenis == 'reservasi' ? (
                  <Image
                    source={require('../../assets/icon/list.gif')}
                    style={{
                      width: wp(20),
                      height: wp(20),
                      borderRadius: wp(1),
                    }}
                  />
                ) : (
                  <Image
                    source={require('../../assets/icon/paper-bag.gif')}
                    style={{
                      width: wp(20),
                      height: wp(20),
                      borderRadius: wp(1),
                    }}
                  />
                )}
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
                    {v.jenis.toUpperCase()}{' '}
                    {/* {v.jenis == 'reservasi' ? ' MEJA ' + v.meja : ''} */}
                  </Text>
                </View>
                {v.jenis == 'reservasi' ? (
                  <View>
                    <Text style={{fontSize: wp(3), fontWeight: 'bold'}}>
                      Meja ={v.meja}
                    </Text>
                  </View>
                ) : (
                  <></>
                )}
                {v.jenis == 'takeaway' ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      width: wp(65),
                    }}>
                    <Text style={{fontSize: wp(3)}}>Status = </Text>
                    <Text style={{fontSize: wp(3)}} numberOfLines={2}>
                      {v.status == 0
                        ? 'menunggu konfirmasi admin'
                        : v.status == 2
                        ? 'telah dikonfirmasi, pesanan sedang dibuat'
                        : v.status == 3
                        ? 'pesanan siap diambil'
                        : ''}
                    </Text>
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: wp(3)}}>Batas Reservasi = </Text>
                    <Text style={{fontSize: wp(3)}}>{v.batas}</Text>
                  </View>
                )}
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                width: wp(31),
                alignSelf: 'center',
                flexDirection: 'row',
              }}></View>
          </View>
        ))}
        {data.length == 0 ? (
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
        ) : (
          <></>
        )}
      </ScrollView>
    </View>
  );
}
