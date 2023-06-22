import React, {useContext, useEffect} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import Header from '../../components/general/Header';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {COLOR, COLOR_GRAY} from '../../styles';
import {ContextType as ContextPackage} from './../../context/ContextPackage';

export default function TryoutList({route, navigation}) {
  const {packageData} = route.params;

  const packageContext = useContext(ContextPackage);
  const {getDataYourTryout, dataYourTryout} = packageContext;

  useEffect(() => {
    getDataYourTryout(packageData.id);
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* HEADER */}
      <Header title={packageData.sub} />
      {/* HEADER */}
      {/* BODY */}
      <ScrollView>
        <View style={{paddingHorizontal: w(6), paddingTop: w(6)}}>
          {/* PACKAGE NAME */}
          <View
            style={{
              backgroundColor: '#F4C72A',
              paddingHorizontal: w(2),
              paddingVertical: w(0.5),
              alignSelf: 'baseline',
              borderRadius: w(5),
            }}>
            <Text
              style={{fontSize: w(3), fontWeight: 'bold', color: COLOR.WHITE}}>
              {packageData.sub}
            </Text>
          </View>
          {/* PACKAGE NAME */}
          {/* TRYOUT LIST */}
          <View style={{paddingBottom: w(6)}}>
            {dataYourTryout.length === 0 && (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: w(10),
                }}>
                <Image
                  source={require('./../../assets/notfound.png')}
                  style={{height: w(30), width: w(30)}}
                />
                <Text
                  style={{
                    color: COLOR.SECONDARY,
                    fontSize: w(5),
                    fontWeight: 'bold',
                    marginTop: w(2),
                  }}>
                  Data tidak ada
                </Text>
              </View>
            )}
            {dataYourTryout.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('TryoutDetail', {
                      tryoutData: item,
                      tryoutId: item.id,
                    })
                  }
                  key={index}
                  style={{
                    backgroundColor: '#F4F4F4',
                    height: w(13),
                    elevation: 5,
                    marginTop: w(6),
                    borderRadius: w(3),
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: w(3),
                    shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                  }}>
                  <Text
                    style={{
                      color: '#696969',
                      fontWeight: 'bold',
                      fontSize: w(4),
                    }}>
                    {item.nama}
                  </Text>
                  <View style={{flexDirection: 'row'}}>
                    <View
                      style={{
                        height: w(6),
                        width: w(6),
                        borderRadius: w(1),
                        backgroundColor: '#07697E',
                        marginRight: w(2),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          height: w(4),
                          resizeMode: 'contain',
                          aspectRatio: 1,
                        }}
                        source={require('./../../assets/tryoutlist1.png')}
                      />
                    </View>
                    <View
                      style={{
                        height: w(6),
                        width: w(6),
                        borderRadius: w(1),
                        backgroundColor: '#07697E',
                        marginRight: w(2),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          height: w(4),
                          resizeMode: 'contain',
                          aspectRatio: 1,
                        }}
                        source={require('./../../assets/tryoutlist2.png')}
                      />
                    </View>
                    <View
                      style={{
                        height: w(6),
                        width: w(6),
                        borderRadius: w(1),
                        backgroundColor: '#07697E',
                        marginRight: w(3),
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Image
                        style={{
                          height: w(4),
                          resizeMode: 'contain',
                          aspectRatio: 1,
                        }}
                        source={require('./../../assets/tryoutlist3.png')}
                      />
                    </View>
                    <Image
                      style={{
                        height: w(6),
                        width: w(6),
                      }}
                      source={require('./../../assets/Forward.png')}
                    />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
          {/* TRYOUT LIST */}
        </View>
      </ScrollView>
      {/* BODY */}
    </View>
  );
}
