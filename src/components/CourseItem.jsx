import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { TEXT_COLOR, WHITE } from '../utils/Colors';

const CourseItem = ({item, index, data}) => {
  return (
    <View style={[styles.container, {marginBottom: data.length-1 == index ? moderateVerticalScale(100) : moderateVerticalScale(5)}]}>
      <Image source={require("../../assets/placeholder.png")} style={{width:"100%", height:"60%"}}/>
      <Text style={styles.titleText}>React Native Components</Text>
      <Text style={styles.descText}>Two type of components are available in react native</Text>
    </View>
  );
}

export default CourseItem;

const styles = StyleSheet.create({
    container:{
        width: '90%',
        height: verticalScale(200),
        alignSelf: 'center',
        elevation:5,
        marginTop: moderateScale(20),
        backgroundColor: WHITE,
        borderRadius: moderateScale(8)
    },
    titleText:{
        color: TEXT_COLOR,
        fontSize: moderateScale(18),
        fontWeight: '700',
        marginTop: moderateScale(10),
        marginLeft: moderateScale(10),
        marginRight: moderateScale(10),
    },
    descText:{
        color: TEXT_COLOR,
        fontSize: moderateScale(14),
        fontWeight: '500',
        marginLeft: moderateScale(10),
        marginRight: moderateScale(10),
        opacity: 0.8
    }
})
