import React from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from 'react-native'
import { TextRegular } from '../components/ui/Text'
import { Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons'
import { THEME } from '../theme'
import screenManager from '../store/screenManager'

export const MainScreen = () => {
  return (
    <ImageBackground
      source={require('../../assets/image/bg.png')}
      style={styles.container}
    >
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={styles.btn}
          activeOpacity={0.8}
          onPress={() => screenManager.navigate('AbitsInstitus')}
        >
          <TextRegular style={{ fontSize: 15 }}>
            Расписание студента
          </TextRegular>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ ...styles.btn, marginTop: 8 }}
          activeOpacity={0.8}
          onPress={() => screenManager.navigate('TeacherTeacher')}
        >
          <TextRegular style={{ fontSize: 15 }}>
            Расписание преподавателя
          </TextRegular>
        </TouchableOpacity>
        {/* <TouchableOpacity style={{ marginTop: 16 }} activeOpacity={0.8}>
          <TextRegular style={{ fontSize: 15, color: '#fff' }}>
            Моё расписание
          </TextRegular>
        </TouchableOpacity> */}
      </View>
      <View style={styles.smallIcons}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => screenManager.navigate('Favorite')}
        >
          <Feather name='star' size={26} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => screenManager.navigate('History')}
        >
          <FontAwesome5 name='history' size={24} color='white' />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => screenManager.navigate('GlobalSearch')}
        >
          <FontAwesome name='search' size={24} color='white' />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.MAIN_COLOR,
    justifyContent: 'flex-end',
  },

  btnContainer: {
    alignItems: 'center',
    marginBottom: 200,
  },

  btn: {
    backgroundColor: '#fff',
    borderRadius: 8,
    width: 312,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },

  smallIcons: {
    marginLeft: 18,
    width: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 50,
  },
})
