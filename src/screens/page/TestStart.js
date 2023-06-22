import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import {TouchableOpacity, Image} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {COLOR} from '../../styles';

export default function TestStart() {
  return (
    <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
      {/* HEADER */}
      <View
        style={{
          height: w(38),
          backgroundColor: '#3FA3D4',
          padding: w(4),
          justifyContent: 'space-between',
          borderBottomLeftRadius: w(6),
          borderBottomRightRadius: w(6),
        }}>
        {/* TIMER (POSITION ABSOLUTE) */}
        <CountDown
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: w(5),
          }}
          until={2400}
          onFinish={() => alert('finished')}
          onPress={() => alert('hello')}
          size={w(4)}
          timeToShow={['H', 'M', 'S']}
          timeLabels={{h: null, m: null, s: null}}
          showSeparator
          digitStyle={{
            backgroundColor: COLOR.WHITE,
            borderRadius: w(4),
          }}
          digitTxtStyle={{color: '#3FA3D4', fontSize: w(4)}}
          separatorStyle={{color: COLOR.WHITE, fontSize: w(4)}}
        />
        {/* TIMER (POSITION ABSOLUTE) */}
        {/* CLOSE BUTTON */}
        <TouchableOpacity
          style={{
            backgroundColor: '#0D5679',
            height: w(7),
            width: w(7),
            borderRadius: w(10),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={require('./../../assets/close.png')}
            style={{height: w(3), width: w(3)}}
          />
        </TouchableOpacity>
        {/* CLOSE BUTTON */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* CATEGORY */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: w(3.5)}}>Kategori</Text>
            <Text
              style={{
                fontSize: w(3.5),
                backgroundColor: '#0D5679',
                padding: w(1),
                borderRadius: w(3),
                color: COLOR.WHITE,
                marginLeft: w(2),
              }}>
              TWK
            </Text>
          </View>
          {/* CATEGORY */}
          {/* NUMBER */}
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontSize: w(3.5)}}>Nomor</Text>
            <Text
              style={{
                fontSize: w(3.5),
                backgroundColor: '#0D5679',
                padding: w(1),
                borderRadius: w(3),
                color: COLOR.WHITE,
                marginLeft: w(2),
              }}>
              1
            </Text>
          </View>
          {/* NUMBER */}
        </View>
      </View>
      {/* HEADER */}
      {/* BODY */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: w(10)}}>
        <View style={{marginTop: w(4), paddingHorizontal: w(6)}}>
          {/* TEXT */}
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={{fontSize: w(3)}}>
              Jawablah pertanyaan secara teliti
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: w(3)}}>100 Soal</Text>
              <Image
                source={require('./../../assets/list.png')}
                style={{height: w(5), width: w(5), marginLeft: w(2)}}
              />
            </View>
          </View>
          {/* TEXT */}
          {/* QUESTION */}
          <View
            style={{
              backgroundColor: '#F4F4F4',
              marginTop: w(5),
              borderRadius: w(2),
              padding: w(4),
            }}>
            <Text style={{fontSize: w(3.5), color: COLOR.BLACK}}>
              Pancasila bukanlah ideologi yang memaksa kebebasan dan tanggung
              jawab masyarakat, melainkan pancasila justru menghargai kebebasan
              dan tanggung jawab masyarakat. Pernyataan tersebut mencerminkan
              bahwa pancasila sebagai ...
            </Text>
          </View>
          {/* QUESTION */}
          {/* ANSWER */}
          <View
            style={{
              backgroundColor: '#F4F4F4',
              marginTop: w(5),
              borderRadius: w(2),
              padding: w(4),
            }}>
            {['A', 'B', 'C', 'D'].map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: index !== 0 ? w(4) : 0,
                  }}>
                  <Text style={{fontSize: w(3.5), color: COLOR.BLACK}}>
                    {item}
                  </Text>
                  <View
                    style={{
                      height: w(3),
                      width: w(3),
                      backgroundColor: COLOR.WHITE,
                      borderColor: COLOR.PRIMARY,
                      borderWidth: w(0.3),
                      borderRadius: w(10),
                      marginLeft: w(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {index === 3 && (
                      <View
                        style={{
                          width: w(1.5),
                          height: w(1.5),
                          backgroundColor: COLOR.PRIMARY,
                          borderRadius: w(10),
                        }}
                      />
                    )}
                  </View>
                  <Text
                    style={{
                      fontSize: w(3.5),
                      color: COLOR.BLACK,
                      marginLeft: w(2),
                    }}>
                    Ideologi Terbuka
                  </Text>
                </View>
              );
            })}
          </View>
          {/* ANSWER */}
        </View>
      </ScrollView>
      {/* BODY */}
      {/* FOOTER */}

      {/* BUTTON NEXT & PREV */}
      <View style={{paddingHorizontal: w(6), marginBottom: w(6)}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <TouchableOpacity
            style={{
              backgroundColor: '#CACACA',
              height: w(10),
              width: w(42),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: w(1),
            }}>
            <Text style={{fontSize: w(3.5), color: COLOR.WHITE}}>Prev</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: COLOR.PRIMARY,
              height: w(10),
              width: w(42),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: w(1),
            }}>
            <Text style={{fontSize: w(3.5), color: COLOR.WHITE}}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* BUTTON NEXT & PREV */}

      {/* FOOTER */}
    </View>
  );
}
