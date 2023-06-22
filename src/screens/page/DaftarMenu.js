import React from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export default function DaftarMenu(props) {
  const jenis = props.jenis;
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <Button
        mode="contained"
        compact={false}
        style={{
          width: '80%',
          paddingVertical: 5,
          marginBottom: 10,
          borderRadius: 7,
          backgroundColor: '#0095DA',
          borderWidth: 2,
        }}
        onPress={() => navigation.navigate('AdminUser')}>
        <View></View>
        <Text>Tambah Data {jenis}</Text>
      </Button>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  scroll: {
    alignItems: 'center',
    flex: 1,
    padding: wp(2),
  },
});
