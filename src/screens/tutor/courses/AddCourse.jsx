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

const AddCourse = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [isActive, setIsActive] = useState(true);
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.bannerView}>
        <Image
          style={styles.add}
          source={require('../../../../assets/plus-black.png')}
        />
        <Text style={styles.addText}>Add Course Banner</Text>
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
        <BgButton title={'Upload Course'} color={WHITE} />
      </View>
    </ScrollView>
  );
};

export default AddCourse;

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
  gap:{
    marginBottom: moderateVerticalScale(100)
  }
});
