import React, {createContext, PureComponent} from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';
// import {alertMessage} from '../helpers';
import {API_BASE_URL} from '../../env';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import RNFetchBlob from 'rn-fetch-blob';

let ContextType;
const {Provider, Consumer} = (ContextType = createContext());

class ContextProviderUser extends PureComponent {
  state = {
    isUserLogin: false,
    userToken: '',
    // userName: '',
    // userPhone: '',
    // userReferal: '',
    // isSubscription: false,
    // dataUserSubscription: {},
    dataProfile: {
      username: '-',
      no_hp: '-',
      referal: '-',
      saldo: 0,
      status: 0,
      jumlah_referal: 0,
      provinsi: '-',
      pribadi: {
        id: 0,
        user_id: 0,
        nama: '-',
        foto: null,
        email: null,
        tanggal_lahir: null,
        provinsi_id: null,
        jenis_bank: null,
        nama_rekening: null,
        nomor_rekening: null,
      },
    },
  };

  async componentDidMount() {
    // await this.getUserToken();
    // this.getProfileUser();
  }

  // getDataProfile = async userToken => {
  // let result;
  // await Axios.get(`${API_BASE_URL}/v1/profile`, {
  //   headers: {
  //     Authorization: 'Bearer ' + userToken,
  //   },
  // })
  //   .then(async res => {
  //     this.setState({
  //       dataProfile: res.data.data,
  //     });
  //     this.getDataUserSubscription(userToken);
  //     result = true;
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     result = false;
  //   });
  // return result;
  // };

  // loginUser = async data => {
  // let result;
  // await Axios.post(`${API_BASE_URL}/login`, data)
  //   .then(async res => {
  //     await AsyncStorage.setItem('userToken', res.data.data.token);
  //     // this.getUserToken();
  //     result = true;
  //   })
  //   .catch(err => {
  //     // console.log('Login Error', err);
  //     if (err.response === undefined)
  //       alertMessage('Network Error!', 'danger');
  //     else if (err.response.data.error.status_code === 406)
  //       alertMessage('Email atau Password salah!', 'danger');
  //     else if (err.response.data.error.status_code === 500)
  //       alertMessage('Server Error!', 'danger');
  //     else alertMessage('Terjadi Kesalahan!', 'danger');
  //     result = false;
  //   });
  // return result;
  // };

  registerUser = async data => {
    let result;
    await Axios.post(`${API_BASE_URL}/register`, data)
      .then(res => {
        console.log(res?.data?.data);
        Alert.alert(res?.data?.message);
        result = res?.data?.status;
      })
      .catch(err => {
        if (err.response === undefined) Alert.alert('Network Error!');
        else Alert.alert('Terjadi Kesalahan!');
        result = false;
      });
    return result;
  };

  otpCheck = async data => {
    let result;
    await Axios.post(`${API_BASE_URL}/otp`, data)
      .then(async res => {
        console.log(res?.data?.data);
        Alert.alert(res?.data?.message);
        if (res?.data?.status) {
          await AsyncStorage.setItem('userToken', res.data.data.token);
          this.getUserToken();
        }
        result = res?.data?.status;
      })
      .catch(err => {
        console.log(err);
        if (err.response === undefined) Alert.alert('Network Error!');
        else Alert.alert('Terjadi Kesalahan!');
        result = false;
      });
    return result;
  };

  loginUser = async data => {
    let result;
    await Axios.post(`${API_BASE_URL}/login`, data)
      .then(async res => {
        if (res?.data?.status) {
          await AsyncStorage.setItem('userToken', res.data.data.token);
          this.getUserToken();
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

  getUserToken = async () => {
    await AsyncStorage.getItem('userToken', (err, userToken) => {
      if (userToken) {
        this.setState({isUserLogin: true, userToken: userToken});
        this.getDataProfile(userToken);
      } else {
        this.setState({isUserLogin: false, userToken: ''});
      }
    });
  };

  getDataProfile = async userToken => {
    let result;
    await Axios.get(`${API_BASE_URL}/cektoken`, {
      headers: {
        Authorization: 'Bearer ' + userToken,
      },
    })
      .then(res => {
        this.setState({dataProfile: res.data.data});
        result = true;
      })
      .catch(err => {
        console.log(err);
        result = false;
      });
    return result;
  };

  render() {
    return (
      <Provider
        value={{
          ...this.state,
          loginUser: this.loginUser,
          getUserToken: this.getUserToken,
          getDataProfile: this.getDataProfile,
          registerUser: this.registerUser,
          otpCheck: this.otpCheck,
          loginUser: this.loginUser,
        }}>
        {this.props.children}
      </Provider>
    );
  }
}

export {ContextProviderUser, Consumer, ContextType};
