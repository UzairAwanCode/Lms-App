import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {moderateScale} from 'react-native-size-matters';
import {TEXT_COLOR} from '../../../utils/Colors';
import CourseCard1 from '../../../components/CourseCard1';
import CourseCard2 from '../../../components/CourseCard2';

const Home = () => {
  const navigation = useNavigation();
  const [trendingCourses, setTrendingCourses] = useState([]);

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = async () => {
    const res = await firestore().collection('courses').get();
    let temp = [];

    res.docs.forEach(item => {
      temp.push({courseId: item.id, ...item.data()});
    });
    setTrendingCourses(temp);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Trending Courses</Text>
      <View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={trendingCourses}
          renderItem={({item, index}) => {
            return <CourseCard1 item={item}/>;
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
