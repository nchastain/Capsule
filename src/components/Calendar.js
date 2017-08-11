import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import { connect } from 'react-redux'
import _ from 'lodash'
import { colors, borderlessImageMap, imageMap, hexToRGB, getEntriesForDay, getImageForDay } from '../utilities'
import DayHero from './DayHero'

class Calendar extends React.Component {
  
  constructor () {
    super()
    this.state = {activeMonth: moment().month(), activeYear: moment().year()}
  }

  handleMonthNav (direction) {
    if (direction === 'forward' && this.state.activeMonth === 11) {
      this.setState({activeMonth: 0, activeYear: this.state.activeYear + 1})
    }
    else if (direction === 'back' && this.state.activeMonth === 0) {
      this.setState({activeMonth: 11, activeYear: this.state.activeYear - 1})
    }
    else if (direction === 'forward') {
      this.setState({activeMonth: this.state.activeMonth + 1})
    }
    else {
      this.setState({activeMonth: this.state.activeMonth - 1})
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
      <View style={{alignSelf: 'stretch'}} key={date}>
        <DayHero day={date} calendar entries={this.props.entries} days={this.props.days} />
      </View>
    )).reverse()

    return (
      <View style={{flex: 1}}>
        <ScrollView style={{backgroundColor: '#eee', flex: 1}} contentContainerStyle={{marginTop: 64, paddingTop: 50, paddingBottom: 150, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'}}>
          {daysMap}
        </ScrollView>
        <View style={{position: 'absolute', top: 64, left: 0, right: 0, height: 50, backgroundColor: hexToRGB(colors.main, 0.9), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 15, paddingRight: 15}}>
          <TouchableOpacity onPress={() => this.handleMonthNav('back')}>
            <Image source={imageMap.left} style={{height: 25, width: 25}} />
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text style={{color: 'white', fontSize: 20, fontWeight: 'bold', paddingLeft: 10, paddingRight: 5}}>{moment(new Date(this.state.activeYear, this.state.activeMonth, 1)).format('MMMM')}</Text>
            <Text style={{color: colors.lightAccent, fontSize: 20, fontWeight: 'bold', paddingRight: 10}}>{this.state.activeYear}</Text> 
          </View>
          <TouchableOpacity onPress={() => this.handleMonthNav('forward')}>
            <Image source={imageMap.right} style={{height: 25, width: 25}} />      
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const styles = {
  monthText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: 'white'
  },
  monthsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
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