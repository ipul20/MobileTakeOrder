import React, {useEffect} from 'react';
import {View, Text, Image} from 'react-native';
import {COLOR} from '../../styles';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';

export default function Splash({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('CheckUser');
    }, 3000);
  }, []);

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        backgroundColor: COLOR.SECONDARY,
        flex: 1,
      }}>
      <Image
        source={require('../../assets/Splash.png')}
        style={{
          // resizeMode: 'center',
          height: '100%',
          width: '100%',
          alignSelf: 'center',
          backgroundColor: COLOR.SECONDARY,
          flex: 1,
        }}
      />
      {/* <Text style={{color: COLOR.WHITE, fontSize: w(10), fontWeight: 'bold'}}>
        Portal ASN
      </Text> */}
    </View>
  );
}
