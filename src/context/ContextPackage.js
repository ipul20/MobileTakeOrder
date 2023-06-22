import React, {createContext, PureComponent} from 'react';
import {Alert} from 'react-native';
import Axios from 'axios';
import {API_BASE_URL} from '../../env';
import {ContextType as ContextUser} from './ContextUser';

let ContextType;
const {Provider, Consumer} = (ContextType = createContext());

class ContextProviderPackage extends PureComponent {
  state = {
    dataYourPackage: [],
    dataYourTryout: [],
    dataDetailTryout: [],
    dataDetailTryoutStart: null,
    dataTryoutQuestion: [],
    dataTryoutDiscussion: [],
    dataTryoutResult: null,
    dataPackage: [],
    dataPackageAll: [],
    continueTryout: false,
    dataBanner: [],
    dataBestPackage: [],
    dataPaymentMethod: [],
    dataHistoryTryout: [],
    dataHistoryTryoutPackage: [],
  };

  //   async componentDidMount() {
  // await this.getUserToken();
  //   }

  static contextType = ContextUser;

  searchPackage = keyword => {
    let updatedList = this.state.dataPackageAll;
    updatedList = updatedList.filter(function (item) {
      return item.nama.toLowerCase().search(keyword.toLowerCase()) !== -1;
    });
    this.setState({
      dataPackage: updatedList,
    });
  };

  getDataPackage = async id => {
    let result;
    await Axios.get(`${API_BASE_URL}/paket-bimbel/${id}`, {
      headers: {
        Authorization: 'Bearer ' + this.context.userToken,
      },
    })
      .then(async res => {
        this.setState({
          dataPackage: res.data.data,
          dataPackageAll: res.data.data,
        });
        result = true;
      })
      .catch(err => {
        this.setState({
          dataPackage: [],
        });
        console.log(err);
        result = false;
      });
    return result;
  };

  getDataYourPackage = async () => {
    let result;
    await Axios.get(`${API_BASE_URL}/bidang`, {
      headers: {
        Authorization: 'Bearer ' + this.context.userToken,
      },
    })
      .then(async res => {
        this.setState({
          dataYourPackage: res.data.data,
        });
        result = true;
      })
      .catch(err => {
        console.log(err);
        result = false;
      });
    return result;
  };

  getDataYourTryout = async id => {
    let result;
    await Axios.get(`${API_BASE_URL}/paket/${id}`, {
      headers: {
        Authorization: 'Bearer ' + this.context.userToken,
      },
    })
      .then(async res => {
        this.setState({
          dataYourTryout: res.data.data,
        });
        result = true;
      })
      .catch(err => {
        console.log(err);
        result = false;
      });
    return result;
  };

  getDataDetailTryout = async data => {
    let result;
    await Axios.post(`${API_BASE_URL}/tryout/detail`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.userToken,
      },
    })
      .then(async res => {
        this.setState({
          dataDetailTryout: res.data.data,
        });
        result = true;
      })
      .catch(err => {
        // console.log(err.response.data.message);
        if (err?.response === undefined) Alert.alert('Network Error!');
        else if (!err?.response.data.status)
          Alert.alert(err?.response.data.message);
        else Alert.alert('Terjadi Kesalahan!');
        this.setState({
          dataDetailTryout: [],
        });
        result = false;
      });
    return result;
  };

  getDataDetailTryoutStart = async data => {
    let result;
    await Axios.post(`${API_BASE_URL}/tryout`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.userToken,
      },
    })
      .then(async res => {
        console.log(res.data.data);
        this.setState({
          dataDetailTryoutStart: res.data.data,
          continueTryout: false,
        });
        result = true;
      })
      .catch(err => {
        console.log(err.response.data.message);
        if (err?.response === undefined) Alert.alert('Network Error!');
        else if (!err?.response?.data?.status) {
          // Alert.alert(err?.response?.data?.message);
          this.setState({continueTryout: true});
        } else Alert.alert('Terjadi Kesalahan!');
        this.setState({
          dataDetailTryoutStart: err?.response?.data?.data || null,
        });
        console.log(err?.response?.data?.data);
        result = false;
      });
    return {
      result,
      data: this.state.dataDetailTryoutStart,
      isContinue: this.state.continueTryout,
    };
  };

  getDataTryoutQuestion = async data => {
    let result;
    await Axios.post(`${API_BASE_URL}/get_soal`, data, {
      headers: {
        Authorization: 'Bearer ' + this.context.userToken,
      },
    })
      .then(async res => {
        this.setState({
          dataTryoutQuestion: res.data.data,
        });
        result = true;
      })
      .catch(err => {
        console.log(err);
        this.setState({
          dataTryoutQuestion: [],
        });
        result = false;
      });
    return {result, data: this.state.dataTryoutQuestion};
  };

  chooseAnswer = async data => {
    let result;
    await Axios.post(`${API_BASE_URL}/jawab_soal`, data, {
      headers: {
        Authorization: 'Bearer ' + this.context.userToken,
      },
    })
      .then(() => {
        result = true;
      })
      .catch(err => {
        console.log(err);
        result = false;
      });
    return result;
  };

  submitAnswer = async data => {
    let result;
    await Axios.post(`${API_BASE_URL}/submit`, data, {
      headers: {
        Authorization: 'Bearer ' + this.context.userToken,
      },
    })
      .then(res => {
        console.log(res.data.message);
        this.setState({dataTryoutResult: res.data.data});
        result = true;
      })
      .catch(err => {
        console.log(err);
        result = false;
      });
    return {result, data: this.state.dataTryoutResult};
  };

  getDataTryoutDiscussion = async answerId => {
    console.log(answerId);
    let result;
    await Axios.get(`${API_BASE_URL}/get_jawaban/${answerId}`, {
      headers: {
        Authorization: 'Bearer ' + this.context.userToken,
      },
    })
      .then(async res => {
        this.setState({
          dataTryoutDiscussion: res.data.data,
        });
        result = true;
      })
      .catch(err => {
        console.log(err.response.data.message);
        this.setState({
          dataTryoutDiscussion: [],
        });
        result = false;
      });
    return {result, data: this.state.dataTryoutDiscussion};
  };

  getDataBanner = async () => {
    let result;
    await Axios.get(`${API_BASE_URL}/banner`, {
      headers: {
        Authorization: 'Bearer ' + this.context.userToken,
      },
    })
      .then(res => {
        this.setState({dataBanner: res.data.data});
        result = {status: true, data: res?.data?.data};
      })
      .catch(err => {
        console.log(err);
        this.setState({dataBanner: []});
        result = {status: false, data: null};
      });
    return result;
  };

  getDataBestPackage = async () => {
    let result;
    await Axios.get(`${API_BASE_URL}/paket-bimbel/terbaik`, {
      headers: {
        Authorization: 'Bearer ' + this.context.userToken,
      },
    })
      .then(res => {
        this.setState({dataBestPackage: res.data.data});
        result = true;
      })
      .catch(err => {
        console.log(err);
        result = false;
      });
    return result;
  };

  getDataPaymentMethod = async () => {
    let result;
    await Axios.get(`${API_BASE_URL}/get-metode`, {
      headers: {
        Authorization: 'Bearer ' + this.context.userToken,
      },
    })
      .then(res => {
        this.setState({dataPaymentMethod: res.data.data});
        result = true;
      })
      .catch(err => {
        console.log(err);
        result = false;
      });
    return result;
  };

  getDataHistoryTryout = async () => {
    let result;
    await Axios.get(`${API_BASE_URL}/tryout/riwayat`, {
      headers: {
        Authorization: 'Bearer ' + this.context.userToken,
      },
    })
      .then(res => {
        this.setState({dataHistoryTryout: res.data.data});
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
          getDataYourPackage: this.getDataYourPackage,
          getDataYourTryout: this.getDataYourTryout,
          getDataDetailTryout: this.getDataDetailTryout,
          getDataTryoutQuestion: this.getDataTryoutQuestion,
          chooseAnswer: this.chooseAnswer,
          submitAnswer: this.submitAnswer,
          getDataTryoutDiscussion: this.getDataTryoutDiscussion,
          getDataPackage: this.getDataPackage,
          getDataDetailTryoutStart: this.getDataDetailTryoutStart,
          getDataBanner: this.getDataBanner,
          getDataBestPackage: this.getDataBestPackage,
          getDataPaymentMethod: this.getDataPaymentMethod,
          getDataHistoryTryout: this.getDataHistoryTryout,
          searchPackage: this.searchPackage,
        }}>
        {this.props.children}
      </Provider>
    );
  }
}

export {ContextProviderPackage, Consumer, ContextType};
