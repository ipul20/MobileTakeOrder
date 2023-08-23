import React, {useState} from 'react';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {API_BASE_URL, BASE_URL} from '../../../env';
import {COLOR, COLOR_GRAY} from '../../styles';

export default function DaftarUser(props) {
  const [user, setUser] = useState([]);
  const role = props.role;
  const data = props.data ?? [];
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          padding: wp(2),
          minHeight: '100%',
        }}>
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
              role: role.toLowerCase(),
            })
          }>
          <View></View>
          <Text>Tambah Data {role}</Text>
        </Button>
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
            }}
            keys={v.id}>
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
                  width: wp(22),
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
                  width: wp(43),
                  marginRight: wp(2),
                }}>
                <View
                  style={{
                    marginRight: wp(2),
                  }}>
                  <Text style={{fontSize: wp(5), fontWeight: 'bold'}}>
                    {v.name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: wp(30),
                  flexDirection: 'row',
                }}>
                <IconButton
                  mode="contained"
                  icon={require('../../assets/icon/edit.png')}
                  iconColor={MD3Colors.error50}
                  size={wp(5)}
                  onPress={() => navigation.navigate('EditMenu', v)}
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
