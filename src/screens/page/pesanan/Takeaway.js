import React, {useState} from 'react';
import {View, Text, ScrollView, Image} from 'react-native';
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {API_BASE_URL, BASE_URL} from '../../../../env';
import {COLOR, COLOR_GRAY} from '../../../styles';

export default function Takeaway() {
  const [pesanan, setPesanan] = useState([{}]);
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          minHeight: hp(100),
          paddingBottom: hp(25),
        }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: wp(2),
            paddingHorizontal: wp(4),
            borderBottomColor: COLOR_GRAY.LIGHT,
            borderBottomWidth: 1,
            width: ' 100%',
            justifyContent: 'space-between',
            backgroundColor: 'green',
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                marginTop: wp(2),
                marginRight: wp(3),
                padding: wp(1),
                backgroundColor: 'yellow',
              }}>
              <Image
                source={require('../../../assets/image/user.png')}
                style={{
                  width: wp(20),
                  height: wp(20),
                  borderRadius: wp(1),
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                backgroundColor: 'red',
              }}>
              <View
                style={{
                  marginRight: wp(2),
                }}>
                <Text style={{fontSize: wp(5), fontWeight: 'bold'}}>user</Text>
              </View>
              <View>
                <Text style={{fontSize: wp(3), fontWeight: 'bold'}}>36pcs</Text>
              </View>
              <View style={{}}>
                <Text style={{fontSize: wp(4), fontWeight: 'bold'}}>
                  Rp.200.000.000
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              alignItems: 'center',
              width: wp(31),
              backgroundColor: 'yellow',
              alignSelf: 'center',
              flexDirection: 'row',
            }}>
            <IconButton
              mode="contained"
              style={{borderRadius: wp(2), padding: 0}}
              icon={require('../../../assets/icon/confirm.png')}
              iconColor={MD3Colors.error50}
              size={wp(3.5)}
              onPress={() => console.log('dd')}
            />
            <IconButton
              mode="contained"
              style={{borderRadius: wp(2)}}
              icon={require('../../../assets/icon/cancel.png')}
              iconColor={MD3Colors.error50}
              size={wp(3.5)}
              onPress={() => console.log('dd')}
            />
            <IconButton
              mode="contained"
              style={{borderRadius: wp(2)}}
              icon={require('../../../assets/icon/whatsapp.png')}
              iconColor={MD3Colors.error50}
              size={wp(3.5)}
              onPress={() => console.log('dd')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
