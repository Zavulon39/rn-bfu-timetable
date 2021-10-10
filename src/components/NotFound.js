import React from 'react'
import { View, Image } from 'react-native'
import { TextRegular } from './ui/Text'

export const NotFound = ({ title = 'Пока ничего не найдено' }) => {
  return (
    <View style={{ alignItems: 'center' }}>
      <Image
        source={require('../../assets/image/not_found.png')}
        style={{
          width: 250,
          height: 250,
          marginTop: 32,
        }}
      />
      <TextRegular style={{ marginTop: 24, fontSize: 20 }}>{title}</TextRegular>
    </View>
  )
}
