import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
} from 'react-native';
import {BG_COLOR, LIGHT_GREY, TEXT_COLOR, THEME_COLOR, WHITE} from '../../../utils/Colors';
import {moderateScale, scale, verticalScale} from 'react-native-size-matters';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CourseItem from '../../../components/CourseItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
import Loader from '../../../components/Loader';

const LiveCourses = () => {
  const navigation = useNavigation();
  const [courses, setCourses] = useState([]);
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const isFocused = useIsFocused();

  useEffect(() => {
    getCourses();
  }, [isFocused]);

  const getCourses = async () => {
    // const userId = await AsyncStorage.getItem('USERID');
    const data = await firestore().collection('courses').get();
    let temp = [];
    data.docs.forEach(item => {
      temp.push({courseId: item.id, ...item.data()});
    });
    setCourses(temp);
    setLoading(false)
  };

  const deleteCourse = async()=>{
    setLoading(true)
    await firestore().collection("courses").doc(selectedItem.courseId).delete()
    getCourses()
    setShowDeleteModal(false)
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={courses}
        renderItem={({item, index}) => {
          return (
            <CourseItem
              item={item}
              index={index}
              data={[1, 1, 1, 1, 1, 1, 1]}
              onClickOption={() => {
                setSelectedItem(item);
                setShowOptionModal(true);
              }}
            />
          );
        }}
      />
      <TouchableOpacity
        style={styles.addBtn}
        onPress={() => navigation.navigate('AddCourse')}>
        <Image
          source={require('../../../../assets/plus.png')}
          style={styles.addIcon}
        />
        <Text style={styles.addText}>Add New Course</Text>
      </TouchableOpacity>

      <Modal
        isVisible={showOptionModal}
        backdropOpacity={0.3}
        onBackButtonPress={() => setShowOptionModal(false)}
        onBackdropPress={() => setShowOptionModal(false)}
        style={{margin: 0}}>
        <View style={styles.bottomSheet}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Select Option</Text>
            <TouchableOpacity onPress={()=>{
              setShowOptionModal(false)
              setSelectedItem(null)
            }}>
              <Image
                source={require('../../../../assets/close.png')}
                style={styles.close}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={[styles.optionItems,{marginTop: moderateScale(10)}]} onPress={()=>{
            setShowOptionModal(false)
            setShowDeleteModal(true)
          }}>
            <Image source={require("../../../../assets/trash.png")} style={{width:scale(20), height:scale(20)}}/>
            <Text style={styles.optionTitle}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionItems} onPress={()=>{
            setShowOptionModal(false)
            navigation.navigate("EditCourse", {data: selectedItem})
          }}>
            <Image source={require("../../../../assets/edit.png")} style={{width:scale(20), height:scale(20)}}/>
            <Text style={styles.optionTitle}>Edit</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal isVisible={showDeleteModal} onBackButtonPress={()=>{setShowDeleteModal(false)}} backdropOpacity={0.3}>
        <View style={styles.confirmModal}>
          <Text style={[styles.headerTitle,{marginTop:moderateScale(20), width:'90%', alignSelf:'center',textAlign:'center'}]}>Do you want to delete this course?</Text>
          <View style={styles.bottomView}>
            <TouchableOpacity style={styles.cancelBtn} onPress={()=>{
              setShowDeleteModal(false)
              setShowOptionModal(true)
            }}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.cancelBtn,{backgroundColor:'red'}]} onPress={()=>{deleteCourse()}}>
              <Text style={styles.cancelBtnText}>Yes,Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Loader visible={loading}/>
    </View>
  );
};

export default LiveCourses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BG_COLOR,
  },

  addBtn: {
    backgroundColor: THEME_COLOR,
    height: verticalScale(50),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(30),
    flexDirection: 'row',
    position: 'absolute',
    bottom: moderateScale(20),
    right: moderateScale(20),
    paddingLeft: moderateScale(15),
    paddingRight: moderateScale(15),
  },
  addIcon: {
    width: scale(20),
    height: scale(20),
  },
  addText: {
    color: WHITE,
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginLeft: moderateScale(10),
  },
  bottomSheet: {
    width: '100%',
    paddingBottom: moderateScale(10),
    backgroundColor: BG_COLOR,
    position: 'absolute',
    bottom: 0,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  header: {
    width: '90%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(15),
  },
  headerTitle: {
    fontSize: moderateScale(16),
    color: TEXT_COLOR,
    fontWeight: '600',
  },
  close: {
    width: scale(20),
    height: scale(20),
  },
  optionItems:{
    width: '90%',
    height: verticalScale(40),
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
  },
  optionTitle:{
    fontSize:moderateScale(16),
    fontWeight: '600',
    color: TEXT_COLOR,
    marginLeft: moderateScale(10)
  },
  confirmModal:{
    width: '100%',
    paddingBottom: moderateScale(15),
    backgroundColor: BG_COLOR,
    borderRadius:moderateScale(8),
    alignItems: 'center'
  },
  bottomView:{
    width:'90%',
    flexDirection: 'row',
    justifyContent:'space-between',
    alignItems:'center',
    alignSelf: 'center',
    marginTop: moderateScale(30)

  },
  cancelBtn:{
    width: '40%',
    height: verticalScale(40),
    backgroundColor: LIGHT_GREY,
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems:'center'
  },
  cancelBtnText:{
    color: BG_COLOR
  }
});
