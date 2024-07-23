import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, Text, Image} from 'react-native';
import {TEXT_COLOR, THEME_COLOR} from '../../utils/Colors';
import Home from './bottom-tabs/Home';
import Search from './bottom-tabs/Search';
import Profile from './bottom-tabs/Profile';
import Favourities from './bottom-tabs/Favourities';
import Cart from './bottom-tabs/Cart';

const LearnerHome = () => {
  const Bottom = createBottomTabNavigator();
  return (
    <Bottom.Navigator screenOptions={{tabBarStyle: {height: 60}}}>
      <Bottom.Screen
        options={{
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                source={focused ? require('../../../assets/home-fill.png') : require('../../../assets/home.png')}
                style={{
                  tintColor: focused ? THEME_COLOR : 'black',
                  width: size,
                  height: size,
                }}
              />
            );
          },
          tabBarLabel: '',
        }}
        name="Home"
        component={Home}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                source={require('../../../assets/search.png')}
                style={{
                  tintColor: focused ? THEME_COLOR : 'black',
                  width: size,
                  height: size,
                }}
              />
            );
          },
          tabBarLabel: '',
        }}
        name="Search"
        component={Search}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                source={focused ? require('../../../assets/fav-fill.png') : require('../../../assets/fav.png')}
                style={{
                  tintColor: focused ? THEME_COLOR : 'black',
                  width: size,
                  height: size,
                }}
              />
            );
          },
          tabBarLabel: '',
        }}
        name="Favourities"
        component={Favourities}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
              source={focused ? require('../../../assets/cart-fill.png') : require('../../../assets/cart.png')}
                style={{
                  tintColor: focused ? THEME_COLOR : 'black',
                  width: size,
                  height: size,
                }}
              />
            );
          },
          tabBarLabel: '',
        }}
        name="Cart"
        component={Cart}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
              source={focused ? require('../../../assets/user-fill.png') : require('../../../assets/user.png')}
                style={{
                  tintColor: focused ? THEME_COLOR : 'black',
                  width: size,
                  height: size,
                }}
              />
            );
          },
          tabBarLabel: '',
        }}
        name="Profile"
        component={Profile}
      />
    </Bottom.Navigator>
  );
};

export default LearnerHome;
