import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {View, Text, Platform} from 'react-native';
import {Appbar} from 'react-native-paper';
import DaftarMenu from './DaftarMenu';

export default function AdminMenu() {
  const [menu, setMenu] = useState({
    makanan: [
      {
        nama: 'ikan',
      },
    ],
    minuman: [],
  });
  const getMenu = async () => {
    try {
      const response = await fetch('https://order.portalabsen.com/api/menu');
      const json = await response.json();
      console.log(json.data.makanan);
      setMenu({
        ...menu,
        makanan: json.data.makanan,
        minuman: json.data.minuman,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getMenu();
  }, []);
  const Tab = createMaterialTopTabNavigator();
  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
  return (
    <>
      <Appbar.Header>
        <Appbar.Content title="Daftar Menu" />
        <Appbar.Action icon="magnify" onPress={() => {}} />
        <Appbar.Action icon={MORE_ICON} onPress={() => {}} />
      </Appbar.Header>
      <Tab.Navigator>
        <Tab.Screen
          name="Makanan"
          children={() => <DaftarMenu jenis="Makanan" menu={menu.makanan} />}
        />
        <Tab.Screen
          name="Minuman"
          children={() => <DaftarMenu jenis="Minuman" menu={menu.minuman} />}
        />
      </Tab.Navigator>
    </>
  );
}
