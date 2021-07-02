import { makeAutoObservable } from 'mobx'

class History {
  data = []

  constructor() {
    makeAutoObservable(this)
  }

  setData(data) {
    this.data = data
  }
}

export default new History()
