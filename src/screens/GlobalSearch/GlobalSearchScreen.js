import React, { useState } from 'react'
import { View, StyleSheet, ScrollView, Keyboard, FlatList } from 'react-native'
import { Header } from '../../components/Header'
import { TextInput } from 'react-native-paper'
import { THEME } from '../../theme'
import { TextRegular } from '../../components/ui/Text'
import { ConfigModal } from '../../components/GlobalSearch/ConfigModal'
import { TimetableLinkCard } from '../../components/TimetableCard'
import { TeacherLinkCard } from '../../components/TeacherCard'
import { NotFound } from '../../components/NotFound'
import abitsTimetable from '../../store/abitsTimetable'
import teachers from '../../store/teachers'
import screenManager from '../../store/screenManager'
import { GroupCard } from '../../components/GroupCard'

export const GlobalSearchScreen = () => {
  const [modal, setModal] = useState(false)
  const [text, setText] = useState('')
  const [qs, setQs] = useState({
    pairs: [],
    teachers: [],
    groups: [],
  })

  const search = data => {
    setText(data)
    if (!data.trim()) {
      return setQs({ pairs: [], teachers: [], groups: [] })
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
        groups: [],
      })
    }

    const timetableQs = abitsTimetable.searchTimetable(null, data, data)
    const teacherQs = teachers.getFilteredData(data)
    const groupQs = abitsTimetable.searchGroup(data)

    setQs({
      pairs: timetableQs,
      teachers: teacherQs,
      groups: groupQs,
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
      {qs.pairs.length || qs.teachers.length || qs.groups.length ? (
        <View style={styles.qsContainer}>
          <TextRegular style={styles.h2}>Преподаватели</TextRegular>
          <FlatList
            data={qs.teachers}
            keyExtractor={item => `${item}`}
            renderItem={({ item }) => {
              return <TeacherLinkCard item={item} text={text} />
            }}
          />
          <TextRegular style={{ ...styles.h2, marginTop: 16 }}>
            Группы
          </TextRegular>
          <FlatList
            data={qs.groups}
            keyExtractor={item => `${item.group}`}
            renderItem={({ item }) => {
              return (
                <GroupCard
                  item={{ data: { groupTitle: item.group } }}
                  style={{ width: '100%', marginHorizontal: 0 }}
                  groupTextWidth={'100%'}
                  clickHandler={() => {
                    screenManager.navigate('AbitsTimetable', {
                      institutTitle: item.direction,
                      groupTitle: item.group,
                      item: item.institut,
                      prevScreen: 'GlobalSearch',
                    })
                  }}
                />
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
              return <TimetableLinkCard item={item} paddingHorizontal={0} />
            }}
          />
        </View>
      ) : (
        <NotFound />
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
})
