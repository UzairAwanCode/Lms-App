import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import { TEXT_COLOR } from '../../../utils/Colors';

const AddCourse = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bannerView}>
        <Image style={styles.add} source={require("../../../../assets/plus-black.png")}/>
        <Text style={styles.addText}>Add Course Banner</Text>
      </TouchableOpacity>
    </View>
  );
}

export default AddCourse;

const styles = StyleSheet.create({
    container:{flex:1},
    bannerView:{
        width:"90%",
        height: verticalScale(180),
        borderWidth:1,
        alignSelf:'center',
        marginTop: moderateVerticalScale(20),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#9e9e9e"
    },
    add:{
        width: scale(20),
        height: scale(20)
    },
    addText:{
        marginTop: moderateVerticalScale(10),
        fontSize: moderateScale(16),
        fontWeight: '600',
        color: TEXT_COLOR
    }
})
