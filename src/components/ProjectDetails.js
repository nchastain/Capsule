import React from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { ProjectClear } from '../actions'
import { secondsToString } from '../utilities'
import moment from 'moment'

class ProjectDetails extends React.Component {
  componentWillUnmount () {
    this.props.ProjectClear()
  }

  render () {
    const entriesArr = Object.values(this.props.entries) || []
    const projectEntries = entriesArr.filter(entry => entry.projectID === this.props.project.uid)
    const formattedHoursLogged = parseFloat(this.props.project.hoursLogged.toFixed(1))
    const createReadableDate = (date) => moment(new Date(date)).format('MM/DD/YYYY')
    return (
      <View style={styles.container}>
        <View style={styles.buttonStyle}><Text style={styles.timeStyle}>{formattedHoursLogged}/{this.props.project.hoursGoal}</Text></View>
        <Text
          style={styles.welcome}
          onPress={() => Actions.blue()}
        >
          {this.props.project.title}
        </Text>
        <ScrollView style={styles.projectEntriesContainer} >{projectEntries.map((entry, idx) => <View style={{borderRadius: 10}} key={idx}><Text style={styles.projectEntry}>{createReadableDate(entry.date)}{entry.description.length > 0 ? `, ${entry.description}, ` : ', '}{secondsToString(entry.seconds)}</Text></View>)}</ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eee',
    paddingBottom: 60,
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
    padding: 20,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    marginTop: 5,
    marginBottom: 5,
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

export default connect(mapStateToProps, { ProjectClear })(ProjectDetails);