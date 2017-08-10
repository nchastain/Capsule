//nav, entryCount - both will be boolean props, default to false

import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { colors, getEntriesForDay, getImageForDay, imageMap } from '../utilities'

import moment from 'moment'

class DayHero extends React.Component {
  
  createDateText (day) {
    return (
      <Text style={styles.dateText}>
        {moment(day).format('MMMM Do, YYYY')}
      </Text>
    )
  }

  handleDayNavigation (direction, isToday) {
    if (isToday && direction === 'right') return null
    else if (direction === 'left') {
      this.setState({activeDay: moment(this.state.activeDay).subtract(1, 'days')}, function() {
      })
    }
    else if (direction === 'right') {
      this.setState({activeDay: moment(this.state.activeDay).add(1, 'days')})
    }
  }

  render() {
    const isToday = () => moment(new Date(this.props.day)).get('date') === moment(new Date()).get('date')
    return (
      <View style={styles.heroContainer}>
        <Image source={getImageForDay(this.props.day)} style={styles.heroImage} />
        <View style={styles.opacityContainer} />
        <View>{this.createDateText(this.props.day)}</View>
        {this.props.nav && <TouchableOpacity onPress={() => this.handleDayNavigation('left', isToday())} activeOpacity={0.2} style={[styles.heroNavigationIconContainer, {left: 10}]}>
          <Image source={imageMap.left} style={styles.heroNavigationIcon} />
        </TouchableOpacity>}
        {this.props.nav && <TouchableOpacity onPress={() => this.handleDayNavigation('right', isToday())} activeOpacity={isToday() ? 1 : 0.2} style={[styles.heroNavigationIconContainer, {right: 10}]}>
          <Image source={imageMap.right} style={[styles.heroNavigationIcon, {opacity: isToday() ? 0.2 : 1}]} />
        </TouchableOpacity>}
      </View>
    )
  }
}

const styles = {
  dateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
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
}

export default DayHero