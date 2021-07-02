import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useFonts } from 'expo-font'
import screenManager from './src/store/screenManager'
import abitsTimetable from './src/store/abitsTimetable'
import teachers from './src/store/teachers'
import subjects from './src/store/subjects'
import favorite from './src/store/favorite'
import history from './src/store/history'
import { favoriteDB } from './src/favoriteDB'
import { historyDB } from './src/historyDB'

export default observer(function App() {
  const [appLoaded, setAppLoaded] = useState(false)
  const [loaded] = useFonts({
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
    RobotoBold: require('./assets/fonts/Roboto-Medium.ttf'),
  })

  useEffect(async () => {
    abitsTimetable.setData({
      'Институт природопользования, территориального развития и градостроительства':
        {
          Спецалитет: {
            111222: [
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: new Date(Date.now()),
                endTime: new Date(Date.now() + 1000000),
                teacher: 'Роман Иванович Романов',
                place: 'Аудитория 312',
                date: new Date(2021, 5, 30),
              },
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: new Date(Date.now()),
                endTime: new Date(Date.now() + 1000000),
                teacher: 'Роман Иванович Романов',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: new Date(Date.now()),
                endTime: new Date(Date.now() + 1000000),
                teacher: 'Иванов Иван Инванович',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
            ],
            222111: [
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: new Date(Date.now()),
                endTime: new Date(Date.now() + 1000000),
                teacher: 'Иванов Иван Инванович',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
            ],
          },
        },
      'Медицинский институт': {
        Спецалитет: {
          333444: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(2021, 5, 29),
            },
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
          ],
          4443333: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: new Date(Date.now()),
              endTime: new Date(Date.now() + 1000000),
              teacher: 'Роман Иванович Романов',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
          ],
        },
      },
    })
    teachers.setData([
      {
        teacher: 'Иванов Иван Инванович',
        institut: 'Медицинский институт',
      },
      {
        teacher: 'Роман Иванович Романов',
        institut:
          'Институт природопользования, территориального развития и градостроительства',
      },
    ])
    subjects.setData({
      'Институт природопользования, территориального развития и градостроительства':
        [{ title: 'Теория вероятностей и математическая статистика' }],
      'Медицинский институт': [
        { title: 'Теория вероятностей и математическая статистика' },
      ],
    })

    await favoriteDB.init()
    await historyDB.init()
    const favorites = await favoriteDB.getFavorite()
    const histories = await historyDB.getHistory()
    favorite.setData(favorites)
    history.setData(histories)
    setAppLoaded(true)
  }, [])

  if (!loaded || !appLoaded) return null

  return screenManager.getScreen()
})
