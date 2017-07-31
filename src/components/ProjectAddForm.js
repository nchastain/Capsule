import React from 'React'
import { View, Text, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback, Switch, Dimensions, Image } from 'react-native'
import { ProjectAdd, ProjectClear } from '../actions'
import { connect } from 'react-redux'
import { Input } from './common'
import { colors } from '../utilities'

class ProjectAddForm extends React.Component {
  constructor () {
    super()
    this.state = {project: '', hoursGoal: '100', timed: false, activeType: 'enterprise'}
  }

  componentWillUnmount() {
    this.props.ProjectClear()
  }

  handleAddProject () {
    this.props.ProjectAdd({title: this.state.project, hoursGoal: this.state.timed ? this.state.hoursGoal : null, timed: this.state.timed, type: this.state.activeType})
  }

  checkActiveType (typeName) {
    return this.state.activeType === typeName
    ? {borderColor: 'white', borderWidth: 5, borderRadius: 25, backgroundColor: 'rgba(0,0,0,0.5)'}
    : {}
  }

  render () {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{alignItems: 'center', marginTop: 20, alignSelf: 'stretch'}}>
            <TextInput
              placeholder='Add a project title'
              value={this.state.project}
              onChangeText={value => this.setState({project: value})}
              style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', height: 50, marginBottom: 5, color: colors.lightAccent, width: Dimensions.get('window').width}}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'center', alignSelf: 'stretch', alignItems: 'center', marginLeft: 10, marginRight: 10, marginBottom: 10, padding: 10, borderRadius: 10, height: 40}}>
            <View style={{flex: 1, paddingLeft: 5}}>
              <Text style={{color: colors.lightAccent, fontSize: 14, fontWeight: 'bold', textAlign: 'left'}}>Use time to measure project progress</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Switch value={this.state.timed} style={{backgroundColor: 'white', borderRadius: 20}} onValueChange={() => this.setState({timed: !this.state.timed})} onTintColor={colors.lightAccent} />
            </View>
          </View>
          {this.state.timed && <View style={{flexDirection: 'row', marginLeft: 10, marginRight: 20, padding: 10, paddingTop: 0, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{padding: 0, flex: 1, paddingLeft: 5, color: colors.lightAccent, textAlign: 'left', fontWeight: 'bold'}}>Project completes after</Text>
            <View style={{width: 80}}>
              <TextInput
                style={{width: 70, textAlign: 'right', color: 'rgba(0,0,0,0.3)', fontSize: 30, fontWeight: 'bold', height: 40}}
                placeholder='200'
                value={this.state.hoursGoal}
                onChangeText={value => this.setState({hoursGoal: value})}
              />
            </View>
            <Text style={{padding: 0, textAlign: 'center', color: colors.lightAccent, fontWeight: 'bold'}}>hours</Text>
          </View>}
          <View style={{flexDirection: 'row', marginLeft: 15, marginRight: 10, padding: 10, paddingTop: 0, alignItems: 'center', justifyContent: 'center', alignSelf: 'stretch'}}>
            <View style={{flex: 4}}><Text style={{color: colors.lightAccent, fontWeight: 'bold'}}>Select project type</Text></View>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end', flex: 1}}>
              <TouchableWithoutFeedback onPress={() => this.setState({activeType: 'enterprise'})}>
                <View style={[{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}, this.checkActiveType('enterprise')]}>
                  <Text style={{fontSize: 15, textAlign: 'center', marginTop: -4}}>💼</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.setState({activeType: 'art'})}>
                <View style={[{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}, this.checkActiveType('art')]}>
                  <Text style={{fontSize: 15, textAlign: 'center', marginTop: -1}}>🎨</Text>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.setState({activeType: 'education'})}>
                <View style={[{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}, this.checkActiveType('education')]}>
                  <Text style={{fontSize: 15, textAlign: 'center'}}>📚</Text>
                </View>
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={styles.addProjectButton}>
            <Text
              style={styles.addText}
              onPress={() => this.handleAddProject()}
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
    backgroundColor: colors.main,
  },
  addProjectButton: {
    margin: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.lightAccent,
    borderRadius: 15,
    padding: 20,
    shadowOffset: {width: 2, height: 2},
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOpacity: 0.3
  },
  addText: {
    fontSize: 20,
    textAlign: 'center',
    color: colors.main,
    fontWeight: 'bold'
  },
})

export default connect(null, { ProjectAdd, ProjectClear })(ProjectAddForm)
