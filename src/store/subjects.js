import { makeAutoObservable } from 'mobx'

class Subjects {
  data = []

  constructor() {
    makeAutoObservable(this)
  }

  setData(data) {
    this.data = data
  }

  getFilteredData(institut, text) {
    if (!text) return this.data[institut]

    const resp = []

    for (let el of this.data[institut]) {
      let { title } = el
      title = title.toLowerCase()
      text = text.toLowerCase()

      if (title.indexOf(text) + 1) {
        resp.push(el)
      }
    }

    return resp
  }
}

export default new Subjects()
