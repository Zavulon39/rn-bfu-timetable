import React, { useState } from 'react'
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { TextRegular, TextBold } from '../ui/Text'
import { Feather } from '@expo/vector-icons'
import { THEME } from '../../theme'
import { TextInput, RadioButton } from 'react-native-paper'
import teachingLevel from '../../store/teachingLevel'

export const ConfigModal = ({ visible, close, setData }) => {
  const [subject, setSubject] = useState('')
  const [teacher, setTeacher] = useState('')
  const [time, setTime] = useState(null)
  const [tl, setTl] = useState(teachingLevel.data[0])
  const [show, setShow] = useState(false)

  const onChange = (event, selectedDate) => {
    if (event.type === 'set') {
      setTime(selectedDate)
    }
    setShow(false)
  }

  return (
    <Modal
      animationType='slide'
      transparent={false}
      visible={visible}
      onRequestClose={close}
      style={styles.modal}
    >
      <View style={styles.header}>
        <View style={styles.left}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.icon}
            onPress={close}
          >
            <Feather name='arrow-left' size={24} color='white' />
          </TouchableOpacity>
          <TextBold style={styles.title}>Фильтры</TextBold>
        </View>
      </View>

      <TextRegular style={styles.itemTitle}>Время начала</TextRegular>
      <View style={styles.timeInputContainer}>
        <View style={styles.timeInput}>
          <TouchableOpacity
            style={styles.timeBtn}
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

      <TextRegular style={styles.itemTitle}>Название пары</TextRegular>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={subject}
          mode='outlined'
          outlineColor={THEME.INPUTGRAY_COLOR}
          selectionColor={THEME.DARKGRAY_COLOR}
          underlineColor={THEME.INPUTGRAY_COLOR}
          theme={{
            colors: {
              primary: THEME.ICONGRAY_COLOR,
              underlineColor: 'transparent',
            },
          }}
          onChangeText={setSubject}
        />
      </View>

      <TextRegular style={styles.itemTitle}>ФИО преподавателя</TextRegular>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={teacher}
          mode='outlined'
          outlineColor={THEME.INPUTGRAY_COLOR}
          selectionColor={THEME.DARKGRAY_COLOR}
          underlineColor={THEME.INPUTGRAY_COLOR}
          theme={{
            colors: {
              primary: THEME.ICONGRAY_COLOR,
              underlineColor: 'transparent',
            },
          }}
          onChangeText={setTeacher}
        />
      </View>

      <TextRegular style={styles.itemTitle}>Уровень образования</TextRegular>
      <View>
        <RadioButton.Group onValueChange={setTl} value={tl}>
          <FlatList
            data={teachingLevel.data}
            keyExtractor={item => item}
            renderItem={({ item }) => {
              return (
                <RadioButton.Item
                  style={styles.radio}
                  label={item}
                  value={item}
                  color={THEME.MAIN_COLOR}
                />
              )
            }}
          />
        </RadioButton.Group>
      </View>

      <View style={styles.btnContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={close}
          style={styles.btn1}
        >
          <TextRegular style={styles.btn1Text}>Отмена</TextRegular>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setData(time, subject.trim(), teacher.trim(), tl)}
          style={styles.btn2}
        >
          <TextRegular style={styles.btn2Text}>Принять</TextRegular>
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
    </Modal>
  )
}

const styles = StyleSheet.create({
  modal: {
    margin: 16,
  },

  btnContainer: {
    position: 'absolute',
    bottom: 0,
    height: 70,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  btn1: {
    width: 156,
  },

  btn1Text: {
    color: THEME.MAIN_COLOR,
    fontSize: 20,
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
    fontSize: 20,
    textAlign: 'center',
  },

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

  itemTitle: {
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: 16,
    fontSize: 12,
  },

  timeInputContainer: {
    marginHorizontal: 16,
  },

  timeInput: {
    width: '100%',
    backgroundColor: THEME.INPUTGRAY_COLOR,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
  },

  timeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    height: 32,
    color: THEME.DARKGRAY_COLOR,
    backgroundColor: THEME.INPUTGRAY_COLOR,
  },

  inputContainer: {
    marginTop: -8,
    marginHorizontal: 16,
  },

  radio: {
    marginTop: -8,
    flexDirection: 'row-reverse',
    alignItems: 'center',
  },
})
