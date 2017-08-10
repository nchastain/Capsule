import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import { colors, borderlessImageMap, imageMap, hexToRGB } from '../utilities'

class Calendar extends React.Component {
  render() {
    const picRandomizer = (dayInput) => moment(dayInput).unix()
    const heroSource = (day) => `https://placeimg.com/${667 * picRandomizer(day)}/${100 * picRandomizer(day)}/nature`
    const now = new Date();
    var daysOfYear = [];
    for (var d = new Date(2017, 7, 1); d <= now; d.setDate(d.getDate() + 1)) {
      daysOfYear.push(new Date(d));
    }

    const daysMap = daysOfYear.map(date => (
      <View style={{alignSelf: 'stretch'}} key={date}>{buildDayHero(date)}</View>
    ))
    
    return (
      <ScrollView style={{backgroundColor: '#eee'}} contentContainerStyle={{marginTop: 64, paddingBottom: 150, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'}}>
        {daysMap}
      </ScrollView>
    )
  }
}

const buildDayHero = (dayInput) => {
  const picRandomizer = (dayInput) => moment(dayInput).unix()
  const heroSource = `https://placeimg.com/${667 * picRandomizer(dayInput)}/${100 * picRandomizer(dayInput)}`
  return (
    <View style={styles.heroContainer}>
      <TouchableOpacity
        activeOpacity={0.8} 
        style={{flex: 1, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'}}
        onPress={() => Actions.Today({activeDay: moment(dayInput)})}
      >
        <Image source={{uri: heroSource}} style={[styles.heroImage, {width: 667}]} />
        <View style={[styles.opacityContainer, {width: 667}]} />
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch'}}>
          <Text style={styles.weekday}>
            {buildWeekday(dayInput)}
          </Text>
          {createDateText(dayInput)}
          <View style={styles.entriesContainer}>
            <Text style={styles.entryText}>9 entries</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  )
}

const buildWeekday = (dayInput) => {
  if (moment(new Date()).get('date') === moment(dayInput).get('date')) return 'TODAY'
  else if (moment(new Date()).subtract(1, 'd').get('date') === moment(dayInput).get('date')) return 'YESTERDAY'
  else return moment(dayInput).format('dddd').toUpperCase()
}

const createDateText = (dayInput) => {
  return (
    <Text style={styles.dateText}>
      {moment(dayInput).format('MMMM Do, YYYY')}
    </Text>
  )
}

const styles = {
  dateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 23,
  },
  entriesContainer: {
    marginTop: 2,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: hexToRGB(colors.main, 0.4),
    padding: 5,
    borderRadius: 15,
  },
  entryIcon: {
    height: 20,
    width: 20,
    marginLeft: 2,
    marginRight: 2,
  },
  heroContainer: {
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    alignSelf: 'stretch',
  },
  heroImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 100,
  },
  entryText: {
    paddingLeft: 5,
    paddingRight: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10
  },
  opacityContainer: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    left: 0,
    top: 0,
    height: 100,
  },
  weekday: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
}


export default Calendar