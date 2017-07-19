import React from 'react'
import { StyleSheet, Text, View} from 'react-native'
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
    const createReadableDate = (date) => moment(new Date(date)).format('MM/DD/YYYY')
    return (
      <View style={styles.container}>
        <Text
          style={styles.welcome}
          onPress={() => Actions.blue()}
        >
          {this.props.project.title}
        </Text>
        {projectEntries.map((entry, idx) => <Text key={idx}>{createReadableDate(entry.date)}{entry.description.length > 0 ? `, ${entry.description}, ` : ', '}{secondsToString(entry.seconds)}</Text>)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffcb05'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  }
})

const mapStateToProps = state => {
  const { project, entries } = state
  return { project, entries }
}

export default connect(mapStateToProps, { ProjectClear })(ProjectDetails);