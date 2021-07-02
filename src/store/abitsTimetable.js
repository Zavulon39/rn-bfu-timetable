import { makeAutoObservable } from 'mobx'
import screenManager from './screenManager'

class AbitsTimetable {
  data = {}

  constructor() {
    makeAutoObservable(this)
  }

  setData(data) {
    this.data = data
  }

  getGroupsTLByName(name) {
    return this.data[name]
  }

  getTimetable(TLTitle, institutTitle, groupTitle) {
    return this.data[TLTitle][institutTitle][groupTitle]
  }

  getTeacherTimetable(teacher) {
    const resp = []
    for (const i of Object.entries(this.data)) {
      for (const j of Object.entries(i[1])) {
        delete j[1].idx
        delete j[1].title
        delete j[1].active

        for (const g of Object.entries(j[1])) {
          for (const el of g[1]) {
            if (el.teacher === teacher) resp.push(el)
          }
        }
      }
    }
    return resp
  }

  findTimetable(time, subject, teacher) {
    const institut = screenManager.getParam('item')
    const resp = []
    time = time ?? new Date()
    for (const j of Object.entries(this.data[institut])) {
      delete j[1].idx
      delete j[1].title
      delete j[1].active

      for (const g of Object.entries(j[1])) {
        for (const el of g[1]) {
          el.group = g[0]
          el.tl = j[0]

          if (subject && teacher) {
            if (
              (el.title === subject && el.teacher === teacher) ||
              (el.startTime.getMinutes() === time.getMinutes() &&
                el.startTime.getHours() === time.getHours())
            ) {
              resp.push(el)
            }
          } else if (subject) {
            if (
              el.title === subject ||
              (el.startTime.getMinutes() === time.getMinutes() &&
                el.startTime.getHours() === time.getHours())
            ) {
              resp.push(el)
            }
          } else if (teacher) {
            if (
              el.teacher === teacher ||
              (el.startTime.getMinutes() === time.getMinutes() &&
                el.startTime.getHours() === time.getHours())
            ) {
              resp.push(el)
            }
          } else {
            if (
              el.startTime.getMinutes() === time.getMinutes() &&
              el.startTime.getHours() === time.getHours()
            ) {
              resp.push(el)
            }
          }
        }
      }
    }
    return resp
  }
}

export default new AbitsTimetable()
