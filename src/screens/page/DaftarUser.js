import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Button, IconButton, MD3Colors} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {API_BASE_URL, BASE_URL} from '../../../env';
import {COLOR, COLOR_GRAY} from '../../styles';
import {useNavigation} from '@react-navigation/native';

export default function DaftarUser(props) {
  const navigation = useNavigation();
  const [user, setUser] = useState([]);
  const role = props.role;
  const data = props.data ?? [];
  const showAlert = (name, id) => {
    Alert.alert('Anda Yakin ?', 'Anda Yakin Ingin Menghapus User ' + name, [
      // The "Yes" button
      {
        text: 'Yes',
        onPress: () => {
          return deleteUser(id);
        },
      },
      // The "No" button
      // Does nothing but dismiss the dialog when tapped
      {
        text: 'No',
      },
    ]);
  };
  const deleteUser = id => {
    fetch(`${API_BASE_URL}/delete-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: id,
      }),
    })
      .then(res => res.json())
      .then(async res => {
        console.log('respon', res);
        if (res.status == true) {
          Alert.alert('Delete user berhasil');
          props.reloadPage();
        } else {
          Alert.alert(res.message);
          props.reloadPage();
        }
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
        // ADD THIS THROW error
        throw error;
      });
  };
  return (
    <View>
      <ScrollView
        contentContainerStyle={{
          alignItems: 'center',
          padding: wp(2),
          minHeight: '100%',
        }}>
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
          onPress={() =>
            navigation.navigate('TambahUser', {
              role: role.toLowerCase(),
            })
          }>
          <View></View>
          <Text>Tambah Data {role}</Text>
        </Button>
        {data.map(v => (
          <TouchableOpacity
            onPress={() => navigation.navigate('DetailTakeaway')}
            style={{
              flexDirection: 'row',
              paddingVertical: wp(2),
              paddingHorizontal: wp(4),
              borderBottomColor: COLOR_GRAY.LIGHT,
              borderBottomWidth: 1,
              width: ' 100%',
              justifyContent: 'space-between',
            }}
            keys={v.id}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  marginTop: wp(2),
                  marginRight: wp(3),
                  padding: wp(1),
                  width: wp(22),
                }}>
                <Image
                  source={require('../../assets/image/user.png')}
                  style={{
                    width: wp(20),
                    height: wp(20),
                    borderRadius: wp(1),
                  }}
                />
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  width: wp(43),
                  marginRight: wp(2),
                }}>
                <View
                  style={{
                    marginRight: wp(2),
                  }}>
                  <Text style={{fontSize: wp(5), fontWeight: 'bold'}}>
                    {v.name}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: wp(30),
                  flexDirection: 'row',
                }}>
                <IconButton
                  mode="contained"
                  icon={require('../../assets/icon/edit.png')}
                  iconColor={MD3Colors.error50}
                  size={wp(5)}
                  onPress={() => navigation.navigate('EditUser', v)}
                />
                <IconButton
                  mode="contained"
                  icon={require('../../assets/icon/delete.png')}
                  iconColor={MD3Colors.error50}
                  size={wp(5)}
                  onPress={() => showAlert(v.name, v.id)}
                />
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                width: wp(31),
                alignSelf: 'center',
                flexDirection: 'row',
              }}></View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
