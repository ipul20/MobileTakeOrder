import React, {useState} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {COLOR, COLOR_GRAY} from '../../styles';
import {ScrollView} from 'react-native-gesture-handler';
import {TouchableOpacity, Image} from 'react-native';
import {VictoryPie} from 'victory-native';
export default function TestResult() {
  const graphicData = [
    {y: 60, x: '60%'},
    {y: 30, x: '30%'},
    {y: 10, x: '10%'},
  ];
  const graphicColor = ['#3CC03A', '#F86363', '#C4C4C4'];

  const datas = [
    1, 1, 11, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 4, 3, 2, 3, 2, 2, 3, 3, 2,
    3, 2, 3, 3, 3,
  ];

  const FirstRoute = () => (
    <ScrollView contentContainerStyle={{paddingBottom: w(4)}}>
      {/* PASSING GRADE */}
      <View style={{paddingHorizontal: w(6), marginTop: w(4)}}>
        {/* TITLE */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: w(3.5)}}>
            Standar Kelulusan (Passing Grade)
          </Text>
          <TouchableOpacity
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
          </TouchableOpacity>
        </View>
        {/* TITLE */}
        {/* BODY */}
        <View
          style={{
            backgroundColor: '#F4F4F4',
            marginTop: w(2),
            borderRadius: w(2),
            height: w(30),
            alignItems: 'center',
            justifyContent: 'space-evenly',
          }}>
          <Text style={{color: COLOR.PRIMARY, fontSize: w(3.5)}}>
            Tes Wawasan Kebangsaan
          </Text>
          <View
            style={{
              backgroundColor: '#F8DBAF',
              height: w(12),
              width: w(20),
              borderRadius: w(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: '#C97800', fontSize: w(5)}}>80</Text>
          </View>
        </View>
        {/* BODY */}
      </View>
      {/* PASSING GRADE */}
      {/* CATEGORY */}
      <View style={{paddingHorizontal: w(6), marginTop: w(4)}}>
        {/* TITLE */}
        <Text style={{fontSize: w(3.5)}}>Kategori</Text>
        {/* TITLE */}
        {/* BODY */}
        <View
          style={{
            backgroundColor: '#F4F4F4',
            marginTop: w(2),
            borderRadius: w(2),
            paddingHorizontal: w(6),
            paddingVertical: w(4),
          }}>
          {/* 1 */}
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text
              style={{
                fontSize: w(3.5),
                backgroundColor: '#F4C72A',
                padding: w(1),
                borderRadius: w(3),
                color: COLOR.WHITE,
              }}>
              TWK
            </Text>
            <Text
              style={{
                fontSize: w(3),
                backgroundColor: '#E8E8E8',
                padding: w(1),
                borderRadius: w(3),
                color: '#B6B6B6',
              }}>
              29-03-2022
            </Text>
          </View>
          {/* 1 */}
          {/* 2 */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: w(2),
            }}>
            <View>
              <Text
                style={{
                  color: '#898989',
                  fontSize: w(3.5),
                  fontWeight: 'bold',
                }}>
                Latihan Soal TWK 1
              </Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: w(3), color: '#B6B6B6'}}>
                  Lama Pengerjaan
                </Text>
                <Text
                  style={{
                    fontSize: w(3.5),
                    fontWeight: 'bold',
                    color: COLOR.PRIMARY,
                    marginLeft: w(2),
                  }}>
                  01:08:45
                </Text>
              </View>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{alignItems: 'center'}}>
                <Image
                  style={{height: w(3.5), width: w(3.5)}}
                  source={require('./../../assets/exam.png')}
                />
                <Text style={{fontSize: w(2), color: '#B6B6B6'}}>100 Soal</Text>
              </View>
              <View
                style={{
                  alignItems: 'center',
                  marginLeft: w(2),
                }}>
                <Image
                  style={{height: w(3.5), width: w(3.5)}}
                  source={require('./../../assets/stopwatch.png')}
                />
                <Text style={{fontSize: w(2), color: '#B6B6B6'}}>
                  120 Menit
                </Text>
              </View>
            </View>
          </View>
          {/* 2 */}
          {/* 3 */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: w(4),
            }}>
            <View
              style={{
                flexDirection: 'row',
                width: w(50),
                justifyContent: 'space-between',
              }}>
              {/* TRUE */}
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    height: w(10),
                    width: w(14),
                    borderRadius: w(3),
                    backgroundColor: '#ADEBAC',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: w(3.5),
                      fontWeight: 'bold',
                      color: '#09AF06',
                    }}>
                    85
                  </Text>
                </View>
                <Text
                  style={{fontSize: w(3), color: '#AEAEAE', marginTop: w(1)}}>
                  Benar
                </Text>
              </View>
              {/* TRUE */}
              {/* FALSE */}
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    height: w(10),
                    width: w(14),
                    borderRadius: w(3),
                    backgroundColor: '#FCBFBF',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: w(3.5),
                      fontWeight: 'bold',
                      color: '#BE0606',
                    }}>
                    7
                  </Text>
                </View>
                <Text
                  style={{fontSize: w(3), color: '#AEAEAE', marginTop: w(1)}}>
                  Salah
                </Text>
              </View>
              {/* FALSE */}
              {/* EMPTY */}
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    height: w(10),
                    width: w(14),
                    borderRadius: w(3),
                    backgroundColor: '#D7D7D7',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: w(3.5),
                      fontWeight: 'bold',
                      color: '#707070',
                    }}>
                    8
                  </Text>
                </View>
                <Text
                  style={{fontSize: w(3), color: '#AEAEAE', marginTop: w(1)}}>
                  Tidak Terisi
                </Text>
              </View>
            </View>
            {/* EMPTY */}
            {/* SCORE */}
            <View style={{alignItems: 'center'}}>
              <View
                style={{
                  height: w(10),
                  width: w(20),
                  borderRadius: w(3),
                  backgroundColor: '#B3E1F8',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: w(3.5),
                    fontWeight: 'bold',
                    color: '#2195CD',
                  }}>
                  85
                </Text>
              </View>
              <Text style={{fontSize: w(3), color: '#AEAEAE', marginTop: w(1)}}>
                Skor
              </Text>
            </View>
            {/* SCORE */}
          </View>
          {/* 3 */}
        </View>
        {/* BODY */}
      </View>
      {/* CATEGORY */}
      {/* PRESENTAGE */}
      <View style={{paddingHorizontal: w(6), marginTop: w(4)}}>
        {/* TITLE */}
        <Text style={{fontSize: w(3.5)}}>Presentase</Text>
        {/* TITLE */}
        {/* BODY */}
        <View
          style={{
            backgroundColor: '#F4F4F4',
            marginTop: w(2),
            borderRadius: w(2),
            paddingHorizontal: w(6),
            paddingVertical: w(4),
          }}>
          {/* CHART */}
          <View style={{alignItems: 'center'}}>
            <VictoryPie
              colorScale={graphicColor}
              data={graphicData}
              width={w(35)}
              height={w(35)}
              innerRadius={w(15)}
              style={{
                labels: {
                  fill: COLOR.WHITE,
                  fontSize: w(3.5),
                  padding: w(2),
                },
              }}
            />
            <Text
              style={{
                position: 'absolute',
                color: COLOR.BLACK,
                top: w(14),
                fontSize: w(5),
              }}>
              %
            </Text>
          </View>
          {/* CHART */}
          {/* DESC */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: w(2),
              justifyContent: 'space-between',
            }}>
            {/* TRUE */}
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: w(6),
                  width: w(6),
                  borderRadius: w(1),
                  backgroundColor: graphicColor[0],
                }}
              />
              <Text
                style={{marginLeft: w(1), color: COLOR.BLACK, fontSize: w(3)}}>
                Benar
              </Text>
            </View>
            {/* TRUE */}
            {/* FALSE */}
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: w(6),
                  width: w(6),
                  borderRadius: w(1),
                  backgroundColor: graphicColor[1],
                }}
              />
              <Text
                style={{marginLeft: w(1), color: COLOR.BLACK, fontSize: w(3)}}>
                Salah
              </Text>
            </View>
            {/* FALSE */}
            {/* EMPTY */}
            <View
              style={{
                alignItems: 'center',
                flexDirection: 'row',
              }}>
              <View
                style={{
                  height: w(6),
                  width: w(6),
                  borderRadius: w(1),
                  backgroundColor: graphicColor[2],
                }}
              />
              <Text
                style={{marginLeft: w(1), color: COLOR.BLACK, fontSize: w(3)}}>
                Tidak Terisi
              </Text>
            </View>
            {/* EMPTY */}
          </View>
          {/* DESC */}
        </View>
        {/* BODY */}
      </View>
      {/* PRESENTAGE */}
      {/* STATUS */}
      <View style={{paddingHorizontal: w(6), marginTop: w(4)}}>
        {/* TITLE */}
        <Text style={{fontSize: w(3.5)}}>Status</Text>
        {/* TITLE */}
        {/* BODY */}
        <View
          style={{
            backgroundColor: '#F4F4F4',
            marginTop: w(2),
            borderRadius: w(2),
            paddingHorizontal: w(6),
            paddingVertical: w(4),
          }}>
          <Image
            source={require('./../../assets/passed.png')}
            style={{
              width: w(50),
              height: w(23),
              alignSelf: 'center',
            }}
          />
        </View>
        {/* BODY */}
      </View>
      {/* STATUS */}
    </ScrollView>
  );

  const SecondRoute = () => (
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
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: w(3.5)}}>Soal & pembahasan</Text>
            <Text
              style={{
                fontSize: w(3.5),
                backgroundColor: '#F4C72A',
                padding: w(1),
                borderRadius: w(3),
                color: COLOR.WHITE,
                marginLeft: w(2),
              }}>
              TWK
            </Text>
          </View>
          <TouchableOpacity
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
          </TouchableOpacity>
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
              {datas.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={{
                      width: w(10),
                      height: w(8),
                      backgroundColor: COLOR.WHITE,
                      marginTop: w(2),
                      marginLeft: w(4),
                    }}>
                    <Text>{index + 1}</Text>
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
          <View style={{flexDirection: 'row'}}>
            <Text style={{fontSize: w(3.5)}}>Soal</Text>
            <Text
              style={{
                fontSize: w(3.5),
                backgroundColor: COLOR.PRIMARY,
                padding: w(1),
                borderRadius: w(3),
                color: COLOR.WHITE,
                marginLeft: w(2),
              }}>
              No 1
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
          <Text style={{fontSize: w(3.5), color: COLOR.BLACK}}>
            Pancasila bukanlah ideologi yang memaksa kebebasan dan tanggung
            jawab masyarakat, melainkan pancasila justru menghargai kebebasan
            dan tanggung jawab masyarakat. Pernyataan tersebut mencerminkan
            bahwa pancasila sebagai ...
          </Text>
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
              Jawaban Benar: D
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
          <Text style={{fontSize: w(3.5)}}>Pembahasan</Text>
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
            Karena itu jawaban yang benar
          </Text>
        </View>
        {/* BODY */}
      </View>
      {/* DISCUSSION */}
      {/* BUTTON NEXT & PREV */}
      <View style={{paddingHorizontal: w(6), marginTop: w(6)}}>
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
    </ScrollView>
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
    </View>
  );
}
