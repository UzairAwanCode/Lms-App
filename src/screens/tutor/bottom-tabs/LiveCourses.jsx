import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, FlatList} from 'react-native';
import {BG_COLOR, THEME_COLOR, WHITE} from '../../../utils/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import CourseItem from '../../../components/CourseItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore'

const LiveCourses = () => {
  const navigation = useNavigation()
  const [courses, setCourses] = useState([])
  const isFocused = useIsFocused()

  useEffect(()=>{
    getCourses()
  },[isFocused])

  const getCourses = async()=>{
    const userId = await AsyncStorage.getItem("USERID")
    const data = await firestore().collection("courses").get()
    let temp = []
    data.docs.forEach(item =>{
      temp.push({courseId: item.id, ...item.data()})
    })
    setCourses(temp)
  }
  return (
    <View style={styles.container}>
      <FlatList data={courses} renderItem={({item,index})=>{return <CourseItem item={item} index={index} data={[1,1,1,1,1,1,1]}/>}}/>
      <TouchableOpacity style={styles.addBtn} onPress={()=>navigation.navigate("AddCourse")}>
        <Image
          source={require('../../../../assets/plus.png')}
          style={styles.addIcon}
        />
        <Text style={styles.addText}>Add New Course</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LiveCourses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },

  addBtn:{
    backgroundColor: THEME_COLOR,
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(30),
    flexDirection:"row",
    position: 'absolute',
    bottom:moderateScale(20),
    right: moderateScale(20),
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15)
  },
  addIcon:{
    width: scale(20),
    height: scale(20)
  },
  addText:{
    color: WHITE,
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginLeft:moderateScale(10)
  }
});
