import { makeAutoObservable } from 'mobx'

class Teachers {
  data = []

  constructor() {
    makeAutoObservable(this)
  }

  setData(data) {
    this.data = data
  }

  getFilteredData(text) {
    if (!text) return this.data

    const resp = []

    for (let el of this.data) {
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
