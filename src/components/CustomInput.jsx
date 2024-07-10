import React, {useState} from 'react';
import {View, Text, StyleSheet, TextInput} from 'react-native';
import {moderateScale, moderateVerticalScale, verticalScale} from 'react-native-size-matters';
import {BORDER_COLOR, TEXT_COLOR, THEME_COLOR} from '../utils/Colors';

const CustomInput = ({onChangeText, value, placeholder, multiline, keyboardType}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      style={[
        styles.container,
        {borderColor: isFocused ? THEME_COLOR : BORDER_COLOR, height: multiline ? verticalScale(100) : verticalScale(50),},
      ]}>
      <TextInput
        onSubmitEditing={() => setIsFocused(false)}
        onBlur={() => {
          setIsFocused(false);
        }}
        onFocus={() => setIsFocused(true)}
        style={styles.inputField}
        placeholder= {placeholder ? placeholder : ''}
        placeholderTextColor={'#9e9e9e'}
        value={value}
        onChangeText={onChangeText}
        keyboardType= {keyboardType ? keyboardType : 'default'} 
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderWidth: 1,
    borderColor: BORDER_COLOR,
    borderRadius: moderateScale(8),
    alignSelf: 'center',
    marginTop: moderateVerticalScale(15),
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
  },
  inputField: {
    color: TEXT_COLOR,
  },
});
