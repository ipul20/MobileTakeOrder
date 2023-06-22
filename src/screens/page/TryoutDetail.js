import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Image} from 'react-native';
import Header from '../../components/general/Header';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {COLOR, COLOR_GRAY} from '../../styles';
import {ContextType as ContextPackage} from './../../context/ContextPackage';
import Timeline from 'react-native-timeline-flatlist';

export default function TryoutDetail({route, navigation}) {
  const {tryoutData} = route.params;
  const {tryoutId} = route.params;
  const [loading, setLoading] = useState(false);
  const [loadingStart, setLoadingStart] = useState(false);

  const packageContext = useContext(ContextPackage);
  const {getDataDetailTryout, dataDetailTryout} = packageContext;
  const {getDataDetailTryoutStart, dataDetailTryoutStart} = packageContext;

  useEffect(() => {
    getDetail();
  }, []);

  const getDetail = async () => {
    setLoading(true);
    await getDataDetailTryout({tryout_id: tryoutId});
    setLoading(false);
  };

  // const data = [
  //   {
  //     title: 'Apoteker dan Farmasi',
  //     description: 'Event 1 Description',
  //     lineColor: COLOR_GRAY.LIGHT,
  //     circleColor: COLOR_GRAY.LIGHT,
  //     soal: 51,
  //     waktu: 61,
  //     poin: 301,
  //   },
  // ];

  const renderDetail = (rowData, sectionID, rowID) => {
    return (
      <View style={{marginTop: -w(3), marginBottom: w(3)}}>
        <Text style={{color: '#A39D9D', fontWeight: 'bold', fontSize: w(3.5)}}>
          {rowData.title}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: '#A39D9D', fontSize: w(3)}}>
              {rowData.soal} Soal
            </Text>
          </View>
          {/* <View style={{flexDirection: 'row', marginLeft: w(2)}}>
            <Text style={{color: '#A39D9D', fontSize: w(3)}}>
              {rowData.waktu} Menit
            </Text>
          </View>
          <View style={{flexDirection: 'row', marginLeft: w(2)}}>
            <Text style={{color: '#A39D9D', fontSize: w(3)}}>
              {rowData.poin} Poin
            </Text>
          </View> */}
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1}}>
      {/* HEADER */}
      <Header title={tryoutData.nama} />
      {/* HEADER */}
      {/* BODY */}
      <ScrollView>
        <View style={{paddingHorizontal: w(6), paddingTop: w(6)}}>
          {/* TEST CHANCE */}
          <View>
            {!loading ? (
              <Text
                style={{
                  fontSize: w(3.5),
                  fontWeight: 'bold',
                  color: '#FF8700',
                }}>
                Kesempatan Tes: {3 - dataDetailTryout?.jumlah_tes}
                {dataDetailTryout.jumlah_tes > 2 ? '' : 'x'}
              </Text>
            ) : null}
          </View>
          {/* TEST CHANCE */}
          {/* TIMELINE */}
          {loading ? (
            <ActivityIndicator
              style={{alignSelf: 'center', marginTop: '30%'}}
              size="large"
              color={COLOR.SECONDARY}
            />
          ) : (
            <Timeline
              data={dataDetailTryout.detail}
              style={{marginTop: w(10)}}
              renderDetail={renderDetail}
              lineColor={COLOR.SECONDARY}
              circleColor={COLOR.SECONDARY}
            />
          )}
          {/* TIMELINE */}
        </View>
      </ScrollView>
      <View style={{padding: w(6)}}>
        <TouchableOpacity
          disabled={loadingStart || dataDetailTryout.jumlah_tes > 2}
          // disabled={!dataDetailTryout?.answer_id}
          // onPress={() => {
          //   if (dataDetailTryout?.answer_id)
          //     navigation.navigate('TryoutStart', {
          //       answerId: dataDetailTryout?.answer_id,
          //       time: dataDetailTryout?.waktu,
          //       tryoutId: tryoutData?.id,
          //     });
          //   else Alert.alert('anda memiliki riwayat tryout yang belum selesai');
          // }}
          onPress={async () => {
            let tryout_Id;
            setLoadingStart(true);
            const data = await getDataDetailTryoutStart({tryout_id: tryoutId});
            tryout_Id = data?.data?.tryout_id;
            if (data?.result) {
              setLoadingStart(false);
              if (data?.data?.answer_id) {
                navigation.navigate('TryoutStart', {
                  answerId: data?.data?.answer_id,
                  time: data?.data?.waktu,
                  tryoutId: data?.data?.tryout_id,
                });
              }
            } else {
              setLoadingStart(false);
              if (data?.isContinue) {
                Alert.alert(
                  'Mulai Tryout',
                  'Anda belum menyelesaikan tryout sebelumnya',
                  [
                    {
                      text: 'Tutup',
                      style: 'cancel',
                    },
                    {
                      text: 'Lanjutkan',
                      onPress: async () => {
                        console.log('we', tryout_Id);
                        const data2 = await getDataDetailTryoutStart({
                          tryout_id: tryout_Id,
                        });
                        navigation.navigate('TryoutStart', {
                          answerId: data2?.data?.answer_id,
                          time: data2?.data?.waktu,
                          tryoutId: data2?.data?.tryout_id,
                        });
                      },
                    },
                  ],
                );
              }
            }
          }}
          style={{
            height: w(12),
            backgroundColor:
              loadingStart || dataDetailTryout.jumlah_tes > 2
                ? COLOR_GRAY.NORMAL2
                : COLOR.SECONDARY,
            borderRadius: w(2),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{color: COLOR.WHITE, fontSize: w(3.5), fontWeight: 'bold'}}>
            {loadingStart ? 'Loading...' : 'Mulai Kerjakan Soal'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          // onPress={() =>
          //   navigation.navigate('TryoutAnalysis', {
          //     answerId: dataDetailTryout?.answer_id,
          //   })
          // }
          onPress={() => navigation.navigate('TryoutAnalysisList', {tryoutId})}
          style={{
            height: w(12),
            backgroundColor: COLOR.SECONDARY,
            borderRadius: w(2),
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: w(2),
          }}>
          <Text
            style={{color: COLOR.WHITE, fontSize: w(3.5), fontWeight: 'bold'}}>
            Lihat Analisis
          </Text>
        </TouchableOpacity>
      </View>
      {/* BODY */}
    </View>
  );
}
