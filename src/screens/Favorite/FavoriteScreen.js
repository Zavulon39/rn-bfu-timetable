import React from 'react'
import { View, StyleSheet, FlatList, ScrollView, Alert } from 'react-native'
import { Header } from '../../components/Header'
import { TextRegular } from '../../components/ui/Text'
import { favoriteDB } from '../../favoriteDB'
import { TeacherCard } from '../../components/TeacherCard'
import { observer } from 'mobx-react-lite'
import screenManager from '../../store/screenManager'
import favorite from '../../store/favorite'
import teachers from '../../store/teachers'
import { GroupCard } from '../../components/GroupCard'
import { NotFound } from '../../components/NotFound'

export const FavoriteScreen = observer(() => {
  const showAlertGroup = (title, idx) => {
    Alert.alert('Удалить группу?', `Удалить группу ${title} из избранного?`, [
      {
        text: 'Отменить',
        style: 'cancel',
      },
      {
        text: 'Ок',
        onPress: async () => {
          await favoriteDB.del(idx)
          const favorites = await favoriteDB.getFavorite()
          favorite.setData(favorites)
        },
      },
    ])
  }

  const showAlertTeacher = (title, idx) => {
    Alert.alert(
      'Удалить преподавателя?',
      `Удалить преподавателя ${title} из избранного?`,
      [
        {
          text: 'Отменить',
          style: 'cancel',
        },
        {
          text: 'Ок',
          onPress: async () => {
            await favoriteDB.del(idx)
            const favorites = await favoriteDB.getFavorite()
            favorite.setData(favorites)
          },
        },
      ]
    )
  }

  return (
    <ScrollView>
      <Header title='Избранное' prevLink='Main' />
      {favorite.data.length ? (
        <>
          <TextRegular style={styles.title}>Преподаватели</TextRegular>
          <FlatList
            data={favorite.data}
            keyExtractor={el => el}
            renderItem={({ item }) => {
              if (JSON.parse(item.data).type === 'teacher') {
                const { teacher } = JSON.parse(item.data)
                const res = teachers.data.find(
                  el => el.teacher === teacher
                ) || { institut: '---' }
                return (
                  <TeacherCard
                    item={{
                      teacher,
                      institut: res.institut,
                    }}
                    clickHandler={() => {
                      screenManager.navigate('TeacherTimetable', {
                        teacher,
                        prevScreen: 'Favorite',
                      })
                    }}
                    longClickHandler={() => showAlertTeacher(teacher, item.id)}
                  />
                )
              }

              return null
            }}
          />

          <TextRegular style={styles.title}>Группы</TextRegular>
          <FlatList
            data={favorite.data}
            keyExtractor={el => el}
            renderItem={({ item }) => {
              if (JSON.parse(item.data).type === 'group') {
                const { groupTitle, institutTitle, TLTitle } = JSON.parse(
                  item.data
                )
                return (
                  <GroupCard
                    item={{
                      data: { groupTitle },
                    }}
                    clickHandler={() => {
                      screenManager.navigate('AbitsTimetable', {
                        institutTitle,
                        groupTitle,
                        item: TLTitle,
                        prevScreen: 'Favorite',
                      })
                    }}
                    longClickHandler={() => showAlertGroup(groupTitle, item.id)}
                  />
                )
              }

              return null
            }}
          />

          <View style={{ height: 20 }} />
        </>
      ) : (
        <NotFound title={'В избранном ничего нет'} />
      )}
    </ScrollView>
  )
})

const styles = StyleSheet.create({
  title: {
    marginTop: 16,
    marginLeft: 16,
    fontSize: 16,
  },

  row: {
    marginHorizontal: 16,
    marginTop: 8,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
})
