import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { ProjectClear, ProjectComplete } from '../actions'
import { secondsToString } from '../utilities'
import moment from 'moment'

class ProjectDetails extends React.Component {
  componentWillUnmount () {
    this.props.ProjectClear()
  }

  render () {
    const entriesArr = Object.values(this.props.entries) || []
    const projectEntries = entriesArr.filter(entry => entry.projectID === this.props.project.uid)
    const formattedHoursLogged = this.props.hoursLogged === 0 ? 0 : parseFloat(this.props.project.hoursLogged.toFixed(1))
    const createReadableDate = (date) => moment(new Date(date)).format('MM/DD/YYYY')
    return (
      <View style={styles.container}>
        <View style={{margin: 10, alignItems: 'flex-end', alignSelf: 'stretch'}}>
          <TouchableOpacity onPress={() => this.props.ProjectComplete(this.props.project.uid)} style={this.props.project.complete ? [styles.statusButton, styles.completeStatusButton] : styles.statusButton }>
            {this.props.project.complete 
            ? <Text style={{color: 'white', fontWeight: 'bold'}}>complete</Text>
            : <Text style={{color: '#a083c4', fontWeight: 'bold'}}>mark complete</Text>}
          </TouchableOpacity>
        </View>
        <View style={styles.buttonStyle}><Text style={styles.timeStyle}>{formattedHoursLogged}/{this.props.project.hoursGoal}</Text></View>
        <Text
          style={styles.welcome}
          onPress={() => Actions.blue()}
        >
          {this.props.project.title}
        </Text>
        <ScrollView style={styles.projectEntriesContainer} >{projectEntries.map((entry, idx) => 
          <View style={{borderRadius: 10, flexDirection: 'row', marginBottom: 10, padding: 20, paddingLeft: 10, paddingRight: 15, backgroundColor: 'white'}} key={idx}>
            <View style={[styles.projectEntry, styles.dateStringContainer]}><Text style={styles.timeString}>{createReadableDate(entry.date)}</Text></View>
            <View style={[styles.projectEntry, styles.descriptionContainer]}><Text style={entry.description.length === 0 && {color: 'darkgray'}}>{entry.description.length > 0 ? entry.description : '(No description)'}</Text></View>
            <View style={[styles.projectEntry, styles.timeStringContainer]}><Text style={styles.timeString}>{secondsToString(entry.seconds)}</Text></View>
          </View>
        )}</ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingBottom: 60,
  },
  statusButton: {
    padding: 10,
    borderColor: '#a083c4',
    borderWidth: 2,
    borderRadius: 10
  },
  completeStatusButton: {
    backgroundColor: '#a083c4'
  },
  dateStringContainer: {
    width: 60,
    alignItems: 'flex-start',
  },
  descriptionContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  timeString: {
    color: '#a083c4',
  },
  timeStringContainer: {
    width: 30,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  welcome: {
    fontSize: 28,
    textAlign: 'center',
    margin: 10,
    color: '#555',
    fontWeight: 'bold'
  },
  projectEntriesContainer: {
    marginLeft: 10,
    marginRight: 10,
    alignSelf: 'stretch',
  },
  projectEntry: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
  },
  timeStyle: {
    fontSize: 25,
    color: 'white',
    overflow: 'hidden',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonStyle: {
    borderColor: '#eee',
    borderWidth: 3,
    backgroundColor: '#a083c4',
    borderRadius: 100,
    height: 200,
    width: 200,
    alignItems: 'center', 
    justifyContent:'center'
  },
})

const mapStateToProps = state => {
  const { project, entries } = state
  return { project, entries }
}

export default connect(mapStateToProps, { ProjectClear, ProjectComplete })(ProjectDetails);