import React from 'react'
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { TextRegular } from '../../components/ui/Text'
import { THEME } from '../../theme'
import screenManager from '../../store/screenManager'

export const Groups = ({ _item }) => {
  const institutTitle = _item.title
  const item = Object.entries(_item).filter(el => {
    if (el[0] === 'idx') return false
    if (el[0] === 'active') return false
    if (el[0] === 'title') return false
    return el
  })

  const clickHandler = groupTitle => {
    screenManager.navigate('AbitsTimetable', {
      institutTitle,
      groupTitle,
    })
  }

  const rows = []
  item.forEach((el, idx) => {
    if (idx % 2 === 0) rows.push([])
    const res = {
      title: el[0],
      groups: el[1],
    }
    rows[rows.length - 1].push(res)
  })

  return (
    <View style={styles.container}>
      <FlatList
        data={rows}
        renderItem={({ item }) => {
          return (
            <View style={styles.row}>
              {item.map(el => {
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.item}
                    key={`${el.title}0`}
                    onPress={() => clickHandler(el.title)}
                  >
                    <TextRegular style={styles.title}>{el.title}</TextRegular>
                  </TouchableOpacity>
                )
              })}
            </View>
          )
        }}
        keyExtractor={item => item.title}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    marginHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },

  item: {
    backgroundColor: THEME.SECONDARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 6,
  },

  title: {
    fontSize: 20,
    color: '#fff',
    width: 156,
    textAlign: 'center',
  },

  container: {
    marginTop: 22,
  },
})
