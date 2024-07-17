import React from 'react';
import { View, Text, Modal, StyleSheet, ActivityIndicator } from 'react-native';
import { moderateScale, scale } from 'react-native-size-matters';
import { THEME_COLOR, WHITE } from '../utils/Colors';

const Loader = ({visible}) => {
  return (
    <Modal transparent visible={visible}>
      <View style={styles.container}>
        <View style={styles.loader}>
            <ActivityIndicator size={'large'} color={THEME_COLOR}/>
        </View>
      </View>
    </Modal>
  );
}

export default Loader;
 const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loader:{
        width: scale(80),
        height: scale(80),
        backgroundColor: WHITE,
        justifyContent:'center',
        alignItems: 'center',
        borderRadius: moderateScale(10)
    }
 })
