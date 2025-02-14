import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ChooseUserType from '../screens/ChooseUserType';
import Splash from '../screens/Splash';
import Login from '../screens/login/Login';
import TutorHome from '../screens/tutor/TutorHome';
import AddChapter from '../screens/tutor/courses/AddChapter';
import AddCourse from '../screens/tutor/courses/AddCourse';
import CourseView from '../screens/tutor/courses/CourseView';
import EditCourse from '../screens/tutor/courses/EditCourse';
import LearnerHome from '../screens/learners/LearnerHome';
import CourseDetails from '../screens/learners/CourseDetails';
import AddReview from '../screens/learners/courses/reviews/AddReview';

const MainNavigator = () => {
    const Stack = createStackNavigator()
  return (
    <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen name='Splash' component={Splash} options={{headerShown:false}}/>
            <Stack.Screen name='ChooseUserType' component={ChooseUserType} options={{headerShown:false}}/>
            <Stack.Screen name='Login' component={Login} options={{headerShown:false}}/>
            <Stack.Screen name='TutorHome' component={TutorHome} options={{headerShown:false}}/>
            <Stack.Screen name='LearnerHome' component={LearnerHome} options={{headerShown:true}}/>
            <Stack.Screen name='AddCourse' component={AddCourse} options={{headerShown:true}}/>
            <Stack.Screen name='CourseView' component={CourseView} options={{headerShown:true}}/>
            <Stack.Screen name='AddChapter' component={AddChapter} options={{headerShown:true}}/>
            <Stack.Screen name='EditCourse' component={EditCourse} options={{headerShown:true}}/>
            <Stack.Screen name="CourseDetails" component={CourseDetails} options={{headerShown:true}}/>
            <Stack.Screen name="AddReview" component={AddReview} options={{headerShown:true}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MainNavigator;
