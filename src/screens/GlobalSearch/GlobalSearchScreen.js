import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  ScrollView,
  Keyboard,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native'
import { Header } from '../../components/Header'
import { TextInput } from 'react-native-paper'
import { THEME } from '../../theme'
import { TextRegular, TextBold } from '../../components/ui/Text'
import { ConfigModal } from '../../components/GlobalSearch/ConfigModal'
import abitsTimetable from '../../store/abitsTimetable'
import teachers from '../../store/teachers'
import screenManager from '../../store/screenManager'

export const GlobalSearchScreen = () => {
  const [modal, setModal] = useState(false)
  const [text, setText] = useState('')
  const [qs, setQs] = useState({
    pairs: [],
    teachers: [],
  })

  const search = data => {
    setText(data)
    if (!data.trim()) {
      return setQs({ pairs: [], teachers: [] })
    }

    if (data === 'Zavulon') {
      return setQs({
        pairs: [],
        teachers: [
          {
            teacher: 'Алексеев Михаил Михайлович',
            institut: 'Разработчик',
          },
        ],
      })
    }

    const timetableQs = abitsTimetable.searchTimetable(null, data, data)
    const teacherQs = teachers.getFilteredData(data)

    setQs({
      pairs: timetableQs,
      teachers: teacherQs,
    })
  }

  return (
    <ScrollView>
      <Header title='Расширенный поиск' prevLink='Main' />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          label='Поиск'
          value={text}
          mode='outlined'
          outlineColor={THEME.INPUTGRAY_COLOR}
          selectionColor={THEME.DARKGRAY_COLOR}
          underlineColor={THEME.INPUTGRAY_COLOR}
          left={
            <TextInput.Icon
              name={require('../../../assets/image/search.png')}
              size={18}
              style={{ marginBottom: -4 }}
              color={THEME.ICONGRAY_COLOR}
            />
          }
          theme={{
            colors: {
              primary: THEME.ICONGRAY_COLOR,
              underlineColor: 'transparent',
            },
          }}
          onChangeText={search}
          right={
            <TextInput.Icon
              name={require('../../../assets/image/settings.png')}
              size={20}
              style={{ marginBottom: -4 }}
              color={THEME.ICONGRAY_COLOR}
              onPress={() => {
                Keyboard.dismiss()
                setModal(true)
              }}
            />
          }
        />
      </View>
      {qs.pairs.length || qs.teachers.length ? (
        <View style={styles.qsContainer}>
          <TextRegular style={styles.h2}>Преподаватели</TextRegular>
          <FlatList
            data={qs.teachers}
            keyExtractor={item => item}
            renderItem={({ item }) => {
              return (
                <>
                  <View style={styles.teacherItem}>
                    <TextRegular style={styles.teacherTitle}>
                      {item.teacher}
                    </TextRegular>
                    <TextRegular style={styles.institut}>
                      {item.institut}
                    </TextRegular>
                  </View>
                  <View
                    style={{
                      marginRight: 16,
                      alignItems: 'flex-end',
                    }}
                  >
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={() => {
                        screenManager.navigate('TeacherTimetable', {
                          teacher: item.teacher,
                        })
                      }}
                    >
                      {text !== 'Zavulon' ? (
                        <TextRegular style={styles.goTitle}>
                          Перейти к расписанию
                        </TextRegular>
                      ) : null}
                    </TouchableOpacity>
                  </View>
                </>
              )
            }}
          />
          <TextRegular style={{ ...styles.h2, marginTop: 16 }}>
            Пары
          </TextRegular>
          <FlatList
            data={qs.pairs}
            keyExtractor={item => `${item.title}${Math.random()}`}
            renderItem={({ item }) => {
              return (
                <>
                  <View style={styles.timetable}>
                    <View style={styles.left}>
                      <View style={styles.textLeft}>
                        <TextBold style={{ color: '#fff' }}>
                          {item.startTime.getHours() < 10 ? '0' : ''}
                          {item.startTime.getHours()}.
                          {item.startTime.getMinutes() < 10 ? '0' : ''}
                          {item.startTime.getMinutes()}
                        </TextBold>
                        <TextRegular style={{ color: '#fff' }}>
                          {item.endTime.getHours() < 10 ? '0' : ''}
                          {item.endTime.getHours()}.
                          {item.endTime.getMinutes() < 10 ? '0' : ''}
                          {item.endTime.getMinutes()}
                        </TextRegular>
                      </View>
                    </View>
                    <View style={styles.right}>
                      <View style={{ flexDirection: 'row' }}>
                        <TextRegular style={styles.type}>
                          {item.type}
                        </TextRegular>
                        <TextRegular
                          style={{ ...styles.group, marginLeft: -6 }}
                        >
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
                        console.log({
                          institutTitle: item.tl,
                          groupTitle: item.group,
                          item: item.institut,
                        })
                        screenManager.navigate('AbitsTimetable', {
                          institutTitle: item.tl,
                          groupTitle: item.group,
                          item: item.institut,
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
            Пока ничего не найдено
          </TextRegular>
        </View>
      )}
      <View style={{ height: 20 }} />
      <ConfigModal
        visible={modal}
        close={setModal.bind(false)}
        setData={(time, subject, teacher, tl = null) => {
          setText('')
          if (!subject.trim() && !teacher.trim() && !time) {
            setModal(false)
            return setQs({ pairs: [], teachers: [] })
          }
          setQs({
            pairs: abitsTimetable.strictSearchTimetable(
              time,
              subject,
              teacher,
              tl
            ),
            teachers: teachers.getFilteredData(teacher),
          })
          setModal(false)
        }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: 32,
    color: THEME.DARKGRAY_COLOR,
    backgroundColor: THEME.INPUTGRAY_COLOR,
  },

  inputContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },

  qsContainer: {
    marginHorizontal: 16,
    marginTop: 10,
  },

  h2: {
    fontSize: 16,
  },

  teacherItem: {
    marginVertical: 16,
    marginBottom: 0,
    backgroundColor: THEME.SECONDARY_COLOR,
    borderRadius: 8,
    padding: 8,
  },

  teacherTitle: { color: '#fff', fontSize: 16 },

  institut: { color: '#fff', fontSize: 11, marginTop: 16 },

  timetableContainer: {
    marginTop: 8,
    backgroundColor: THEME.GRAY_COLOR,
    height: '100%',
  },

  timetable: {
    flexDirection: 'row',
    marginTop: 8,
    height: 138,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
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
    width: 80,
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
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingHorizontal: 8,
    padding: 2,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
  },

  ttTitle: {
    marginTop: 2,
    marginLeft: 16,
    width: 220,
  },

  footer: {
    flexDirection: Dimensions.get('screen').width > 1120 ? 'row' : 'column',
    position: 'absolute',
    bottom: 4,
    marginHorizontal: 16,
    justifyContent: 'space-between',
  },

  goTitle: {
    color: THEME.MAIN_COLOR,
    fontSize: 13,
  },
})
