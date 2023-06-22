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

const Tab = createMaterialBottomTabNavigator();
function MainScreen() {
  return (
    <Tab.Navigator screenOptions={tabBarOptions}>
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
        component={Home}
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
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const tabBarOptions = {
  tabBarLabelStyle: {
    fontSize: w(3),
    fontWeight: 'bold',
    marginBottom: w(2),
  },
  tabBarStyle: {
    height: Platform.OS === 'ios' ? w(20) : w(15),
    paddingBottom: Platform.OS === 'ios' ? h(2) : 0,
    paddingVertical: w(1),
    backgroundColor: '#0095da',
  },
};
const styles = StyleSheet.create({
  tabBarIcon: {
    height: w(5),
    width: w(5),
  },
});
