import React, { useState, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { useFonts } from 'expo-font'
import { bootstrap } from './src/bootstrap'
import screenManager from './src/store/screenManager'

export default observer(function App() {
  const [appLoaded, setAppLoaded] = useState(false)
  const [loaded] = useFonts({
    RobotoRegular: require('./assets/fonts/Roboto-Regular.ttf'),
    RobotoBold: require('./assets/fonts/Roboto-Medium.ttf'),
  })

  useEffect(() => {
    bootstrap().then(() => setAppLoaded(true))
  }, [])

  if (!loaded || !appLoaded) return null

  return screenManager.getScreen()
})
