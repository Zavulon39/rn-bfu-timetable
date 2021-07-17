import { makeAutoObservable } from 'mobx'

class TeachingLevel {
  data = []

  constructor() {
    makeAutoObservable(this)
  }

  setData(data) {
    this.data = data
  }
}

export default new TeachingLevel()
