import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters';
import { BG_COLOR, BORDER_COLOR, TEXT_COLOR, THEME_COLOR } from '../utils/Colors';

const BorderButton = ({bg, title, onClick, color}) => {
  return (
    <TouchableOpacity
      style={[styles.btn, {borderColor: bg ? bg : BORDER_COLOR}]}
      onPress={onClick}>
      <Text style={[styles.title, {color: color ? color : TEXT_COLOR}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default BorderButton;

const styles = StyleSheet.create({
  btn: {
    width: '90%',
    height: verticalScale(50),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(10),
    borderWidth: 1,
    backgroundColor: BG_COLOR
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
});
