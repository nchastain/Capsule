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
import { colors } from '../utilities'

class ProjectAddForm extends React.Component {
  constructor () {
    super()
    this.state = {
      title: '',
      activeType: 'enterprise',
      hasProgress: true,
      progressCurrent: '0',
      progressTarget: '100',
      progressUnits: 'hours'
    }
  }

  componentWillUnmount () {
    this.props.ProjectClear()
  }

  handleAddProject () {
    this.props.ProjectAdd({
      title: this.state.title,
      type: this.state.activeType,
      hasProgress: this.state.hasProgress,
      progressCurrent: this.state.progressCurrent,
      progressTarget: this.state.progressTarget,
      progressUnits: this.state.progressUnits
    })
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
            <TextInput style={{textAlign: 'center', color: colors.main, fontWeight: 'bold', height: 50}} placeholder='0' value={this.state.progressCurrent} onChangeText={value => this.setState({progressCurrent: value})} />
          </View>
          <Text style={{textAlign: 'center', flex: 1, color: 'darkgrey'}}>current</Text>
        </View>
        <View><Text style={{fontSize: 28, color: colors.main}}>/</Text></View>
        <View style={{flex: 1}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput style={{textAlign: 'center', color: colors.main, fontWeight: 'bold', height: 50}} placeholder='100' value={this.state.progressTarget} onChangeText={value => this.setState({progressTarget: value})} />
          </View>
          <Text style={{textAlign: 'center', flex: 1, color: 'darkgrey'}}>target</Text>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <TextInput style={{textAlign: 'center', color: colors.main, fontWeight: 'bold', fontSize: 14, height: 50}} placeholder='hours' value={this.state.progressUnits} onChangeText={value => this.setState({progressUnits: value})} />
          </View>
          <Text style={{textAlign: 'center', flex: 1, color: 'darkgrey', fontSize: 14}}>
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
              value={this.state.title}
              onChangeText={value => this.setState({title: value})}
              style={{textAlign: 'center', fontSize: 30, fontWeight: 'bold', height: 50, marginBottom: 5, color: colors.lightAccent, width: Dimensions.get('window').width}}
            />
          </View>
          <View style={{marginTop: 20}}>

          </View>
          <View style={{justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch', flexDirection: 'row', marginLeft: 25, marginRight: 25}}>
            <Text style={{color: colors.lightAccent}}>
              Track progress for this project? 
            </Text>
            <Switch value={this.state.hasProgress} style={{backgroundColor: 'white', borderRadius: 20}} onValueChange={() => this.setState({hasProgress: !this.state.hasProgress})} onTintColor={colors.lightAccent} />
          </View>
          {this.state.hasProgress && this.buildProgressContainer()}
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
