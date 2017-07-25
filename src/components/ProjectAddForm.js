import React from 'React'
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import { ProjectAdd, ProjectClear } from '../actions'
import { connect } from 'react-redux'
import { Input } from './common'
import { colors } from '../utilities'

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
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{alignItems: 'center', marginTop: 20}}>
            <TextInput
              placeholder='Add a project title'
              value={this.state.project}
              onChangeText={value => this.setState({project: value})}
              style={{textAlign: 'center', height: 50, width: 200}}

            />
          </View>
          <View style={{flexDirection: 'row', padding: 20, borderRadius: 5, margin: 20, marginTop: 5, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{flex: 5, padding: 0, color: '#555' }}>This goal will be complete after</Text>
            <TextInput
              style={{flex: 1, padding: 0, textAlign: 'right', backgroundColor: 'white', color: colors.main}}
              value={this.state.hoursGoal}
              onChangeText={value => this.setState({hoursGoal: parseInt(value)})}
            />
            <Text style={{flex: 1, padding: 0, textAlign: 'right'}}>hours</Text>
          </View>
          <View style={styles.addProjectButton}>
            <Text
              style={styles.welcome}
              onPress={() => this.onButtonPress()}
            >
              Add Project
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eee'
  },
  addProjectButton: {
    margin: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.main,
    padding: 20,
    borderRadius: 5
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff'
  },
})

export default connect(null, { ProjectAdd, ProjectClear })(ProjectAddForm)
