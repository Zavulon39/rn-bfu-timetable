import React from 'react'
import {
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Alert,
} from 'react-native'
import { TextRegular } from '../../components/ui/Text'
import { Header } from '../../components/Header'
import { FontAwesome } from '@expo/vector-icons'
import { historyDB } from '../../historyDB'
import { observer } from 'mobx-react-lite'
import { TeacherCard } from '../../components/TeacherCard'
import history from '../../store/history'
import teachers from '../../store/teachers'
import screenManager from '../../store/screenManager'
import { GroupCard } from '../../components/GroupCard'
import { NotFound } from '../../components/NotFound'

export const HistoryScreen = observer(() => {
  const data = history.data.map(el => {
    return JSON.parse(el.data)
  })

  const clearHistory = async () => {
    Alert.alert('Очистить историю?', `Очистить историю поиска?`, [
      {
        text: 'Отменить',
        style: 'cancel',
      },
      {
        text: 'Ок',
        onPress: async () => {
          await historyDB.clear()
          const histories = await historyDB.getHistory()
          history.setData(histories)
        },
      },
    ])
  }

  return (
    <ScrollView>
      <Header
        title='История'
        prevLink='Main'
        headerRight={
          <TouchableOpacity activeOpacity={0.8} onPress={clearHistory}>
            <FontAwesome name='trash-o' size={25} color='white' />
          </TouchableOpacity>
        }
      />
      <View style={{ height: 8 }} />
      {data.length ? (
        <FlatList
          data={data}
          keyExtractor={item => `${item.type}${Math.random() * Math.random()}`}
          renderItem={({ item }) => {
            if (item.type === 'group') {
              return (
                <GroupCard
                  item={item}
                  clickHandler={() => {
                    const { institutTitle, groupTitle, TLTitle } = item.data
                    screenManager.navigate('AbitsTimetable', {
                      institutTitle,
                      groupTitle,
                      item: TLTitle,
                      prevScreen: 'History',
                    })
                  }}
                />
              )
            } else {
              const res = teachers.data.find(
                el => el.teacher === item.data.teacher
              ) || { institut: '---' }
              return (
                <TeacherCard
                  clickHandler={() => {
                    const { teacher } = item.data
                    screenManager.navigate('TeacherTimetable', {
                      teacher,
                      prevScreen: 'History',
                    })
                  }}
                  item={{
                    ...item.data,
                    institut: res.institut,
                  }}
                />
              )
            }
          }}
        />
      ) : (
        <NotFound title={'В историях ничего нет'} />
      )}
      <View style={{ height: 20 }} />
    </ScrollView>
  )
})
