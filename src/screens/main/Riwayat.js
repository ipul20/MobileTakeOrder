import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View, Text} from 'react-native';
import RiwayatProses from '../page/RiwayatProses';
import RiwayatSelesai from '../page/RiwayatSelesai';

export default function Riwayat() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Proses" component={RiwayatProses} />
        <Tab.Screen name="Selesai" component={RiwayatSelesai} />
      </Tab.Navigator>
    </>
  );
}
