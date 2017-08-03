import React from 'React'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  Switch,
  Dimensions
} from 'react-native'
import { ProjectAdd, ProjectClear } from '../actions'
import { connect } from 'react-redux'
import SegmentedControlTab from 'react-native-segmented-control-tab'
import { colors, progressTypes } from '../utilities'

class ProjectAddForm extends React.Component {
  constructor () {
    super()
    this.state = {project: '', hoursGoal: '100', progressType: 'time', timed: false, activeType: 'enterprise'}
  }

  componentWillUnmount () {
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

  buildProgressContainer () {
    return (
      <View style={{backgroundColor: 'white', padding: 20, margin: 20, borderRadius: 30, height: 60, paddingTop: 10, paddingBottom: 10, alignSelf: 'stretch', justifyContent: 'space-around', flexDirection: 'row'}}>
        <View style={{flex: 1}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput style={{textAlign: 'center', color: colors.main, fontWeight: 'bold'}} placeholder='0' value={this.state.progressCurrent} />
          </View>
          <Text style={{textAlign: 'center', flex: 1, color: 'darkgrey'}}>current</Text>
        </View>
        <View><Text style={{fontSize: 28, color: colors.main}}>/</Text></View>
        <View style={{flex: 1}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput style={{textAlign: 'center', color: colors.main, fontWeight: 'bold'}} placeholder='100' value={this.state.progressTarget} />
          </View>
          <Text style={{textAlign: 'center', flex: 1, color: 'darkgrey'}}>target</Text>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput style={{textAlign: 'center', color: colors.main, fontWeight: 'bold', fontSize: 10}} placeholder='hours' value={this.state.progressUnits} />
          </View>
          <Text style={{textAlign: 'center', flex: 1, color: 'darkgrey', fontSize: 10}}>
            units
          </Text>
        </View>
      </View>
    )
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
          <View>
            <Text style={{color: 'white'}}>
              Progress type
            </Text>
          </View>
          <SegmentedControlTab
            values={['Time', 'Manual', 'None']}
            selectedIndex={parseInt(progressTypes.indexOf(this.state.progressType))}
            onTabPress={(index) => this.setState({progressType: progressTypes[index]})}
            tabsContainerStyle={{marginLeft: 30, marginRight: 30, marginTop: 10, marginBottom: 10}}
            tabStyle={{borderColor: colors.lightAccent}}
            tabTextStyle={{color: colors.main}}
            activeTabTextStyle={{color: colors.main, fontWeight: 'bold'}}
            activeTabStyle={{backgroundColor: colors.lightAccent}}
          />
          {this.buildProgressContainer()}
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
