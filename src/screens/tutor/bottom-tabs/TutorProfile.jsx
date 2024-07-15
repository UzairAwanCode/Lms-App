import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import firestore from '@react-native-firebase/firestore';
import { TEXT_COLOR } from '../../../utils/Colors';

const TutorProfile = () => {
  const isFocused = useIsFocused();
  const [userData, setUserData] = useState(null);

  const getData = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    const user = await firestore().collection('tutors').doc(userId).get();
    if (user.data != null) {
      setUserData(user.data());
    }
  };

  useEffect(() => {
    getData();
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <Image
        style={styles.user}
        source={require('../../../../assets/profile.png')}
      />
      {userData!=null && <Text style={styles.details}>{userData.user.name}</Text>}
      {userData!=null && <Text style={styles.details}>{userData.user.email}</Text>}
    </View>
  );
};

export default TutorProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  user: {
    width: scale(80),
    height: scale(80),
    alignSelf: 'center',
    marginTop: moderateScale(20),
  },
  details:{
    fontSize: moderateScale(16),
    fontWeight: '600',
    alignSelf: 'center',
    color: TEXT_COLOR,
    marginTop: moderateScale(10)
  }
});
