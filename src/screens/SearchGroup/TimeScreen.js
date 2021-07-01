import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Header } from '../../components/Header'
import { TextRegular } from '../../components/ui/Text'
import { Feather } from '@expo/vector-icons'
import screenManager from '../../store/screenManager'
import DateTimePicker from '@react-native-community/datetimepicker'
import { THEME } from '../../theme'

export const TimeScreen = () => {
  const [time, setTime] = useState(
    null || screenManager.getParam('searchGroupTime')
  )
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      setTime(selectedDate)
    }
    setShow(false)
  }

  return (
    <View>
      <Header title='Время' prevLink='AbitsGroup' />
      <TextRegular style={styles.title}>
        Во сколько начинается первая пара?
      </TextRegular>
      <View style={styles.inputContainer}>
        <View style={styles.input}>
          <TouchableOpacity
            style={styles.btn}
            activeOpacity={0.8}
            onPress={() => setShow(true)}
          >
            <Feather name='clock' size={24} color={THEME.ICONGRAY_COLOR} />
            <TextRegular
              style={{
                color: THEME.DARKGRAY_COLOR,
                marginLeft: 12,
                fontSize: 15,
              }}
            >
              {time ? `${time.getHours()}:${time.getMinutes()}` : ''}
            </TextRegular>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.btnContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn1}
          onPress={() =>
            screenManager.navigate('SearchGroupSubject', {
              searchGroupTime: null,
            })
          }
        >
          <TextRegular style={styles.btn1Text}>Я не помню</TextRegular>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.btn2}
          onPress={() =>
            screenManager.navigate('SearchGroupSubject', {
              searchGroupTime: time,
            })
          }
        >
          <TextRegular style={styles.btn2Text}>Далее</TextRegular>
        </TouchableOpacity>
      </View>
      {show && (
        <DateTimePicker
          testID='dateTimePicker'
          value={time ?? new Date()}
          mode='time'
          is24Hour={true}
          display='spinner'
          onChange={onChange}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    marginTop: 24,
    marginHorizontal: 16,
    fontSize: 20,
    textAlign: 'center',
  },

  inputContainer: {
    marginTop: 16,
    marginHorizontal: 16,
  },

  input: {
    width: '100%',
    backgroundColor: THEME.INPUTGRAY_COLOR,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  btn: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  btnContainer: {
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  btn1: {
    width: 156,
  },

  btn1Text: {
    color: THEME.MAIN_COLOR,
    fontSize: 15,
    textAlign: 'center',
  },

  btn2: {
    width: 156,
    height: 36,
    backgroundColor: THEME.MAIN_COLOR,
    borderRadius: 8,
    justifyContent: 'center',
  },

  btn2Text: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center',
  },
})
