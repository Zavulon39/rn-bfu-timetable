import React from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { TextRegular } from './ui/Text'
import { THEME } from '../theme'
import screenManager from '../store/screenManager'

export const TeacherCard = ({ item, clickHandler, longClickHandler }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.item}
      onPress={clickHandler}
      onLongPress={longClickHandler}
    >
      <TextRegular style={styles.title}>{item.teacher}</TextRegular>
      <TextRegular style={styles.institut}>{item.institut}</TextRegular>
    </TouchableOpacity>
  )
}

export const TeacherLinkCard = ({ item, text }) => {
  return (
    <>
      <View style={{ ...styles.item, marginHorizontal: 0 }}>
        <TextRegular style={styles.title}>{item.teacher}</TextRegular>
        <TextRegular style={styles.institut}>{item.institut}</TextRegular>
      </View>
      <View
        style={{
          marginRight: 16,
          alignItems: 'flex-end',
        }}
      >
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            screenManager.navigate('TeacherTimetable', {
              teacher: item.teacher,
              prevScreen: 'GlobalSearch',
            })
          }}
        >
          {text !== 'Zavulon' ? (
            <TextRegular style={styles.goTitle}>
              Перейти к расписанию
            </TextRegular>
          ) : null}
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  item: {
    margin: 16,
    marginBottom: 0,
    backgroundColor: THEME.SECONDARY_COLOR,
    borderRadius: 8,
    padding: 8,
  },

  title: {
    color: '#fff',
    fontSize: 16,
  },

  institut: {
    color: '#fff',
    fontSize: 11,
    marginTop: 16,
  },

  goTitle: {
    color: THEME.MAIN_COLOR,
    fontSize: 13,
  },
})
