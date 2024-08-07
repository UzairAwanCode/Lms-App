import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import FavCourseItem from '../../../components/FavCourseItem';

const Favourities = () => {
  const [courses, setCourses] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getCourses();
  }, [isFocused]);

  const getCourses = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const userData = await firestore().collection('learners').doc(userId).get();
    setCourses(userData.data().favCourses);
  };

  const updateFavCourses = async item => {
    const userId = await AsyncStorage.getItem('USERID');

    let favs = courses.filter(x => x.courseId != item.courseId);
    await firestore().collection('learners').doc(userId).update({
      favCourses: favs,
    });
    getCourses();
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={({item}) => {
          return (
            <FavCourseItem
              item={item}
              onFavClick={() => {
                updateFavCourses(item);
              }}
            />
          );
        }}
      />
    </View>
  );
};

export default Favourities;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
