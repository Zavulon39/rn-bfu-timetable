import React from 'react'
import { View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { TextBold } from '../ui/Text'
import { THEME } from '../../theme'

export const GroupRow = ({ data, setActive }) => {
  const rows = []
  data.forEach((el, idx) => {
    if (idx % 3 === 0) rows.push([])
    rows[rows.length - 1].push(el)
  })

  // rows.forEach(el => console.log(el))

  return (
    <FlatList
      style={styles.list}
      data={rows}
      renderItem={({ item }) => (
        <View style={styles.row}>
          {item.map(el => {
            if (el.active) {
              var textStyles = {
                fontSize: 13,
                color: '#fff',
                padding: 8,
                textAlign: 'center',
              }
              var itemStyles = {
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: THEME.MAIN_COLOR,
                borderRadius: 8,
                marginTop: 8,
              }
            } else {
              var textStyles = {
                fontSize: 13,
                color: THEME.MAIN_COLOR,
                textAlign: 'center',
              }
              var itemStyles = {
                marginTop: 16,
              }
            }

            return (
              <TouchableOpacity
                activeOpacity={0.8}
                style={itemStyles}
                key={`${el.title}0`}
                onPress={() => {
                  setActive(el.idx)
                }}
              >
                <TextBold style={textStyles}>{el.title}</TextBold>
              </TouchableOpacity>
            )
          })}
        </View>
      )}
      keyExtractor={el => el.title}
    />
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  list: {
    marginHorizontal: 32,
    marginTop: 24,
  },
})
