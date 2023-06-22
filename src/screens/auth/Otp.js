import React, {useRef, useContext, useState} from 'react';
import {View, Text, Image} from 'react-native';
import {ScrollView, ActivityIndicator} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';
import {COLOR} from '../../styles';
import OTPTextView from 'react-native-otp-textinput';
import {ContextType as ContextUser} from './../../context/ContextUser';

export default function Otp({navigation, route}) {
  const {waNumber} = route.params;

  const userContext = useContext(ContextUser);
  const {otpCheck} = userContext;

  let otpInput = useRef(null);

  const clearText = () => {
    otpInput.clear();
  };

  const setText = async text => {
    if (text.length === 6) {
      setLoadingOtp(true);
      const data = await otpCheck({
        no_hp: waNumber,
        kode: text,
      });
      setLoadingOtp(false);
      if (data) {
        navigation.reset({
          index: 0,
          routes: [{name: 'MainScreen'}],
        });
      }
    }
  };

  const [loadingOtp, setLoadingOtp] = useState(false);

  return (
    <View style={{flex: 1}}>
      {loadingOtp ? (
        <View
          style={{
            backgroundColor: 'rgba(125,125,125,0.5)',
            flex: 1,
            // justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            zIndex: +1,
          }}>
          <ActivityIndicator
            style={{marginTop: h(50)}}
            size="large"
            color={COLOR.SECONDARY}
          />
        </View>
      ) : null}
      <ScrollView>
        {/* HEADER  */}
        <View
          style={{
            height: w(20),
            backgroundColor: COLOR.PRIMARY,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: w(4),
          }}>
          {/* BACK BUTTON */}
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
              // navigation.reset({
              //   index: 0,
              //   routes: [{name: 'MainScreen'}],
              // });
            }}
            style={{
              backgroundColor: '#0D5679',
              height: w(8),
              width: w(8),
              borderRadius: w(10),
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: w(2),
            }}>
            <Image
              style={{height: w(5), width: w(5)}}
              source={require('./../../assets/Back.png')}
            />
          </TouchableOpacity>
          {/* BACK BUTTON */}
          {/* TITLE */}
          <Text style={{fontSize: w(4), color: COLOR.WHITE, marginTop: w(3)}}>
            WhatsApp Verification
          </Text>
          {/* TITLE */}
          <View style={{width: w(10)}}></View>
        </View>
        {/* HEADER  */}
        {/* BODY */}
        <View
          style={{
            minHeight: w(50),
            borderTopLeftRadius: w(6),
            borderTopRightRadius: w(6),
            marginTop: -w(6),
            backgroundColor: COLOR.WHITE,
          }}>
          <View style={{marginTop: w(6), alignItems: 'center'}}>
            <Text style={{fontSize: w(4)}}>
              Kode verifikasi (OTP) telah dikirim ke
            </Text>
            <Text style={{fontSize: w(5), fontWeight: 'bold'}}>{waNumber}</Text>
          </View>
          {/* OTP INPUT */}
          <View
            style={{
              marginTop: w(6),
              alignItems: 'center',
            }}>
            <OTPTextView
              inputCount={6}
              handleTextChange={text => setText(text)}
              ref={e => (otpInput = e)}
              tintColor={COLOR.PRIMARY}
              offTintColor={COLOR.GRAY}
              containerStyle={{
                paddingHorizontal: w(10),
              }}
              textInputStyle={{
                width: w(10),
                alignSelf: 'center',
                borderBottomWidth: w(0.5),
              }}
            />
          </View>
          {/* OTP INPUT */}
          {/* DELETE BUTTON */}
          <TouchableOpacity
            onPress={() => clearText()}
            style={{
              backgroundColor: COLOR.PRIMARY,
              height: w(12),
              width: w(70),
              marginTop: w(6),
              borderRadius: w(2),
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                color: COLOR.WHITE,
                fontSize: w(4),
                fontWeight: 'bold',
              }}>
              Hapus Kode
            </Text>
          </TouchableOpacity>
          {/* DELETE BUTTON */}
          {/* RESEND CODE */}
          <View style={{marginTop: w(2), alignItems: 'center'}}>
            <Text style={{fontSize: w(3.5), fontWeight: 'bold'}}>
              Tidak menerima kode verifikasi (OTP)?
            </Text>
            <Text
              style={{fontSize: w(3.5), fontWeight: 'bold', color: '#FF7F57'}}>
              Kirim Ulang
            </Text>
          </View>
          {/* RESEND CODE */}
        </View>
        {/* BODY */}
      </ScrollView>
    </View>
  );
}
