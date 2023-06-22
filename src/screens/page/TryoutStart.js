import React, {useContext, useEffect, useState} from 'react';
import {View, Text, Image, Alert, Modal} from 'react-native';
import {TouchableOpacity, ActivityIndicator, BackHandler} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CountDown from 'react-native-countdown-component';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';
import {COLOR, COLOR_GRAY} from '../../styles';
import {ContextType as ContextPackage} from './../../context/ContextPackage';
import {BASE_URL} from '../../../env';
import ImageView from 'react-native-image-viewing';
import Header from './../../components/general/Header';
import NotFound from './../../components/general/NotFound';

export default function TryoutStart({route, navigation}) {
  // useEffect(() => {
  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     () => true,
  //   );
  //   return () => backHandler.remove();
  // }, []);

  const [loadingGetQuestion, setLoadingGetQuestion] = useState(false);

  const {answerId, time, tryoutId} = route.params;

  const [question, setQuestion] = useState([]);
  const [activeNumber, setActiveNumber] = useState(0);
  const [tryoutTime, setTryoutTime] = useState(0);
  const [modalNumber, setModalNumber] = useState(false);
  const packageContext = useContext(ContextPackage);
  const {
    getDataTryoutQuestion,
    chooseAnswer,
    submitAnswer,
    getDataDetailTryout,
  } = packageContext;

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    setLoadingGetQuestion(true);
    const data = await getDataTryoutQuestion({answer_id: answerId});
    setQuestion(data?.data?.soal);
    setTryoutTime(data?.data?.waktu);
    setLoadingGetQuestion(false);
  };

  const handleChoose = async (answerId, soalId, opsi) => {
    const data = await chooseAnswer({
      answer_id: answerId,
      soal_id: soalId,
      opsi: opsi,
    });
    console.log(data);
  };

  const handleSubmit = async answerId => {
    const data = await submitAnswer({
      answer_id: answerId,
    });
    if (data) {
      Alert.alert('Tryout selesai');
      await getDataDetailTryout({tryout_id: tryoutId});
      navigation.replace('TryoutAnalysis', {
        answerId,
      });
    } else Alert.alert('Terjadi kesalahan!');
  };

  const [answerActive, setAnswerActive] = useState([]);
  const updateAnswerActive = (index, newValue) => {
    // shallow copy
    const newArray = [...answerActive];
    // mutate copy
    newArray[index] = newValue;
    // set state
    setAnswerActive(newArray);
  };

  // console.log('QUES', question);

  const AnswerComponent = ({text, number, id, isAnswer, image}) => {
    return (
      <TouchableOpacity
        onPress={async () => {
          //Initailize array of objects.
          let newArray = question;
          //Update object's name property.
          newArray[activeNumber].is_answer = number;
          setQuestion(newArray);
          await handleChoose(answerId, id, number);
          updateAnswerActive(activeNumber, number);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: w(2),
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
      </TouchableOpacity>
    );
  };

  const [visibleImage, setVisibleImage] = useState(false);
  const [imageView, setImageView] = useState([
    {
      uri: 'https://sdaisyiyah.sch.id/assets/post/default.png',
    },
  ]);

  // console.log('question', question);
  if (question?.length === 0 || !question)
    return (
      <View>
        {loadingGetQuestion ? (
          <View style={{marginTop: h(40), alignItems: 'center'}}>
            <ActivityIndicator size="large" color={COLOR.PRIMARY} />
            <Text style={{marginTop: w(4), fontSize: w(5), color: COLOR.BLACK}}>
              Memuat Soal
            </Text>
          </View>
        ) : (
          <View>
            <Header title={'Mulai Tryout'} />
            <NotFound text={'Soal tidak ditemukan'} />
          </View>
        )}
      </View>
    );
  return (
    <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
      <ImageView
        images={imageView}
        imageIndex={0}
        visible={visibleImage}
        onRequestClose={() => setVisibleImage(false)}
      />
      {loadingGetQuestion ? (
        <View style={{marginTop: h(40), alignItems: 'center'}}>
          <ActivityIndicator size="large" color={COLOR.PRIMARY} />
          <Text style={{marginTop: w(4), fontSize: w(5), color: COLOR.BLACK}}>
            Memuat Soal
          </Text>
        </View>
      ) : (
        <>
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
              // onChange={timeLeft => console.log(timeLeft)}
              style={{
                position: 'absolute',
                alignSelf: 'center',
                marginTop: w(5),
              }}
              until={time}
              onFinish={() => {
                handleSubmit(answerId);
              }}
              // onPress={() => alert('hello')}
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
              onPress={async () => {
                // console.log(tryoutId);
                // await getDataDetailTryout({tryout_id: tryoutId});
                navigation.goBack();
              }}
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
                <Text style={{fontSize: w(3.5), color: COLOR.BLACK}}>
                  Kategori
                </Text>
                <Text
                  style={{
                    fontSize: w(3.5),
                    backgroundColor: '#0D5679',
                    padding: w(1),
                    borderRadius: w(3),
                    color: COLOR.WHITE,
                    marginLeft: w(2),
                    overflow: 'hidden',
                  }}>
                  {question[activeNumber]?.kategori}
                </Text>
              </View>
              {/* CATEGORY */}
              {/* NUMBER */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: w(3.5), color: COLOR.BLACK}}>
                  Nomor
                </Text>
                <Text
                  style={{
                    fontSize: w(3.5),
                    backgroundColor: '#0D5679',
                    padding: w(1),
                    borderRadius: w(2),
                    color: COLOR.WHITE,
                    marginLeft: w(2),
                    overflow: 'hidden',
                  }}>
                  {activeNumber + 1}
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
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <Text style={{fontSize: w(3), color: COLOR.BLACK}}>
                  Jawablah pertanyaan secara teliti
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Text style={{fontSize: w(3), color: COLOR.BLACK}}>
                    {question.length} Soal
                  </Text>
                  <TouchableOpacity onPress={() => setModalNumber(true)}>
                    <Image
                      source={require('./../../assets/list.png')}
                      style={{height: w(5), width: w(5), marginLeft: w(2)}}
                    />
                  </TouchableOpacity>
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
                {question[activeNumber]?.soal_text ? (
                  <Text style={{fontSize: w(3.5), color: COLOR.BLACK}}>
                    {question[activeNumber]?.soal_text}
                  </Text>
                ) : null}
                {question[activeNumber]?.soal_gambar ? (
                  <View style={{alignItems: 'center'}}>
                    <TouchableOpacity
                      onPress={() => {
                        setImageView([
                          {
                            uri: `${BASE_URL}/file-soal/${question[activeNumber]?.soal_gambar}`,
                          },
                        ]);
                        setVisibleImage(true);
                      }}>
                      <Image
                        source={{
                          uri: `${BASE_URL}/file-soal/${question[activeNumber]?.soal_gambar}`,
                        }}
                        style={{
                          // height: undefined,
                          width: w(80),
                          resizeMode: 'contain',
                          aspectRatio: 2,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}
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
                <AnswerComponent
                  number={'A'}
                  isNumber1={true}
                  text={question[activeNumber]?.pilihan_a}
                  image={question[activeNumber]?.pilihan_a_gambar}
                  id={question[activeNumber]?.id}
                  isAnswer={question[activeNumber]?.is_answer}
                />
                <View style={{marginTop: w(3)}} />
                <AnswerComponent
                  number={'B'}
                  isNumber1={true}
                  text={question[activeNumber]?.pilihan_b}
                  image={question[activeNumber]?.pilihan_b_gambar}
                  id={question[activeNumber]?.id}
                  isAnswer={question[activeNumber]?.is_answer}
                />
                <View style={{marginTop: w(3)}} />
                <AnswerComponent
                  number={'C'}
                  isNumber1={true}
                  text={question[activeNumber]?.pilihan_c}
                  image={question[activeNumber]?.pilihan_c_gambar}
                  id={question[activeNumber]?.id}
                  isAnswer={question[activeNumber]?.is_answer}
                />
                <View style={{marginTop: w(3)}} />
                <AnswerComponent
                  number={'D'}
                  isNumber1={true}
                  text={question[activeNumber]?.pilihan_d}
                  image={question[activeNumber]?.pilihan_d_gambar}
                  id={question[activeNumber]?.id}
                  isAnswer={question[activeNumber]?.is_answer}
                />
                {question[activeNumber]?.pilihan_e ||
                question[activeNumber]?.pilihan_e_gambar ? (
                  <>
                    <View style={{marginTop: w(3)}} />
                    <AnswerComponent
                      number={'E'}
                      isNumber1={true}
                      text={question[activeNumber]?.pilihan_e}
                      image={question[activeNumber]?.pilihan_e_gambar}
                      id={question[activeNumber]?.id}
                      isAnswer={question[activeNumber]?.is_answer}
                    />
                  </>
                ) : null}
              </View>
              {/* ANSWER */}
            </View>
          </ScrollView>
          {/* BODY */}
          {/* FOOTER */}
          {/* BUTTON NEXT & PREV */}
          <View
            style={{
              paddingHorizontal: w(6),
              paddingVertical: w(4),
              elevation: 5,
              backgroundColor: COLOR.WHITE,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
                onPress={() => {
                  if (activeNumber + 1 === question.length) {
                    Alert.alert('Submit Tryout', 'Apakah anda yakin?', [
                      {
                        text: 'Batal',
                        style: 'cancel',
                      },
                      {
                        text: 'Kirim',
                        onPress: async () => {
                          handleSubmit(answerId);
                        },
                      },
                    ]);
                  } else setActiveNumber(activeNumber + 1);
                }}
                style={{
                  backgroundColor: COLOR.PRIMARY,
                  height: w(10),
                  width: w(42),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: w(1),
                }}>
                <Text style={{fontSize: w(3.5), color: COLOR.WHITE}}>
                  {activeNumber + 1 === question.length ? 'Submit' : 'Next'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* BUTTON NEXT & PREV */}
          {/* FOOTER */}
        </>
      )}
      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}
        visible={modalNumber}>
        {/* CONTAINER  */}
        <TouchableWithoutFeedback onPress={() => setModalNumber(false)}>
          <View
            style={{
              backgroundColor: 'rgba(125,125,125,0.5)',
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* CONTENT */}
            <View
              onStartShouldSetResponder={() => true}
              style={{
                backgroundColor: COLOR.WHITE,
                paddingHorizontal: w(6),
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
                borderRadius: w(2),
                width: '90%',
                height: w(70),
              }}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginTop: w(2),
                    marginBottom: w(4),
                    justifyContent: 'center',
                  }}>
                  {question?.map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        onPress={() => {
                          setActiveNumber(index);
                          setModalNumber(false);
                        }}
                        style={{
                          height: w(8.5),
                          width: w(8.5),
                          borderWidth: w(0.3),
                          borderColor: COLOR.SECONDARY,
                          borderRadius: w(2),
                          marginTop: w(2),
                          marginRight: (index + 1) % 7 === 0 ? 0 : w(2),
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor:
                            index === activeNumber
                              ? COLOR.SECONDARY
                              : item.is_answer
                              ? COLOR.PRIMARY
                              : COLOR.WHITE,
                        }}>
                        <Text
                          style={{
                            fontSize: w(3.5),
                            fontWeight: 'bold',
                            color:
                              index === activeNumber || item.is_answer
                                ? COLOR.WHITE
                                : COLOR.SECONDARY,
                          }}>
                          {index + 1}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </ScrollView>
            </View>
            {/* CONTENT */}
          </View>
        </TouchableWithoutFeedback>
        {/* CONTAINER  */}
      </Modal>
    </View>
  );
}
