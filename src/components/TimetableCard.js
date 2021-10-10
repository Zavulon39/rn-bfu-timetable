import React from 'react'
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import { TextRegular, TextBold } from './ui/Text'
import { THEME } from '../theme'
import screenManager from '../store/screenManager'

export const TimetableCard = ({ item }) => {
  return (
    <View style={styles.timetable}>
      <View style={styles.left}>
        <View style={styles.textLeft}>
          <TextBold style={{ color: '#fff' }}>
            {item.startTime.getHours() < 10 ? '0' : ''}
            {item.startTime.getHours()}.
            {item.startTime.getMinutes() < 10 ? '0' : ''}
            {item.startTime.getMinutes()}
          </TextBold>
          <TextRegular style={{ color: '#fff' }}>
            {item.endTime.getHours() < 10 ? '0' : ''}
            {item.endTime.getHours()}.
            {item.endTime.getMinutes() < 10 ? '0' : ''}
            {item.endTime.getMinutes()}
          </TextRegular>
        </View>
      </View>
      <View style={styles.right}>
        <View style={{ flexDirection: 'row' }}>
          <TextRegular style={styles.type}>{item.type}</TextRegular>
          <TextRegular style={{ ...styles.type, marginLeft: -4 }}>
            {item.subgroup}
          </TextRegular>
        </View>
        <TextRegular style={styles.ttTitle}>{item.title}</TextRegular>
        <View style={styles.footer}>
          <TextRegular style={{ fontSize: 12 }}>{item.teacher}</TextRegular>
          <TextRegular style={{ fontSize: 12 }}>{item.place}</TextRegular>
        </View>
      </View>
    </View>
  )
}

export const TimetableLinkCard = ({ item, paddingHorizontal = 16 }) => {
  return (
    <>
      <View style={{ ...styles.timetable, paddingHorizontal }}>
        <View style={styles.left}>
          <View style={styles.textLeft}>
            <TextBold style={{ color: '#fff' }}>
              {item.startTime.getHours() < 10 ? '0' : ''}
              {item.startTime.getHours()}.
              {item.startTime.getMinutes() < 10 ? '0' : ''}
              {item.startTime.getMinutes()}
            </TextBold>
            <TextRegular style={{ color: '#fff' }}>
              {item.endTime.getHours() < 10 ? '0' : ''}
              {item.endTime.getHours()}.
              {item.endTime.getMinutes() < 10 ? '0' : ''}
              {item.endTime.getMinutes()}
            </TextRegular>
          </View>
        </View>
        <View style={styles.right}>
          <View>
            <TextRegular style={{ ...styles.group, marginTop: 8 }}>
              {item.type}
            </TextRegular>
            <TextRegular style={styles.group}>
              {item.group} ({item.subgroup})
            </TextRegular>
            <TextRegular style={{ ...styles.group, marginBottom: 8 }}>
              {item.date
                .toLocaleDateString()
                .replace('/', '.')
                .replace('/', '.')}
            </TextRegular>
          </View>
          <TextRegular style={styles.ttTitle}>{item.title}</TextRegular>
          <View style={styles.footer}>
            <TextRegular style={{ fontSize: 12 }}>{item.teacher}</TextRegular>
            <TextRegular style={{ fontSize: 12 }}>{item.place}</TextRegular>
          </View>
        </View>
      </View>
      <View
        style={{
          marginRight: 16,
          alignItems: 'flex-end',
          marginBottom: 12,
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            screenManager.navigate('AbitsTimetable', {
              institutTitle: item.tl,
              groupTitle: item.group,
              item: item.institut,
              prevScreen: 'GlobalSearch',
            })
          }}
        >
          <TextRegular style={styles.goTitle}>Перейти к расписанию</TextRegular>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  timetable: {
    flexDirection: 'row',
    marginTop: 8,
    minHeight: 138,
    paddingHorizontal: 16,
  },

  left: {
    backgroundColor: THEME.MAIN_COLOR,
    width: 70,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textLeft: {
    flexDirection: 'column',
  },

  right: {
    width: Dimensions.get('window').width - 70 - 32,
    backgroundColor: '#fff',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: THEME.GRAY_COLOR,
  },

  type: {
    color: '#fff',
    backgroundColor: THEME.SECONDARY_COLOR,
    fontSize: 11,
    width: 80,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },

  group: {
    color: '#fff',
    backgroundColor: THEME.SECONDARY_COLOR,
    fontSize: 11,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: 8,
    padding: 2,
    borderRadius: 8,
    marginHorizontal: 10,
    marginVertical: 3,
  },

  ttTitle: {
    marginTop: 2,
    marginLeft: 16,
    width: 220,
  },

  footer: {
    flexDirection: Dimensions.get('screen').width > 1120 ? 'row' : 'column',
    marginTop: 10,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },

  goTitle: {
    color: THEME.MAIN_COLOR,
    fontSize: 13,
  },
})
