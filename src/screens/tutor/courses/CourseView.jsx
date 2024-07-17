import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import BorderButton from '../../../components/BorderButton';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { TEXT_COLOR } from '../../../utils/Colors';

const CourseView = () => {
    const navigaton = useNavigation()
    const route = useRoute()
  return (
    <View style={styles.container}>
      <Image source={{uri:route.params.item.banner}} style={styles.banner}/>
      <Text style={styles.title}>{route.params.item.title}</Text>
      <Text style={styles.desc}>{route.params.item.description}</Text>
      <BorderButton title={'Add Chapter'} onClick={()=>{navigaton.navigate("AddChapter", {data:route.params.item})}}/>
    </View>
  );
}

export default CourseView;

const styles = StyleSheet.create({
    container:{flex:1},
    banner:{
        width:'100%',
        height: verticalScale(180)
    },
    title:{
        fontSize: moderateScale(20),
        color: TEXT_COLOR,
        fontWeight: '800',
        width: "90%",
        alignSelf: 'center',
        marginTop: moderateVerticalScale(10)
    },
    desc:{
        fontSize: moderateScale(16),
        fontWeight: '500',
        color: TEXT_COLOR,
        width:'90%',
        alignSelf:'center',
        marginTop: moderateVerticalScale(5)
    }
})
