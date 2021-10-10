import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, FlatList } from 'react-native'
import { TextInput } from 'react-native-paper'
import { Header } from '../../components/Header'
import { THEME } from '../../theme'
import screenManager from '../../store/screenManager'
import teacherManager from '../../store/teachers'
import { TeacherCard } from '../../components/TeacherCard'

export const TeacherScreen = () => {
  const [text, setText] = useState('')
  const [teachers, setTeachers] = useState(teacherManager.data)

  const search = data => {
    setText(data)
    setTeachers(teacherManager.getFilteredData(data))
  }

  const clickHandler = teacher =>
    screenManager.navigate('TeacherTimetable', { teacher })

  return (
    <ScrollView>
      <Header title='Преподаватель' prevLink='Main' />
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
        keyExtractor={item => item}
        renderItem={({ item }) => {
          return (
            <TeacherCard
              item={item}
              clickHandler={() => clickHandler(item.teacher)}
            />
          )
        }}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 8,
  },

  input: {
    height: 32,
    color: THEME.DARKGRAY_COLOR,
    backgroundColor: THEME.INPUTGRAY_COLOR,
  },
})
