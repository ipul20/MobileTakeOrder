import React, {useContext, useEffect, useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Image} from 'react-native';
import Header from '../../components/general/Header';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {COLOR, COLOR_GRAY} from '../../styles';
import {ContextType as ContextPackage} from './../../context/ContextPackage';
import moment from 'moment';
import NotFound from '../../components/general/NotFound';
import {ContextType as ContextUser} from './../../context/ContextUser';
import Axios from 'axios';
import {API_BASE_URL} from '../../../env';

export default function TryoutAnalysisList({route, navigation}) {
  const {tryoutId} = route.params;
  console.log(tryoutId);

  const userContext = useContext(ContextUser);
  const {userToken} = userContext;

  const [dataHistoryTryout, setDataHistoryTryout] = useState([]);

  const getDataHistoryTryout = async () => {
    let result;
    await Axios.get(`${API_BASE_URL}/tryout/riwayat/${tryoutId}`, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then(res => {
        setDataHistoryTryout(res.data.data);
        result = true;
      })
      .catch(err => {
        console.log(err);
        result = false;
      });
    return result;
  };

  useEffect(() => {
    getDataHistoryTryout();
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* HEADER */}
      <Header title={'Riwayat Tryout'} />
      {/* HEADER */}
      {/* BODY */}
      <ScrollView>
        <View style={{paddingHorizontal: w(6), paddingTop: w(6)}}>
          {dataHistoryTryout.length === 0 && (
            <NotFound text={'Kamu Belum memiliki Hasil tes'} />
          )}
          {dataHistoryTryout.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  padding: w(4),
                  borderWidth: w(0.2),
                  borderColor: '#DFDFDF',
                  borderRadius: w(2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: index === 0 ? 0 : w(4),
                }}>
                <View>
                  <Text style={{fontSize: w(3), color: COLOR.BLACK}}>
                    {item?.nama}
                  </Text>
                  <Text
                    style={{
                      fontSize: w(3.5),
                      color: COLOR.GRAY,
                      fontWeight: 'bold',
                    }}>
                    {item?.sub}
                  </Text>
                </View>
                <View>
                  <Text style={{fontSize: w(2.5), color: COLOR.BLACK}}>
                    {moment(item?.created_at).format('LL')}
                  </Text>
                  <TouchableOpacity
                    style={{marginTop: w(2.5)}}
                    onPress={() => {
                      navigation.navigate('TryoutAnalysis', {
                        answerId: item.id,
                      });
                    }}>
                    <Text
                      style={{
                        textDecorationLine: 'underline',
                        fontSize: w(3),
                        color: COLOR.PRIMARY,
                      }}>
                      Lihat Detail
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
      {/* BODY */}
    </View>
  );
}
