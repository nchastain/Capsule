import React from 'React'
import { View, Text, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, Image, Switch, ScrollView, ListView, TouchableOpacity } from 'react-native'
import { NoteAdd, AddTag, TagsFetch, AddEntry, ProjectUpdateProgress } from '../actions'
import { connect } from 'react-redux'
import uuid from 'react-native-uuid'
import { darkColorMap, imageMap, colors, typeMap } from '../utilities'
import _ from 'lodash'

class EntryAdditionForm extends React.Component {
  constructor (props) {
    super()
    this.state = {text: '', ran: false, newTags: false, minutesProgress: '', hasProject: false, project: null}
  }

  componentWillMount () {
    this.createDataSource(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource ({ projects }) {
    const filteredProjects = projects.filter(project => !project.complete)

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.setState({dataSource: ds.cloneWithRows(filteredProjects.sort((a, b) => b.time - a.time))})
  }

  extractTagsFromInput () {
    const newTags = this.state.text.match(/(\B#\S+)/g)
    return newTags ? newTags.map(tag => tag.replace('#', '')) : []
  }

  onButtonPress () {
    const tagsFromInput = this.extractTagsFromInput()
    const oldTags = Object.values(this.props.tags)
    const oldTagTitles = oldTags.map(tag => tag.text)
    const tagMatches = oldTags.filter(tag => tagsFromInput.indexOf(tag.text) !== -1)
    const existingIDs = tagMatches.map(tag => tag.id)
    const newTags = tagsFromInput.filter(tag => oldTagTitles.indexOf(tag) === -1)
    const newTagObjs = newTags.map(newTag => ({ text: newTag, id: uuid.v4() }))
    const newIDs = newTagObjs.map(newTagObj => newTagObj.id)
    const allTagIDs = [...existingIDs, ...newIDs]

    const noteObj = {
      text: this.state.text.replace(/\r?\n|\r/, ''),
      date: new Date().getTime(),
      tagIDs: allTagIDs,
      type: this.props.entryType,
    }
    if (this.state.hasProject) noteObj.projectID = this.state.project.uid
    newTagObjs.forEach(this.props.AddTag)
    if (this.state.hasProject && this.props.entryType === 'progress') this.props.ProjectUpdateProgress(this.state.project.uid, this.state.minutesProgress)
    this.props.AddEntry(noteObj)
  }

  onChanged (text) {
    let newText = ''
    let numbers = '0123456789'

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i]
      }
    }

    this.setState({ minutesProgress: newText })
  }

  displayProjects () {
    if (!this.props.projects) return null
    const filteredProjects = this.props.projects.filter(project => !project.complete)
    return filteredProjects.map((project) => <Text>{project.title}</Text>)
  }

  handleSelect (project) {
    this.setState({ project })
  }

  renderRow (project) {
    const entryProjectID = this.state.project ? this.state.project.uid : null

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleSelect(project)}>
        <View style={{backgroundColor: entryProjectID === project.uid ? colors.lightAccent : 'white', flexDirection: 'column', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 15, paddingBottom: 15, paddingLeft: 10, paddingRight: 10}}>
          <View style={{backgroundColor: entryProjectID === project.uid ? colors.lightAccent : 'white'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch'}}>
              <View style={{alignItems: 'center', marginTop: -4, paddingRight: 4, width: 25}}><Text>{project.type ? typeMap[project.type] : typeMap['enterprise']}</Text></View>
              <View><Text style={{color: colors.main, fontSize: 16, fontWeight: 'bold'}}>{project.title}</Text></View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }


  render () {
        //define delimiter
    let delimiter = /\s+/

    //split string
    let _text = this.state.text
    let token, index, parts = []
    while (_text) {
      delimiter.lastIndex = 0
      token = delimiter.exec(_text)
      if (token === null) {
        break
      }
      index = token.index
      if (token[0].length === 0) {
        index = 1
      }
      parts.push(_text.substr(0, index))
      parts.push(token[0])
      index = index + token[0].length
      _text = _text.slice(index)
    }
    parts.push(_text)

    //highlight hashtags
    parts = parts.map((text) => {
      if (/^#/.test(text)) {
        return <Text key={text} style={styles.hashtag}>{text}</Text>
      } else {
        return text
      }
    })

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'stretch', backgroundColor: colors.main}}>
          <View style={{marginTop: 90, width: 80, borderRadius: 40, height: 80, shadowOffset: {width: 2, height: 2}, shadowColor: '#555', shadowOpacity: 0.3}}>
            <Image source={imageMap[this.props.entryType]} style={{width: 80, height: 80}} />
          </View>
          <View style={{padding: 20, height: 100, alignSelf: 'stretch', borderRadius: 10, borderColor: '#eee', borderWidth: 1, margin: 20, backgroundColor: 'white', shadowOffset: {width: 2, height: 2}, shadowColor: '#555', shadowOpacity: 0.3}}>
            {this.props.entryType !== 'progress' && 
            <TextInput
              placeholder={`Add ${this.props.entryType} here`}
              numberOfLines={3}
              multiline
              style={{backgroundColor: 'white', alignSelf: 'stretch', fontSize: 20}}
              onChangeText={value => this.setState({text: value})}
            ><Text>{parts}</Text></TextInput>}
            {this.props.entryType === 'progress' && 
            <TextInput
              placeholder={'How many minutes of progress?'}
              keyboardType='numeric'
              maxLength={10}
              multiline
              onChangeText={(text) => this.onChanged(text)}
              style={{backgroundColor: 'white', alignSelf: 'stretch', fontSize: 20}}
              value={this.state.minutesProgress}
            />}
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 10, paddingBottom: 10}}>
            <View style={{flex: 4, paddingLeft: 5}}>
              <Text style={{color: colors.lightAccent, fontSize: 14, fontWeight: 'bold', textAlign: 'left'}}>Associate this entry with a project?</Text>
            </View>
            <View style={{alignItems: 'flex-end', flex: 1, paddingRight: 5}}>
              <Switch value={this.state.hasProject} style={{backgroundColor: 'white', borderRadius: 20}} onValueChange={() => this.setState({hasProject: !this.state.hasProject})} onTintColor={colors.lightAccent} />
            </View>
          </View>

          {this.state.hasProject &&
          <View style={{flex: 1, alignSelf: 'stretch', paddingLeft: 20, paddingRight: 20}}>
            <ListView enableEmptySections dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} contentContainerStyle={{backgroundColor: 'white'}} />
          </View>}
          <View style={[styles.addNoteButton, {borderRadius: 10, backgroundColor: darkColorMap[this.props.entryType], width: 250, height: 50, marginBottom: 120}]}>
            <Text
              style={styles.welcome}
              onPress={this.onButtonPress.bind(this)}
            >
              Add {this.props.entryType}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  addNoteButton: {
    margin: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.main,
    padding: 20,
    borderRadius: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#555',
    shadowOpacity: 0.3
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  hashtag: {
    color: colors.main,
    fontWeight: 'bold'
  }
})

const mapStateToProps = state => {
  const { tags } = state
  const projects = _.map(state.projects, (val, uid) => {
    return { ...val, uid }
  })
  return { tags, projects }
}

export default connect(mapStateToProps, { NoteAdd, AddTag, AddEntry, TagsFetch, ProjectUpdateProgress })(EntryAdditionForm)
