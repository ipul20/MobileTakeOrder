import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React from 'react';
import {View, Text} from 'react-native';
import DaftarUser from './DaftarUser';

export default function AdminUser() {
  const Tab = createMaterialTopTabNavigator();
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen name="Admin" children={() => <DaftarUser />} />
        <Tab.Screen name="User" component={DaftarUser} />
        <Tab.Screen name="Koki" component={DaftarUser} />
      </Tab.Navigator>
    </>
  );
}
