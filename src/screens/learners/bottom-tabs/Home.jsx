import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import CourseCard1 from '../../../components/CourseCard1';
import CourseCard2 from '../../../components/CourseCard2';
import { TEXT_COLOR } from '../../../utils/Colors';

const Home = () => {
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [favCourses, setFavCourses] = useState([])
  const isFocused = useIsFocused()
  useEffect(() => {
    getCourses();
    getFavs()
  }, [isFocused]);

  const getCourses = async () => {
    const res = await firestore().collection('courses').get();
    let temp = [];

    res.docs.forEach(item => {
      temp.push({courseId: item.id, ...item.data()});
    });
    setTrendingCourses(temp);
  };

  const getFavs = async()=>{
    const userId = await AsyncStorage.getItem("USERID")
    const userData = await firestore().collection("learners").doc(userId).get()
    setFavCourses(userData.data().favCourses);
  }

  const checkFav = (courseId)=>{
    let tempCourses = favCourses  
    
    let isFav = false
    tempCourses.map((item)=>{
      if(item.courseId == courseId){
        isFav= true
      }
    })  
    return false
  }

  const updateFavCourses = async(status, item)=>{
    const userId = await AsyncStorage.getItem("USERID")
    let favs = []
    if(status){
      favs = favCourses.filter(x => x.courseId != item.courseId)
    }
    else{      
      favs = favCourses
      favs.push(item)
    }
    await firestore().collection("learners").doc(userId).update({
      favCourses: favs,
    })
    getCourses()
    getFavs()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trending Courses</Text>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={trendingCourses}
          renderItem={({item, index}) => {
            return <CourseCard1 onFavClick={()=>updateFavCourses(checkFav(item.courseId),item)} item={item} isFav={checkFav(item.courseId)} />;
          }}
        />
      </View>

      <Text style={styles.heading}>Latest Courses</Text>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={trendingCourses}
          renderItem={({item, index}) => {
            return <CourseCard2 item={item} isFav={()=>checkFav(item.courseId)} onFavClick={()=>updateFavCourses(checkFav(item.courseId),item)}/>;
          }}
        />
      </View>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    marginTop: moderateScale(10),
    marginLeft: moderateScale(20),
    color: TEXT_COLOR,
  },
});
