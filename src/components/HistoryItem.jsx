import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
    moderateScale,
    moderateVerticalScale,
    verticalScale,
} from 'react-native-size-matters';
import { TEXT_COLOR, WHITE } from '../utils/Colors';

const HistoryItem = ({item, index, data}) => {
  return (
    <View
      style={[
        styles.container,
        {
          marginBottom:
            data.length - 1 == index ? moderateScale(20) : moderateScale(5),
        },
      ]}>
      <Text style={styles.courseHeading}>Course Details:</Text>
      <Text style={styles.courseDetails}>Course Name: React Native</Text>
      <Text style={styles.courseDetails}>Price: RS. 4999</Text>
      <Text
        style={[styles.courseHeading, {marginTop: moderateVerticalScale(20)}]}>
        Purchased By:
      </Text>
      <Text style={styles.courseDetails}>Name: Uzair</Text>
      <Text style={styles.courseDetails}>Email: dummy123@gmail.com</Text>
      <Text style={styles.courseDetails}>Date: 10 July 2024</Text>
    </View>
  );
};

export default HistoryItem;
const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: WHITE,
    borderRadius: moderateScale(8),
    marginTop: moderateScale(20),
    alignSelf: 'center',
    padding: moderateScale(10),
  },
  courseHeading: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: TEXT_COLOR,
  },
  courseDetails: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    color: TEXT_COLOR,
  },
});
