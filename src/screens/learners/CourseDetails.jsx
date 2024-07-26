import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BG_COLOR, TEXT_COLOR} from '../../utils/Colors';
import ChapterItem from '../../components/ChapterItem';
import CourseCard2 from '../../components/CourseCard2';
import BorderButton from '../../components/BorderButton';

const CourseDetails = () => {
  const route = useRoute();
  const [courseData, setCourseData] = useState(null);
  const [chapters, setChapters] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getCourseDetails();
    getChapters();
  }, [isFocused]);

  const getCourseDetails = async () => {
    const res = await firestore()
      .collection('courses')
      .doc(route.params.data.courseId)
      .get();
    setCourseData(res.data()); //Write down this point on register we put data() when data is in the form of _data
  };

  const getChapters = async () => {
    const res = await firestore().collection('chapters').get();
    let temp = [];
    res.docs.forEach(item => {
      if (item.data().courseID == route.params.data.courseId) {
        temp.push({chapterId: item.id, ...item.data()});
      }
    });
    setChapters(temp);
  };
  return (
    <FlatList
      data={[1]}
      renderItem={(item, index) => {
        return (
          <View style={styles.container}>
            {courseData != null && (
              <Image source={{uri: courseData.banner}} style={styles.banner} />
            )}
            {courseData != null && (
              <Text style={styles.title}>{courseData.title}</Text>
            )}
            {courseData != null && (
              <Text style={styles.desc}>{courseData.description}</Text>
            )}
            <View style={styles.seperator}></View>
            <Text style={styles.title}>Chapters</Text>
            <FlatList
              data={chapters}
              renderItem={({item, index}) => {
                return <ChapterItem item={item} index={index} />;
              }}
            />
            <Text style={styles.title}>Reviews</Text>
            <View style={styles.btnMargin}>
              <BorderButton title={'Post Review'} />
            </View>
          </View>
        );
      }}
    />
  );
};

export default CourseDetails;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  banner: {
    width: '100%',
    height: verticalScale(200),
  },
  title: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    color: TEXT_COLOR,
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(10),
  },
  desc: {
    color: TEXT_COLOR,
    width: '90%',
    alignSelf: 'center',
    marginTop: moderateScale(5),
    fontSize: moderateScale(15),
  },
  seperator: {
    width: '100%',
    height: 1,
    backgroundColor: '#9e9e9e',
    opacity: 0.4,
    marginTop: moderateScale(20),
  },
  btnMargin: {
    marginBottom: verticalScale(100),
  },
});
