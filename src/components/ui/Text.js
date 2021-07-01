import React from 'react'
import { Text } from 'react-native'

export const TextRegular = ({ children, style }) => {
  return (
    <Text style={{ ...style, fontFamily: 'RobotoRegular' }}>{children}</Text>
  )
}

export const TextBold = ({ children, style }) => {
  return <Text style={{ ...style, fontFamily: 'RobotoBold' }}>{children}</Text>
}
