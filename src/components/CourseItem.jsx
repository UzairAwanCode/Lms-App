import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {BG_COLOR, TEXT_COLOR, WHITE} from '../utils/Colors';
import {useNavigation} from '@react-navigation/native';

const CourseItem = ({item, index, data, onClickOption}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          marginBottom:
            data.length - 1 == index
              ? moderateVerticalScale(100)
              : moderateVerticalScale(5),
        },
      ]}
      onPress={() => {
        navigation.navigate('CourseView', {item: item});
      }}>
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

      <TouchableOpacity style={styles.options} onPress={onClickOption}>
        <Image source={require("../../assets/more.png")} style={{width:scale(18), height:scale(18)}} />
      </TouchableOpacity>
    </TouchableOpacity>
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
  options: {
    width: scale(30),
    height: scale(30),
    backgroundColor: BG_COLOR,
    position: 'absolute',
    right: moderateScale(10),
    top: moderateScale(10),
    borderRadius: scale(15),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
