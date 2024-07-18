import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { BG_COLOR, TEXT_COLOR } from '../utils/Colors';

const ChapterItem = ({item}) => {
  return (
    <TouchableOpacity style={styles.container} disabled={item.isLocked ? true : false}>
      <Image source={{uri: item.banner}} style={{width: scale(80), height: scale(80), opacity:item.isLocked?0.4 : 1}}/>

      <View style={{marginLeft: moderateScale(10)}}>
        <Text style={{fontSize:moderateScale(18), fontWeight: '600', color: TEXT_COLOR, opacity:item.isLocked?0.4 : 1}}>{item.title}</Text>
        <Text style={{color:"#6e6e6e", opacity:item.isLocked?0.4 : 1}}>{item.description}</Text>
        {item.isLocked && (<Text style={{color:"#6e6e6e", opacity:item.isLocked?0.4 : 1}}>{'Chapter Is Locked'}</Text>)}
      </View>
    </TouchableOpacity>
  );
}

export default ChapterItem;

const styles = StyleSheet.create({
    container:{
        width:'90%',
        backgroundColor: BG_COLOR,
        alignSelf: 'center',
        marginTop: moderateScale(10),
        flexDirection: 'row',
        padding: moderateScale(10),
        borderRadius: moderateScale(8)
    }
})