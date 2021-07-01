import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import { TextRegular } from '../../components/ui/Text'
import screenManager from '../../store/screenManager'
import { THEME } from '../../theme'

export const Institut = ({ item }) => {
  const clickHandler = () =>
    screenManager.navigate('AbitsGroup', {
      item: item[0],
    })

  return (
    <TouchableOpacity
      style={styles.item}
      activeOpacity={0.8}
      onPress={clickHandler}
    >
      <TextRegular style={styles.text}>{item[0]}</TextRegular>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 40,
    backgroundColor: THEME.SECONDARY_COLOR,
    borderRadius: 8,
    padding: 8,
    marginTop: 8,
  },

  text: {
    color: '#fff',
    fontSize: 16,
  },
})
