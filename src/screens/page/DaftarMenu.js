import React from 'react';
import {View, Text, ScrollView, StyleSheet, Image, Alert} from 'react-native';
import {Button, IconButton, MD3Colors} from 'react-native-paper';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/core';
import {API_BASE_URL, BASE_URL} from '../../../env';

export default function DaftarMenu(props) {
  const navigation = useNavigation();
  const jenis = props.jenis;
  const menu = props.menu ?? [];
  console.log('menu' + jenis, menu);

  function deleteMenu(id) {
    fetch(API_BASE_URL + '/menu-delete/' + id)
      .then(response => response.json())
      .then(json => {
        console.log('log hapus', json);
        if (json.status == true) {
          Alert.alert('Hapus Data Berhasil');
          navigation.replace('AdminMenu');
        } else {
          Alert.alert('Hapus Data Gagal');
        }
      })
      .catch(error => {
        Alert.alert('Hapus Data Gagals');
      });
  }

  const showAlert = (nama, id) => {
    Alert.alert('Anda Yakin ?', 'Anda Yakin Ingin Menghapus Menu ' + nama, [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          return deleteMenu(id);
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No',
      },
    ]);
  };

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
                width: ' 40%',
              }}>
              <Text style={{color: 'black'}}>{v.nama}</Text>
              <Text style={{color: 'black'}}>
                Rp.{parseInt(v.harga).toLocaleString()}
              </Text>
            </View>
            <View
              style={{
                width: ' 30%',
                flexDirection: 'row',
              }}>
              <IconButton
                mode="contained"
                icon={require('../../assets/icon/edit.png')}
                iconColor={MD3Colors.error50}
                size={wp(5)}
                onPress={() => Alert('edit')}
              />
              <IconButton
                mode="contained"
                icon={require('../../assets/icon/delete.png')}
                iconColor={MD3Colors.error50}
                size={wp(5)}
                onPress={() => showAlert(v.nama, v.id)}
              />
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
