import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import moment from 'moment'
import { secondsToString } from '../utilities'

class Day extends React.Component {

  buildDayEntries (dayEntries) {
    const that = this
    return dayEntries.map(function (entry, idx) {
      let entryProject = that.props.projects[entry.projectID]
      return (
        <View style={styles.dayEntry} key={idx} >
          <View style={{ flex: 1 }}>
            <Text>{entryProject.title}</Text>
            {entry.description ? <Text>{entry.description}</Text> : null}
          </View>
          <View style={styles.entryDurationContainer}>
            <Text style={styles.entryDuration}>{secondsToString(entry.seconds)}</Text>
          </View>
        </View>
      )
    })
  }

  render () {
    const entriesArr = Object.values(this.props.entries)
    const isFromToday = (date) => moment(new Date(date)).get('date') === moment(new Date()).get('date')
    const dayEntries = entriesArr.filter(entry => isFromToday(entry.date))
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={{alignSelf: 'stretch', marginTop: 65, marginBottom: 50}}>
          {this.buildDayEntries(dayEntries)}
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 0,
    alignSelf: 'stretch',
    // backgroundColor: '#666666',
    // padding: 10
  },
  entryDurationContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  entryDuration: {
    color: 'orange'
  },
  dayEntry: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    // margin: 5,
    padding: 20,
    flexDirection: 'row'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    // margin: 10,
    color: '#ffffff'
  }
})

const mapStateToProps = state => {
  const { entries, projects, project } = state
  return { entries, projects, project }
}

export default connect(mapStateToProps)(Day)
