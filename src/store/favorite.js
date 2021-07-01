import { makeAutoObservable } from 'mobx'

class Favorite {
  data = []

  constructor() {
    makeAutoObservable(this)
  }

  setData(data) {
    this.data = data
  }
}

export default new Favorite()
