import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {BG_COLOR, THEME_COLOR, WHITE} from '../../../utils/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';

const LiveCourses = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addBtn} onPress={()=>navigation.navigate("AddCourse")}>
        <Image
          source={require('../../../../assets/plus.png')}
          style={styles.addIcon}
        />
        <Text style={styles.addText}>Add New Course</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LiveCourses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },

  addBtn:{
    backgroundColor: THEME_COLOR,
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(30),
    flexDirection:"row",
    position: 'absolute',
    bottom:moderateScale(20),
    right: moderateScale(20),
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15)
  },
  addIcon:{
    width: scale(20),
    height: scale(20)
  },
  addText:{
    color: WHITE,
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginLeft:moderateScale(10)
  }
});
