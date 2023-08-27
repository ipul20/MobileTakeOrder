import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {Button, Modal} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {COLOR} from '../../styles';
import DatePicker from 'react-native-modern-datepicker';

export default function HomeAdmin({navigation}) {
  const [show, setShow] = useState(false);
  const [modal, setModal] = useState(false);
  const [calendar, setCalender] = useState('');
  const [date, setDate] = useState('');
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
        onPress={() => navigation.navigate('AdminUser')}>
        <Text>Data User</Text>
      </Button>
      <Button
        mode="contained"
        compact={false}
        style={styles.button}
        onPress={() => navigation.navigate('AdminMenu')}>
        <Text>Data Menu</Text>
      </Button>
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
        onPress={() => setModal(true)}>
        <Text>Laporan Penjualan</Text>
      </Button>
      <Button
        mode="contained"
        compact={false}
        style={styles.button}
        onPress={() => navigation.navigate('Login')}>
        <Text>Log Out</Text>
      </Button>
      <Modal
        visible={modal}
        onDismiss={() => setModal(false)}
        contentContainerStyle={{
          backgroundColor: 'white',
          alignSelf: 'center',
          padding: 20,
          width: wp(80),
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center', marginTop: wp(1)}}>
          <Text
            style={{
              marginBottom: wp(5),
              fontWeight: 'bold',
              fontSize: wp(5),
            }}>
            Laporan Penjualan
          </Text>
          <TouchableOpacity
            onPress={() => setCalender(true)}
            style={{
              width: wp(60),
              height: wp(10),
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: wp(3),
              borderWidth: 1,
              borderColor: 'grey',
              marginBottom: wp(2),
            }}>
            <Text>{date == '' ? 'Pilih Tanggal ' : date}</Text>
          </TouchableOpacity>

          <Button
            mode="contained"
            onPress={async () => {}}
            style={{borderRadius: wp(2), backgroundColor: COLOR.PRIMARY}}>
            Cek Laporan
          </Button>
        </View>
      </Modal>
      <Modal
        visible={calendar}
        onDismiss={() => setCalender(false)}
        contentContainerStyle={{
          backgroundColor: 'white',
          alignSelf: 'center',
          padding: 20,
          width: wp(90),
          alignItems: 'center',
        }}>
        <View style={{alignItems: 'center', marginTop: wp(1)}}>
          <DatePicker
            options={{
              backgroundColor: '#090C08',
              textHeaderColor: '#FFA25B',
              textDefaultColor: '#F6E7C1',
              selectedTextColor: '#fff',
              mainColor: '#F4722B',
              textSecondaryColor: '#D6C7A1',
              borderColor: 'rgba(122, 146, 165, 0.1)',
            }}
            mode="calendar"
            selected={date}
            onDateChange={date => {
              setDate(date);
              setCalender(false);
            }}
            style={{borderRadius: 10, width: wp(85)}}
          />
        </View>
      </Modal>
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
