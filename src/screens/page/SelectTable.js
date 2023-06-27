import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Button} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export default function SelectTable({navigation}) {
  const [table, setTable] = useState([
    {
      nomor: 1,
      status: false,
    },
    {
      nomor: 2,
      status: false,
    },
    {
      nomor: 3,
      status: false,
    },
    {
      nomor: 4,
      status: false,
    },
    {
      nomor: 5,
      status: false,
    },
    {
      nomor: 6,
      status: true,
    },
    {
      nomor: 7,
      status: false,
    },
  ]);
  const getStatusTable = async () => {
    try {
      const response = await fetch(
        'https://order.portalabsen.com/api/cek-table',
      );
      const json = await response.json();
      console.log(json.data);
      setTable(json.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // getMenu();
      //Put your Data loading function here instead of my loadData()
    });

    getStatusTable();
    return unsubscribe;
  }, [navigation]);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: wp(5),
        paddingVertical: wp(5),
      }}>
      <View
        style={{
          flexDirection: 'column',
          flexWrap: 'wrap',
          // justifyContent: 'space-between',
          alignContent: 'space-between',
          height: hp(80),
        }}>
        {table.map(v => (
          <TouchableOpacity
            disabled={v.status}
            style={{
              backgroundColor: v.status ? 'red' : 'white',
              display: 'flex',
              borderWidth: 1,
              height: hp(15),
              width: hp(15),
              justifyContent: 'center',
              alignItems: 'center',
              margin: hp(2),
              alignSelf: 'flex-end',
            }}>
            <Text>{v.nomor}</Text>
          </TouchableOpacity>
        ))}
        <View
          style={{
            borderWidth: 1,
            height: hp(15),
            width: hp(25),
            justifyContent: 'center',
            alignItems: 'center',
            margin: hp(2),
          }}>
          <Text>Kasir</Text>
        </View>
      </View>
      <View
        style={{
          backgroundColor: 'yellow',
          flex: 1,
        }}>
        <Button></Button>
      </View>
    </View>
  );
}
