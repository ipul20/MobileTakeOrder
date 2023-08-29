import React, {useEffect, useState} from 'react';
import {View, Text, Image, ScrollView} from 'react-native';
import {COLOR, COLOR_GRAY} from '../../styles';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {API_BASE_URL, BASE_URL} from '../../../env';
import {Button} from 'react-native-paper';
export default function Laporan({route}) {
  const {date} = route.params;
  const [menu, setMenu] = useState([]);
  const [detail, setDetail] = useState({
    harga: 0,
    menu: 0,
  });
  const [penjualan, setPenjualan] = useState([]);

  const getLaporan = async () => {
    fetch(`${API_BASE_URL}/laporan`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        date: date,
      }),
    })
      .then(async res => res.json())
      .then(async res => {
        console.log('respon', res);
        if (res.status == true) {
          console.log('res data', res.data);
          await setPenjualan(res.data);
          console.log('penj', penjualan);
        } else {
          alert(res.message);
        }
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        // ADD THIS THROW error
        throw error;
      });
  };
  const sumTotal = async () => {
    const menu = penjualan.reduce(
      (total, current) => (total = total + parseInt(current.total_menu ?? 0)),
      0,
    );
    console.log('menuuuu', menu);
    const harga = penjualan.reduce(
      (total, current) => (total = total + parseInt(current.total_harga ?? 0)),
      0,
    );
    setDetail({menu: menu, harga: harga});
  };
  useEffect(() => {
    getLaporan();
  }, []);

  useEffect(() => {
    sumTotal();
  }, [penjualan]);
  return (
    <View>
      <View
        style={{
          height: wp(18),
          borderBottomColor: 'grey',
          width: '100%',
          flexDirection: 'row',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 3,
          },
          shadowOpacity: 0.22,
          shadowRadius: 2.22,
          alignItems: 'center',
          elevation: 3,
        }}>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: 0,
            elevation: 0,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              fontSize: wp(5),
              fontWeight: 'bold',
            }}>
            Laporan Penjualan
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              alignItems: 'center',
              fontSize: wp(5),
              fontWeight: 'bold',
            }}>
            {date}
          </Text>
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: wp(50),
              alignItems: 'center',
              height: wp(30),

              justifyContent: 'center',
              backgroundColor: COLOR_GRAY.LIGHTEST,
              borderRadius: wp(1),
              alignItems: 'center',
              flexDirection: 'column',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}>
            <Text>Total Harga</Text>
            <Text>Rp. {parseInt(detail.harga).toLocaleString()}</Text>
          </View>
          <View
            style={{
              height: wp(20),
              alignSelf: 'center',
              backgroundColor: 'grey',
              width: wp(0.2),
            }}></View>
          <View
            style={{
              width: wp(50),
              alignItems: 'center',
              height: wp(30),

              justifyContent: 'center',
              backgroundColor: COLOR_GRAY.LIGHTEST,
              borderRadius: wp(1),
              alignItems: 'center',
              flexDirection: 'column',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 1,
              },
              shadowOpacity: 0.22,
              shadowRadius: 2.22,
              elevation: 3,
            }}>
            <Text>Total Menu</Text>
            <Text>{parseInt(detail.menu)} pcs</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
          }}>
          {/* {menu.makanan?.map(v => (
            <View
              key={v.id}
              style={{
                width: wp(45),

                margin: wp(2),
                backgroundColor: COLOR_GRAY.LIGHTEST,
                paddingBottom: wp(2),
                paddingTop: wp(2),
                borderRadius: wp(1),
                alignItems: 'center',
                flexDirection: 'column',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
              }}>
              <View
                style={{
                  width: wp(40),
                  height: wp(40),
                }}>
                <Image
                  source={{uri: `${BASE_URL}/gambar/${v.gambar}`}}
                  style={{
                    width: '100%',
                    height: '100%',
                    marginBottom: wp(2),
                    borderRadius: wp(1),
                  }}
                />
              </View>
              <View
                style={{
                  marginBottom: wp(2),
                  paddingHorizontal: wp(2),
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: wp(5),
                    fontWeight: '700',
                    textAlign: 'center',
                  }}>
                  {v.nama}
                </Text>
                <Text
                  style={{
                    fontSize: wp(3.5),
                    fontWeight: '500',
                  }}>
                  50pcs
                </Text>
              </View>
            </View>
          ))} */}
        </View>
      </ScrollView>
    </View>
  );
}
