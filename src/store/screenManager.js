import React from 'react'
import { makeAutoObservable } from 'mobx'
import { useRouter } from '../hooks/useRouter'

class ScreenManager {
  screen = 'Main'
  params = {}

  constructor() {
    makeAutoObservable(this)
  }

  navigate(screen, params = {}) {
    this.screen = screen
    this.params = { ...this.params, ...params }
  }

  getParam(key) {
    return this.params[key]
  }

  getScreen() {
    return useRouter(this.screen)
  }
}

export default new ScreenManager()
