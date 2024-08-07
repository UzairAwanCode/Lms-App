import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale} from 'react-native-size-matters';
import {BG_COLOR, TEXT_COLOR} from '../utils/Colors';

const FavCourseItem = ({item, onFavClick}) => {
  return (
    <View style={styles.card}>
      <Image source={{uri: item.banner}} style={styles.banner} />
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.price}>{'PKR ' + item.price}</Text>
      </View>
      <TouchableOpacity style={styles.favView} onPress={()=>onFavClick()}>
        <Image source={require("../../assets/fav-fill.png")} style={[styles.fav,{tintColor: 'red'}]}/>
      </TouchableOpacity>
    </View>
  );
};

export default FavCourseItem;

const styles = StyleSheet.create({
  card: {
    width: '90%',
    height: scale(100),
    backgroundColor: BG_COLOR,
    marginTop: moderateScale(20),
    borderRadius: moderateScale(8),
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  banner: {
    width: scale(80),
    height: scale(80),
    borderRadius: moderateScale(8),
    marginLeft: scale(18),
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
  favView:{
    width: scale(40),
    height: scale(40),
    backgroundColor: "#fff",
    borderRadius: scale(20),
    position: 'absolute',
    right: 10,
    top: 10,
    justifyContent: 'center',
    alignItems:'center'
  },
  fav:{
    width: scale(26),
    height: scale(26)
  }
});
