import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image} from 'react-native';
import {Button} from 'react-native-paper';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/core';
import {BASE_URL} from '../../../env';
export default function DaftarMenu(props) {
  const navigation = useNavigation();
  const jenis = props.jenis;
  const menu = props.menu ?? [];
  console.log('menu' + jenis, menu);
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Button
        mode="contained"
        compact={false}
        style={{
          width: '80%',
          paddingVertical: 5,
          marginBottom: 10,
          borderRadius: 7,
          backgroundColor: '#0095DA',
          borderWidth: 2,
        }}
        onPress={() =>
          navigation.navigate('TambahMenu', {
            jenis: jenis.toLowerCase(),
          })
        }>
        <View></View>
        <Text>Tambah Data {jenis}</Text>
      </Button>
      {menu?.map(v => (
        <>
          <View
            style={{
              flexDirection: 'row',
              height: hp(10),
              width: wp(95),
              borderRadius: wp(2),
              padding: wp(2),
              marginBottom: wp(1),
              alignItems: 'center',
              borderWidth: 1,
            }}>
            <View
              style={{
                width: ' 30%',
                marginRight: wp(3),
              }}>
              <Image
                source={{uri: `${BASE_URL}/gambar/${v.gambar}`}}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: wp(1),
                }}
              />
            </View>
            <View
              style={{
                width: ' 50%',
              }}>
              <Text style={{color: 'black'}}>{v.nama}</Text>
            </View>
            <View
              style={{
                width: ' 20%',
              }}>
              <Text></Text>
            </View>
          </View>
        </>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
    padding: wp(2),
    minHeight: '100%',
  },
});
