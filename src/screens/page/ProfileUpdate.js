import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import {Image, Alert} from 'react-native';
import Header from '../../components/general/Header';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {COLOR, COLOR_GRAY} from '../../styles';
import {ContextType as ContextPackage} from './../../context/ContextPackage';
import moment from 'moment';
import NotFound from '../../components/general/NotFound';
import {ContextType as ContextUser} from './../../context/ContextUser';
import Axios from 'axios';
import {API_BASE_URL} from '../../../env';
import DatePicker from 'react-native-date-picker';
import SelectList from '../../helpers/dropdownsearch';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function ProfileUpdate({route, navigation}) {
  const [provinceList, setProvinceList] = useState([
    {key: '1', value: 'Provinsi'},
  ]);

  const userContext = useContext(ContextUser);
  const {dataProfile, userToken, getUserToken} = userContext;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const [gender, setGender] = useState('');
  const [province, setProvince] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [date, setDate] = useState(new Date('1990-09-09'));
  const [openDate, setOpenDate] = useState(false);
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [accountBank, setAccountBank] = useState('');

  const [defaultProvince, setDefaultProvince] = useState('');

  const getProvinceList = async () => {
    let result;
    await Axios.get(`${API_BASE_URL}/provinsi`, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then(async res => {
        // Store Values in Temporary Array
        let newArray = res.data.data.map(item => {
          return {key: item.id, value: item.nama};
        });
        //Set Data Variable
        setProvinceList(newArray);
        result = true;
      })
      .catch(err => {
        console.log(err);
        result = false;
      });
    return result;
  };

  const setProfileData = () => {
    setName(dataProfile.pribadi.nama);
    setEmail(dataProfile.pribadi.email);
    setDefaultProvince(dataProfile.provinsi);
    setProvince(dataProfile.pribadi.provinsi_id);
    setDateBirth(dataProfile.pribadi.tanggal_lahir);
    setDate(
      dataProfile.pribadi.tanggal_lahir
        ? new Date(
            dataProfile.pribadi.tanggal_lahir.substring(0, 10).toString(),
          )
        : date,
    );
    setAccountNumber(dataProfile.pribadi.nomor_rekening);
    setAccountBank(dataProfile.pribadi.jenis_bank);
    setAccountName(dataProfile.pribadi.nama_rekening);
  };

  useEffect(() => {
    getProvinceList();
    setProfileData();
  }, []);

  const updateProfile = async () => {
    let result;
    const data = {
      nama: name,
      email: email,
      tanggal_lahir: dateBirth,
      provinsi_id: province,
      jenis_bank: accountBank,
      nama_rekening: accountName,
      nomor_rekening: accountNumber,
    };
    await Axios.post(`${API_BASE_URL}/profile`, data, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then(async res => {
        if (res?.data?.status) {
          getUserToken();
          navigation.goBack();
        }
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
  };

  return (
    <View style={{flex: 1}}>
      {/* HEADER */}
      <Header title={'Ubah Profil'} />
      {/* HEADER */}
      {/* BODY */}
      <KeyboardAwareScrollView>
        <View style={{paddingHorizontal: w(6), paddingTop: w(6)}}>
          {/* USERNAME */}
          <View>
            <Text style={styles.titleTextInput}>Nama Lengkap</Text>
            <TextInput
              defaultValue={name}
              autoCapitalize="none"
              placeholder="Masukkan Nama Lengkap"
              placeholderTextColor={COLOR_GRAY.NORMAL2}
              onChangeText={text => setName(text)}
              style={styles.textInput}
            />
          </View>
          {/* USERNAME */}
          {/* EMAIL */}
          <View style={{marginTop: w(6)}}>
            <Text style={styles.titleTextInput}>Email</Text>
            <TextInput
              defaultValue={email}
              autoCapitalize="none"
              placeholder="Masukkan Email"
              placeholderTextColor={COLOR_GRAY.NORMAL2}
              onChangeText={text => setEmail(text)}
              style={styles.textInput}
            />
          </View>
          {/* EMAIL */}
          {/* DATE BIRTH */}
          <View style={{marginTop: w(6)}}>
            <Text style={styles.titleTextInput}>Tanggal Lahir</Text>
            <DatePicker
              mode="date"
              modal
              open={openDate}
              date={date}
              onConfirm={date => {
                setOpenDate(false);
                setDateBirth(date.toISOString().substring(0, 10));
                setDate(date);
              }}
              onCancel={() => {
                setOpenDate(false);
              }}
            />
            <TouchableOpacity
              onPress={() => setOpenDate(true)}
              style={[
                styles.textInput,
                {flexDirection: 'row', alignItems: 'center'},
              ]}>
              <Image
                style={{height: w(5), width: w(5), marginRight: w(4)}}
                source={{
                  uri: 'https://cdn1.iconfinder.com/data/icons/essential-pack-3/24/68.calendar-128.png',
                }}
              />
              <Text style={{fontSize: w(4), color: COLOR.BLACK}}>
                {dateBirth
                  ? moment(dateBirth).format('LL')
                  : moment(date).format('LL')}
              </Text>
            </TouchableOpacity>
          </View>
          {/* DATE BIRTH */}
          {/* PROVINCE */}
          <View style={{marginTop: w(6)}}>
            <Text style={styles.titleTextInput}>Provinsi</Text>
            <SelectList
              inputStyles={{
                fontSize: w(4),
                height: w(12),
                color: COLOR.BLACK,
                width: w(75),
              }}
              textStyles={{color: COLOR.BLACK}}
              boxStyles={[styles.textInput, {alignItems: 'center'}]}
              placeholder={defaultProvince || 'Pilih Provinsi'}
              setSelected={text => {
                setProvince(text);
                console.log(text);
              }}
              data={provinceList}
            />
          </View>
          {/* PROVINCE */}

          {/* ACCOUNT NUMBER */}
          <View style={{marginTop: w(6)}}>
            <Text style={styles.titleTextInput}>No. Rekening</Text>
            <TextInput
              defaultValue={accountNumber}
              autoCapitalize="none"
              placeholder="Masukkan No. Rekening"
              placeholderTextColor={COLOR_GRAY.NORMAL2}
              onChangeText={text => setAccountNumber(text)}
              style={styles.textInput}
            />
          </View>
          {/* ACCOUNT NUMBER */}
          {/* ACCOUNT NAME */}
          <View style={{marginTop: w(6)}}>
            <Text style={styles.titleTextInput}>Nama Rekening</Text>
            <TextInput
              defaultValue={accountName}
              autoCapitalize="none"
              placeholder="Masukkan Nama Rekening"
              placeholderTextColor={COLOR_GRAY.NORMAL2}
              onChangeText={text => setAccountName(text)}
              style={styles.textInput}
            />
          </View>
          {/* ACCOUNT NAME */}
          {/* ACCOUNT BANK */}
          <View style={{marginTop: w(6)}}>
            <Text style={styles.titleTextInput}>Nama Bank</Text>
            <TextInput
              defaultValue={accountBank}
              autoCapitalize="none"
              placeholder="Masukkan Nama Bank"
              placeholderTextColor={COLOR_GRAY.NORMAL2}
              onChangeText={text => setAccountBank(text)}
              style={styles.textInput}
            />
          </View>
          {/* ACCOUNT BANK */}
          {/* GENDER */}
          {/* <View style={{marginTop: w(6)}}>
            <Text style={styles.titleTextInput}>Jenis Kelamin</Text>
            <View style={styles.genderContainer}> */}
          {/* MAN */}
          {/* <TouchableOpacity
                style={styles.genderButton}
                onPress={() => setGender('Laki-laki')}>
                <View style={styles.genderBullet}>
                  {gender === 'Laki-laki' ? (
                    <View style={styles.genderBulletActive} />
                  ) : null}
                </View>
                <Text style={styles.genderText}>Laki-laki</Text>
              </TouchableOpacity> */}
          {/* MAN */}
          {/* WOMAN */}
          {/* <TouchableOpacity
                style={styles.genderButton}
                onPress={() => setGender('Perempuan')}>
                <View style={styles.genderBullet}>
                  {gender === 'Perempuan' ? (
                    <View style={styles.genderBulletActive} />
                  ) : null}
                </View>
                <Text style={styles.genderText}>Perempuan</Text>
              </TouchableOpacity> */}
          {/* WOMAN */}
          {/* </View>
          </View> */}
          {/* GENDER */}
          {/* SAVE BUTTON */}
          <View style={{marginVertical: w(6)}}>
            <TouchableOpacity
              onPress={() => updateProfile()}
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
                Simpan
              </Text>
            </TouchableOpacity>
          </View>
          {/* SAVE BUTTON */}
        </View>
      </KeyboardAwareScrollView>
      {/* BODY */}
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    backgroundColor: COLOR.WHITE,
    borderWidth: w(0.5),
    borderColor: COLOR.GRAY,
    paddingHorizontal: w(4),
    height: w(12),
    width: '100%',
    borderRadius: w(2),
    fontSize: w(3.5),
    alignSelf: 'center',
    color: COLOR.BLACK,
  },
  titleTextInput: {
    backgroundColor: COLOR.WHITE,
    fontSize: w(2.5),
    position: 'absolute',
    paddingHorizontal: w(2),
    top: -w(2),
    left: w(4),
    zIndex: +1,
  },
  genderContainer: {
    backgroundColor: COLOR.WHITE,
    borderWidth: w(0.5),
    borderColor: COLOR.GRAY,
    paddingHorizontal: w(4),
    width: '100%',
    borderRadius: w(2),
    fontSize: w(3.5),
    alignSelf: 'center',
    color: COLOR.BLACK,
    paddingVertical: w(3),
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: w(8),
  },
  genderBullet: {
    height: w(4),
    width: w(4),
    borderRadius: w(10),
    borderWidth: w(0.2),
    borderColor: COLOR.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
  },
  genderBulletActive: {
    backgroundColor: COLOR.GRAY,
    height: w(2),
    width: w(2),
    borderRadius: w(10),
  },
  genderText: {
    fontSize: w(3.5),
    color: COLOR.BLACK,
    marginLeft: w(2),
  },
});
