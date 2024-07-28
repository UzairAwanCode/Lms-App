import firestore from '@react-native-firebase/firestore';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import BgButton from '../../components/BgButton';
import BorderButton from '../../components/BorderButton';
import ChapterItem from '../../components/ChapterItem';
import {BG_COLOR, TEXT_COLOR} from '../../utils/Colors';

const CourseDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [courseData, setCourseData] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [reviews, setReviews] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getCourseDetails();
    getChapters();
    getReviews();
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
  const getReviews = async () => {
    const res = await firestore().collection('reviews').get();
    let temp = [];
    res.docs.forEach(item => {
      if (item.data().courseId == route.params.data.courseId) {
        temp.push({reviewsId: item.id, ...item.data()});
      }
    });
    setReviews(temp);
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
            <BgButton title={'Buy Course'} color={'white'} />
            <View style={styles.seperator}></View>
            <Text style={styles.title}>Chapters</Text>
            <FlatList
              data={chapters}
              renderItem={({item, index}) => {
                return <ChapterItem item={item} index={index} />;
              }}
            />
            <Text style={styles.title}>Reviews</Text>
            <FlatList
              data={reviews}
              renderItem={({item, index}) => {
                return (
                  <View style={styles.reviewItem}>
                    <View style={styles.userStyle}>
                      <Image
                        style={styles.userImage}
                        source={require('../../../assets/user.png')}
                      />
                      <View>
                        <Text style={styles.userName}>
                          {item.postedBy.name}
                        </Text>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                          <Text style={styles.userName}>{item.ratings}</Text>
                          <Image source={require("../../../assets/reviews-star.png")} style={styles.star}/>
                        </View>
                      </View>
                    </View>
                    <Text style={styles.review}>{item.review}</Text>
                  </View>
                );
              }}
            />
            <View style={styles.btnMargin}>
              <BorderButton
                title={'Post Review'}
                onClick={() =>
                  navigation.navigate('AddReview', {
                    courseId: route.params.data.courseId,
                    title: courseData.title,
                  })
                }
              />
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
    backgroundColor: "#f2f2f2",
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
  reviewItem:{
    width: "90%",
    alignSelf:'center',
    marginTop: moderateScale(10)
  },
  userStyle:{
    flexDirection:'row',
    alignItems:'center',
  },
  userImage: {
    width: scale(30),
    height: scale(30)
  },
  userName:{
    marginLeft: moderateScale(10),
    fontSize: moderateScale(16),
    color: TEXT_COLOR,
    marginRight: moderateScale(5)
  },
  star: {
    width: scale(16),
    height: scale(16)
  },
  review:{
    backgroundColor:BG_COLOR,
    color: TEXT_COLOR,
    padding: moderateScale(10),
    borderRadius: moderateScale(10)
  }
});
