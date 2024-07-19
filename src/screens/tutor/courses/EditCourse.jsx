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

const EditCourse = () => {
  const route = useRoute();
  const [title, setTitle] = useState(route.params.data.title);
  const [desc, setDesc] = useState(route.params.data.description);
  const [price, setPrice] = useState(route.params.data.price);
  const [isActive, setIsActive] = useState(route.params.data.isActive);
  const [bannerImage, setBannerImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const addBanner = async () => {
    const res = await launchCamera({mediaType: 'photo'});
    if (!res.didCancel) {
      setBannerImage(res);
    }
  };

  const updateCourse = async () => {
    setLoading(true);
    const name = await AsyncStorage.getItem('NAME');
    const email = await AsyncStorage.getItem('EMAIL');
    const userId = await AsyncStorage.getItem('USERID');
    let url = '';

    if (bannerImage != null) {
      const reference = storage().ref(bannerImage.assets[0].fileName);
      const pathToFile = bannerImage.assets[0].uri;
      // Upload File
      await reference.putFile(pathToFile);
      url = await storage()
        .ref(bannerImage.assets[0].fileName)
        .getDownloadURL();
    }
    await firestore()
      .collection('courses')
      .doc(route.params.data.courseId)
      .update({
        title: title,
        description: desc,
        price: price,
        isActive: isActive,
        banner: bannerImage == null ? route.params.data.banner : url,
        userName: name,
        userEmail: email,
        userId: userId,
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
        ) : bannerImage == null ? (
          <Image
            source={{uri: route.params.data.banner}}
            style={styles.banner}
          />
        ) : (
          <View style={styles.bannerImageContainer}>
            <Image
              style={styles.add}
              source={require('../../../../assets/plus-black.png')}
            />
            <Text style={styles.addText}>Add Course Banner</Text>
          </View>
        )}
      </TouchableOpacity>
      <CustomInput
        placeholder="Enter Course Title"
        value={title}
        onChangeText={txt => {
          setTitle(txt);
        }}
      />
      <CustomInput
        placeholder="Enter Course Desc"
        value={desc}
        multiline={true}
        onChangeText={txt => {
          setDesc(txt);
        }}
      />
      <CustomInput
        placeholder="Enter Course Price"
        value={price}
        keyboardType={'numeric'}
        onChangeText={txt => {
          setPrice(txt);
        }}
      />
      <View style={styles.activeView}>
        <Text style={styles.addText}>Course Is Active:</Text>
        <Switch value={isActive} onValueChange={value => setIsActive(value)} />
      </View>
      <View style={styles.gap}>
        <BgButton
          onClick={() => updateCourse()}
          title={'Upload Course'}
          color={WHITE}
        />
      </View>
      <Loader visible={loading} />
    </ScrollView>
  );
};

export default EditCourse;

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
