import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  BackHandler,
} from 'react-native'
import { TextBold } from './ui/Text'
import { Feather } from '@expo/vector-icons'
import { THEME } from '../theme'
import screenManager from '../store/screenManager'

export const Header = ({
  title,
  prevLink = null,
  params = {},
  headerRight = null,
}) => {
  const height =
    (Dimensions.get('screen').height - Dimensions.get('window').height) / 2

  const navigateToPrev = () => screenManager.navigate(prevLink, params)

  BackHandler.addEventListener('hardwareBackPress', () => {
    navigateToPrev()
    return true
  })

  return (
    <View>
      <View style={{ height, backgroundColor: THEME.MAIN_COLOR }} />
      <View style={styles.header}>
        <View style={styles.left}>
          {prevLink ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.icon}
              onPress={navigateToPrev}
            >
              <Feather name='arrow-left' size={24} color='white' />
            </TouchableOpacity>
          ) : null}
          <TextBold style={styles.title}>{title}</TextBold>
        </View>
        <View style={styles.right}>{headerRight}</View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    height: 56,
    backgroundColor: THEME.MAIN_COLOR,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 20,
    marginLeft: 24,
    textAlign: 'center',
  },

  icon: {
    margin: 8,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
  },

  right: {
    paddingRight: 16,
  },
})
