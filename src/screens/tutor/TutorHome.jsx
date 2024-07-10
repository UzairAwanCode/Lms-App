import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, Text, Image} from 'react-native';
import LiveCourses from './bottom-tabs/LiveCourses';
import CourseSell from './bottom-tabs/CourseSell';
import TutorProfile from './bottom-tabs/TutorProfile';
import {TEXT_COLOR, THEME_COLOR} from '../../utils/Colors';

const TutorHome = () => {
  const Bottom = createBottomTabNavigator();
  return (
    <Bottom.Navigator screenOptions={{tabBarStyle:{height:60}}}>
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
        name="LiveCourses"
        component={LiveCourses}
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
                {'Course Sell'}
              </Text>
            );
          },
        }} name="CourseSell" component={CourseSell} />
      <Bottom.Screen options={{
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
        }} name="TutorProfile" component={TutorProfile} />
    </Bottom.Navigator>
  );
};

export default TutorHome;
