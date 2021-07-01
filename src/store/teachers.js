import { makeAutoObservable } from 'mobx'

class Teachers {
  data = {}

  constructor() {
    makeAutoObservable(this)
  }

  setData(data) {
    this.data = data
  }

  getFilteredData(institut, text) {
    if (!text) return this.data[institut]

    const resp = []

    for (let el of this.data['institut']) {
      let { teacher } = el
      teacher = teacher.toLowerCase()
      text = text.toLowerCase()

      if (teacher.indexOf(text) + 1) {
        resp.push(el)
      }
    }

    return resp
  }
}

export default new Teachers()
