import React, {useContext} from 'react';
import {Text, View, Image, TouchableOpacity, Alert} from 'react-native';
import {ScrollView} from 'react-native';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import Header from '../../components/general/Header';
import {COLOR, COLOR_GRAY} from '../../styles';
import {ContextType as ContextUser} from './../../context/ContextUser';
import {ContextType as ContextPackage} from './../../context/ContextPackage';
import Axios from 'axios';
import {API_BASE_URL} from '../../../env';
export default function PackageDetail({navigation, route}) {
  const {dataPackage, packageName} = route.params;
  const data = [
    {
      type: 'tryout',
      title: `${dataPackage.nama} 1`,
      subtitle: 'Soal dan Pembahasan',
    },
    {
      type: 'tryout',
      title: `${dataPackage.nama} 2`,
      subtitle: 'Soal dan Pembahasan',
    },
    {
      type: 'tryout',
      title: `${dataPackage.nama} 3`,
      subtitle: 'Soal dan Pembahasan',
    },
    {
      type: 'tryout',
      title: `${dataPackage.nama} 4`,
      subtitle: 'Soal dan Pembahasan',
    },
    {
      type: 'tryout',
      title: 'Prediksi Soal PPPK 2022',
      subtitle: 'Soal dan Pembahasan',
    },
    {
      type: '',
      title: 'Kunci jawaban dan pembahasan',
      subtitle: '',
    },
    {
      type: '',
      title: 'Skor dan grafik informatif',
      subtitle: '',
    },
    {
      type: '',
      title: 'Berlatih manajemen waktu',
      subtitle: '',
    },
    {
      type: '',
      title: 'Latihan sistem CAT dan Realtime',
      subtitle: '',
    },
  ];

  const userContext = useContext(ContextUser);
  const {dataProfile, userToken} = userContext;

  const packageContext = useContext(ContextPackage);
  const {getDataYourPackage} = packageContext;
  const getPaket = async () => {
    const data = {
      paket_id: dataPackage.id,
    };
    let result;
    await Axios.post(`${API_BASE_URL}/tes-beli-paket`, data, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then(res => {
        console.log(res.data.data);
        result = true;
        getDataYourPackage();
        Alert.alert('Berhasil Mendapatkan Paket');
      })
      .catch(err => {
        console.log(err);
        Alert.alert('Gagal Mendapatkan Paket');
        result = false;
      });
    return result;
  };

  console.log(dataPackage.id);

  return (
    <View style={{flex: 1}}>
      {/* HEADER */}
      <Header title={'Detail Paket'} />
      {/* HEADER */}
      {/* BODY */}
      <ScrollView>
        <View style={{paddingHorizontal: w(6), paddingTop: w(6)}}>
          {/* TITLE */}
          <Text
            style={{fontSize: w(4), fontWeight: 'bold', color: COLOR.BLACK}}>
            {dataPackage.nama}
          </Text>
          {/* TITLE */}
          {/* PACKAGE TYPE */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: w(3),
            }}>
            <Text style={{fontSize: w(3.5), color: COLOR_GRAY.NORMAL2}}>
              Paket Latihan
            </Text>
            <Text
              style={{
                fontSize: w(3),
                color: COLOR.PRIMARY,
                fontWeight: 'bold',
              }}>
              Full Akses
            </Text>
          </View>
          {/* PACKAGE TYPE */}
          {/* CONTENT */}
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              paddingBottom: w(4),
              justifyContent: 'space-between',
            }}>
            {data.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    height: w(12),
                    width: w(43),
                    elevation: 3,
                    backgroundColor: COLOR.WHITE,
                    borderRadius: w(2),
                    marginTop: w(4),
                    flexDirection: 'row',
                    paddingHorizontal: w(2),
                    alignItems: 'center',
                    shadowOffset: {
                      width: 0,
                      height: 1,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                  }}>
                  <Image
                    style={{height: w(5), width: w(5)}}
                    source={
                      item.type === 'tryout'
                        ? require('./../../assets/padlock.png')
                        : require('./../../assets/check.png')
                    }
                  />
                  <View style={{marginLeft: w(2)}}>
                    {item.type === 'tryout' ? (
                      <>
                        <Text style={{fontSize: w(2.5), color: COLOR.BLACK}}>
                          Tryout
                        </Text>
                        <Text
                          numberOfLines={1}
                          style={{
                            fontSize: w(2.7),
                            fontWeight: 'bold',
                            color: COLOR.BLACK,
                          }}>
                          {item.title}
                        </Text>
                        <Text
                          style={{fontSize: w(2), color: COLOR_GRAY.NORMAL2}}>
                          {item.subtitle}
                        </Text>
                      </>
                    ) : (
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: w(3),
                          fontWeight: 'bold',
                          color: COLOR.BLACK,
                          width: w(31),
                        }}>
                        {item.title}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* CONTENT */}
        </View>
      </ScrollView>
      {dataProfile?.username === 'fortesting' ? (
        <TouchableOpacity
          onPress={() => getPaket()}
          style={{
            backgroundColor: COLOR.SECONDARY,
            height: w(12),
            margin: w(6),
            borderRadius: w(2),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: w(4),
              fontWeight: 'bold',
              color: COLOR.WHITE,
            }}>
            Pelajari
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PackagePayment', {
              dataPackage,
              packageName,
            })
          }
          style={{
            backgroundColor: COLOR.SECONDARY,
            height: w(12),
            margin: w(6),
            borderRadius: w(2),
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image
            source={require('./../../assets/bag.png')}
            style={{height: w(6), width: w(6)}}
          />
          <Text
            style={{
              fontSize: w(4),
              fontWeight: 'bold',
              color: COLOR.WHITE,
              marginLeft: w(2),
            }}>
            Beli Paket
          </Text>
        </TouchableOpacity>
      )}
      {/* BODY */}
    </View>
  );
}
