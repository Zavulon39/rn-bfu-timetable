import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  DatePickerAndroid,
  DatePickerIOS,
  Modal,
  Platform,
  TouchableOpacity,
  Alert,
  FlatList,
  ScrollView,
  Image,
} from 'react-native'
import { Header } from '../../components/Header'
import { TextRegular, TextBold } from '../../components/ui/Text'
import { MaterialIcons, AntDesign } from '@expo/vector-icons'
import screenManager from '../../store/screenManager'
import abitsTimetable from '../../store/abitsTimetable'
import { THEME } from '../../theme'
import { historyDB } from '../../historyDB'
import { favoriteDB } from '../../favoriteDB'
import history from '../../store/history'
import favorite from '../../store/favorite'
import { TimetableCard } from '../../components/TimetableCard'
import { NotFound } from '../../components/NotFound'

export const TimetableScreen = () => {
  const teacher = screenManager.getParam('teacher')
  const [date, setDate] = useState(new Date(Date.now()))
  const [modal, setModal] = useState(false)
  const [icon, setIcon] = useState('staro')
  const [id, setId] = useState(null)
  const [timetable, setTimetable] = useState(
    abitsTimetable.getTeacherTimetable(teacher).filter(el => {
      return (
        el.date.getDate() === date.getDate() &&
        el.date.getMonth() === date.getMonth() &&
        el.date.getFullYear() === date.getFullYear()
      )
    })
  )
  const days = [
    'Воскресенье',
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
  ]
  const month = [
    'Января',
    'Февраля',
    'Март',
    'Апреля',
    'Май',
    'Июня',
    'Июля',
    'Август',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ]
  favoriteDB.getFavorite().then(arr => {
    arr.forEach(prev => {
      el = JSON.parse(prev.data)
      if (teacher === el.teacher) {
        setIcon('star')
        setId(prev.id)
      }
    })
  })

  const historyItem = {
    type: 'teacher',
    data: {
      teacher,
    },
  }
  historyDB
    .add(JSON.stringify(historyItem))
    .then()
    .catch(e => {})
  historyDB.getHistory().then(histories => history.setData(histories))

  const showDatePicker = async () => {
    if (Platform.OS === 'android') {
      try {
        const { action, year, month, day } = await DatePickerAndroid.open({
          date,
        })
        if (action !== DatePickerAndroid.dismissedAction) {
          setDate(new Date(year, month, day))
          setTimetable(
            abitsTimetable.getTeacherTimetable(teacher).filter(el => {
              return (
                el.date.getDate() === day &&
                el.date.getMonth() === month &&
                el.date.getFullYear() === year
              )
            })
          )
        }
      } catch ({ code, message }) {
        Alert.alert(
          'Что-то пошло не так..',
          'Ошибка при открытии или введении данных: ' + message,
          [
            {
              text: 'Закрыть',
              style: 'cancel',
            },
          ]
        )
      }
    } else {
      setModal(true)
    }
  }

  return (
    <ScrollView>
      <Header
        title='Расписание'
        prevLink='TeacherTeacher'
        headerRight={
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={async () => {
              if (icon === 'staro') {
                const data = JSON.stringify({
                  type: 'teacher',
                  teacher,
                })
                await favoriteDB.add(data)
                setIcon('star')
              } else {
                await favoriteDB.del(id)
                setIcon('staro')
              }
              const favorites = await favoriteDB.getFavorite()
              favorite.setData(favorites)
            }}
          >
            <AntDesign name={icon} size={25} color='white' />
          </TouchableOpacity>
        }
      />
      <View style={styles.titleContainer}>
        <TextRegular style={styles.title}>
          {date.getDate()} {month[date.getMonth()]}, {days[date.getDay()]}
        </TextRegular>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.button}
          onPress={showDatePicker}
        >
          <MaterialIcons name='date-range' size={24} color='white' />
        </TouchableOpacity>
      </View>
      {timetable.length ? (
        <View style={styles.timetableContainer}>
          <FlatList
            data={timetable}
            keyExtractor={item => `${item.title}${Math.random()}`}
            renderItem={({ item }) => {
              return <TimetableCard item={item} />
            }}
          />
        </View>
      ) : (
        <NotFound />
      )}
      <View style={{ height: 20 }}></View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modal}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <TouchableOpacity onPress={() => setModal(false)}>
          <TextBold>Close Modal</TextBold>
        </TouchableOpacity>
        <DatePickerIOS date={date} onDateChange={setDate} />
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    backgroundColor: '#fff',
  },

  title: {
    fontSize: 20,
  },

  button: {
    backgroundColor: THEME.MAIN_COLOR,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  timetableContainer: {
    marginTop: 8,
    height: '100%',
  },
})
