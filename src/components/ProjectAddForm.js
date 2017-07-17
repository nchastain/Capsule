import React from 'React'
import { View, Text, StyleSheet } from 'react-native'
import { ProjectAdd, ProjectClear } from '../actions'
import { connect } from 'react-redux'
import { Input } from './common'

class ProjectAddForm extends React.Component {
  constructor () {
    super()
    this.state = {project: ''}
  }

  componentWillUmmount() {
    this.props.ProjectClear()
  }

  onButtonPress () {
    this.props.ProjectAdd({title: this.state.project})
  }

  render () {
    return (
      <View style={styles.container}>
        <Input
          placeholder='Add a project title'
          value={this.state.project}
          onChangeText={value => this.setState({project: value})}
        />
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
