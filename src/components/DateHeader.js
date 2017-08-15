import React from 'react'
import { View, Text } from 'react-native'
import moment from 'moment'
import { colors, isToday } from '../utilities'

const DateHeader = (props) => {
  const displayDate = moment(props.day).format('dddd').toUpperCase()

  return (
    <View style={styles.container}>
      <View style={[styles.dateDash, {width: (props.deviceWidth - 105) / 2}]} />
      <View style={styles.dateHeaderContainer}>
        <Text style={styles.dateHeader}>
          {isToday(props.day) ? 'TODAY' : displayDate}
        </Text>
      </View>
      <View style={[styles.dateDash, {width: (props.deviceWidth - 105) / 2}]} />
    </View>
  )
}

const styles = {
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 0
  },
  dateDash: {
    borderTopWidth: 1,
    borderColor: colors.main,
  },
  dateHeader: {
    color: colors.main,
    fontWeight: 'bold',
    fontSize: 12
  },
  dateHeaderContainer: {
    paddingLeft: 5,
    paddingRight: 5
  }
}

export default DateHeader
