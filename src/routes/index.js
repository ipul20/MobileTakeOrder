import * as React from 'react';
import {Image, Platform} from 'react-native';
import {StyleSheet} from 'react-native';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {heightPercentageToDP as h} from 'react-native-responsive-screen';
import {widthPercentageToDP as w} from 'react-native-responsive-screen';
import {COLOR} from '../styles';

// AUTH SCREEN

// MAIN SCREEN
import Home from '../screens/main/Home';
import Login from '../screens/auth/Login';
import Riwayat from '../screens/main/Riwayat';
import HomeAdmin from '../screens/admin/HomeAdmin';
import AdminUser from '../screens/page/AdminUser';
import AdminMenu from '../screens/page/AdminMenu';
import TambahMenu from '../screens/page/TambahMenu';
import SelectTable from '../screens/page/SelectTable';
import SelectMenuTakeaway from '../screens/page/SelectMenuTakeaway';
import SelectMenu from '../screens/page/SelectMenu';
import Cart from '../screens/page/Cart';
import EditMenu from '../screens/page/EditMenu';
import Pesanan from '../screens/page/Pesanan';
import Pembayaran from '../screens/page/Pembayaran';
import Profile from '../screens/main/Profile';

const Tab = createMaterialBottomTabNavigator();
function MainScreen() {
  return (
    <Tab.Navigator barStyle={tabBarOptions} initialRouteName="Home">
      <Tab.Screen
        name="Riwayat"
        component={Riwayat}
        options={{
          tabBarLabel: 'Riwayat',
          header: () => null,
          tabBarActiveTintColor: COLOR.PRIMARY,
          tabBarInactiveTintColor: COLOR.GRAY,
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={[
                  styles.tabBarIcon,
                  {marginRight: Platform.isPad ? w(2) : 0},
                ]}
                source={
                  focused
                    ? require('./../assets/bottom-menu/menu3-active.png')
                    : require('./../assets/bottom-menu/menu3-inactive.png')
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          header: () => null,
          tabBarActiveTintColor: COLOR.PRIMARY,
          tabBarInactiveTintColor: COLOR.GRAY,
          tabBarLabel: 'Home',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={[
                  styles.tabBarIcon,
                  {marginRight: Platform.isPad ? w(2) : 0},
                ]}
                source={
                  focused
                    ? require('./../assets/bottom-menu/menu1-active.png')
                    : require('./../assets/bottom-menu/menu1-inactive.png')
                }
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          header: () => null,
          tabBarActiveTintColor: COLOR.PRIMARY,
          tabBarInactiveTintColor: COLOR.GRAY,
          tabBarLabel: 'Profile',
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={[
                  styles.tabBarIcon,
                  {marginRight: Platform.isPad ? w(2) : 0},
                ]}
                source={
                  focused
                    ? require('./../assets/bottom-menu/menu4-actives.png')
                    : require('./../assets/bottom-menu/menu4-inactives.png')
                }
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createStackNavigator();
export default function RoutesContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {/* auth */}
        <Stack.Screen name="Login" component={Login} />

        {/* user */}
        {/* <Stack.Screen name="Riwayat" component={(MainScreen, {#Riwayat})} /> */}
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="SelectTable" component={SelectTable} />
        <Stack.Screen
          name="SelectMenuTakeaway"
          component={SelectMenuTakeaway}
        />
        <Stack.Screen name="Cart" component={Cart} />

        {/* //admin */}
        <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
        <Stack.Screen name="AdminUser" component={AdminUser} />
        <Stack.Screen name="AdminMenu" component={AdminMenu} />
        <Stack.Screen name="TambahMenu" component={TambahMenu} />
        <Stack.Screen name="EditMenu" component={EditMenu} />
        <Stack.Screen name="Pesanan" component={Pesanan} />
        <Stack.Screen name="SelectMenu" component={SelectMenu} />
        <Stack.Screen name="Pembayaran" component={Pembayaran} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const tabBarOptions = {
  height: w(20),
  borderTopWidth: 1,
  borderTopColor: '#d3d3d3',
  backgroundColor: '#fff',
};
const styles = StyleSheet.create({
  tabBarIcon: {
    height: w(4),
    width: w(4),
  },
});
