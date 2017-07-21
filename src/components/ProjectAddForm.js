import React from 'React'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { ProjectAdd, ProjectClear } from '../actions'
import { connect } from 'react-redux'
import { Input } from './common'

class ProjectAddForm extends React.Component {
  constructor () {
    super()
    this.state = {project: '', hoursGoal: '100'}
  }

  componentWillUnmount() {
    this.props.ProjectClear()
  }

  onButtonPress () {
    this.props.ProjectAdd({title: this.state.project, hoursGoal: this.state.hoursGoal})
  }

  render () {
    console.log(this.state.hoursGoal)
    return (
      <View style={styles.container}>
        <Input
          placeholder='Add a project title'
          value={this.state.project}
          onChangeText={value => this.setState({project: value})}
        />
        <View style={{flexDirection: 'row', padding: 20, borderRadius: 5, margin: 20, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{flex: 5, padding: 0, color: '#555' }}>This goal will be complete after</Text>
          <TextInput
            style={{flex: 1, padding: 0, textAlign: 'right', backgroundColor: 'white', color: '#a083c4'}}
            value={this.state.hoursGoal}
            onChangeText={value => this.setState({hoursGoal: parseInt(value)})}
          />
          <Text style={{flex: 1, padding: 0, textAlign: 'right'}}>hours</Text>
        </View>
        <Text
          style={styles.welcome}
          onPress={() => this.onButtonPress()}
        >
          Add Project
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff'
  },
})

export default connect(null, { ProjectAdd, ProjectClear })(ProjectAddForm)
