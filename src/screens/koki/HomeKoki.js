import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export default function HomeKoki({navigation}) {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        minHeight: hp(100),
      }}>
      <Button
        mode="contained"
        compact={false}
        style={styles.button}
        onPress={() => navigation.navigate('Pesanan')}>
        <Text>Data Pesanan</Text>
      </Button>
      <Button
        mode="contained"
        compact={false}
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text>Log Out</Text>
      </Button>
    </View>
  );
}
const styles = StyleSheet.create({
  button: {
    width: '80%',
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 7,
    backgroundColor: '#0095DA',
    borderWidth: 2,
  },
});
