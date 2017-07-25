import React from 'react'
import { View, Text } from 'react-native'
import { colors } from '../utilities'

const DateHeader = (props) => {
  return (
    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white', paddingTop: 10}}>
      <View style={{borderTopWidth: 1, borderColor: colors.main, width: (props.deviceWidth - 95) / 2}}></View>
      <View style={{paddingLeft: 5, paddingRight: 5}}><Text style={{color: colors.main, fontWeight: 'bold', fontSize: 12}}>TODAY</Text></View>
      <View style={{borderTopWidth: 1, borderColor: colors.main, width: (props.deviceWidth - 95) / 2}}></View>
    </View>
  )
}

export default DateHeader