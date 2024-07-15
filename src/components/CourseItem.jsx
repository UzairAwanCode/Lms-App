import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import {TEXT_COLOR, WHITE} from '../utils/Colors';

const CourseItem = ({item, index, data}) => {
  return (
    <View
      style={[
        styles.container,
        {
          marginBottom:
            data.length - 1 == index
              ? moderateVerticalScale(100)
              : moderateVerticalScale(5),
        },
      ]}>
      <Image
        source={
          item.banner
            ? {uri: item.banner}
            : require('../../assets/placeholder.png')
        }
        style={{
          width: '100%',
          height: verticalScale(120),
          borderRadius: moderateScale(8),
        }}
      />

      <Text style={styles.titleText}>{item.title}</Text>
      <Text style={[styles.descText, {color: TEXT_COLOR}]}>
        {item.description}
      </Text>
      <Text style={[styles.descText, {color: 'green'}]}>
        {'Rs.' + item.price}
      </Text>
    </View>
  );
};

export default CourseItem;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingBottom: moderateScale(10),
    alignSelf: 'center',
    elevation: 5,
    marginTop: moderateScale(20),
    backgroundColor: WHITE,
    borderRadius: moderateScale(8),
  },
  titleText: {
    color: TEXT_COLOR,
    fontSize: moderateScale(18),
    fontWeight: '700',
    marginTop: moderateScale(10),
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
  },
  descText: {
    fontSize: moderateScale(14),
    fontWeight: '500',
    marginLeft: moderateScale(10),
    marginRight: moderateScale(10),
    opacity: 0.8,
  },
});
