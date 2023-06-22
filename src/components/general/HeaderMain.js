import React, {useContext} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {DEFAULT_PROFILE_PICTURE} from '../../../env';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {ContextType as ContextUser} from './../../context/ContextUser';
import {COLOR} from '../../styles';
import {useNavigation} from '@react-navigation/native';

export default function HeaderMain({text}) {
  const navigation = useNavigation();

  const userContext = useContext(ContextUser);
  const {dataProfile} = userContext;

  return (
    <View
      style={{
        height: w(20),
        backgroundColor: COLOR.SECONDARY,
        borderBottomLeftRadius: w(10),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: w(6),
      }}>
      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          style={{height: w(13), width: w(13)}}
          source={DEFAULT_PROFILE_PICTURE}
        />
      </TouchableOpacity>
      <View
        style={{
          paddingLeft: w(3),
          height: w(15),
          justifyContent: 'space-evenly',
        }}>
        <Text
          style={{fontSize: w(3.5), fontWeight: 'bold', color: COLOR.WHITE}}>
          Hi, {dataProfile.pribadi.nama}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            style={{height: w(5), width: w(5)}}
            source={require('./../../assets/YourPackage.png')}
          />
          <Text
            style={{
              fontSize: w(3),
              fontWeight: 'bold',
              color: '#04B7DE',
              backgroundColor: '#005A6D',
              paddingHorizontal: w(2),
              paddingVertical: w(1),
              borderRadius: w(2),
              marginLeft: w(1),
              overflow: 'hidden',
            }}>
            {text}
          </Text>
        </View>
      </View>
    </View>
  );
}
