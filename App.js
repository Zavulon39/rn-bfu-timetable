import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useFonts } from 'expo-font'
import screenManager from './src/store/screenManager'
import abitsTimetable from './src/store/abitsTimetable'
import teachers from './src/store/teachers'
import subjects from './src/store/subjects'
import favorite from './src/store/favorite'
import { favoriteDB } from './src/favoriteDB'

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
                startTime: '08.30',
                endTime: '10.00',
                teacher: 'Роман Иванович Романов',
                place: 'Аудитория 312',
                date: new Date(2021, 5, 30),
              },
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: '08.30',
                endTime: '10.00',
                teacher: 'Роман Иванович Романов',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: '08.30',
                endTime: '10.00',
                teacher: 'Роман Иванович Романов',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: '08.30',
                endTime: '10.00',
                teacher: 'Роман Иванович Романов',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: '08.30',
                endTime: '10.00',
                teacher: 'Иванов Иван Инванович',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
            ],
            222111: [
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: '08.30',
                endTime: '10.00',
                teacher: 'Иванов Иван Инванович',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
            ],
          },
          Бакалавриат: {
            333444: [
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: '08.30',
                endTime: '10.00',
                teacher: 'Иванов Иван Инванович',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
            ],
            444333: [
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: '08.30',
                endTime: '10.00',
                teacher: 'Иванов Иван Инванович',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
            ],
          },
          Магистратура: {
            555666: [
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: '08.30',
                endTime: '10.00',
                teacher: 'Иванов Иван Инванович',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
            ],
            666555: [
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: '08.30',
                endTime: '10.00',
                teacher: 'Иванов Иван Инванович',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
            ],
          },
          'СПО 9 Классов': {
            777888: [
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: '08.30',
                endTime: '10.00',
                teacher: 'Иванов Иван Инванович',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
            ],
            888777: [
              {
                title: 'Теория вероятностей и математическая статистика',
                type: 'лекция',
                startTime: '08.30',
                endTime: '10.00',
                teacher: 'Иванов Иван Инванович',
                place: 'Аудитория 312',
                date: new Date(Date.now()),
              },
            ],
          },
        },
      'Медицинский институт': {
        Спецалитет: {
          111222: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: '08.30',
              endTime: '10.00',
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(2021, 5, 29),
            },
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: '08.30',
              endTime: '10.00',
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
          ],
          222111: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: '08.30',
              endTime: '10.00',
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
          ],
        },
        Бакалавриат: {
          333444: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: '08.30',
              endTime: '10.00',
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
          ],
          444333: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: '08.30',
              endTime: '10.00',
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
          ],
        },
        Магистратура: {
          555666: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: '08.30',
              endTime: '10.00',
              teacher: 'Иванов Иван Инванович',
              place: 'Аудитория 312',
              date: new Date(Date.now()),
            },
          ],
          666555: [
            {
              title: 'Теория вероятностей и математическая статистика',
              type: 'лекция',
              startTime: '08.30',
              endTime: '10.00',
              teacher: 'Иванов Иван Инванович',
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
        teacher: 'Test1',
        institut: 'Медицинский институт',
      },
      {
        teacher: 'Роман Иванович Романов',
        institut:
          'Институт природопользования, территориального развития и градостроительства',
      },
      {
        teacher: 'Test2',
        institut:
          'Институт природопользования, территориального развития и градостроительства',
      },
    ])
    subjects.setData({
      'Институт природопользования, территориального развития и градостроительства':
        [
          { title: 'Теория вероятностей и математическая статистика' },
          { title: 'Test1' },
        ],
      'Медицинский институт': [
        { title: 'Теория вероятностей и математическая статистика' },
        { title: 'Test2' },
      ],
    })
    await favoriteDB.init()
    const favorites = await favoriteDB.getFavorite()
    favorite.setData(favorites)
    setAppLoaded(true)
  }, [])

  if (!loaded || !appLoaded) return null

  return screenManager.getScreen()
})
