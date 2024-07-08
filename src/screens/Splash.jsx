import React, { useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, Image } from 'react-native';
import { TEXT_COLOR, THEME_COLOR } from '../utils/Colors';
import { SPLASH_TAGLINE } from '../utils/Strings';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation()
  useEffect(()=>{
    setTimeout(()=>{
      navigation.navigate("ChooseUserType")
    },2000)
  },[])
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={THEME_COLOR}/>
      <Image source={require("../../assets/education.png")} style={styles.logo}/>
      <Text style={styles.tagline}>{SPLASH_TAGLINE}</Text>
    </View>
  );
}

export default Splash;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME_COLOR
  },
  logo:{
    width:"50%",
    height:"30%"
  },
  tagline:{
    color: TEXT_COLOR,
    fontWeight: '600',
    fontSize: 16
  }
})
