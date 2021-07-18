import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'
import { Header } from '../../components/Header'
import { TextRegular, TextBold } from '../../components/ui/Text'
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
              return (
                <>
                  <View style={styles.timetable}>
                    <View style={styles.left}>
                      <View style={styles.textLeft}>
                        <TextBold style={{ color: '#fff' }}>
                          {item.startTime.getHours()}.
                          {item.startTime.getMinutes()}
                        </TextBold>
                        <TextRegular style={{ color: '#fff' }}>
                          {item.endTime.getHours()}.{item.endTime.getMinutes()}
                        </TextRegular>
                      </View>
                    </View>
                    <View style={styles.right}>
                      <View style={{ flexDirection: 'row' }}>
                        <TextRegular style={styles.type}>
                          {item.type}
                        </TextRegular>
                        <TextRegular style={styles.group}>
                          {item.group}
                        </TextRegular>
                      </View>
                      <TextRegular style={styles.ttTitle}>
                        {item.title}
                      </TextRegular>
                      <View style={styles.footer}>
                        <TextRegular style={{ fontSize: 12 }}>
                          {item.teacher}
                        </TextRegular>
                        <TextRegular style={{ fontSize: 12 }}>
                          {item.place}
                        </TextRegular>
                      </View>
                    </View>
                  </View>
                  <View
                    style={{
                      marginRight: 16,
                      alignItems: 'flex-end',
                      marginBottom: 12,
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        screenManager.navigate('AbitsTimetable', {
                          institutTitle: item.tl,
                          groupTitle: item.group,
                        })
                      }}
                    >
                      <TextRegular style={styles.goTitle}>
                        Перейти к расписанию
                      </TextRegular>
                    </TouchableOpacity>
                  </View>
                </>
              )
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

  timetable: {
    flexDirection: 'row',
    height: 138,
    paddingHorizontal: 16,
  },

  left: {
    backgroundColor: THEME.MAIN_COLOR,
    width: 70,
    borderBottomLeftRadius: 8,
    borderTopLeftRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  textLeft: {
    flexDirection: 'column',
  },

  right: {
    width: Dimensions.get('window').width - 70 - 32,
    backgroundColor: '#fff',
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    borderRightWidth: 0.5,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: THEME.GRAY_COLOR,
  },

  type: {
    color: '#fff',
    backgroundColor: THEME.SECONDARY_COLOR,
    fontSize: 11,
    width: 70,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },

  group: {
    color: '#fff',
    backgroundColor: THEME.SECONDARY_COLOR,
    fontSize: 11,
    width: 70,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: 8,
    marginVertical: 8,
    marginLeft: -6,
  },

  ttTitle: {
    marginTop: 2,
    marginLeft: 16,
    width: 220,
  },

  footer: {
    flexDirection: Dimensions.get('screen').width > 1120 ? 'row' : 'column',
    marginTop: 30,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },

  goTitle: {
    color: THEME.MAIN_COLOR,
    fontSize: 13,
  },
})
