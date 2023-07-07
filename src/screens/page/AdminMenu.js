import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {View, Text, Platform, Alert} from 'react-native';
import {Appbar} from 'react-native-paper';
import DaftarMenu from './DaftarMenu';

export default function AdminMenu({navigation}) {
  const [reload, setReload] = useState(1);
  const [menu, setMenu] = useState({
    makanan: [],
    minuman: [],
  });
  const getMenu = async () => {
    try {
      const response = await fetch('https://order.portalabsen.com/api/menu');
      const json = await response.json();
      console.log(json.data.makanan);
      setMenu({
        makanan: json.data.makanan,
        minuman: json.data.minuman,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getMenu();
      //Put your Data loading function here instead of my loadData()
    });

    getMenu();
    return unsubscribe;
  }, [reload, navigation]);
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
          children={() => (
            <DaftarMenu
              jenis="Makanan"
              menu={menu.makanan}
              reloadPage={() => setReload(reload + 1)}
            />
          )}
        />
        <Tab.Screen
          name="Minuman"
          children={() => (
            <DaftarMenu
              jenis="Minuman"
              menu={menu.minuman}
              reloadPage={() => setReload(reload + 1)}
            />
          )}
        />
      </Tab.Navigator>
    </>
  );
}
