import abitsTimetable from './store/abitsTimetable'
import teachers from './store/teachers'
import subjects from './store/subjects'
import favorite from './store/favorite'
import history from './store/history'
import teachingLevel from './store/teachingLevel'
import { favoriteDB } from './favoriteDB'
import { historyDB } from './historyDB'

function parseTimetable(data) {
  const res = {}

  for (const institute of Object.entries(data)) {
    res[institute[0]] = {}
    for (const tl of Object.entries(institute[1])) {
      res[institute[0]][tl[0]] = {}
      for (const group of Object.entries(tl[1])) {
        const groupTitle = group[0].split('(')[0]
        const subgroupTitle = group[0].split('(')[1].replace(')', '')

        for (const el of group[1]) {
          el.startTime = new Date(
            0,
            0,
            0,
            ...el.startTime.split(':').map(el => Number(el))
          )
          el.endTime = new Date(
            0,
            0,
            0,
            ...el.endTime.split(':').map(el => Number(el))
          )
          el.date = new Date(el.date)
          el.subgroup = subgroupTitle
        }

        try {
          res[institute[0]][tl[0]][groupTitle] = [
            ...res[institute[0]][tl[0]][groupTitle],
            ...group[1],
          ]
        } catch (e) {
          res[institute[0]][tl[0]][groupTitle] = [...group[1]]
        }
      }
    }
  }

  return res
}

const BASE_URL = 'https://schedule.kantiana.ru'

export const bootstrap = async () => {
  let d = new Date(Date.now())
  d = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)

  let resp = await fetch(BASE_URL + '/get_timetable/?start=' + d.toJSON(), {
    headers: {
      'Cache-Control': 'no-cache',
    },
  })
  let data = await resp.json()
  abitsTimetable.setData(parseTimetable(data))

  resp = await fetch(BASE_URL + '/static/teachers.json', {
    headers: {
      'Cache-Control': 'no-cache',
    },
  })
  data = await resp.json()
  teachers.setData(data)

  resp = await fetch(BASE_URL + '/static/subjects.json', {
    headers: {
      'Cache-Control': 'no-cache',
    },
  })
  data = await resp.json()
  subjects.setData(data)

  resp = await fetch(BASE_URL + '/static/tl.json', {
    headers: {
      'Cache-Control': 'no-cache',
    },
  })
  data = await resp.json()
  teachingLevel.setData(data)

  // abitsTimetable.setData({})
  // teachers.setData([])
  // subjects.setData([])
  // teachingLevel.setData([])

  await favoriteDB.init()
  await historyDB.init()
  const favorites = await favoriteDB.getFavorite()
  const histories = await historyDB.getHistory()
  favorite.setData(favorites)
  history.setData(histories)
}
