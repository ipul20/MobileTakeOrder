import {useNavigation} from '@react-navigation/core';
import React, {useState, useEffect} from 'react';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {url} from '../../../env';

export default function Profile() {
  const [role, setRole] = useState(null);
  const navigation = useNavigation();
  const [user, setUser] = useState({
    id: null,
    nama: null,
  });
  const getUser = async () => {
    const user_id = await AsyncStorage.getItem('id');
    const name = await AsyncStorage.getItem('name');
    setUser({
      ...user,
      id: user_id,
      nama: name,
    });
  };

  navigation.addListener('focus', async () => {
    setRole(await AsyncStorage.getItem('role'));
  });
  useEffect(() => {
    getUser();
  }, []);

  const handleLogout = () =>
    Alert.alert(
      'Peringatan!',
      'Yakin Ingin Keluar?',
      [
        {
          text: 'YA',
          onPress: async () => {
            navigation.reset({
              index: 1,
              routes: [
                // {name: 'Home'},
                {
                  name: 'Login',
                },
              ],
            });
          },
          style: 'cancel',
        },
        {
          text: 'Batal',
          // onPress: () => Alert.alert('Cancel Pressed'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      },
    );

  return (
    <View style={{flex: 1, alignItems: 'center', backgroundColor: '#ffff'}}>
      <View
        style={{
          width: '100%',
          height: '12%',
          // backgroundColor: "aqua",
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: 17,
        }}>
        <Text
          style={{
            fontFamily: 'Roboto',
            fontWeight: 'bold',
            fontSize: 22,
            color: '#0095DA',
          }}>
          Profile
        </Text>
      </View>
      <View
        style={{
          width: '100%',
          // backgroundColor: "salmon",
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <View style={{width: '70%', alignItems: 'center'}}>
          <Image
            source={require('../../assets/image/user.png')}
            style={{width: 90, height: 90, marginBottom: 10}}
          />
          <Text style={{fontFamily: 'Roboto', fontSize: 16, fontWeight: '700'}}>
            {user.nama}
          </Text>
        </View>
      </View>
      <View
        style={{
          width: '90%',
          height: '55%',
        }}>
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('UbahProfileUser');
          }}
          // onPress={() => {
          //   navigation.navigate("UbahProfile");
          // }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderBottomWidth: 1,
              borderColor: '#F6F2F2',
              alignItems: 'center',
              paddingVertical: 10,
              marginTop: 25,
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../../assets/image/user.png')}
                style={{width: 25, height: 25}}
              />
              <Text
                style={{
                  fontFamily: 'Roboto',
                  fontSize: 16,
                  fontWeight: '700',
                  marginLeft: 10,
                }}>
                Ubah Profile
              </Text>
            </View>
          </View>
        </TouchableOpacity> */}
      </View>
      <View
        style={{
          width: '100%',
          height: '15%',
          // backgroundColor: "orange",
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            handleLogout();
          }}>
          <View
            style={{
              width: 255,
              height: 42,
              backgroundColor: '#0095DA',
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Roboto',
                fontSize: 18,
                color: '#ffff',
                fontWeight: 'bold',
              }}>
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
