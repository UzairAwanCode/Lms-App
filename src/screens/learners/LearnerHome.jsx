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
                source={require('../../../assets/courses.png')}
                style={{
                  tintColor: focused ? THEME_COLOR : 'black',
                  width: size,
                  height: size,
                }}
              />
            );
          },
          tabBarLabel: ({size, focused}) => {
            return (
              <Text
                style={{
                  color: focused ? THEME_COLOR : TEXT_COLOR,
                  fontSize: size,
                }}>
                {'Courses'}
              </Text>
            );
          },
        }}
        name="Home"
        component={Home}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                source={require('../../../assets/history.png')}
                style={{
                  tintColor: focused ? THEME_COLOR : 'black',
                  width: size,
                  height: size,
                }}
              />
            );
          },
          tabBarLabel: ({size, focused}) => {
            return (
              <Text
                style={{
                  color: focused ? THEME_COLOR : TEXT_COLOR,
                  fontSize: size,
                }}>
                {'Course Sell'}
              </Text>
            );
          },
        }}
        name="Search"
        component={Search}
      />
      <Bottom.Screen
        options={{
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                source={require('../../../assets/history.png')}
                style={{
                  tintColor: focused ? THEME_COLOR : 'black',
                  width: size,
                  height: size,
                }}
              />
            );
          },
          tabBarLabel: ({size, focused}) => {
            return (
              <Text
                style={{
                  color: focused ? THEME_COLOR : TEXT_COLOR,
                  fontSize: size,
                }}>
                {'Favourities'}
              </Text>
            );
          },
        }}
        name="Favourities"
        component={Favourities}
      />
      <Bottom.Screen options={{
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                source={require('../../../assets/history.png')}
                style={{
                  tintColor: focused ? THEME_COLOR : 'black',
                  width: size,
                  height: size,
                }}
              />
            );
          },
          tabBarLabel: ({size, focused}) => {
            return (
              <Text
                style={{
                  color: focused ? THEME_COLOR : TEXT_COLOR,
                  fontSize: size,
                }}>
                {'Cart'}
              </Text>
            );
          },
        }} name="Cart" component={Cart} />
      <Bottom.Screen
        options={{
          tabBarIcon: ({size, focused}) => {
            return (
              <Image
                source={require('../../../assets/user.png')}
                style={{
                  tintColor: focused ? THEME_COLOR : 'black',
                  width: size,
                  height: size,
                }}
              />
            );
          },
          tabBarLabel: ({size, focused}) => {
            return (
              <Text
                style={{
                  color: focused ? THEME_COLOR : TEXT_COLOR,
                  fontSize: size,
                }}>
                {'Profile'}
              </Text>
            );
          },
        }}
        name="Profile"
        component={Profile}
      />
    </Bottom.Navigator>
  );
};

export default LearnerHome;
