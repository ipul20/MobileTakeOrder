import React, {useContext, useState, useEffect} from 'react';
import {
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  RefreshControl,
  Alert,
  Image,
  TextInput,
} from 'react-native';
import {ScrollView} from 'react-native';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import Header from '../../components/general/Header';
import {COLOR, COLOR_GRAY} from '../../styles';
import {ContextType as ContextPackage} from './../../context/ContextPackage';
import {ContextType as ContextUser} from './../../context/ContextUser';
import NotFound from '../../components/general/NotFound';
import {BASE_URL} from '../../../env';
import {idrFormat} from '../../helpers';

export default function PackageBest({navigation, route}) {
  const {id, name} = route.params;

  const userContext = useContext(ContextUser);
  const {dataProfile} = userContext;

  const packageContext = useContext(ContextPackage);
  const {getDataPackage, dataPackage, searchPackage} = packageContext;

  useEffect(() => {
    getDataPackage(id);
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={{flex: 1}}>
      {/* HEADER */}
      <Header title={name} />
      {/* HEADER */}
      {/* BODY */}

      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              const data = await getDataPackage(id);
              if (!data) Alert.alert('Gagal Memuat!');
              setRefreshing(false);
            }}
          />
        }>
        <View>
          {/* PACKAGE */}
          <View style={{marginTop: w(6)}}>
            {/* <Text style={{marginLeft: w(6), fontSize: w(3.5)}}>{name}</Text> */}
            <View style={{marginTop: w(3), paddingHorizontal: w(6)}}>
              <Image
                source={require('./../../assets/search.png')}
                style={{
                  position: 'absolute',
                  zIndex: +1,
                  height: w(6),
                  width: w(6),
                  right: w(10),
                  top: w(3),
                }}
              />
              <TextInput
                placeholder="Cari Paket"
                placeholderTextColor={COLOR_GRAY.NORMAL2}
                onChangeText={text => searchPackage(text)}
                style={{
                  backgroundColor: COLOR.WHITE,
                  borderWidth: w(0.3),
                  borderColor: COLOR_GRAY.NORMAL2,
                  paddingHorizontal: w(4),
                  height: w(12),
                  width: '100%',
                  borderRadius: w(2),
                  fontSize: w(3.5),
                  alignSelf: 'center',
                  color: COLOR.BLACK,
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                marginTop: w(6),
                paddingHorizontal: w(6),
                flexWrap: 'wrap',
              }}>
              {dataPackage.length === 0 && (
                <NotFound text={'Paket Belum Tersedia'} />
              )}
              {dataPackage.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      width: w(40),
                      marginRight: (index + 1) % 2 === 1 ? w(6) : 0,
                      marginBottom: w(6),
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('PackageDetail', {
                          dataPackage: item,
                          packageName: name,
                        })
                      }
                      style={{
                        width: '100%',
                        height: w(40),
                        backgroundColor: '#2390A8',
                        borderRadius: w(2),
                      }}>
                      <ImageBackground
                        imageStyle={{borderRadius: w(2)}}
                        style={{
                          width: '100%',
                          height: w(40),
                          borderRadius: w(2),
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        source={{
                          uri: `${BASE_URL}/gambar/paket/${item?.gambar}`,
                        }}></ImageBackground>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginTop: w(1),
                      }}>
                      <Text
                        style={{
                          fontSize: w(3),
                          color: COLOR.BLACK,
                        }}>
                        {item.nama}
                      </Text>
                    </View>
                    {dataProfile?.username === 'fortesting' ? null : (
                      <Text
                        style={{
                          textDecorationLine: 'line-through',
                          color: COLOR.GRAY,
                          fontSize: w(3),
                          // marginLeft: w(1),
                        }}>
                        {idrFormat(item?.harga_awal)}
                      </Text>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                      }}>
                      {dataProfile?.username === 'fortesting' ? null : (
                        <Text
                          style={{
                            color: COLOR.PRIMARY,
                            fontSize: w(3.5),
                            fontWeight: 'bold',
                          }}>
                          {idrFormat(item?.harga)}
                        </Text>
                      )}
                      {/* <Text
                        style={{
                          backgroundColor: COLOR.RED,
                          borderRadius: w(2),
                          paddingHorizontal: w(1.5),
                          paddingVertical: w(1),
                          fontSize: w(2),
                          color: COLOR.WHITE,
                          marginLeft: w(1),
                        }}>
                        {item.label}
                      </Text> */}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
          {/* PACKAGE */}
        </View>
      </ScrollView>

      {/* BODY */}
    </View>
  );
}
