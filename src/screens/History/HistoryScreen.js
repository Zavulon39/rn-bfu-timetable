import React from 'react'
import {
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native'
import { TextRegular } from '../../components/ui/Text'
import { Header } from '../../components/Header'
import { FontAwesome } from '@expo/vector-icons'
import history from '../../store/history'
import teachers from '../../store/teachers'
import screenManager from '../../store/screenManager'
import { historyDB } from '../../historyDB'
import { observer } from 'mobx-react-lite'
import { THEME } from '../../theme'

export const HistoryScreen = observer(() => {
  const data = history.data.map(el => JSON.parse(el.data))

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
            console.log(item)
            if (item.type === 'group') {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.group}
                  onPress={() => {
                    const { institutTitle, groupTitle, TLTitle } = item.data
                    screenManager.navigate('AbitsTimetable', {
                      institutTitle,
                      groupTitle,
                      item: TLTitle,
                    })
                  }}
                >
                  <TextRegular style={styles.groupText}>
                    {item.data.groupTitle}
                  </TextRegular>
                </TouchableOpacity>
              )
            } else {
              return (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.teacher}
                  onPress={() => {
                    const { teacher } = item.data
                    screenManager.navigate('TeacherTimetable', { teacher })
                  }}
                >
                  <TextRegular style={styles.teacherText}>
                    {item.data.teacher}
                  </TextRegular>
                  <TextRegular style={styles.institutText}>
                    {
                      teachers.data.find(el => el.teacher === item.data.teacher)
                        .institut
                    }
                  </TextRegular>
                </TouchableOpacity>
              )
            }
          }}
        />
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
            В историях ничего нет
          </TextRegular>
        </View>
      )}
    </ScrollView>
  )
})

const styles = StyleSheet.create({
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

  groupText: {
    fontSize: 20,
    color: '#fff',
    width: 156,
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
