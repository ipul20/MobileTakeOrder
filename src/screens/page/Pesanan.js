import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View, Text} from 'react-native';
import Dinein from './pesanan/Dinein';
import Takeaway from './pesanan/Takeaway';

export default function Pesanan() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Dinein" component={Dinein} />
        <Tab.Screen name="TakeAway" component={Takeaway} />
      </Tab.Navigator>
    </>
  );
}
