import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function Home({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'red'}}>
      <View style={{height: hp(35)}}>
        <Image
          source={require('../../assets/image/header.png')}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      </View>
      <View
        style={{
          height: hp(25),
          backgroundColor: 'white',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => navigation.navigate('SelectTable')}>
          <View
            style={{
              height: wp(20),
              width: wp(20),
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              borderRadius: wp(1),
              borderColor: '#d3d3d3',
              borderWidth: 1,
              // shadowOffset: {
              //   width: 1,
              //   height: 0.5,
              // },
              // shadowOpacity: 0.1,
              // shadowRadius: 0.1,

              // elevation: 5,
            }}>
            <Image
              source={require('../../assets/icon/list.gif')}
              style={{
                width: '80%',
                height: '80%',
              }}
            />
          </View>
          <Text>Reservasi</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              height: wp(20),
              width: wp(20),
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              borderRadius: wp(1),
              borderColor: '#d3d3d3',
              borderWidth: 1,
              // shadowOffset: {
              //   width: 1,
              //   height: 0.5,
              // },
              // shadowOpacity: 0.1,
              // shadowRadius: 0.1,

              // elevation: 5,
            }}>
            <Image
              source={require('../../assets/icon/paper-bag.gif')}
              style={{
                width: '80%',
                height: '80%',
              }}
            />
          </View>
          <Text>TakeAway</Text>
        </View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              height: wp(20),
              width: wp(20),
              alignItems: 'center',
              justifyContent: 'center',
              shadowColor: '#000',
              borderRadius: wp(1),
              borderColor: '#d3d3d3',
              borderWidth: 1,
              // shadowOffset: {
              //   width: 1,
              //   height: 0.5,
              // },
              // shadowOpacity: 0.1,
              // shadowRadius: 0.1,

              // elevation: 5,
            }}>
            <Image
              source={require('../../assets/icon/table.gif')}
              style={{
                width: '80%',
                height: '80%',
              }}
            />
          </View>
          <Text>DineIn</Text>
        </View>
      </View>
    </View>
  );
}
