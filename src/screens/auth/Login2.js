import React from 'react';
import {View, Text, Image} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import {COLOR, COLOR_GRAY} from '../../styles';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {ScrollView, Keyboard} from 'react-native';
import {Dimensions} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import RegisterComponent from '../../components/auth/Login/RegisterComponent';
import LoginComponent from '../../components/auth/Login/LoginComponent';

const slides = [
  {
    key: 'one',
    title: 'Dapatkan pengalaman menarik',
    text: 'Find your best experience while studying and seeking knowledge in here',
    image: require('./../../assets/login1.png'),
    backgroundColor: '#FCE2EA',
  },
  {
    key: 'two',
    title: 'Sukses menjadi ASN',
    text: 'Find your best experience while studying and seeking knowledge in here',
    image: require('./../../assets/login2.png'),
    backgroundColor: '#E2E2FC',
  },
  {
    key: 'login',
    title: 'Login untuk masuk ke Aplikasi',
    text: 'Login untuk masuk ke Aplikasi',
    image: require('./../../assets/IntroImage.png'),
    backgroundColor: '#E2F3FC',
  },
];

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hideKeyboard: true,
      username: '',
      password: '',
      waNumber: '',
      index: 0,
      routes: [
        {key: 'first', title: 'Daftar'},
        {key: 'second', title: 'Masuk'},
      ],
    };
  }

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      this._keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      this._keyboardDidHide,
    );
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow = () => {
    this.setState({hideKeyboard: false});
  };

  _keyboardDidHide = () => {
    this.setState({hideKeyboard: true});
  };

  _renderItem = ({item}) => {
    const index = this.state.index;
    const routes = this.state.routes;
    const FirstRoute = () => <RegisterComponent />;

    const SecondRoute = () => <LoginComponent />;

    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });

    const layout = Dimensions.get('window');
    return (
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1, backgroundColor: COLOR.WHITE}}>
          <View
            style={{
              width: item.key === 'login' ? w(60) : w(80),
              height: item.key === 'login' ? w(37.5) : w(50),
              marginTop: item.key === 'login' ? w(15) : w(30),
              borderRadius: item.key === 'login' ? w(7.5) : w(10),
              backgroundColor: item.backgroundColor,
              alignSelf: 'center',
            }}>
            <Image
              style={{
                height: item.key === 'login' ? w(45) : w(60),
                resizeMode: 'contain',
                aspectRatio: 1,
                marginTop: item.key === 'login' ? -w(7.5) : -w(10),
                alignSelf: 'center',
              }}
              source={item.image}
            />
          </View>
          {item.key !== 'login' ? (
            <>
              <Text
                style={{
                  marginTop: w(6),
                  fontSize: w(6),
                  alignSelf: 'center',
                  fontWeight: 'bold',
                  color: COLOR.SECONDARY,
                }}>
                {item.title}
              </Text>
              <Text
                style={{
                  alignSelf: 'center',
                  width: w(70),
                  marginTop: w(6),
                  fontSize: w(3.5),
                  textAlign: 'center',
                }}>
                {item.text}
              </Text>
            </>
          ) : (
            <>
              <TabView
                style={{
                  marginTop: w(6),
                  height: w(100),
                }}
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={i => this.setState({index: i})}
                initialLayout={{width: layout.width}}
                renderTabBar={props => (
                  <TabBar
                    indicatorStyle={{
                      backgroundColor: COLOR.SECONDARY,
                    }}
                    renderLabel={({route, focused, color}) => (
                      <Text
                        style={{
                          color: focused ? COLOR.SECONDARY : '#8C8C8C',
                          fontSize: w(4),
                          fontWeight: 'bold',
                        }}>
                        {route.title}
                      </Text>
                    )}
                    {...props}
                    style={{backgroundColor: '#fff'}}
                  />
                )} // <-- add this line
              />
            </>
          )}
        </View>
      </ScrollView>
    );
  };
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({showRealApp: true});
  };
  _renderNextButton = () =>
    this.state.hideKeyboard ? (
      <Text
        style={{
          color: COLOR.SECONDARY,
          fontSize: w(5),
          marginTop: h(1.5),
        }}>
        Lanjut
      </Text>
    ) : (
      <></>
    );
  _renderPrevButton = () =>
    this.state.hideKeyboard ? (
      <Text
        style={{
          color: COLOR.SECONDARY,
          fontSize: w(5),
          marginTop: h(1.5),
        }}>
        Kembali
      </Text>
    ) : (
      <></>
    );

  render() {
    return (
      <AppIntroSlider
        showDoneButton={false}
        showPrevButton={true}
        renderItem={this._renderItem}
        data={slides}
        dotStyle={{
          backgroundColor: '#BCDFF0',
          marginTop: this.state.hideKeyboard ? 0 : 999,
        }}
        activeDotStyle={{
          backgroundColor: COLOR.SECONDARY,
          marginTop: this.state.hideKeyboard ? 0 : 999,
        }}
        renderNextButton={this._renderNextButton}
        renderPrevButton={this._renderPrevButton}
        // renderPagination={() => null}
        // onDone={this._onDone}
      />
    );
  }
}
