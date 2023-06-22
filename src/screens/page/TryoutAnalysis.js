import React, {useState, useContext, useEffect} from 'react';
import {View, Text, useWindowDimensions, ActivityIndicator} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';
import {COLOR, COLOR_GRAY} from '../../styles';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableOpacity, Image} from 'react-native';
import {VictoryPie} from 'victory-native';
import Header from '../../components/general/Header';
import {BarChart} from 'react-native-chart-kit';
import {ContextType as ContextPackage} from './../../context/ContextPackage';
import moment from 'moment';
import {BASE_URL} from '../../../env';
export default function TryoutAnalysis({route}) {
  const [dataChart, setDataChart] = useState({
    labels: ['Percobaan 1', 'Percobaan 2', 'Percobaan 3'],
    datasets: [
      {
        data: [0, 0, 0],
      },
    ],
  });

  const [loading, setLoading] = useState(false);
  const {answerId} = route.params;
  const packageContext = useContext(ContextPackage);
  const {submitAnswer, dataTryoutResult} = packageContext;
  const {getDataTryoutDiscussion, dataTryoutDiscussion} = packageContext;
  const [question, setQuestion] = useState([]);
  const [activeNumber, setActiveNumber] = useState(0);
  useEffect(() => {
    getDiscussion();
  }, []);

  const getDiscussion = async () => {
    setLoading(true);
    const result = await submitAnswer({
      answer_id: answerId,
    });
    // getDataTryoutDiscussion(answerId);
    const data = await getDataTryoutDiscussion(answerId);
    setQuestion(data.data);
    // console.log(dataTryoutResult.log);
    // dataTryoutResult.log.map()
    let labels = [];
    let datasets = [];
    await result.data.log
      .slice(0, 3)
      .reverse()
      .forEach((item, index) => {
        labels.push('Percobaan ' + (index + 1));
        datasets.push(
          item.sosiokultural + item.teknis + item.manajerial + item.wawancara,
        );
      });
    setDataChart({
      labels: labels,
      datasets: [
        {
          data: datasets,
        },
      ],
    });
    setLoading(false);
  };

  const ResultHeader = ({title}) => {
    return (
      <View
        style={{
          height: w(10),
          backgroundColor: COLOR.SECONDARY,
          borderBottomLeftRadius: w(5),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: w(3.5),
            color: COLOR.WHITE,
            fontWeight: 'bold',
          }}>
          {title}
        </Text>
      </View>
    );
  };
  const FirstPrecentage = ({data, log}) => {
    return (
      <View
        style={{
          paddingHorizontal: w(2),
        }}>
        {/* 1 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: COLOR.SECONDARY,
              fontSize: w(3),
              fontWeight: 'bold',
            }}>
            Kompetensi Teknis
          </Text>
          <Text
            style={{
              color: COLOR_GRAY.NORMAL2,
              fontSize: w(3),
            }}>
            {moment(log?.created_at || new Date()).format('LL')}
          </Text>
        </View>
        {/* 1 */}
        {/* 2 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: COLOR.RED,
              fontSize: w(3),
              fontWeight: 'bold',
            }}>
            {data?.jumlah} Soal
          </Text>
          <Text
            style={{
              color: COLOR.RED,
              fontSize: w(2.5),
              fontWeight: 'bold',
            }}>
            Ambang Batas Kelulusan: {data?.batas}
          </Text>
        </View>
        {/* 2 */}
        {/* 3 */}
        <View style={{marginTop: w(6)}}>
          <Text
            style={{
              color: COLOR.RED,
              fontSize: w(2.5),
              fontWeight: 'bold',
              alignSelf: 'flex-end',
            }}>
            Skor dan Status
          </Text>
          {/* CONTAINER */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* DESCRIPTION */}
            <View
              style={{
                height: w(25),
                width: w(22),
                justifyContent: 'space-evenly',
              }}>
              {/* RIGHT */}
              <Text
                style={{
                  fontSize: w(3.5),
                  fontWeight: 'bold',
                  color: '#EF9021',
                }}>
                Benar
              </Text>
              {/* RIGHT */}
              {/* FAULT */}
              <Text
                style={{
                  fontSize: w(3.5),
                  fontWeight: 'bold',
                  color: '#EF9021',
                }}>
                Salah
              </Text>
              {/* FAULT */}
              {/* EMPTY */}
              <Text
                style={{
                  fontSize: w(3.5),
                  fontWeight: 'bold',
                  color: '#EF9021',
                }}>
                Tidak Terisi
              </Text>
              {/* EMPTY */}
            </View>
            {/* DESCRIPTION */}
            {/* PRECENTAGE */}
            <View
              style={{
                height: w(25),
                width: w(40),
                justifyContent: 'space-evenly',
              }}>
              {/* RIGHT */}
              <View
                style={{
                  height: w(5),
                  backgroundColor: '#ADE8F4',
                  width: w(40),
                  borderRadius: w(1),
                }}>
                <View
                  style={{
                    height: w(5),
                    backgroundColor: '#0077B6',
                    borderRadius: w(1),
                    width: `${(data?.benar / data?.jumlah) * 100}%`,
                  }}>
                  {/* RUMUS PRESENTASE SOAL BENAR  =  SOAL BENAR / JUMLAH SOAL * 100 */}
                </View>
                <Text
                  style={{
                    position: 'absolute',
                    fontSize: w(2.5),
                    fontWeight: 'bold',
                    color: COLOR.WHITE,
                    marginTop: w(0.5),
                    marginLeft: w(2),
                  }}>
                  {data?.benar} Soal
                </Text>
              </View>
              {/* RIGHT */}
              {/* `$
              {((data?.benar < 10 && data?.benar !== 0 ? 10 : data?.benar) /
                data?.jumlah) *
                100}
              %` */}
              {/* FAULT */}
              <View
                style={{
                  height: w(5),
                  backgroundColor: '#FFB7BE',
                  width: w(40),
                  borderRadius: w(1),
                }}>
                <View
                  style={{
                    height: w(5),
                    backgroundColor: '#EB5252',
                    borderRadius: w(1),
                    width: `${(data?.salah / data?.jumlah) * 100}%`,
                  }}>
                  {/* RUMUS PRESENTASE SOAL BENAR  =  SOAL BENAR / JUMLAH SOAL * 100 */}
                </View>
                <Text
                  style={{
                    position: 'absolute',
                    fontSize: w(2.5),
                    fontWeight: 'bold',
                    color: COLOR.WHITE,
                    marginTop: w(0.5),
                    marginLeft: w(2),
                  }}>
                  {data?.salah} Soal
                </Text>
              </View>
              {/* FAULT */}
              {/* EMPTY */}
              <View
                style={{
                  height: w(5),
                  backgroundColor: '#E1E1E3',
                  width: w(40),
                  borderRadius: w(1),
                }}>
                <View
                  style={{
                    height: w(5),
                    backgroundColor: '#A39D9D',
                    borderRadius: w(1),
                    width: `${(data?.kosong / data?.jumlah) * 100}%`,
                  }}>
                  {/* RUMUS PRESENTASE SOAL BENAR  =  SOAL BENAR / JUMLAH SOAL * 100 */}
                </View>
                <Text
                  style={{
                    position: 'absolute',
                    fontSize: w(2.5),
                    fontWeight: 'bold',
                    color: COLOR.WHITE,
                    marginTop: w(0.5),
                    marginLeft: w(2),
                  }}>
                  {data?.kosong} Soal
                </Text>
              </View>
              {/* EMPTY */}
            </View>
            {/* PRECENTAGE */}
            {/* SCORE & STATUS */}
            <View
              style={{
                height: w(25),
                width: w(18),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {/* BOX */}
              <View
                style={{
                  height: w(20),
                  width: w(16),
                  borderWidth: w(0.2),
                  borderColor: '#E1E1E3',
                  borderRadius: w(2),
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                {/* SCORE */}
                <Text
                  style={{
                    color: COLOR.SECONDARY,
                    fontSize: w(5),
                    fontWeight: 'bold',
                  }}>
                  {data?.total}
                </Text>
                {/* SCORE */}
                {/* STATUS */}
                <Text
                  style={{
                    color: COLOR.SECONDARY,
                    fontSize: w(2.5),
                    fontWeight: 'bold',
                  }}>
                  {data?.total >= data?.batas ? 'Lolos' : 'Tidak Lolos'}
                </Text>
                {/* STATUS */}
              </View>
              {/* BOX */}
            </View>
            {/* SCORE & STATUS */}
          </View>
          {/* CONTAINER */}
        </View>
        {/* 3 */}
        {/* UNDERLINE */}
        <View
          style={{
            height: w(0.2),
            backgroundColor: '#E1E1E3',
            marginTop: w(4),
          }}
        />
        {/* UNDERLINE */}
      </View>
    );
  };
  const SecondPrecentage = ({data, log, type}) => {
    return (
      <View
        style={{
          paddingHorizontal: w(2),
          marginTop: w(3),
        }}>
        {/* 1 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: COLOR.SECONDARY,
              fontSize: w(3),
              fontWeight: 'bold',
            }}>
            {type}
          </Text>
          <Text
            style={{
              color: COLOR_GRAY.NORMAL2,
              fontSize: w(3),
            }}>
            {moment(log?.created_at || new Date()).format('LL')}
          </Text>
        </View>
        {/* 1 */}
        {/* 2 */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              color: COLOR.RED,
              fontSize: w(3),
              fontWeight: 'bold',
            }}>
            {data?.jumlah} Soal
          </Text>
          <Text
            style={{
              color: COLOR.RED,
              fontSize: w(2.5),
              fontWeight: 'bold',
            }}>
            Ambang Batas Kelulusan: {data?.batas}
          </Text>
        </View>
        {/* 2 */}
        {/* 3 */}
        <View style={{marginTop: w(6)}}>
          <Text
            style={{
              color: COLOR.RED,
              fontSize: w(2.5),
              fontWeight: 'bold',
              alignSelf: 'flex-end',
            }}>
            Skor dan Status
          </Text>
          {/* CONTAINER */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/* POINT PRECENTAGE */}
            <View
              style={{
                width: w(65),
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              {/* POINT 1 */}
              {/* {[1, 1, 1, 1, 1, 1].map((item, index) => {
                      return ( */}
              <View
                style={{
                  width: w(10),
                  height: w(35),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#ADE8F4',
                    width: w(7),
                    height: w(28),
                    borderRadius: w(1),
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#0077B6',
                      width: w(7),
                      height: `${(data?.point1 / data?.jumlah) * 100}%`,
                      borderRadius: w(1),
                      alignSelf: 'flex-end',
                    }}></View>
                  {/* JUMLAH SOAL DAPAT POINT 1 / JUMLAH SOAL * 100 */}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: w(3),
                      position: 'absolute',
                      transform: [{rotate: '270deg'}],
                      bottom: w(5),
                      right: -w(1),
                      color: COLOR.WHITE,
                    }}>
                    {data?.point1} Soal
                  </Text>
                </View>
                <Text style={{fontSize: w(3), color: COLOR.BLACK}}>Poin 1</Text>
              </View>
              {/* );
                    })} */}
              {/* POINT 1 */}
              {/* POINT 2 */}
              <View
                style={{
                  width: w(10),
                  height: w(35),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#FFB7BE',
                    width: w(7),
                    height: w(28),
                    borderRadius: w(1),
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#EB5252',
                      width: w(7),
                      height: `${(data?.point2 / data?.jumlah) * 100}%`,
                      borderRadius: w(1),
                      alignSelf: 'flex-end',
                    }}></View>
                  {/* JUMLAH SOAL DAPAT POINT 1 / JUMLAH SOAL * 100 */}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: w(3),
                      position: 'absolute',
                      transform: [{rotate: '270deg'}],
                      bottom: w(5),
                      right: -w(1),
                      color: COLOR.WHITE,
                    }}>
                    {data?.point2} Soal
                  </Text>
                </View>
                <Text style={{fontSize: w(3), color: COLOR.BLACK}}>Poin 2</Text>
              </View>
              {/* POINT 2 */}
              {/* POINT 3 */}
              <View
                style={{
                  width: w(10),
                  height: w(35),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#E9CCA0',
                    width: w(7),
                    height: w(28),
                    borderRadius: w(1),
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#FAA827',
                      width: w(7),
                      height: `${(data?.point3 / data?.jumlah) * 100}%`,
                      borderRadius: w(1),
                      alignSelf: 'flex-end',
                    }}></View>
                  {/* JUMLAH SOAL DAPAT POINT 1 / JUMLAH SOAL * 100 */}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: w(3),
                      position: 'absolute',
                      transform: [{rotate: '270deg'}],
                      bottom: w(5),
                      right: -w(1),
                      color: COLOR.WHITE,
                    }}>
                    {data?.point3} Soal
                  </Text>
                </View>
                <Text style={{fontSize: w(3), color: COLOR.BLACK}}>Poin 3</Text>
              </View>
              {/* POINT 3 */}
              {/* POINT 4 */}
              <View
                style={{
                  width: w(10),
                  height: w(35),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#C3FFC1',
                    width: w(7),
                    height: w(28),
                    borderRadius: w(1),
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#3CC03A',
                      width: w(7),
                      height: `${(data?.point4 / data?.jumlah) * 100}%`,
                      borderRadius: w(1),
                      alignSelf: 'flex-end',
                    }}></View>
                  {/* JUMLAH SOAL DAPAT POINT 1 / JUMLAH SOAL * 100 */}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: w(3),
                      position: 'absolute',
                      transform: [{rotate: '270deg'}],
                      bottom: w(5),
                      right: -w(1),
                      color: COLOR.WHITE,
                    }}>
                    {data?.point4} Soal
                  </Text>
                </View>
                <Text style={{fontSize: w(3), color: COLOR.BLACK}}>Poin 4</Text>
              </View>
              {/* POINT 4 */}
              {/* POINT 5 */}
              <View
                style={{
                  width: w(10),
                  height: w(35),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {data?.point5 !== null ? (
                  <>
                    <View
                      style={{
                        backgroundColor: '#D8AAF4',
                        width: w(7),
                        height: w(28),
                        borderRadius: w(1),
                        flexDirection: 'row',
                      }}>
                      <View
                        style={{
                          backgroundColor: '#9B0CF3',
                          width: w(7),
                          height: `${(data?.point5 / data?.jumlah) * 100}%`,
                          borderRadius: w(1),
                          alignSelf: 'flex-end',
                        }}></View>
                      {/* JUMLAH SOAL DAPAT POINT 1 / JUMLAH SOAL * 100 */}
                      <Text
                        style={{
                          fontWeight: 'bold',
                          fontSize: w(3),
                          position: 'absolute',
                          transform: [{rotate: '270deg'}],
                          bottom: w(5),
                          right: -w(1),
                          color: COLOR.WHITE,
                        }}>
                        {data?.point5} Soal
                      </Text>
                    </View>
                    <Text style={{fontSize: w(3), color: COLOR.BLACK}}>
                      Poin 5
                    </Text>
                  </>
                ) : null}
              </View>
              {/* POINT 5 */}
              {/* EMPTY */}
              <View
                style={{
                  width: w(10),
                  height: w(35),
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: '#E1E1E3',
                    width: w(7),
                    height: w(28),
                    borderRadius: w(1),
                    flexDirection: 'row',
                  }}>
                  <View
                    style={{
                      backgroundColor: '#A39D9D',
                      width: w(7),
                      height: `${(data?.point0 / data?.jumlah) * 100}%`,
                      borderRadius: w(1),
                      alignSelf: 'flex-end',
                    }}></View>
                  {/* JUMLAH SOAL DAPAT POINT 1 / JUMLAH SOAL * 100 */}
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: w(3),
                      position: 'absolute',
                      transform: [{rotate: '270deg'}],
                      bottom: w(5),
                      right: -w(1),
                      color: COLOR.WHITE,
                    }}>
                    {data?.point0} Soal
                  </Text>
                </View>
                <Text style={{fontSize: w(2.5), color: COLOR.BLACK}}>
                  Kosong
                </Text>
              </View>
              {/* EMPTY */}
            </View>
            {/* POINT PRECENTAGE */}
            {/* SCORE & STATUS */}
            <View
              style={{
                height: w(25),
                width: w(16),
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: w(2),
              }}>
              {/* BOX */}
              <View
                style={{
                  height: w(25),
                  width: w(14),
                  borderWidth: w(0.2),
                  borderColor: '#E1E1E3',
                  borderRadius: w(2),
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                }}>
                {/* SCORE */}
                <Text
                  style={{
                    color: COLOR.SECONDARY,
                    fontSize: w(5),
                    fontWeight: 'bold',
                  }}>
                  {data?.total}
                </Text>
                {/* SCORE */}
                {/* STATUS */}
                <Text
                  style={{
                    color: COLOR.SECONDARY,
                    fontSize: w(2.3),
                    fontWeight: 'bold',
                  }}>
                  {data?.total >= data?.batas ? 'Lolos' : 'Tidak Lolos'}
                </Text>
                {/* STATUS */}
              </View>
              {/* BOX */}
            </View>
            {/* SCORE & STATUS */}
          </View>
          {/* CONTAINER */}
        </View>
        {/* 3 */}
        {/* UNDERLINE */}
        <View
          style={{
            height: w(0.2),
            backgroundColor: '#E1E1E3',
            marginTop: w(4),
          }}
        />
        {/* UNDERLINE */}
      </View>
    );
  };

  const FirstRoute = () =>
    !dataTryoutResult ? (
      <Text style={{marginTop: w(6), alignSelf: 'center', color: COLOR.BLACK}}>
        Tidak ada data
      </Text>
    ) : (
      <ScrollView contentContainerStyle={{paddingBottom: w(6)}}>
        {/* CONTAINER */}
        <View>
          {/* CHART */}
          <View style={{marginTop: w(6)}}>
            {/* HEADER */}
            <ResultHeader title={'Grafik Latihan Percobaan ke 1 - 3'} />
            {/* HEADER */}
            {/* BAR CHART */}
            <View style={{marginTop: w(6), alignItems: 'center'}}>
              <BarChart
                data={dataChart}
                width={w(90)}
                height={w(60)}
                chartConfig={{
                  backgroundColor: 'transparent',
                  backgroundGradientTo: 'white',
                  backgroundGradientFromOpacity: 0,
                  backgroundGradientFrom: 'white',
                  backgroundGradientToOpacity: 0,
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => `rgba(35, 144, 168, ${opacity})`,
                  labelColor: (opacity = 1) => `rgba(255, 148, 0, ${opacity})`,
                  propsForDots: {
                    r: '6',
                    strokeWidth: '2',
                    stroke: '#ffa726',
                  },
                }}
                fromZero={true}
              />
            </View>
            {/* BAR CHART */}
          </View>
          {/* CHART */}
          {/* SUMMARY */}
          <View style={{marginTop: w(6)}}>
            {/* HEADER */}
            <ResultHeader title={'Rangkuman Hasil Tes'} />
            {/* HEADER */}
            {/* BODY */}
            <View style={{marginTop: w(6), paddingHorizontal: w(6)}}>
              {/* COPY THIS */}

              {/* COPY THIS */}
              <Text style={{color: COLOR_GRAY.NORMAL2, fontSize: w(3)}}>
                Ket: Hasil tes ini mengambil hasil tes terkini
              </Text>
              {/* <View
                style={{
                  backgroundColor: '#FAA827',
                  borderRadius: w(1),
                  paddingHorizontal: w(2),
                  paddingVertical: w(0.5),
                  alignSelf: 'baseline',
                  marginTop: w(4),
                }}>
                <Text style={{color: COLOR.WHITE, fontSize: w(3)}}>
                  Percobaan ke-2
                </Text>
              </View> */}
              {/* <Text
              style={{
                color: COLOR_GRAY.NORMAL2,
                fontSize: w(3.5),
                marginTop: w(4),
              }}>
              Standar Kelulusan untuk Skor Akhir ={' '}
              <Text style={{fontWeight: 'bold', color: 'red', fontSize: w(4)}}>
                70
              </Text>
            </Text> */}
              {/* SCORE & STATUS */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  marginTop: w(3),
                }}>
                {/* SCORE */}
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: COLOR.SECONDARY, fontSize: w(3.5)}}>
                    Skor Akhir
                  </Text>
                  <View
                    style={{
                      height: w(12),
                      width: w(22),
                      backgroundColor: '#F8DBAF',
                      marginTop: w(2),
                      borderRadius: w(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: w(5), color: '#C97800'}}>
                      {dataTryoutResult?.nilai?.manajerial?.total +
                        dataTryoutResult?.nilai?.sosiokultural?.total +
                        dataTryoutResult?.nilai?.wawancara?.total +
                        dataTryoutResult?.nilai?.teknis?.total}
                    </Text>
                  </View>
                </View>
                {/* SCORE */}
                {/* STATUS */}
                <View style={{alignItems: 'center'}}>
                  <Text style={{color: COLOR.SECONDARY, fontSize: w(3.5)}}>
                    Status
                  </Text>
                  <View
                    style={{
                      height: w(12),
                      // width: w(22),
                      paddingHorizontal: w(2),
                      backgroundColor: '#F8DBAF',
                      marginTop: w(2),
                      borderRadius: w(2),
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text style={{fontSize: w(5), color: '#C97800'}}>
                      {dataTryoutResult?.nilai?.manajerial?.total <
                        dataTryoutResult?.nilai?.manajerial?.batas ||
                      dataTryoutResult?.nilai?.sosiokultural?.total <
                        dataTryoutResult?.nilai?.sosiokultural?.batas ||
                      dataTryoutResult?.nilai?.wawancara?.total <
                        dataTryoutResult?.nilai?.wawancara?.batas ||
                      dataTryoutResult?.nilai?.teknis?.total <
                        dataTryoutResult?.nilai?.teknis?.batas
                        ? 'Tidak Lulus'
                        : 'LULUS'}
                    </Text>
                  </View>
                </View>
                {/* STATUS */}
              </View>
              {/* SCORE & STATUS */}
              <View
                style={{
                  height: w(0.2),
                  backgroundColor: '#E1E1E3',
                  marginTop: w(6),
                }}
              />
              {/* RESULT DETAIL */}
              <View style={{marginTop: w(6)}}>
                <Text style={{color: COLOR_GRAY.NORMAL2, fontSize: w(3)}}>
                  Detail Hasil Tes
                </Text>
                {/* RUMUS PRESENTASE SOAL BENAR  =  SOAL BENAR / JUMLAH SOAL * 100 */}
                {/* DETAIL */}
                <View style={{marginTop: w(6)}}>
                  {/* KOMPETENSI TEKNIS */}
                  <FirstPrecentage
                    data={dataTryoutResult?.nilai?.teknis}
                    log={dataTryoutResult?.log[0]}
                  />
                  {/* KOMPETENSI TEKNIS */}
                  {/* KOMPETENSI MANAJERIAL */}
                  <SecondPrecentage
                    data={dataTryoutResult?.nilai?.manajerial}
                    log={dataTryoutResult?.log[0]}
                    type="Kompetensi Manajerial"
                  />
                  {/* KOMPETENSI MANAJERIAL */}
                  {/* KOMPETENSI SOSIAL KULTURAL */}
                  <SecondPrecentage
                    data={dataTryoutResult?.nilai?.sosiokultural}
                    log={dataTryoutResult?.log[0]}
                    type="Kompetensi Sosial Kultural"
                  />
                  {/* KOMPETENSI SOSIAL KULTURAL */}
                  {/* WAWANCARA */}
                  <SecondPrecentage
                    data={dataTryoutResult?.nilai?.wawancara}
                    log={dataTryoutResult?.log[0]}
                    type="Wawancara"
                  />
                  {/* WAWANCARA */}
                </View>
                {/* DETAIL */}
              </View>
              {/* RESULT DETAIL */}
            </View>
            {/* BODY */}
          </View>
          {/* SUMMARY */}
        </View>
        {/* CONTAINER */}
      </ScrollView>
    );

  const AnswerComponent = ({text, number, isAnswer, image}) => {
    return (
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          // marginTop: w(2),
        }}>
        <Text style={{fontSize: w(3.5), color: COLOR.BLACK}}>{number}</Text>
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
          {
            // number === answerActive[activeNumber] ||
            isAnswer === number && (
              <View
                style={{
                  width: w(1.5),
                  height: w(1.5),
                  backgroundColor: COLOR.PRIMARY,
                  borderRadius: w(10),
                }}
              />
            )
          }
        </View>
        <View>
          {text ? (
            <Text
              style={{
                fontSize: w(3.5),
                color: COLOR.BLACK,
                marginLeft: w(2),
                width: w(72),
              }}>
              {text}
            </Text>
          ) : null}
          {image ? (
            <View
              style={{
                alignItems: 'center',
                width: w(70),
              }}>
              <Image
                source={{
                  uri: `${BASE_URL}/file-soal/${image}`,
                }}
                style={{width: w(65), resizeMode: 'contain', aspectRatio: 2}}
              />
            </View>
          ) : null}
        </View>
      </TouchableOpacity>
    );
  };

  const SecondRoute = () =>
    !dataTryoutDiscussion ? (
      <Text style={{marginTop: w(6), alignSelf: 'center', color: COLOR.BLACK}}>
        Tidak ada data
      </Text>
    ) : (
      <>
        <ScrollView contentContainerStyle={{paddingBottom: w(4)}}>
          {/* TASK LIST */}
          <View style={{paddingHorizontal: w(6), marginTop: w(4)}}>
            {/* TITLE */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: w(3.5), color: COLOR.BLACK}}>Soal</Text>
                <Text
                  style={{
                    fontSize: w(3.5),
                    backgroundColor: '#F4C72A',
                    padding: w(1),
                    borderRadius: w(3),
                    color: COLOR.WHITE,
                    marginLeft: w(2),
                    overflow: 'hidden',
                  }}>
                  {dataTryoutDiscussion[activeNumber]?.kategori}
                </Text>
              </View>
              {/* <TouchableOpacity
            style={{
              paddingHorizontal: w(2),
              paddingVertical: w(2),
              backgroundColor: COLOR.PRIMARY,
              borderRadius: w(2),
            }}>
            <Text
              style={{
                fontSize: w(3.5),
                color: COLOR.WHITE,
              }}>
              Filter
            </Text>
          </TouchableOpacity> */}
            </View>
            {/* TITLE */}
            {/* BODY */}
            <View
              style={{
                backgroundColor: '#F4F4F4',
                marginTop: w(2),
                borderRadius: w(2),
                height: w(60),
              }}>
              {/* LIST */}
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: w(2),
                    marginBottom: w(4),
                  }}>
                  {dataTryoutDiscussion.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => setActiveNumber(index)}
                        key={index}
                        style={{
                          width: w(10),
                          height: w(8),
                          backgroundColor: COLOR.WHITE,
                          marginTop: w(2),
                          marginLeft: w(4),
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: w(1),
                        }}>
                        <Text
                          style={{
                            fontSize: w(3.5),
                            fontWeight: 'bold',
                            color: COLOR.BLACK,
                          }}>
                          {index + 1}
                        </Text>
                        {item.is_answer ? (
                          <Image
                            style={{
                              height: w(2.5),
                              width: w(2.5),
                              position: 'absolute',
                              right: w(0.5),
                              top: w(0.5),
                            }}
                            source={
                              item?.kunci_jawaban === item?.is_answer
                                ? require('./../../assets/right.png')
                                : require('./../../assets/wrong.png')
                            }
                          />
                        ) : null}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
              {/* LIST */}
            </View>
            {/* BODY */}
          </View>
          {/* TASK LIST */}
          {/* QUESTIONS */}
          <View style={{paddingHorizontal: w(6), marginTop: w(4)}}>
            {/* TITLE */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: w(3.5), color: COLOR.BLACK}}>Soal</Text>
                <Text
                  style={{
                    fontSize: w(3.5),
                    backgroundColor: COLOR.PRIMARY,
                    padding: w(1),
                    borderRadius: w(3),
                    color: COLOR.WHITE,
                    marginLeft: w(2),
                    overflow: 'hidden',
                  }}>
                  No {activeNumber + 1}
                </Text>
              </View>
            </View>
            {/* TITLE */}
            {/* BODY */}
            <View
              style={{
                backgroundColor: '#F4F4F4',
                marginTop: w(2),
                borderRadius: w(2),
                padding: w(4),
              }}>
              {dataTryoutDiscussion[activeNumber]?.soal_text ? (
                <Text style={{fontSize: w(3.5), color: COLOR.BLACK}}>
                  {dataTryoutDiscussion[activeNumber]?.soal_text}
                </Text>
              ) : null}
              {dataTryoutDiscussion[activeNumber]?.soal_gambar ? (
                <View style={{alignItems: 'center'}}>
                  <Image
                    source={{
                      uri: `${BASE_URL}/file-soal/${dataTryoutDiscussion[activeNumber]?.soal_gambar}`,
                    }}
                    style={{
                      // height: undefined,
                      width: w(80),
                      resizeMode: 'contain',
                      aspectRatio: 2,
                    }}
                  />
                </View>
              ) : null}
            </View>
            {/* BODY */}
          </View>
          {/* QUESTIONS */}
          {/* ANSWER */}
          <View style={{paddingHorizontal: w(6), marginTop: w(4)}}>
            {/* BODY */}
            <View
              style={{
                backgroundColor: '#F4F4F4',
                marginTop: w(2),
                borderRadius: w(2),
                padding: w(4),
                paddingBottom: w(10),
              }}>
              <AnswerComponent
                number={'A'}
                text={dataTryoutDiscussion[activeNumber]?.pilihan_a}
                image={dataTryoutDiscussion[activeNumber]?.pilihan_a_gambar}
                id={dataTryoutDiscussion[activeNumber]?.id}
                isAnswer={dataTryoutDiscussion[activeNumber]?.is_answer}
              />
              <View style={{marginTop: w(3)}} />
              <AnswerComponent
                number={'B'}
                text={dataTryoutDiscussion[activeNumber]?.pilihan_b}
                image={dataTryoutDiscussion[activeNumber]?.pilihan_b_gambar}
                id={dataTryoutDiscussion[activeNumber]?.id}
                isAnswer={dataTryoutDiscussion[activeNumber]?.is_answer}
              />
              <View style={{marginTop: w(3)}} />
              <AnswerComponent
                number={'C'}
                text={dataTryoutDiscussion[activeNumber]?.pilihan_c}
                image={dataTryoutDiscussion[activeNumber]?.pilihan_c_gambar}
                id={dataTryoutDiscussion[activeNumber]?.id}
                isAnswer={dataTryoutDiscussion[activeNumber]?.is_answer}
              />
              <View style={{marginTop: w(3)}} />
              <AnswerComponent
                number={'D'}
                text={dataTryoutDiscussion[activeNumber]?.pilihan_d}
                image={dataTryoutDiscussion[activeNumber]?.pilihan_d_gambar}
                id={dataTryoutDiscussion[activeNumber]?.id}
                isAnswer={dataTryoutDiscussion[activeNumber]?.is_answer}
              />
              {dataTryoutDiscussion[activeNumber]?.pilihan_e ||
              dataTryoutDiscussion[activeNumber]?.pilihan_e_gambar ? (
                <>
                  <View style={{marginTop: w(3)}} />
                  <AnswerComponent
                    number={'E'}
                    text={dataTryoutDiscussion[activeNumber]?.pilihan_e}
                    image={dataTryoutDiscussion[activeNumber]?.pilihan_e_gambar}
                    id={dataTryoutDiscussion[activeNumber]?.id}
                    isAnswer={dataTryoutDiscussion[activeNumber]?.is_answer}
                  />
                </>
              ) : null}

              <View
                style={{
                  backgroundColor: COLOR.GREEN,
                  position: 'absolute',
                  right: w(2),
                  bottom: w(2),
                  borderRadius: w(1),
                  paddingHorizontal: w(2),
                  paddingVertical: w(0.5),
                }}>
                <Text style={{color: COLOR.WHITE, fontSize: w(3.5)}}>
                  Jawaban Benar:{' '}
                  {dataTryoutDiscussion[activeNumber]?.kunci_jawaban}
                </Text>
              </View>
            </View>
            {/* BODY */}
          </View>
          {/* ANSWER */}
          {/* DISCUSSION */}
          <View style={{paddingHorizontal: w(6), marginTop: w(4)}}>
            {/* TITLE */}
            <View>
              <Text style={{fontSize: w(3.5), color: COLOR.BLACK}}>
                Pembahasan
              </Text>
            </View>
            {/* TITLE */}
            {/* BODY */}
            <View
              style={{
                backgroundColor: '#F4F4F4',
                marginTop: w(2),
                borderRadius: w(2),
                padding: w(4),
              }}>
              <Text style={{fontSize: w(3.5), color: COLOR.BLACK}}>
                {dataTryoutDiscussion[activeNumber]?.pembahasan_text}
              </Text>
            </View>
            {/* BODY */}
          </View>
          {/* DISCUSSION */}
        </ScrollView>
        {/* BUTTON NEXT & PREV */}
        <View
          style={{
            paddingHorizontal: w(6),
            paddingVertical: w(4),
            elevation: 5,
            backgroundColor: COLOR.WHITE,
          }}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity
              disabled={activeNumber === 0}
              onPress={() => setActiveNumber(activeNumber - 1)}
              style={{
                backgroundColor: activeNumber === 0 ? '#CACACA' : '#EBA352',
                height: w(10),
                width: w(42),
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: w(1),
              }}>
              <Text style={{fontSize: w(3.5), color: COLOR.WHITE}}>Prev</Text>
            </TouchableOpacity>
            <TouchableOpacity
              disabled={activeNumber + 1 === dataTryoutDiscussion.length}
              onPress={() => {
                setActiveNumber(activeNumber + 1);
              }}
              style={{
                backgroundColor:
                  activeNumber + 1 === dataTryoutDiscussion.length
                    ? '#CACACA'
                    : COLOR.PRIMARY,
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
      </>
    );

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  const layout = useWindowDimensions();
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'first', title: 'Hasil Tes'},
    {key: 'second', title: 'Pembahasan'},
  ]);

  return (
    <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
      <Header title={'Hasil dan Pembahasan'} />
      <View style={{height: w(0.5), backgroundColor: '#F5F5F5'}} />
      {loading ? (
        <View style={{marginTop: h(35), alignItems: 'center'}}>
          <ActivityIndicator size="large" color={COLOR.SECONDARY} />
          <Text style={{marginTop: w(4), fontSize: w(5), color: COLOR.BLACK}}>
            Memuat Data
          </Text>
        </View>
      ) : (
        <TabView
          navigationState={{index, routes}}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{width: layout.width}}
          renderTabBar={props => (
            <TabBar
              indicatorStyle={{
                backgroundColor: COLOR.PRIMARY,
              }}
              renderLabel={({route, focused, color}) => (
                <Text
                  style={{
                    color: focused ? COLOR.PRIMARY : COLOR.BLACK,
                    fontSize: w(4),
                  }}>
                  {route.title}
                </Text>
              )}
              {...props}
              style={{backgroundColor: '#fff'}}
            />
          )} // <-- add this line
        />
      )}
    </View>
  );
}
