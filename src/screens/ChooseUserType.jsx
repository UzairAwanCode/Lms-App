import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import BgButton from '../components/BgButton';
import BorderButton from '../components/BorderButton';
import { BG_COLOR, TEXT_COLOR, THEME_COLOR, WHITE } from '../utils/Colors';
import { LEARNER_TITLE, SELECT_USER, TUTOR_TITLE } from '../utils/Strings';

const ChooseUserType = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/users.jpg")} style={styles.banner}/>
      <Text style={styles.heading}>{SELECT_USER}</Text>
      <BgButton title={TUTOR_TITLE} color={WHITE} onClick={()=>navigation.navigate("Login", {screen:'tutor'})}/>
      <BorderButton title={LEARNER_TITLE} color={THEME_COLOR} onClick={()=>navigation.navigate("Login", {screen:'learner'})}/>
    </View>
  );
}

export default ChooseUserType;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: BG_COLOR
  },
  banner:{
    width:"100%",
    height:"30%"
  },
  heading:{
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: TEXT_COLOR,
    alignSelf: 'center',
    marginTop: moderateVerticalScale(30),
  }
})
