import React, {useState, useContext, useEffect} from 'react';
import {
  Alert,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {TextInput, Image, Modal} from 'react-native';
import {ScrollView, Text, View} from 'react-native';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {API_BASE_URL, BASE_URL} from '../../../env';
import Header from '../../components/general/Header';
import {COLOR, COLOR_GRAY} from '../../styles';
import {ContextType as ContextPackage} from './../../context/ContextPackage';
import {ContextType as ContextUser} from './../../context/ContextUser';
import Axios from 'axios';
import {idrFormat} from '../../helpers';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function PackagePayment({route, navigation}) {
  const {dataPackage, packageName} = route.params;

  const [modalPayment, setModalPayment] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState(null);
  const paymentMethodChoice = [
    {
      name: 'Bank BNI',
      image: require('./../../assets/Payment/BNI.png'),
      paymentCode: '0788855552',
      type: 'bank',
    },
    {
      name: 'Bank Mandiri',
      image: require('./../../assets/Payment/Mandiri.png'),
      paymentCode: '1700018885552',
      type: 'bank',
    },
    {
      name: 'OVO',
      image: require('./../../assets/Payment/OVO.png'),
      paymentCode: '082220052007',
      type: 'wallet',
    },
    {
      name: 'DANA',
      image: require('./../../assets/Payment/DANA.png'),
      paymentCode: '082220052007',
      type: 'wallet',
    },
  ];

  const userContext = useContext(ContextUser);
  const {userToken} = userContext;

  const packageContext = useContext(ContextPackage);
  const {dataPaymentMethod, getDataPaymentMethod} = packageContext;

  const [afiliationCode, setAfiliationCode] = useState('');
  const [discount, setDiscount] = useState(null);

  useEffect(() => {
    getDataPaymentMethod();
  }, []);

  const afiliationCodeCheck = async () => {
    let result;
    await Axios.post(
      `${API_BASE_URL}/cek-referral`,
      {kode: afiliationCode},
      {
        headers: {
          Authorization: 'Bearer ' + userToken,
        },
      },
    )
      .then(res => {
        console.log(res.data.status);
        if (res.data.status) {
          setDiscount((10 / 100) * dataPackage?.harga);
          Alert.alert('Diskon Terpasang');
        } else {
          setDiscount(0);
          Alert.alert('Kode Afiliasi Tidak Ditemukan');
        }
        result = true;
      })
      .catch(err => {
        console.log(err);
        result = false;
      });
    return result;
  };
  //  Persentase (%) = (jumlah bagian) / (jumlah total) X 100%

  const buyPackage = async () => {
    const data = {
      referal: afiliationCode,
      metode_id: paymentMethod?.id,
      paket_id: dataPackage.id,
    };
    console.log(data);
    let result;
    await Axios.post(`${API_BASE_URL}/beli`, data, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then(res => {
        if (res?.data?.status)
          navigation.replace('PaymentInvoice', {id: res?.data?.data?.id});
        console.log(res?.data?.data?.id);
        result = true;
      })
      .catch(err => {
        console.log(err);
        result = false;
      });
    return result;
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      },
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      },
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <View style={{flex: 1}}>
      {/* HEADER */}
      <Header title={'Pembayaran'} />
      {/* HEADER */}
      {/* BODY */}
      <KeyboardAwareScrollView>
        <View style={{paddingHorizontal: w(6), paddingTop: w(6)}}>
          <Text style={{fontSize: w(4), color: COLOR_GRAY.NORMAL2}}>
            {packageName} ({dataPackage.nama})
          </Text>
          <Text style={{fontSize: w(3), color: COLOR_GRAY.NORMAL2}}>
            {dataPackage?.waktu} Bulan
          </Text>
          <Text
            style={{
              color: '#EF9021',
              fontSize: w(3.5),
              fontWeight: 'bold',
              marginTop: w(3),
            }}>
            Rincian Paket
          </Text>
          <View
            style={{
              height: w(0.5),
              backgroundColor: '#F5F5F5',
              marginTop: w(6),
            }}
          />
          {/* PAYMENT METHOD */}
          <View style={{marginTop: w(6)}}>
            <Text
              style={{
                color: COLOR_GRAY.NORMAL2,
                fontWeight: 'bold',
                fontSize: w(3.5),
              }}>
              Metode Pembayaran
            </Text>
            <TouchableOpacity
              onPress={() => setModalPayment(true)}
              style={{
                height: w(12),
                width: w(88),
                alignSelf: 'center',
                borderWidth: w(0.5),
                borderRadius: w(1),
                borderColor: '#EAEAEA',
                marginTop: w(3),
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: w(3),
                justifyContent: 'space-between',
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {paymentMethod ? (
                  <Image
                    style={{
                      height: w(8),
                      width: undefined,
                      resizeMode: 'contain',
                      aspectRatio: 2,
                    }}
                    source={{
                      uri: `${BASE_URL}/gambar/metode/${paymentMethod?.gambar}`,
                    }}
                  />
                ) : (
                  <Text
                    style={{
                      color: COLOR_GRAY.NORMAL2,
                      fontWeight: 'bold',
                      fontSize: w(3.5),
                    }}>
                    Pilih Metode Pembayaran
                  </Text>
                )}
              </View>
              <Image
                style={{
                  height: w(6),
                  width: w(6),
                }}
                source={require('./../../assets/Forward2.png')}
              />
            </TouchableOpacity>
          </View>
          {/* PAYMENT METHOD */}
          {/* REFFERAL*/}
          <View style={{marginTop: w(6)}}>
            <Text
              style={{fontSize: w(4), fontWeight: 'bold', color: '#797979'}}>
              Dapatkan potongan harga dengan memasukkan kode afiliasi
            </Text>
            {/* REFERAL INPUT */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <TextInput
                autoCapitalize="none"
                placeholder="Kode Afiliasi"
                placeholderTextColor={COLOR_GRAY.NORMAL2}
                onChangeText={text => setAfiliationCode(text)}
                style={{
                  backgroundColor: '#EAEAEA',
                  paddingHorizontal: w(4),
                  height: w(12),
                  width: w(60),
                  borderRadius: w(2),
                  fontSize: w(3.5),
                  marginTop: w(6),
                  alignSelf: 'center',
                  color: COLOR.BLACK,
                }}
              />
              <TouchableOpacity
                onPress={() => {
                  afiliationCodeCheck();
                }}
                style={{
                  backgroundColor: COLOR.SECONDARY,
                  paddingHorizontal: w(4),
                  height: w(12),
                  width: w(25),
                  borderRadius: w(2),
                  fontSize: w(3.5),
                  marginTop: w(6),
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text
                  style={{
                    fontSize: w(4),
                    color: COLOR.WHITE,
                    fontWeight: 'bold',
                  }}>
                  CEK
                </Text>
              </TouchableOpacity>
            </View>
            {/* REFERAL INPUT */}
          </View>
          {/* REFFERAL*/}
          {/* PACKAGE DETAIL */}
          <View style={{marginTop: w(6)}}>
            {/* NAME */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: w(3.5), color: '#797979'}}>Paket</Text>
              <Text style={{fontSize: w(3.5), color: '#797979'}}>
                {dataPackage?.nama}
              </Text>
            </View>
            {/* NAME */}
            {/* DURATION */}
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: w(3.5), color: '#797979'}}>Durasi</Text>
              <Text style={{fontSize: w(3.5), color: '#797979'}}>
                {dataPackage?.waktu} Bulan
              </Text>
            </View>
            {/* DURATION */}
            {/* DISCOUNT */}
            {/* <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: w(3.5), color: '#797979'}}>Potongan</Text>
              <Text style={{fontSize: w(3.5), color: '#797979'}}>
                Rp. 20.000
              </Text>
            </View> */}
            {/* DISCOUNT */}
            <View
              style={{
                height: w(0.5),
                backgroundColor: '#F5F5F5',
                marginTop: w(6),
              }}
            />
          </View>
          {/* PACKAGE DETAIL */}
          {/* PAYMENT DETAIL */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: w(3),
            }}>
            <Text style={{fontSize: w(4), color: '#797979'}}>
              Rincian Pembayaran
            </Text>
            <Text style={{color: '#F67329', fontSize: w(4)}}>
              {idrFormat(dataPackage?.harga)}
            </Text>
          </View>
          {discount ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: w(2),
              }}>
              <Text style={{fontSize: w(4), color: '#797979'}}>
                Potongan Harga (10%)
              </Text>
              <Text
                style={{
                  color: 'red',
                  fontSize: w(4),
                  textDecorationLine: 'line-through',
                }}>
                {idrFormat(discount)}
              </Text>
            </View>
          ) : null}
          {/* PAYMENT DETAIL */}
        </View>
      </KeyboardAwareScrollView>
      {/* PAY NOW BUTTON */}
      {!isKeyboardVisible ? (
        <View
          style={{
            height: w(15),
            backgroundColor: '#F2F2F2',
            elevation: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              width: w(60),
              justifyContent: 'center',
              alignItems: 'center',
              paddingRight: w(6),
            }}>
            <Text
              style={{
                color: '#424347',
                fontWeight: 'bold',
                fontSize: w(4),
              }}>
              Total Pembayaran
            </Text>
            <Text
              style={{color: '#F67329', fontWeight: 'bold', fontSize: w(4)}}>
              {idrFormat(dataPackage?.harga - discount)}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => buyPackage()}
            disabled={!paymentMethod}
            style={{
              height: w(15),
              width: w(40),
              backgroundColor: !paymentMethod
                ? COLOR_GRAY.NORMAL2
                : COLOR.SECONDARY,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                color: COLOR.WHITE,
                fontWeight: 'bold',
                fontSize: w(4.5),
              }}>
              Bayar Sekarang
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}
      {/* PAY NOW BUTTON */}
      {/* BODY */}
      {/* PACKAGE MODAL */}
      <Modal
        statusBarTranslucent={true}
        animationType="fade"
        transparent={true}
        visible={modalPayment}>
        {/* CONTAINER  */}
        <TouchableWithoutFeedback onPress={() => setModalPayment(false)}>
          <View
            style={{
              backgroundColor: 'rgba(125,125,125,0.5)',
              flex: 1,
              justifyContent: 'flex-end',
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
                borderTopRightRadius: w(10),
                borderTopLeftRadius: w(10),
                width: '100%',
              }}>
              <View
                style={{
                  paddingVertical: w(4),
                  alignItems: 'center',
                }}>
                <>
                  {dataPaymentMethod.map((item, index) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setPaymentMethod(item);
                          setModalPayment(false);
                        }}
                        key={index}
                        style={{
                          height: w(12),
                          width: w(80),
                          alignSelf: 'center',
                          borderWidth: w(0.5),
                          borderRadius: w(1),
                          borderColor: '#EAEAEA',
                          marginTop: w(3),
                          flexDirection: 'row',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          paddingHorizontal: w(3),
                        }}>
                        <View
                          style={{flexDirection: 'row', alignItems: 'center'}}>
                          <Text
                            style={{
                              color: COLOR_GRAY.NORMAL2,
                              fontWeight: 'bold',
                              fontSize: w(3.5),
                            }}>
                            {item.jenis}
                          </Text>
                          <Image
                            style={{
                              height: w(8),
                              width: undefined,
                              resizeMode: 'contain',
                              aspectRatio: 2,
                              marginLeft: w(3),
                            }}
                            source={{
                              uri: `${BASE_URL}/gambar/metode/${item.gambar}`,
                            }}
                          />
                        </View>
                        <Image
                          style={{
                            height: w(6),
                            width: w(6),
                          }}
                          source={require('./../../assets/Forward2.png')}
                        />
                      </TouchableOpacity>
                    );
                  })}
                </>
              </View>
            </View>
            {/* CONTENT */}
          </View>
        </TouchableWithoutFeedback>
        {/* CONTAINER  */}
      </Modal>
      {/* PACKAGE MODAL */}
    </View>
  );
}
