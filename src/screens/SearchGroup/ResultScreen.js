import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import { Header } from '../../components/Header'
import { TimetableLinkCard } from '../../components/TimetableCard'
import { TextRegular } from '../../components/ui/Text'
import abitsTimetable from '../../store/abitsTimetable'
import screenManager from '../../store/screenManager'
import { THEME } from '../../theme'

export const ResultScreen = () => {
  const time = screenManager.getParam('searchGroupTime')
  const subject = screenManager.getParam('searchGroupSubject')
  const teacher = screenManager.getParam('searchGroupTeacher')

  const timetable = abitsTimetable.findTimetable(time, subject, teacher)
  const title = timetable.length
    ? 'Вот что удалось найти'
    : 'Ничего не удалось найти :('

  screenManager.params.searchGroupTime = null
  screenManager.params.searchGroupSubject = null
  screenManager.params.searchGroupTeacher = null

  return (
    <ScrollView>
      <Header title={title} prevLink='AbitsGroup' />
      {timetable.length ? (
        <TextRegular style={{ ...styles.title, backgroundColor: '#fff' }}>
          Вот что удалось найти
        </TextRegular>
      ) : null}
      {timetable.length ? (
        <View style={styles.timetableContainer}>
          <FlatList
            data={timetable}
            style={{ marginTop: 8 }}
            keyExtractor={item => `${item.title}${Math.random()}`}
            renderItem={({ item }) => {
              return <TimetableLinkCard item={item} />
            }}
          />
        </View>
      ) : (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Image
            source={require('../../../assets/image/not_found.png')}
            style={{
              width: 250,
              height: 250,
              marginTop: Dimensions.get('screen').height * 0.1,
            }}
          />
          <TextRegular style={{ marginTop: 24, fontSize: 20 }}>
            {title}
          </TextRegular>
          <TextRegular
            style={{
              marginTop: 16,
              fontSize: 15,
              marginHorizontal: 36,
              textAlign: 'center',
            }}
          >
            Можешь попробовать расширенный поиск или спросить номер группы у
            однокурсников
          </TextRegular>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => screenManager.navigate('GlobalSearch')}
            style={{
              width: 328,
              height: 36,
              backgroundColor: THEME.MAIN_COLOR,
              borderRadius: 8,
              justifyContent: 'center',
              marginTop: 16,
            }}
          >
            <TextRegular
              style={{
                color: '#fff',
                textAlign: 'center',
                fontSize: 15,
              }}
            >
              Расширенный поиск
            </TextRegular>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              marginTop: 16,
              justifyContent: 'center',
            }}
            onPress={() => screenManager.navigate('Main')}
          >
            <TextRegular
              style={{
                textAlign: 'center',
                fontSize: 15,
                color: THEME.MAIN_COLOR,
              }}
            >
              На главную
            </TextRegular>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ height: 20 }}></View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    paddingVertical: 12,
    textAlign: 'center',
  },

  timetableContainer: {
    height: '100%',
  },
})
