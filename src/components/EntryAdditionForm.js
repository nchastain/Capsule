import React from 'React'
import _ from 'lodash'
import { connect } from 'react-redux'
import { ImagePicker } from 'expo'
import uuid from 'react-native-uuid'
import {
  View,
  Text,
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Image,
  Switch,
  ScrollView,
  ListView,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native'
import {
  NoteAdd,
  AddTag,
  TagsFetch,
  AddEntry,
  ProjectUpdateProgress,
  DayEntryAdd
} from '../actions'
import {
  darkColorMap,
  lightColorMap,
  imageMap,
  borderlessImageMap,
  colors,
  typeMap,
  hexToRGB,
  formatTags
} from '../utilities'
import TagInput from 'react-native-tag-input'
import moment from 'moment'


class EntryAdditionForm extends React.Component {
  constructor (props) {
    super(props)
    let deviceWidth = Dimensions.get('window').width
    let deviceHeight = Dimensions.get('window').height
    this.state = {
      deviceWidth,
      deviceHeight,
      text: '',
      description: '',
      ran: false,
      newTags: false,
      project: null,
      openModal: false,
      tags: [],
      photo: null
    }
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

  onChangeTags (tags) {
    this.setState({ tags: formatTags(tags) })
  }

  onButtonPress () {
    let noteObj = {
      text: this.state.text.replace(/\r?\n|\r/, ''),
      description: this.state.description ? this.state.description.replace(/\r?\n|\r/, '') : '',
      date: this.props.day ? moment(this.props.day).unix() : moment().unix(),
      type: this.props.entryType,
      tags: formatTags(this.state.tags),
      photo: this.state.photo
    }
    let noteID = uuid.v4()
    noteObj.projectID = this.state.project ? this.state.project.uid : null
    if (this.state.project && this.props.entryType === 'progress' && this.state.project.hasProgress) {
      this.props.ProjectUpdateProgress(this.state.project.uid, this.state.addedProgress)
    }
    if (parseInt(this.state.addedProgress) > 0) {
      noteObj.addedProgress = parseInt(this.state.addedProgress)
    }
    this.props.AddEntry(noteObj, noteID)
    this.props.DayEntryAdd(noteID, noteObj.date)
  }

  onChanged (text) {
    let newText = []
    const numbers = '0123456789'
    const isNum = (char) => numbers.indexOf(char) !== -1
    text.split('').forEach(char => {
      if (isNum(char)) newText.push(char)
    })
    this.setState({ addedProgress: newText.join('') })
  }

  displayProjects () {
    if (!this.props.projects) return null
    const filteredProjects = this.props.projects.filter(project => !project.complete)
    return filteredProjects.map((project) => <Text>{project.title}</Text>)
  }

  handleSelect (project) {
    this.setState({ project, openModal: false })
  }

  renderRow (project) {
    const entryProjectID = this.state.project ? this.state.project.uid : null

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleSelect(project)}>
        <View style={{backgroundColor: entryProjectID === project.uid? colors.lightAccent : 'white', flexDirection: 'column', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15, alignSelf: 'stretch'}}>
          <View style={{backgroundColor: entryProjectID === project.uid ? colors.lightAccent : 'white'}}>
            <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch'}}>
              <View style={{alignItems: 'center', marginTop: -4, paddingRight: 4, width: 25}}><Text>{project.type ? typeMap[project.type] : typeMap['enterprise']}</Text></View>
                <View>
                  <Text style={{color: colors.main, fontSize: 16, fontWeight: 'bold'}}>
                    {project.title}
                  </Text>
                </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  buildHeader (label) {
    return (
      <View style={styles.headerContainer}>
        <View style={[styles.headerDash, {width: this.state.deviceWidth}]} />
        <View style={styles.innerHeaderContainer}>
        <Text style={styles.header}>
          {label}
        </Text>
        </View>
        <View style={[styles.headerDash, {width: this.state.deviceWidth}]} />
      </View>
    )
  }

  async pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      base64: true
    })

    if (!result.cancelled) {
      this.setState({ photo: result.base64 });
    }
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

    const inputProps = {
      keyboardType: 'default',
      placeholder: this.state.tags.length === 0 ? 'Enter tags separated by spaces' : '',
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View>
        <View style={{position: 'absolute', top: 64, left: 0, right: 0, alignSelf: 'stretch', flex: 1, backgroundColor: colors.main, padding: 10, paddingRight: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableOpacity activeOpacity={0.3} onPress={() => this.setState({openModal: !this.state.openModal})}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {this.props.projects.length > 0 && <Image source={borderlessImageMap.whiteprojects} style={{width: 20, height: 20, marginRight: 5}} />}
                {this.props.projects.length > 0 && <Text style={{color: 'white', fontWeight: 'bold'}}>
                  {this.state.project ? this.state.project.title.substr(0,20) : 'Select a project'}
                  {(this.state.project && this.state.project.title.length > 20) ? '...' : ''}
                </Text>}
                {this.props.projects.length > 0 && <Text style={{color: 'white', fontWeight: 'bold', marginLeft: 3}}>{'\u25BE'}</Text>}
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={this.onButtonPress.bind(this)}>
            <View style={{flexDirection: 'row', padding: 5, paddingLeft: 15, paddingRight: 10, backgroundColor: darkColorMap[this.props.entryType], borderRadius: 20, alignItems: 'center', justifyContent: 'center', shadowOffset: {width: 1, height: 1},
shadowColor: '#555',
shadowOpacity: 0.3}}>
              <Image source={imageMap[this.props.entryType]} style={{width: 25, height: 25, marginRight: 8, marginLeft: -10}} />
              <Text style={{color: 'white', fontWeight: 'bold', paddingRight: 5}}>
                save
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'stretch', padding: 20, position: 'absolute', top: 119, left: 0, right: 0, backgroundColor: hexToRGB(colors.main, 0.4), alignItems: 'flex-start', justifyContent: 'center'}}>
          <TextInput
            placeholder={`Enter title here`}
            numberOfLines={1}
            multiline
            autoFocus={this.props.entryType !== 'progress'}
            style={{alignSelf: 'stretch', fontSize: 25, color: colors.main, fontWeight: 'bold', textAlign: 'center'}}
            onChangeText={value => this.setState({text: value})}
          ><Text>{parts}</Text></TextInput>
        </View>
        <ScrollView style={{backgroundColor: 'white', marginTop: 200}} contentContainerStyle={{justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'stretch'}}>
            {this.state.openModal &&
            <View style={{flex: 1, alignSelf: 'stretch', height: 300, paddingLeft: 10, borderBottomWidth: 5, borderColor: colors.main, paddingRight: 10, backgroundColor: '#eee'}}>
              <ListView enableEmptySections dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} contentContainerStyle={{backgroundColor: 'white'}} />
            </View>}
            {(this.props.entryType === 'progress' && 
            this.state.project && 
            this.state.project.hasProgress) && 
            <View style={{alignItems: 'center', padding: 10, paddingBottom: 15, alignSelf: 'stretch', justifyContent: 'center'}}>
              <TextInput
                placeholder={`How many ${this.state.project.progressUnits}?`}
                keyboardType='numeric'
                maxLength={10}
                multiline
                autoFocus={this.props.entryType === 'progress'}
                onChangeText={(text) => this.onChanged(text)}
                style={{fontSize: 20, textAlign: 'center', color: 'white', flex: 1}}
                value={this.state.addedProgress}
              />
              <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text style={{color: colors.lightAccent, fontWeight: 'bold'}}>{this.state.project.progressUnits}</Text>
              </View>
            </View>}
            <View style={{alignSelf: 'stretch', height: 150, backgroundColor: 'white'}}>
              {this.buildHeader('DETAILS')}
              <TextInput
                placeholder={`Additional details (optional)`}
                numberOfLines={10}
                multiline
                style={{alignSelf: 'stretch', fontSize: 18, padding: 20, color: colors.main}}
                onChangeText={value => this.setState({description: value})}
              ><Text>{this.state.description}</Text></TextInput>
            </View>
            <View style={{alignSelf: 'stretch', height: 150, backgroundColor: 'white'}}>
            {this.buildHeader('TAGS')}
            <View style={{height: 100, alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center', paddingLeft: 20}}>
              <TagInput
                value={this.state.tags}
                onChange={this.onChangeTags.bind(this)}
                tagColor={colors.lightAccent}
                tagTextColor={colors.main}
                inputProps={inputProps}
                numberOfLines={2}
              />
            </View>
            </View>
            <View style={{alignSelf: 'stretch', backgroundColor: 'white'}}>
            {this.buildHeader('PHOTO')}
            <View style={{alignItems: 'flex-start', alignSelf: 'stretch', justifyContent: 'space-between', marginLeft: 15}}>
            {!this.state.photo && <TouchableOpacity activeOpacity={0.8} onPress={() => this.pickImage()} style={{alignItems: 'center', justifyContent: 'center', backgroundColor: hexToRGB(colors.main, 0.2), paddingLeft: 10, paddingRight: 12, borderRadius: 10, marginBottom: 15, marginTop: -10}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image source={imageMap.camera} style={{width: 20, height: 20}} />
              <View style={{width: 30, height: 30, borderRadius: 15, marginLeft: -10, marginTop: 25}}>
                <Image source={imageMap.addIcon} style={{width: 16, height: 16, borderRadius: 10, backgroundColor: 'white'}} />
              </View>
              <Text style={{paddingTop: 10, fontSize: 12, color: colors.main, fontWeight: 'bold', paddingBottom: 7, marginLeft: -10}}>Add a photo</Text>
              </View>
            </TouchableOpacity>}
            {this.state.photo &&
              <View style={{flexDirection: 'row', alignSelf: 'stretch', paddingLeft: 10, paddingRight: 10, justifyContent: 'space-between', marginBottom: 15}}>
                <Image source={{ uri: `data:image/jpg;base64,${this.state.photo}` }} style={{ width: 250, height: 250 }} />
                <TouchableOpacity activeOpacity={0.8} style={{alignItems: 'flex-start', alignSelf: 'stretch'}} onPress={() => this.setState({photo: null})}>
                  <Image source={borderlessImageMap.trash3} style={{height: 40, width: 40, marginLeft: 10, borderColor: '#eee', borderWidth: 2, borderRadius: 20}} />
                </TouchableOpacity>
              </View>}
            </View>
          </View>
          <View style={{height: 100}} />
        </ScrollView>
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
  headerContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10,
    backgroundColor: 'white',
    alignSelf: 'stretch',
    overflow: 'hidden'
  },
  headerDash: {
    borderTopWidth: 1,
    borderColor: hexToRGB(colors.main, 0.5),
    width: 100,
  },
  header: {
    color: colors.main,
    fontWeight: 'bold',
    fontSize: 12
  },
  innerHeaderContainer: {
    paddingLeft: 5,
    paddingRight: 5
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  hashtag: {
    color: colors.lightAccent,
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

export default connect(mapStateToProps, { NoteAdd, AddTag, AddEntry, DayEntryAdd, TagsFetch, ProjectUpdateProgress })(EntryAdditionForm)
