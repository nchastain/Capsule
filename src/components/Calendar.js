import React from 'react'
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import moment from 'moment'
import { connect } from 'react-redux'
import _ from 'lodash'
import { colors, borderlessImageMap, imageMap, hexToRGB, getEntriesForDay, getImageForDay } from '../utilities'
import DayHero from './DayHero'

class Calendar extends React.Component {
  
  render() {
    const now = new Date();
    var daysOfYear = [];
    for (var d = new Date(2017, 7, 1); d <= now; d.setDate(d.getDate() + 1)) {
      daysOfYear.push(new Date(d));
    }
    const daysMap = daysOfYear.map(date => (
      <View style={{alignSelf: 'stretch'}} key={date}>
        <DayHero day={date} calendar entries={this.props.entries} days={this.props.days} />
      </View>
    ))
    
    return (
      <ScrollView style={{backgroundColor: '#eee'}} contentContainerStyle={{marginTop: 64, paddingBottom: 150, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'}}>
        {daysMap}
      </ScrollView>
    )
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