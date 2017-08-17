import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  colors,
  borderlessImageMap,
  imageMap,
  hexToRGB,
  getEntriesForDay,
  getImageForDay
} from '../utilities'
import DayHero from './DayHero'

class Calendar extends React.Component {
  
  constructor () {
    super()
    this.state = {
      activeMonth: moment().month(),
      activeYear: moment().year()
    }
  }

  handleMonthNav (direction) {
    const {activeMonth, activeYear} = this.state
    if (direction === 'forward' && activeMonth === 11) {
      this.setState({
        activeMonth: 0, 
        activeYear: activeYear + 1
      })
    }
    else if (direction === 'back' && activeMonth === 0) {
      this.setState({
        activeMonth: 11,
        activeYear: activeYear - 1
      })
    }
    else if (direction === 'forward') {
      this.setState({
        activeMonth: activeMonth + 1
      })
    }
    else {
      this.setState({
        activeMonth: activeMonth - 1
      })
    }
  }

  render() {
    let daysInMonth = () => {
      const date = new Date(this.state.activeYear, this.state.activeMonth, 1)
      let days = []
      if (this.state.activeMonth === moment().month()) {
        while (date.getMonth() === this.state.activeMonth && date.getDate() <= moment().date()) {
          days.push(new Date(date))
          date.setDate(date.getDate() + 1)
        }
      }
      else {
        while (date.getMonth() === this.state.activeMonth) {
          days.push(new Date(date))
          date.setDate(date.getDate() + 1)
        }
      }
      return days
    }

    const daysMap = daysInMonth().map(date => (
      <View style={styles.dayContainer} key={date}>
        <DayHero day={date} calendar entries={this.props.entries} days={this.props.days} />
      </View>
    )).reverse()

    return (
      <View style={styles.pageContainer}>
        <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.contentContainer}>
          {daysMap}
        </ScrollView>
        <View style={styles.calendarContainer}>
          <TouchableOpacity onPress={() => this.handleMonthNav('back')}>
            <Image source={imageMap.left} style={styles.navIcon} />
          </TouchableOpacity>
          <View style={styles.activeTimeNote}>
            <Text style={styles.activeMonthLabel}>
              {moment(new Date(this.state.activeYear, this.state.activeMonth, 1)).format('MMMM')}
            </Text>
            <Text style={styles.activeYearLabel}>
              {this.state.activeYear}
            </Text>
          </View>
          <TouchableOpacity onPress={() => this.handleMonthNav('forward')}>
            <Image source={imageMap.right} style={styles.navIcon} />      
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = {
  activeMonthLabel: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: 10,
    paddingRight: 5
  },
  activeTimeNote: {
    flexDirection: 'row'
  },
  activeYearLabel: {
    color: colors.lightAccent,
    fontSize: 20,
    fontWeight: 'bold',
    paddingRight: 10
  },
  calendarContainer: {
    position: 'absolute',
    top: 64,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: hexToRGB(colors.main, 0.9),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  contentContainer: {
    marginTop: 64,
    paddingTop: 50,
    paddingBottom: 150,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  dayContainer: {
    alignSelf: 'stretch'
  },
  monthText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  monthsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  navIcon: {
    height: 25,
    width: 25
  },
  pageContainer: {
    flex: 1
  },
  scrollContainer: {
    backgroundColor: '#eee',
    flex: 1
  },
  tabText: {
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
  },
  yearContainer: {
    flex: 1,
  }
}

const mapStateToProps = state => {
  const { days } = state
  const entries = _.map(state.entries, (val, uid) => {
    return { ...val, uid }
  })
  return { entries, days }
}

export default connect(mapStateToProps)(Calendar)