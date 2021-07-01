import { observer } from 'mobx-react-lite'
import React from 'react'
import { View, FlatList, ScrollView } from 'react-native'
import { Header } from '../../components/Header'
import { Institut } from '../../components/AbitsTimetable/Institut'
import abitsTimetable from '../../store/abitsTimetable'

export const InstitutScreen = observer(() => {
  return (
    <ScrollView>
      <Header title='Институты' prevLink='Main' />
      <FlatList
        data={Object.entries(abitsTimetable.data)}
        renderItem={({ item }) => <Institut item={item} />}
        keyExtractor={item => item[0]}
        style={{ marginTop: 8 }}
      />
      <View style={{ height: 20 }}></View>
    </ScrollView>
  )
})
