import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Switch,
} from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {TEXT_COLOR, WHITE} from '../../../utils/Colors';
import CustomInput from '../../../components/CustomInput';
import BgButton from '../../../components/BgButton';
import {launchCamera} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loader from '../../../components/Loader';

const AddChapter = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [isLocked, setIsLocked] = useState(true);
  const [bannerImage, setBannerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [videoData, setVideoData] = useState(null);
  const route = useRoute();

  const addBanner = async () => {
    const res = await launchCamera({mediaType: 'photo'});
    if (!res.didCancel) {
      setBannerImage(res);
    }
  };

  const recordChapter = async () => {
    const res = await launchCamera({mediaType: 'mixed'});
    console.log(res);
    if (!res.didCancel) {
      setVideoData(res);
    }
  };

  const uploadChapter = async () => {
    setLoading(true);
    const name = await AsyncStorage.getItem('NAME');
    const email = await AsyncStorage.getItem('EMAIL');
    const userId = await AsyncStorage.getItem('USERID');

    // Picture Reference
    const reference = storage().ref(bannerImage.assets[0].fileName);
    const pathToFile = bannerImage.assets[0].uri;

    await reference.putFile(pathToFile);
    const url = await storage()
      .ref(bannerImage.assets[0].fileName)
      .getDownloadURL();

    // Video Reference
    const reference1 = storage().ref(videoData.assets[0].fileName);
    const pathToFile1 = videoData.assets[0].uri;

    await reference1.putFile(pathToFile1);
    const videoUrl = await storage()
      .ref(videoData.assets[0].fileName)
      .getDownloadURL();

    await firestore().collection('chapters').add({
      title: title,
      description: desc,
      isLocked: isLocked,
      banner: url,
      video: videoUrl,
      userName: name,
      userEmail: email,
      userId: userId,
      courseID: route.params.data.courseId,
    });
    setLoading(false);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.bannerView} onPress={() => addBanner()}>
        {bannerImage != null ? (
          <Image
            source={{uri: bannerImage.assets[0].uri}}
            style={styles.banner}
          />
        ) : (
          <View style={styles.bannerImageContainer}>
            <Image
              style={styles.add}
              source={require('../../../../assets/plus-black.png')}
            />
            <Text style={styles.addText}>Add Chapter Banner</Text>
          </View>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.bannerView}
        onPress={() => recordChapter()}>
        {videoData != null ? (
          <Image
            source={{uri: videoData.assets[0].uri}}
            style={styles.banner}
          />
        ) : (
          <View style={styles.bannerImageContainer}>
            <Image
              style={styles.add}
              source={require('../../../../assets/plus-black.png')}
            />
            <Text style={styles.addText}>Add Chapter Video</Text>
          </View>
        )}
      </TouchableOpacity>

      <CustomInput
        placeholder="Enter Chapter Title"
        value={title}
        onChangeText={txt => {
          setTitle(txt);
        }}
      />
      <CustomInput
        placeholder="Enter Chapter Desc"
        value={desc}
        multiline={true}
        onChangeText={txt => {
          setDesc(txt);
        }}
      />
      <View style={styles.activeView}>
        <Text style={styles.addText}>Chapter Is Locked:</Text>
        <Switch value={isLocked} onValueChange={value => setIsLocked(value)} />
      </View>
      <View style={styles.gap}>
        <BgButton
          onClick={() => uploadChapter()}
          title={'Upload Chapter'}
          color={WHITE}
        />
      </View>
      <Loader visible={loading} />
    </ScrollView>
  );
};

export default AddChapter;

const styles = StyleSheet.create({
  container: {flex: 1},
  bannerView: {
    width: '90%',
    height: verticalScale(180),
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: moderateVerticalScale(20),
    borderRadius: moderateScale(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#9e9e9e',
  },
  add: {
    width: scale(20),
    height: scale(20),
  },
  addText: {
    marginTop: moderateVerticalScale(10),
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: TEXT_COLOR,
  },
  activeView: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: moderateVerticalScale(20),
    marginBottom: moderateVerticalScale(20),
  },
  gap: {
    marginBottom: moderateVerticalScale(100),
  },
  bannerImageContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(8),
  },
});
