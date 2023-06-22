import React from 'react';
import {View} from 'react-native';
import {Image, Text} from 'react-native';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {COLOR} from '../../styles';

export default function NotFound({text, imageSize, textSize}) {
  return (
    <View
      style={{width: '100%', justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={require('./../../assets/notfound.png')}
        style={{height: imageSize || w(40), width: imageSize || w(40)}}
      />
      <Text
        style={{
          color: COLOR.SECONDARY,
          fontSize: textSize || w(4.5),
          fontWeight: 'bold',
        }}>
        {text}
      </Text>
    </View>
  );
}
