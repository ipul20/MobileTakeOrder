import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Image, Text} from 'react-native';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {COLOR} from '../../styles';

export default function Header({title}) {
  const navigation = useNavigation();
  return (
    <View
      style={{
        height: w(15),
        backgroundColor: COLOR.WHITE,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
      }}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('./../../assets/Back2.png')}
          style={{height: w(8), width: w(8), marginLeft: w(6)}}
        />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: w(5),
          fontWeight: 'bold',
          color: '#424347',
          marginLeft: w(3),
        }}>
        {title}
      </Text>
    </View>
  );
}
