import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { moderateScale, verticalScale } from 'react-native-size-matters';
import HistoryItem from '../../../components/HistoryItem';
import { TEXT_COLOR, WHITE } from '../../../utils/Colors';

const CourseSell = () => {
  return (
    <View style={styles.container}>
      <View style={styles.gridView}>
        <View style={styles.gridCard}>
          <Text style={styles.heading}>{'Rs. 5000'}</Text>
          <Text style={styles.title}>{'Sell'}</Text>
        </View>
        <View style={styles.gridCard}>
          <Text style={styles.heading}>{'10'}</Text>
          <Text style={styles.title}>{'Courses'}</Text>
        </View>
      </View>

      <Text style={[styles.courseListTitle, styles.heading]}>History</Text>
      <FlatList
        data={[1, 1, 1, 1, 1]}
        renderItem={({item, index}) => {
          return (
            <HistoryItem data={[1, 1, 1, 1, 1]} item={item} index={index} />
          );
        }}
      />
    </View>
  );
};

export default CourseSell;
const styles = StyleSheet.create({
  container: {flex: 1},
  gridView: {
    width: '90%',
    height: verticalScale(100),
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: moderateScale(20),
    flexDirection: 'row',
  },
  gridCard: {
    width: '40%',
    height: '100%',
    backgroundColor: WHITE,
    elevation: 5,
    borderRadius: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    fontSize: moderateScale(20),
    fontWeight: '600',
    color: TEXT_COLOR,
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '500',
    color: TEXT_COLOR,
    marginTop: moderateScale(10),
  },
  courseListTitle: {
    marginLeft: moderateScale(20),
    marginTop: moderateScale(10),
  },
});
