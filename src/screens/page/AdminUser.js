import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import DaftarUser from './DaftarUser';

export default function AdminUser({navigation}) {
  const [reload, setReload] = useState(1);
  const Tab = createMaterialTopTabNavigator();

  const [user, setUser] = useState({
    admin: [],
    user: [],
    koki: [],
  });
  const getUser = async () => {
    try {
      const response = await fetch(
        'https://order.portalabsen.com/api/daftar-akun',
      );
      const json = await response.json();
      console.log(json.dat);
      setUser({
        admin: json.data.admin,
        user: json.data.user,
        koki: json.data.koki,
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getUser();
      //Put your Data loading function here instead of my loadData()
    });

    getUser();
    return unsubscribe;
  }, [reload, navigation]);
  return (
    <>
      <Tab.Navigator>
        <Tab.Screen
          name="Admin"
          children={() => (
            <DaftarUser
              role="Admin"
              data={user.admin}
              reloadPage={() => setReload(reload + 1)}
            />
          )}
        />
        <Tab.Screen
          name="Koki"
          children={() => (
            <DaftarUser
              role="Koki"
              data={user.koki}
              reloadPage={() => setReload(reload + 1)}
            />
          )}
        />
        <Tab.Screen
          name="User"
          children={() => (
            <DaftarUser
              role="User"
              data={user.user}
              reloadPage={() => setReload(reload + 1)}
            />
          )}
        />
      </Tab.Navigator>
    </>
  );
}
