import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { colors, getEntriesForDay, getImageForDay, imageMap, hexToRGB } from '../utilities'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'

class DayHero extends React.Component {
  
  createDateText (day) {
    return (
      <Text style={styles.dateText}>
        {moment(day).format('MMMM Do, YYYY')}
      </Text>
    )
  }

  buildWeekday () {
    if (moment(new Date()).get('date') === moment(this.props.day).get('date')) return 'TODAY'
    if (moment(new Date()).subtract(1, 'd').get('date') === moment(this.props.day).get('date')) return 'YESTERDAY'
    return moment(this.props.day).format('dddd').toUpperCase()
  }

  render() {
    const { days, entries, day, calendar, nav } = this.props
    const isToday = () => moment(new Date(day)).get('date') === moment(new Date()).get('date')
    const numDayEntries = getEntriesForDay(days, entries, moment(day).format('MMDDYYYY')).length
    return (
      <View style={styles.heroContainer}>
        <TouchableOpacity
          activeOpacity={calendar ? 0.8 : 1} 
          style={styles.outerContainer}
          onPress={() => calendar ? Actions.Today({activeDay: moment(day)}) : undefined}
        >
          <Image source={getImageForDay(day)} style={styles.heroImage} />
          <View style={styles.opacityContainer} />
          {calendar && <Text style={styles.weekday}>
            {this.buildWeekday(day)}
          </Text>}
          <View>{this.createDateText(day)}</View>
          {numDayEntries !== 0 && calendar && <View style={styles.entriesContainer}>
            <Text style={styles.entryText}>
              {numDayEntries} {numDayEntries === 1 ? 'entry' : 'entries'}
            </Text>
          </View>}
          {nav && 
            <TouchableOpacity
              onPress={() => this.props.handleDayNavigation('left', isToday())}
              activeOpacity={0.2}
              style={[styles.heroNavigationIconContainer, {left: 10}]}
            >
            <Image source={imageMap.left} style={styles.heroNavigationIcon} />
          </TouchableOpacity>}
          {this.props.nav && 
            <TouchableOpacity
              onPress={() => this.props.handleDayNavigation('right', isToday())}
              activeOpacity={isToday() ? 1 : 0.2}
              style={[styles.heroNavigationIconContainer, {right: 10}]}
            >
            <Image source={imageMap.right} style={[styles.heroNavigationIcon, {opacity: isToday() ? 0.2 : 1}]} />
          </TouchableOpacity>}
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  dateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  entriesContainer: {
    marginTop: 2,
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: hexToRGB(colors.main, 0.5),
    padding: 5,
    borderRadius: 15,
  },
  entryText: {
    paddingLeft: 5,
    paddingRight: 5,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 10
  },
  heroContainer: {
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch'
  },
  heroImage: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
    width: 667,
    alignSelf: 'stretch',
  },
  heroNavigationIcon: {
    width: 25,
    height: 25
  },
  heroNavigationIconContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opacityContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
    width: 1000,
    alignSelf: 'stretch'
  },
  outerContainer: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  weekday: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
}

export default DayHero