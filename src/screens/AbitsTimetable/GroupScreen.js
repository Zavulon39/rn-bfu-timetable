import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { GroupRow } from '../../components/AbitsTimetable/GroupRow'
import { Groups } from '../../components/AbitsTimetable/Groups'
import { Header } from '../../components/Header'
import { TextRegular } from '../../components/ui/Text'
import abitsTimetable from '../../store/abitsTimetable'
import screenManager from '../../store/screenManager'
import { THEME } from '../../theme'

export const GroupScreen = () => {
  const [rows, setRows] = useState(
    Object.entries(
      abitsTimetable.getGroupsTLByName(screenManager.getParam('item'))
    ).map((el, idx) => {
      el[1].active = false
      el[1].idx = idx
      el[1].title = el[0]
      if (idx === 0) el[1].active = true
      return el[1]
    })
  )
  const [activeGroup, setActiveGroup] = useState(rows[0])

  const setActive = idx => {
    setRows(
      rows.map(el => {
        if (el.idx === idx) {
          setActiveGroup({ ...el, active: true })
          return { ...el, active: true }
        }
        return { ...el, active: false }
      })
    )
  }

  return (
    <ScrollView style={styles.container}>
      <Header title='Группы' prevLink='AbitsInstitus' />
      <GroupRow data={rows} setActive={setActive} />
      <Groups _item={activeGroup} />
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.center}
        onPress={() => screenManager.navigate('SearchGroupTime')}
      >
        <TextRegular style={{ color: THEME.SECONDARY_COLOR, fontSize: 13 }}>
          не помню номер группы
        </TextRegular>
      </TouchableOpacity>
      <View style={{ height: 20 }}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },

  center: {
    alignItems: 'center',
    marginTop: 16,
  },
})
