import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { BG_COLOR, TEXT_COLOR } from '../utils/Colors';
import { useNavigation } from '@react-navigation/native';

const CourseCard1 = ({item}) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity style={styles.card} onPress={()=>{
      navigation.navigate("CourseDetails", {data:item})
    }}>
      <Image source={{uri: item.banner}} style={styles.banner} />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>{'PKR ' + item.price}</Text>
    </TouchableOpacity>
  );
};

export default CourseCard1;

const styles = StyleSheet.create({
  card: {
    width: scale(200),
    height: scale(170),
    backgroundColor: BG_COLOR,
    marginTop: moderateScale(20),
    marginLeft: moderateScale(10),
    borderRadius: moderateScale(8),
  },
  banner: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: moderateScale(8),
    borderTopRightRadius: moderateScale(8),
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    margin: moderateScale(5),
    color: TEXT_COLOR,
    width: '90%',
    alignSelf: 'center',
  },
  price: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginLeft: moderateScale(10),
    color: 'green',
  },
});
