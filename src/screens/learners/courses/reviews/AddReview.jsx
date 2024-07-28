import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Rating, AirbnbRating} from 'react-native-ratings';
import {BG_COLOR} from '../../../../utils/Colors';
import {moderateVerticalScale} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import CustomInput from '../../../../components/CustomInput';
import BgButton from '../../../../components/BgButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, useRoute } from '@react-navigation/native';
import Loader from '../../../../components/Loader';

const AddReview = () => {
  const [ratings, setRatings] = useState(0);
  const [reviews, setReviews] = useState('');
  const route = useRoute()
  const navigation = useNavigation()
  const [visible, setVisible] = useState(false)
  const ratingCompleted = rating => {
    console.log('Rating is: ' + rating);
    setRatings(rating);
  };

  const postReview = async()=>{
    setVisible(true)
    const name = await AsyncStorage.getItem("NAME")
    const userId = await AsyncStorage.getItem("USERID")
    await firestore().collection("reviews").add({
      postedBy:{
        name: name,
        userId: userId
      },
      review: reviews,
      ratings: ratings,
      courseId: route.params.courseId
    })
    setReviews(false)
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
      <View style={styles.ratingView}>
        <Rating
          // showRating
          onFinishRating={ratingCompleted}
          style={{paddingVertical: 10}}
          minValue={0}
          ratingCount={5}
          startingValue={0}
        />
      </View>

      <CustomInput
        placeholder={'Type Review Here....'}
        onChangeText={text => setReviews(text)}
        value={reviews}
      />
      <BgButton title={"Post Review"} color={'white'} onClick={postReview}/>
      <Loader visible={visible}/>
    </View>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },
  ratingView: {
    marginTop: moderateVerticalScale(50),
  },
});
