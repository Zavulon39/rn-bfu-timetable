import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from 'react-native'
import { Header } from '../../components/Header'
import { TextBold, TextRegular } from '../../components/ui/Text'
import { TextInput } from 'react-native-paper'
import screenManager from '../../store/screenManager'
import { THEME } from '../../theme'
import teacherManager from '../../store/teachers'

export const TeacherScreen = () => {
  const [selected, setSelected] = useState(
    null || screenManager.getParam('searchGroupTeacher')
  )
  const [text, setText] = useState('')
  const [teachers, setTeachers] = useState(
    teacherManager.data
      .filter(el => el.institut === screenManager.getParam('item'))
      .map(el => {
        if (el.teacher === selected) {
          el.active = true
          return el
        }
        el.active = false
        return el
      })
  )

  console.log(teachers)

  const search = data => {
    setText(data)
    setTeachers(teacherManager.getFilteredData(data))
  }

  const setActive = idx => {
    setTeachers(
      teachers.map(el => {
        if (el.teacher === idx) {
          setSelected(el.teacher)
          return { ...el, active: true }
        }
        return { ...el, active: false }
      })
    )
  }

  return (
    <ScrollView>
      <Header title='Преподаватель' prevLink='SearchGroupSubject' />
      <TextRegular style={styles.title}>Кто будет вести пару?</TextRegular>
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
        />
      </View>
      <FlatList
        data={teachers}
        keyExtractor={item => {
          console.log(item.teacher + item.institut)
          return item.teacher + item.institut
        }}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              activeOpacity={0.8}
              style={item.active ? styles.item : styles.inActive}
              onPress={() => setActive(item.teacher)}
            >
              <View>
                <TextBold
                  style={{ color: item.active ? '#fff' : '#000', fontSize: 16 }}
                >
                  {item.teacher}
                </TextBold>
                <TextRegular
                  style={{ color: item.active ? '#fff' : '#000', fontSize: 12 }}
                >
                  {item.institut}
                </TextRegular>
              </View>
            </TouchableOpacity>
          )
        }}
      />
      <View style={styles.btnContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn1}
          onPress={() =>
            screenManager.navigate('SearchGroupResult', {
              searchGroupTeacher: null,
            })
          }
        >
          <TextRegular style={styles.btn1Text}>Я не помню</TextRegular>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn2}
          onPress={() =>
            screenManager.navigate('SearchGroupResult', {
              searchGroupTeacher: selected,
            })
          }
        >
          <TextRegular style={styles.btn2Text}>Далее</TextRegular>
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 24,
    marginHorizontal: 16,
    fontSize: 20,
    textAlign: 'center',
  },

  inputContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },

  btnContainer: {
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  btn1: {
    width: 156,
  },

  btn1Text: {
    color: THEME.MAIN_COLOR,
    fontSize: 15,
    textAlign: 'center',
  },

  btn2: {
    width: 156,
    height: 36,
    backgroundColor: THEME.MAIN_COLOR,
    borderRadius: 8,
    justifyContent: 'center',
  },

  btn2Text: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },

  input: {
    height: 32,
    color: THEME.DARKGRAY_COLOR,
    backgroundColor: THEME.INPUTGRAY_COLOR,
  },

  item: {
    margin: 16,
    marginBottom: 0,
    backgroundColor: THEME.SECONDARY_COLOR,
    borderRadius: 8,
    padding: 8,
  },

  inActive: {
    margin: 16,
    marginBottom: 0,
  },
})
