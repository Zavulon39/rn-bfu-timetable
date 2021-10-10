import React from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { TextRegular } from './ui/Text'
import { THEME } from '../theme'

export const GroupCard = ({
  item,
  clickHandler,
  longClickHandler,
  style = {},
  groupTextWidth = 156,
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ ...styles.group, ...style }}
      onPress={clickHandler}
      onLongPress={longClickHandler}
    >
      <TextRegular style={{ ...styles.groupText, width: groupTextWidth }}>
        {item.data.groupTitle}
      </TextRegular>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  group: {
    backgroundColor: THEME.SECONDARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
    width: 156,
    height: 40,
    marginTop: 8,
  },

  groupText: {
    padding: 8,
    fontSize: 16,
    color: '#fff',
    width: 156,
    textAlign: 'center',
  },
})
