import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View, Text, Platform} from 'react-native';
import {Appbar} from 'react-native-paper';
import DaftarMenu from './DaftarMenu';

export default function AdminMenu() {
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
          children={() => <DaftarMenu jenis="Makanan" />}
        />
        <Tab.Screen
          name="Minuman"
          children={() => <DaftarMenu jenis="Minuman" />}
        />
      </Tab.Navigator>
    </>
  );
}
