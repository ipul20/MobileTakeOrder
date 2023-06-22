import React, {useState, useContext, useEffect} from 'react';
import {View} from 'react-native';
import {RefreshControl, ActivityIndicator} from 'react-native';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';
import WebView from 'react-native-webview';
import Header from '../../components/general/Header';
import {COLOR} from '../../styles';
export default function Discussion({navigation, route}) {
  const {url, title} = route?.params;

  const [loadingRead, setLoadingRead] = useState(false);

  useEffect(() => {
    setLoadingRead(true);
  }, []);

  return (
    <View style={{flex: 1}}>
      <Header title={title} />
      <WebView
        style={{marginTop: -w(12)}}
        onLoadStart={() => setLoadingRead(true)}
        onLoadEnd={() => setLoadingRead(false)}
        javaScriptEnabled={true}
        scrollEnabled={true}
        allowsFullscreenVideo={true}
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
        source={{uri: url}}
        // source={{
        //   uri: 'https://beta.sejawat.co.id/Image/medicalnote/musculoskeletal/Musculoskeletal-6.svg',
        // }}
      />
      {loadingRead && (
        <View
          style={{
            position: 'absolute',
            alignSelf: 'center',
            marginTop: h(40),
          }}>
          <ActivityIndicator size="large" color={COLOR.SECONDARY} />
        </View>
      )}
    </View>
  );
}
