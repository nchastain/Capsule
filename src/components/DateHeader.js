import React from 'react'
import { View, Text } from 'react-native'
import moment from 'moment'
import { colors, isToday } from '../utilities'

const DateHeader = (props) => {
  const displayDate = isToday(props.day) ? 'TODAY' : moment(props.day).format('dddd').toUpperCase()
  return (
    <View style={{alignItems: 'center', flexDirection: 'row', justifyContent: 'center', backgroundColor: 'white', paddingTop: 10, paddingBottom: 0}}>
      <View style={{borderTopWidth: 1, borderColor: colors.main, width: (props.deviceWidth - 105) / 2}}></View>
      <View style={{paddingLeft: 5, paddingRight: 5}}><Text style={{color: colors.main, fontWeight: 'bold', fontSize: 12}}>{displayDate}</Text></View>
      <View style={{borderTopWidth: 1, borderColor: colors.main, width: (props.deviceWidth - 105) / 2}}></View>
    </View>
  )
}

export default DateHeader
