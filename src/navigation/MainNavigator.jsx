import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChooseUserType from '../screens/ChooseUserType';
import Splash from '../screens/Splash';
import Login from '../screens/login/Login';
import TutorHome from '../screens/tutor/TutorHome';

const MainNavigator = () => {
    const Stack = createStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
            <Stack.Screen name='ChooseUserType' component={ChooseUserType} options={{headerShown:false}}/>
            <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
            <Stack.Screen name='TutorHome' component={TutorHome} options={{headerShown:false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
