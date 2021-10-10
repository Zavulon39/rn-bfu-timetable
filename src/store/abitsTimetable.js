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
    try {
      return this.data[TLTitle][institutTitle][groupTitle]
    } catch (e) {
      return []
    }
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
    for (const j of Object.entries(this.data[institut])) {
      delete j[1].idx
      delete j[1].title
      delete j[1].active

      for (const g of Object.entries(j[1])) {
        for (const el of g[1]) {
          el.group = g[0]
          el.tl = j[0]
          el.institut = institut
          time = time ?? el.startTime

          if (subject && teacher) {
            if (
              el.title === subject &&
              el.teacher === teacher &&
              el.startTime.getMinutes() === time.getMinutes() &&
              el.startTime.getHours() === time.getHours()
            ) {
              resp.push(el)
            }
          } else if (subject) {
            if (
              el.title === subject &&
              el.startTime.getMinutes() === time.getMinutes() &&
              el.startTime.getHours() === time.getHours()
            ) {
              resp.push(el)
            }
          } else if (teacher) {
            if (
              el.teacher === teacher &&
              el.startTime.getMinutes() === time.getMinutes() &&
              el.startTime.getHours() === time.getHours()
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

  searchTimetable(time, subject, teacher) {
    const resp = []
    time = time ?? new Date()

    for (const institut of Object.entries(this.data)) {
      for (const j of Object.entries(this.data[institut[0]])) {
        delete j[1].idx
        delete j[1].title
        delete j[1].active

        for (const g of Object.entries(j[1])) {
          for (const el of g[1]) {
            el.group = g[0]
            el.tl = j[0]
            el.institut = institut[0]

            if (
              el.title.toLowerCase().indexOf(subject.toLowerCase()) + 1 ||
              el.teacher.toLowerCase().indexOf(teacher.toLowerCase()) + 1 ||
              (el.startTime.getMinutes() === time.getMinutes() &&
                el.startTime.getHours() === time.getHours())
            ) {
              resp.push(el)
            }
          }
        }
      }
    }
    return resp
  }

  strictSearchTimetable(time, subject, teacher, tl = null) {
    const resp = []
    // time = time ?? new Date()

    for (const institut of Object.entries(this.data)) {
      if (tl) {
        const j = Object.entries(this.data[institut[0]]).find(el => {
          return el[0] === tl
        })

        if (!j) return []

        delete j[1].idx
        delete j[1].title
        delete j[1].active

        for (const g of Object.entries(j[1])) {
          for (const el of g[1]) {
            el.group = g[0]
            el.tl = j[0]
            el.institut = institut[0]

            const cond = time
              ? time &&
                el.startTime.getMinutes() === time.getMinutes() &&
                el.startTime.getHours() === time.getHours()
              : true

            if (
              el.title.toLowerCase().indexOf(subject.toLowerCase()) + 1 &&
              el.teacher.toLowerCase().indexOf(teacher.toLowerCase()) + 1 &&
              cond
            ) {
              resp.push(el)
            }
          }
        }
      } else {
        for (const j of Object.entries(this.data[institut[0]])) {
          delete j[1].idx
          delete j[1].title
          delete j[1].active

          for (const g of Object.entries(j[1])) {
            for (const el of g[1]) {
              el.group = g[0]
              el.tl = j[0]

              const cond = time
                ? time &&
                  el.startTime.getMinutes() === time.getMinutes() &&
                  el.startTime.getHours() === time.getHours()
                : true

              if (
                el.title.toLowerCase().indexOf(subject.toLowerCase()) + 1 &&
                el.teacher.toLowerCase().indexOf(teacher.toLowerCase()) + 1 &&
                cond
              ) {
                resp.push(el)
              }
            }
          }
        }
      }
    }
    return resp
  }

  searchGroup(data) {
    const resp = []
    for (const i of Object.entries(this.data)) {
      for (const j of Object.entries(i[1])) {
        delete j[1].idx
        delete j[1].title
        delete j[1].active

        for (const g of Object.entries(j[1])) {
          if (g[0].indexOf(data) + 1) {
            resp.push({
              group: g[0],
              institut: i[0],
              direction: j[0],
            })
          }
        }
      }
    }
    return resp
  }
}

export default new AbitsTimetable()
