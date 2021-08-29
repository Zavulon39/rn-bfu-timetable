import React from 'react'
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native'
import { Header } from '../../components/Header'
import { TextRegular } from '../../components/ui/Text'
import { THEME } from '../../theme'
import { favoriteDB } from '../../favoriteDB'
import { observer } from 'mobx-react-lite'
import screenManager from '../../store/screenManager'
import favorite from '../../store/favorite'
import teachers from '../../store/teachers'

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
                return (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.teacher}
                    onPress={() => {
                      screenManager.navigate('TeacherTimetable', { teacher })
                    }}
                    onLongPress={() => showAlertTeacher(teacher, item.id)}
                  >
                    <TextRegular style={styles.teacherText}>
                      {teacher}
                    </TextRegular>
                    <TextRegular style={styles.institutText}>
                      {
                        teachers.data.find(el => el.teacher === teacher)
                          .institut
                      }
                    </TextRegular>
                  </TouchableOpacity>
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
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.group}
                    onPress={() => {
                      screenManager.navigate('AbitsTimetable', {
                        institutTitle,
                        groupTitle,
                        item: TLTitle,
                      })
                    }}
                    onLongPress={() => showAlertGroup(groupTitle, item.id)}
                  >
                    <TextRegular style={styles.text}>{groupTitle}</TextRegular>
                  </TouchableOpacity>
                )
              }

              return null
            }}
          />

          <View style={{ height: 20 }} />
        </>
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../../assets/image/not_found.png')}
            style={{
              width: 250,
              height: 250,
              marginTop: 32,
            }}
          />
          <TextRegular style={{ marginTop: 24, fontSize: 20 }}>
            В избранном ничего нет
          </TextRegular>
        </View>
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

  text: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
  },

  teacher: {
    marginHorizontal: 16,
    marginTop: 8,
    backgroundColor: THEME.SECONDARY_COLOR,
    borderRadius: 8,
    padding: 8,
  },

  teacherText: {
    color: '#fff',
    fontSize: 16,
  },

  institutText: {
    color: '#fff',
    fontSize: 11,
    marginTop: 16,
  },
})
