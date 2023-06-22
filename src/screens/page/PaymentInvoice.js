import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {Image} from 'react-native';
import Header from '../../components/general/Header';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {COLOR, COLOR_GRAY} from '../../styles';
import Axios from 'axios';
import Clipboard from '@react-native-clipboard/clipboard';
import {ContextType as ContextUser} from './../../context/ContextUser';
import NotFound from '../../components/general/NotFound';
import {API_BASE_URL, BASE_URL} from '../../../env';
import moment from 'moment';
import {idrFormat} from '../../helpers';

export default function PaymentInvoice({route, navigation}) {
  const {id} = route.params;
  const userContext = useContext(ContextUser);
  const {userToken} = userContext;

  const [invoiceDetail, setInvoiceDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDetailInvoice = async () => {
    setLoading(true);
    let result;
    await Axios.get(`${API_BASE_URL}/daftar-invoice/${id}`, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then(res => {
        setLoading(false);
        if (res.data.status) setInvoiceDetail(res.data.data);
        result = true;
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        result = false;
      });
    return result;
  };

  useEffect(() => {
    getDetailInvoice();
  }, []);

  const isExpired = dateExpired => {
    const dateNow = new Date(moment().format()).getTime();
    const dateExp = new Date(moment(dateExpired).format()).getTime();
    return dateExp < dateNow;
  };

  return (
    <View style={{flex: 1}}>
      {/* HEADER */}
      <Header title={'Invoice Pembayaran'} />
      {/* HEADER */}
      {/* BODY */}
      <ScrollView>
        {loading ? (
          <View
            style={{
              marginTop: w(50),
            }}>
            <ActivityIndicator size={'large'} color={COLOR.SECONDARY} />
          </View>
        ) : null}
        {invoiceDetail ? (
          <View
            style={{
              paddingHorizontal: w(6),
              paddingVertical: w(6),
            }}>
            {/* DETAIL */}
            <View
              style={{
                width: '100%',
                backgroundColor: COLOR.WHITE,
                elevation: 2,
                padding: w(4),
                borderRadius: w(2),
                shadowOffset: {
                  width: 0,
                  height: 3,
                },
                shadowOpacity: 0.29,
                shadowRadius: 4.65,
              }}>
              {/* PACKAGE DETAIL */}
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={{
                      fontSize: w(4),
                      color: COLOR_GRAY.NORMAL2,
                    }}>
                    {invoiceDetail.paket.nama}
                  </Text>
                  <Text
                    style={{
                      fontSize: w(4),
                      color: COLOR_GRAY.NORMAL2,
                    }}>
                    Kode Promo
                  </Text>
                  <Text
                    style={{
                      fontSize: w(4),
                      color: COLOR_GRAY.NORMAL2,
                    }}>
                    Kode Unik
                  </Text>
                </View>
                <View style={{width: w(30)}}>
                  <Text
                    style={{
                      fontSize: w(4),
                      fontWeight: 'bold',
                      color: COLOR_GRAY.NORMAL2,
                    }}>
                    {idrFormat(invoiceDetail.paket.harga)}
                  </Text>
                  <Text
                    style={{
                      fontSize: w(4),
                      fontWeight: 'bold',
                      color: COLOR_GRAY.NORMAL2,
                    }}>
                    {idrFormat(invoiceDetail.potongan)}
                  </Text>
                  <Text
                    style={{
                      fontSize: w(4),
                      fontWeight: 'bold',
                      color: COLOR_GRAY.NORMAL2,
                    }}>
                    {idrFormat(invoiceDetail.kode_unik)}
                  </Text>
                </View>
              </View>
              {/* PACKAGE DETAIL */}
              {/* PAYMENT TOTAL */}
              <Text
                style={{
                  fontSize: w(4),
                  fontWeight: 'bold',
                  marginTop: w(2),
                  color: COLOR_GRAY.NORMAL2,
                }}>
                Total Pembayaran
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(invoiceDetail.total.toString());
                  Alert.alert('Berhasil disalin');
                }}
                style={{
                  borderWidth: w(0.4),
                  borderColor: COLOR.SECONDARY,
                  backgroundColor: '#F4F4F4',
                  height: w(12),
                  borderRadius: w(2),
                  marginTop: w(2),
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: w(5),
                    fontWeight: 'bold',
                    color: COLOR.SECONDARY,
                  }}>
                  {idrFormat(invoiceDetail.total)}
                </Text>
                <Image
                  source={require('./../../assets/clipboard.png')}
                  style={{height: w(5), width: w(5), marginLeft: w(2)}}
                />
              </TouchableOpacity>
              {/* PAYMENT TOTAL */}
              {/* ACCOUNT PAYMENT */}
              <Text
                style={{
                  fontSize: w(4),
                  fontWeight: 'bold',
                  marginTop: w(2),
                  color: COLOR_GRAY.NORMAL2,
                }}>
                Transfer ke
              </Text>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(invoiceDetail?.metode?.nomor);
                  Alert.alert('Berhasil disalin');
                }}
                style={{
                  height: w(6),
                  backgroundColor: '#F4F4F4',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingHorizontal: w(4),
                  alignSelf: 'baseline',
                  borderRadius: w(1),
                  flexDirection: 'row',
                  marginTop: w(1),
                }}>
                <Text style={{color: COLOR.SECONDARY, fontSize: w(4)}}>
                  {invoiceDetail?.metode?.nomor}
                </Text>
                <Image
                  source={require('./../../assets/clipboard.png')}
                  style={{height: w(3.5), width: w(3.5), marginLeft: w(2)}}
                />
              </TouchableOpacity>
              <Text
                style={{fontSize: w(3.5), marginTop: w(1), color: COLOR.BLACK}}>
                Atas Nama: {invoiceDetail?.metode?.nama}
              </Text>
              {/* ACCOUNT PAYMENT */}
              {/* IMAGE  */}
              <Image
                style={{
                  position: 'absolute',
                  height: w(12),
                  width: undefined,
                  resizeMode: 'contain',
                  aspectRatio: 2,
                  bottom: w(2),
                  right: w(2),
                }}
                source={{
                  uri: `${BASE_URL}/gambar/metode/${invoiceDetail?.metode?.gambar}`,
                }}
              />
              {/* IMAGE  */}
            </View>
            {/* DETAIL */}
            {/* CONFIRMATION BUTTON */}
            {!invoiceDetail?.status && !isExpired(invoiceDetail?.batas) ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL('https://wa.me/+6281243714874');
                  }}
                  style={{
                    height: w(12),
                    width: '100%',
                    backgroundColor: COLOR.SECONDARY,
                    marginVertical: w(6),
                    borderRadius: w(2),
                    elevation: 2,
                    justifyContent: 'center',
                    alignItems: 'center',
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                  }}>
                  <Text
                    style={{
                      fontSize: w(4),
                      fontWeight: 'bold',
                      color: COLOR.WHITE,
                    }}>
                    Konfirmasi Pembayaran
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontSize: w(3),
                    color: COLOR.RED,
                    fontWeight: 'bold',
                    marginBottom: w(3),
                  }}>
                  * Silahkan Upload Bukti Pembayaran Anda & Admin Portal Akan
                  Menkonfirmasi 1 x 24 Jam
                </Text>
              </>
            ) : null}
            {/* CONFIRMATION BUTTON */}
          </View>
        ) : null}
        {!invoiceDetail && !loading ? (
          <NotFound text={'Invoice Tidak Ditemukan'} />
        ) : null}
      </ScrollView>
      {/* BODY */}
    </View>
  );
}
