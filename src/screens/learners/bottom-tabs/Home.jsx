import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {moderateScale} from 'react-native-size-matters';
import {TEXT_COLOR} from '../../../utils/Colors';
import CourseCard1 from '../../../components/CourseCard1';
import CourseCard2 from '../../../components/CourseCard2';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = () => {
  const navigation = useNavigation();
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [favCourses, setFavCourses] = useState([])
  useEffect(() => {
    getCourses();
    getFavs()
  }, []);

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
    
    return isFav
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
            return <CourseCard1 item={item} isFav={()=>checkFav(item.courseId)} onFavClick={()=>updateFavCourses(checkFav(item.courseId),item)}/>;
          }}
        />
      </View>

      <Text style={styles.heading}>Latest Courses</Text>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          data={trendingCourses}
          renderItem={({item, index}) => {
            return <CourseCard2 item={item}/>;
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
