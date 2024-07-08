import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {BG_COLOR, TEXT_COLOR, WHITE} from '../../utils/Colors';
import {useNavigation, useRoute} from '@react-navigation/native';

const Login = () => {
  const router = useRoute();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/login.jpg')}
        style={styles.banner}
      />
      <Text style={styles.heading}>Welcome User, </Text>
      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          if (router.params.screen === 'tutor') {
            navigation.navigate('TutorHome');
          }
        }}>
        <Image
          source={require('../../../assets/google.png')}
          style={styles.google}
        />
        <Text style={styles.btnText}>Login With Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: BG_COLOR,
    flex: 1,
  },
  banner: {
    width: '100%',
    height: verticalScale(200),
  },
  heading: {
    color: TEXT_COLOR,
    fontSize: moderateScale(18),
    fontWeight: '500',
    marginLeft: moderateScale(20),
    marginTop: moderateScale(20),
  },
  loginBtn: {
    backgroundColor: WHITE,
    width: '90%',
    height: verticalScale(50),
    elevation: 5,
    alignSelf: 'center',
    marginTop: moderateScale(20),
    borderRadius: moderateScale(5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: moderateScale(10),
    paddingRight: moderateScale(10),
  },
  google: {
    width: scale(24),
    height: scale(24),
  },
  btnText: {
    color: TEXT_COLOR,
    fontSize: moderateScale(18),
    marginLeft: moderateScale(20),
  },
});
