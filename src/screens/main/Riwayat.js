import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';

import {View, Text} from 'react-native';
import RiwayatProses from '../page/RiwayatProses';
import RiwayatSelesai from '../page/RiwayatSelesai';
export default function Riwayat({navigation}) {
  const [reload, setReload] = useState(1);
  const [riwayat, setRiwayat] = useState({
    selesai: [],
    belum: [],
  });
  const getRiwayat = async () => {
    try {
      const response = await fetch(
        'https://order.portalabsen.com/api/riwayat-pesanan/1',
      );
      const json = await response.json();
      console.log(json.data.selesai);
      setRiwayat({
        selesai: json.data.selesai,
        belum: json.data.belum,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getRiwayat();
      //Put your Data loading function here instead of my loadData()
    });

    getRiwayat();
    return unsubscribe;
  }, [reload, navigation]);
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Proses"
          children={() => (
            <RiwayatProses
              data={riwayat.belum}
              reloadPage={() => setReload(reload + 1)}
            />
          )}
        />
        <Tab.Screen name="Selesai" component={RiwayatSelesai} />
      </Tab.Navigator>
    </>
  );
}
