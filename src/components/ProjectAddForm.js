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
import TagInput from 'react-native-tag-input'
import { connect } from 'react-redux'
import { colors, hexToRGB, formatTags } from '../utilities'

class ProjectAddForm extends React.Component {
  constructor () {
    super()
    this.state = {
      title: '',
      hasProgress: true,
      progressCurrent: '0',
      progressTarget: '100',
      progressUnits: 'hours',
      tags: []
    }
  }

  componentWillUnmount () {
    this.props.ProjectClear()
  }

  formatTags (tags) {
    return tags.map(function(tag) {
      if (tag.indexOf('#') === -1) {
        return tag.split('').shift('#').join('')
      }
      return tag
    })
  }

  handleAddProject () {
    const formattedTags = 
    this.props.ProjectAdd({
      title: this.state.title,
      tags: formatTags(this.state.tags),
      hasProgress: this.state.hasProgress,
      progressCurrent: this.state.hasProgress ? this.state.progressCurrent : null,
      progressTarget: this.state.hasProgress ? this.state.progressTarget : null,
      progressUnits: this.state.hasProgress ? this.state.progressUnits : null
    })
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

  calculateTitleSize () {
    switch (true) {
      case (this.state.title.length > 25): return 18
      case (this.state.title.length > 15): return 25
      case (this.state.title.length < 15): return 30
    }
  }

  onChangeTags (tags) {
    this.setState({ tags: formatTags(tags) })
  }

  render () {
    const inputProps = {
      keyboardType: 'default',
      placeholder: 'Enter tags separated by spaces',
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{alignItems: 'center', marginTop: 20, padding: 10, alignSelf: 'stretch'}}>
            <TextInput
              placeholder='Add a project title'
              value={this.state.title}
              multiline
              onChangeText={value => this.setState({title: value})}
              style={{textAlign: 'center', fontSize: this.calculateTitleSize(), fontWeight: 'bold', marginBottom: 5, color: colors.lightAccent }}
            />
          </View>
          <View style={{marginTop: 20}}>

          </View>
          <View style={{justifyContent: 'space-between', alignItems: 'center', alignSelf: 'stretch', flexDirection: 'row', marginLeft: 25, marginRight: 25, paddingBottom: 15}}>
            <Text style={{color: colors.lightAccent}}>
              Track progress for this project? 
            </Text>
            <Switch value={this.state.hasProgress} style={{backgroundColor: 'white', borderRadius: 20}} onValueChange={() => this.setState({hasProgress: !this.state.hasProgress})} onTintColor={colors.lightAccent} />
          </View>
          {this.state.hasProgress && this.buildProgressContainer()}
          <View style={{height: 100, alignSelf: 'stretch', paddingLeft: 30, paddingRight: 30, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{fontWeight: 'bold', color: hexToRGB('#FFFFFF', 0.5)}}>Tags</Text>
            <TagInput
              value={this.state.tags}
              onChange={this.onChangeTags.bind(this)}
              tagColor={colors.lightAccent}
              tagTextColor={colors.main}
              inputProps={inputProps}
              numberOfLines={2}
            />
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
