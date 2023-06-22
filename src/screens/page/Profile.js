import React, {useContext, useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import {ScrollView, Image, RefreshControl, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {ContextType as ContextUser} from './../../context/ContextUser';
import Header from '../../components/general/Header';
import {COLOR} from '../../styles';
import moment from 'moment';
import Clipboard from '@react-native-clipboard/clipboard';
import {API_BASE_URL, BASE_URL, DEFAULT_PROFILE_PICTURE} from '../../../env';
import Axios from 'axios';
import {idrFormat} from '../../helpers';
import NotFound from '../../components/general/NotFound';

const ProfileInfo = ({title, value, accountName}) => {
  return (
    <View style={{marginTop: w(2.5)}}>
      <Text style={{fontSize: w(4), color: COLOR.BLACK}}>{title}</Text>
      <Text style={{fontSize: w(3.5), fontWeight: 'bold', color: COLOR.GRAY}}>
        {value}
      </Text>
      {accountName ? (
        <Text style={{fontSize: w(3.5), fontWeight: 'bold', color: COLOR.GRAY}}>
          {accountName}
        </Text>
      ) : null}
    </View>
  );
};

const ProfileComponent = ({
  userName,
  userPhone,
  name,
  email,
  // gender,
  dateBirth,
  province,
  accountNumber,
  accoutBank,
  accountName,
}) => {
  return (
    <View style={{padding: w(4)}}>
      <ProfileInfo title={'Nama Lengkap'} value={name || '-'} />
      <ProfileInfo title={'Username'} value={userName || '-'} />
      <ProfileInfo title={'No. WhatsApp'} value={userPhone || '-'} />
      <ProfileInfo title={'Email'} value={email || '-'} />
      {/* <ProfileInfo title={'Jenis Kelamin'} value={gender || '-'} /> */}
      <ProfileInfo
        title={'Tanggal Lahir'}
        value={dateBirth ? moment(dateBirth).format('LL') : '-'}
      />
      <ProfileInfo title={'Provinsi'} value={province || '-'} />
      <ProfileInfo
        title={'Rekening'}
        value={
          accountNumber && accoutBank ? accoutBank + ' - ' + accountNumber : '-'
        }
        accountName={accountName}
      />
    </View>
  );
};

const HistoryComponent = ({dataHistory}) => {
  const navigation = useNavigation();
  const isExpired = dateExpired => {
    const dateNow = new Date(moment().format()).getTime();
    const dateExp = new Date(moment(dateExpired).format()).getTime();
    return dateExp < dateNow;
  };

  const uniqueId = dates => {
    var date = new Date(dates);
    var components = [
      date.getYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds(),
    ];

    var id = components.join('');

    return id;
  };

  return (
    <View style={{padding: w(4)}}>
      {/* DISCLAIMER */}
      {/* <Text style={{fontSize: w(3)}}>
        Pembayaran diverifikasi otomatis oleh sistem. Apabila dalam 30 menit
        setelah pembayaran belum terkonfirmasi, Silakan hubungi kami melalui
        WhatsApp 08xx xxx xxxx dengan mengirimkan bukti transaksi.
      </Text> */}
      {/* DISCLAIMER */}
      {/* PAYMENT INFO */}
      {dataHistory.length === 0 && <NotFound text={'Belum ada transaksi'} />}
      {dataHistory.map((item, index) => {
        return (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('PaymentInvoice', {id: item.id});
            }}
            key={index}
            style={{
              // height: w(40),
              width: w(88),
              alignSelf: 'center',
              borderWidth: w(0.2),
              marginTop: w(3),
              borderRadius: w(2),
              borderColor: '#FFCE31',
              padding: w(2),
            }}>
            {/* 1 */}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              {/* TRANSACTION NUMBER */}
              <Text style={{fontSize: w(2.5), color: COLOR.BLACK}}>
                No. Transaksi: {uniqueId(item.created_at)}
              </Text>
              {/* TRANSACTION NUMBER */}
              {/* PAYMENT STATUS */}
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={{fontSize: w(3), color: COLOR.BLACK}}>
                  Status Pembayaran
                </Text>
                <Text
                  style={{
                    fontSize: w(3),
                    overflow: 'hidden',
                    backgroundColor: item.status
                      ? '#B7FAC2'
                      : !item.status && !isExpired(item.batas)
                      ? '#F9F0D3'
                      : '#FCCDBE',
                    padding: w(1),
                    borderRadius: w(2),
                    color: item.status
                      ? '#026700'
                      : !item.status && !isExpired(item.batas)
                      ? '#FFC200'
                      : '#D13300',
                    marginLeft: w(1),
                  }}>
                  {item.status
                    ? 'Selesai'
                    : !item.status && !isExpired(item.batas)
                    ? 'Menunggu'
                    : 'Batal'}
                </Text>
              </View>
              {/* PAYMENT STATUS */}
            </View>
            {/* 1 */}
            {/* 2 */}
            {/* TRANSACTION DATE */}
            <Text style={{fontSize: w(2.5), color: COLOR.BLACK}}>
              {moment(item.created_at).format('LLLL')}
            </Text>
            {/* TRANSACTION DATE */}
            {/* 2 */}
            {/* 3 */}
            <View
              style={{
                // height: w(25),
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              {/* LEFT  */}
              <View style={{width: w(50)}}>
                {/* PACKAGE NAME */}
                <Text
                  style={{
                    fontSize: w(2.5),
                    fontWeight: 'bold',
                    marginTop: w(2),
                    color: COLOR.BLACK,
                  }}>
                  Pembelian: {item.paket.nama}
                </Text>
                {/* PACKAGE NAME */}
                {/* PAYMENT TYPE IMAGE */}
                <Image
                  style={{
                    height: w(10),
                    width: undefined,
                    resizeMode: 'contain',
                    aspectRatio: 2,
                  }}
                  source={{
                    uri: `${BASE_URL}/gambar/metode/${item?.metode?.gambar}`,
                  }}
                />
                {/* PAYMENT TYPE IMAGE */}
                {/* NOTES */}
                {/* <Text style={{fontSize: w(2), color: COLOR.RED}}>
                  * Pembayaran harus dilakukan melalui bank yang sama
                </Text> */}
                {/* NOTES */}
              </View>
              {/* LEFT  */}
              {/* RIGHT */}
              <View
                style={{
                  width: w(32),
                  justifyContent: 'space-between',
                }}>
                {/* PAYMENT TOTAL */}
                <View>
                  <Text
                    style={{
                      fontSize: w(2.5),
                      fontWeight: 'bold',
                      color: COLOR.BLACK,
                    }}>
                    Total Pembayaran:
                  </Text>
                  <Text
                    style={{
                      fontSize: w(3.5),
                      fontWeight: 'bold',
                      color: COLOR.SECONDARY,
                    }}>
                    {idrFormat(item.total)}
                  </Text>
                </View>
                {/* PAYMENT TOTAL */}
                {/* PAYMENT CODE */}
                <View>
                  <Text
                    style={{
                      fontSize: w(2.5),
                      fontWeight: 'bold',
                      color: COLOR.BLACK,
                    }}>
                    {item?.metode?.jenis}
                  </Text>
                  <Text
                    style={{
                      fontSize: w(3.5),
                      fontWeight: 'bold',
                      color: COLOR.SECONDARY,
                    }}>
                    {item?.metode?.nomor}
                  </Text>
                </View>
                {/* PAYMENT CODE */}
              </View>
              {/* RIGHT */}
            </View>
            {/* 3 */}
          </TouchableOpacity>
        );
      })}

      {/* PAYMENT INFO */}
    </View>
  );
};

const WithdrawComponent = ({
  accountNumber,
  accoutBank,
  accountName,
  balance,
  userToken,
}) => {
  const [amount, setAmount] = useState(null);

  const sendWithdraw = async () => {
    if (!accountNumber || !accoutBank || !accountName)
      Alert.alert('Informasi Rekening belum lengkap');
    else {
      if (amount) {
        let result;
        const data = {
          jumlah: amount,
        };
        await Axios.post(`${API_BASE_URL}/withdraw`, data, {
          headers: {
            Authorization: 'Bearer ' + userToken,
          },
        })
          .then(async res => {
            if (res?.data?.status) {
              setAmount(null);
            }
            console.log(res.data);
            Alert.alert(res?.data?.message);
            result = res?.data?.status;
          })
          .catch(err => {
            if (err.response === undefined) Alert.alert('Network Error!');
            else if (!err?.response?.data?.status)
              Alert.alert(err?.response?.data?.message);
            else Alert.alert('Terjadi Kesalahan!');
            result = false;
          });
        return result;
      } else Alert.alert('Harap lengkapi jumlah saldo');
    }
  };

  return (
    <View style={{padding: w(4)}}>
      <Text style={{fontSize: w(3.5)}}>Saldo: {idrFormat(balance)}</Text>
      <Text style={{fontSize: w(3.5)}}>Biaya Admin: {idrFormat(10000)}</Text>
      <View
        style={{
          marginTop: w(2),
          flexDirection: 'row',
          padding: w(4),
          borderRadius: w(2),
          borderWidth: w(0.2),
          borderColor: '#F1F1F1',
          justifyContent: 'space-between',
        }}>
        {/* AMOUNT */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{fontSize: w(3), fontWeight: 'bold', color: COLOR.BLACK}}>
            Withdraw
          </Text>
          <TextInput
            onChangeText={text => {
              // if (parseInt(text) + 10000 > parseInt(balance)) {
              //   Alert.alert('Saldo tidak mencukupi');
              //   setAmount(0);
              // } else
              setAmount(text);
            }}
            value={amount ? amount.toString() : ''}
            autoCapitalize="none"
            placeholder="Jumlah"
            placeholderTextColor={COLOR.GRAY}
            keyboardType="numeric"
            style={{
              paddingHorizontal: w(4),
              height: w(10),
              borderRadius: w(2),
              fontSize: w(3.5),
              borderWidth: w(0.4),
              borderColor: COLOR.SECONDARY,
              marginTop: w(1),
              width: w(30),
              color: COLOR.BLACK,
            }}
          />
        </View>
        {/* AMOUNT */}
        {/* ACCOUNT NUMBER */}
        <View
          style={{
            justifyContent: 'center',
          }}>
          <Text
            style={{fontSize: w(3), fontWeight: 'bold', color: COLOR.BLACK}}>
            Transfer Ke
          </Text>
          <View
            style={{
              paddingHorizontal: w(1),
              height: w(10),
              borderRadius: w(2),
              fontSize: w(3.5),
              backgroundColor: '#EAEAEA',
              marginTop: w(1),
              width: w(50),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: w(3.5), color: COLOR.GRAY}}>
              {accountNumber && accoutBank
                ? accoutBank + ' - ' + accountNumber
                : 'Belum diatur'}
            </Text>
          </View>
        </View>
        {/* ACCOUNT NUMBER */}
      </View>
      {/* SEND BUTTON */}
      <TouchableOpacity
        onPress={() => sendWithdraw()}
        style={{
          height: w(10),
          backgroundColor: COLOR.SECONDARY,
          marginTop: w(4),
          width: w(60),
          alignSelf: 'center',
          borderRadius: w(2),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontSize: w(3.5),
            fontWeight: 'bold',
            color: COLOR.WHITE,
          }}>
          Kirim Permintaan
        </Text>
      </TouchableOpacity>
      {/* SEND BUTTON */}
    </View>
  );
};

export default function Profile({navigation}) {
  const userContext = useContext(ContextUser);
  const {dataProfile, userToken, getUserToken} = userContext;

  const handleLogout = async () => {
    Alert.alert('PortalASN', 'Yakin ingin keluar?', [
      {
        text: 'Batal',
        style: 'cancel',
      },
      {
        text: 'Keluar',
        onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Login'}],
            }),
          );
        },
      },
    ]);
  };

  const [activeMenu, setActiveMenu] = useState(1);
  const [profileMenu, setProfileMenu] = useState(
    dataProfile?.username === 'fortesting'
      ? [
          {
            id: 1,
            name: 'Lengkapi Profil',
            isActive: true,
          },
        ]
      : [
          {
            id: 1,
            name: 'Lengkapi Profil',
            isActive: true,
          },
          {
            id: 2,
            name: 'Riwayat Paket',
            isActive: false,
          },
          {
            id: 3,
            name: 'Withdraw',
            isActive: false,
          },
        ],
  );

  const updateMenu = id => {
    if (activeMenu !== id) {
      setActiveMenu(id);
      // loop over the todos list and find the provided id.
      let updatedList = profileMenu.map(item => {
        if (item.id === id || item.isActive) {
          return {...item, isActive: !item.isActive}; //gets everything that was already in item, and updates "done"
        }
        return item; // else return unmodified item
      });
      setProfileMenu(updatedList); // set state to new object with updated list
    }
  };

  const [dataHistory, setDataHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const getDataHistory = async () => {
    setLoading(true);
    let result;
    await Axios.get(`${API_BASE_URL}/daftar-invoice`, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then(res => {
        setLoading(false);
        if (res.data.status) setDataHistory(res.data.data);
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
    getDataHistory();
  }, []);

  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={{flex: 1}}>
      {/* HEADER */}
      <Header title={'Profil'} />
      {/* HEADER */}
      {/* BODY */}
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={async () => {
              setRefreshing(true);
              getUserToken();
              const data = await getDataHistory();
              if (!data) Alert.alert('Gagal Memuat!');
              setRefreshing(false);
            }}
          />
        }>
        <View>
          {/* HEADER 2 */}
          <View
            style={{
              backgroundColor: '#F1F1F1',
              height: w(28),
              paddingVertical: w(3),
              paddingHorizontal: w(4),
              justifyContent: 'space-evenly',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                style={{height: w(15), width: w(15)}}
                source={DEFAULT_PROFILE_PICTURE}
              />
              <View style={{marginLeft: w(2)}}>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}
                  onPress={() => {
                    Clipboard.setString(dataProfile.referal);
                    Alert.alert('Berhasil disalin');
                  }}>
                  <Text style={{color: '#8E8888', fontSize: w(3.5)}}>
                    Kode Referal: {dataProfile.referal}
                  </Text>
                  <Image
                    source={require('./../../assets/clipboard2.png')}
                    style={{
                      height: w(3.5),
                      width: undefined,
                      resizeMode: 'contain',
                      aspectRatio: 1,
                      marginLeft: w(0.5),
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  {/* <TouchableOpacity
                    style={{flexDirection: 'row', alignItems: 'center'}}
                    onPress={() => {
                      Clipboard.setString(
                        'portalasn.com/' + dataProfile.referal,
                      );
                      Alert.alert('Berhasil disalin');
                    }}>
                    <Text style={{color: '#8E8888', fontSize: w(3)}}>
                      Link Referal: portalasn.com/{dataProfile.referal}
                    </Text>
                    <Image
                      source={require('./../../assets/clipboard2.png')}
                      style={{
                        height: w(3.5),
                        width: undefined,
                        resizeMode: 'contain',
                        aspectRatio: 1,
                        marginLeft: w(0.5),
                      }}
                    />
                  </TouchableOpacity> */}
                </View>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleLogout()}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                position: 'absolute',
                right: w(3),
                bottom: w(3),
              }}>
              <Text
                style={{
                  color: '#D13300',
                  fontSize: w(3.5),
                  fontWeight: 'bold',
                }}>
                Keluar
              </Text>
              <Image
                style={{
                  height: w(3.5),
                  width: undefined,
                  resizeMode: 'contain',
                  aspectRatio: 2,
                }}
                source={require('./../../assets/logout.png')}
              />
            </TouchableOpacity>
          </View>
          {/* HEADER 2 */}
          {/* TAB OPTIONS */}
          <View
            style={{
              height: w(16),
              backgroundColor: COLOR.WHITE,
              elevation: 5,
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
            }}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{paddingLeft: w(3)}}>
              {profileMenu.map((item, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      updateMenu(item.id);
                    }}
                    key={index}
                    style={{
                      backgroundColor: item.isActive ? COLOR.WHITE : '#D9D9D9',
                      paddingHorizontal: w(4),
                      paddingVertical: w(2),
                      alignSelf: 'center',
                      marginRight: w(4),
                      borderRadius: w(2),
                      borderWidth: item.isActive ? w(0.4) : 0,
                      borderColor: COLOR.SECONDARY,
                    }}>
                    <Text
                      style={{
                        fontSize: w(3.5),
                        color: item.isActive ? COLOR.SECONDARY : '#797979',
                        fontWeight: 'bold',
                      }}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              <View style={{marginRight: w(3)}} />
            </ScrollView>
          </View>
          {/* TAB OPTIONS */}
          {/* PROFILE COMPONENT */}
          {activeMenu === 1 && (
            <ProfileComponent
              userName={dataProfile.username}
              userPhone={dataProfile.no_hp}
              name={dataProfile.pribadi.nama}
              email={dataProfile.pribadi.email}
              // gender={dataProfile.pribadi.}
              dateBirth={dataProfile.pribadi.tanggal_lahir}
              province={dataProfile.provinsi}
              accountNumber={dataProfile.pribadi.nomor_rekening}
              accoutBank={dataProfile.pribadi.jenis_bank}
              accountName={dataProfile.pribadi.nama_rekening}
            />
          )}
          {/* PROFILE COMPONENT */}
          {/* PACKAGE HISTORY */}
          {activeMenu === 2 && <HistoryComponent dataHistory={dataHistory} />}
          {/* PACKAGE HISTORY */}
          {/* WITHDRAW */}
          {activeMenu === 3 && (
            <WithdrawComponent
              accountNumber={dataProfile.pribadi.nomor_rekening}
              accoutBank={dataProfile.pribadi.jenis_bank}
              accountName={dataProfile.pribadi.nama_rekening}
              balance={dataProfile.saldo}
              userToken={userToken}
            />
          )}
          {/* WITHDRAW */}
        </View>
      </ScrollView>
      {/* UPDATE PROFILE */}
      {activeMenu === 1 && (
        <View
          style={{
            backgroundColor: COLOR.WHITE,
            elevation: 5,
            padding: w(4),
          }}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfileUpdate')}
            style={{
              height: w(10),
              backgroundColor: COLOR.SECONDARY,
              borderRadius: w(2),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: w(3.5),
                fontWeight: 'bold',
                color: COLOR.WHITE,
              }}>
              Ubah Profil
            </Text>
          </TouchableOpacity>
        </View>
      )}
      {/* UPDATE PROFILE */}
    </View>
  );
}
