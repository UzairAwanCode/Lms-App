import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { BG_COLOR, TEXT_COLOR, WHITE } from '../../utils/Colors';

const Login = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const _signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log(userInfo);
      storeData(userInfo);
    } catch (error) {
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.SIGN_IN_CANCELLED:
            // user cancelled the login flow
            break;
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  useEffect(() => {
    GoogleSignin.configure();
  }, []);

  const storeData = async data => {
    const collection = route.params.screen == 'tutor' ? 'tutors' : 'learners';
    await firestore().collection(collection).doc(data.user.id).set(data);
    await AsyncStorage.setItem('NAME', data.user.name);
    await AsyncStorage.setItem('EMAIL', data.user.email);
    await AsyncStorage.setItem('USERID', data.user.id);
    if (route.params.screen == 'tutor') {
      navigation.navigate('TutorHome');
    }
  };
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
          _signIn();
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
