import React from 'react'
import { connect } from 'react-redux'
import { Text, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, TextInput, StyleSheet, Image, ListView } from 'react-native'
import { EntryUpdate, EntrySave, EntryDelete, ProjectUpdateProgress } from '../actions'
import { colors, borderlessImageMap, darkColorMap, imageMap, typeMap, getProjectByID, hexToRGB, formatTags } from '../utilities'
import moment from 'moment'
import TagInput from 'react-native-tag-input'
import _ from 'lodash'

class EntryDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {edited: false, text: props.entry.text, description: props.entry.description, projectID: props.entry.projectID, tags: props.entry.tags || []}
    if (this.props.entry.type === 'progress') this.state.addedProgress = props.entry.addedProgress
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

  handleTextChange (val, type) {
    this.setState({edited: val.length > 0, [type]: val})
  }

  handleSave () {
    this.props.EntryUpdate({...this.props.entry, text: this.state.text, description: this.state.description, addedProgress: this.state.addedProgress || 0}, this.props.location)
  }

  handleDelete () {
    this.props.EntryDelete({uid: this.props.entry.uid}, this.props.location)
  }

  handleSelect (project) {
    this.setState({ project, openModal: false })
  }

  onChangeTags (tags) {
    this.setState({ tags: formatTags(tags) }, () => {
      this.props.EntryUpdate({...this.props.entry, tags: this.state.tags}, 'no-redirect')
    })
  }

  renderRow (project) {
    const entryProjectID = this.state.project ? this.state.project.uid : null

    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleSelect(project)}>
        <View style={{backgroundColor: entryProjectID === project.uid ? colors.lightAccent : 'white', flexDirection: 'column', borderBottomWidth: 1, borderColor: '#eee', paddingTop: 15, paddingBottom: 15, paddingLeft: 15, paddingRight: 15, alignSelf: 'stretch'}}>
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

  render () {
    const inputProps = {
      keyboardType: 'default',
      placeholder: (this.state.tags && this.state.tags.length > 0) ? '' : 'Enter tags separated by spaces',
    }
    let project
    let that = this
    if (this.props.entry.projectID) project = getProjectByID(this.props.entry.projectID, this.props.projects)
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={{alignSelf: 'stretch', flex: 1, backgroundColor: 'rgba(0,0,0,0.2)', padding: 10, paddingRight: 8, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <TouchableOpacity activeOpacity={0.3} onPress={() => this.setState({openModal: !this.state.openModal, edited: true})}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image source={borderlessImageMap.whiteprojects} style={{width: 20, height: 20, marginRight: 5}} />
                      <Text style={{color: 'white', fontWeight: 'bold'}}>
                        {this.state.projectID ? project.title.substr(0,20) : 'Select a project'}
                        {(this.state.projectID && project.title.length > 20) ? '...' : ''}
                      </Text>
                      <Text style={{color: 'white', fontWeight: 'bold', marginLeft: 3}}>{'\u25BE'}</Text>
                  </View>
                </TouchableOpacity>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  {this.state.edited && <TouchableOpacity activeOpacity={0.8} onPress={this.handleSave.bind(this)}>
                    <View style={{flexDirection: 'row', padding: 5, paddingLeft: 15, paddingRight: 10, backgroundColor: darkColorMap[this.props.entry.type], borderRadius: 20, alignItems: 'center', justifyContent: 'center', shadowOffset: {width: 1, height: 1},
      shadowColor: '#555',
      shadowOpacity: 0.3}}>
                      <Image source={imageMap[this.props.entry.type]} style={{width: 25, height: 25, marginRight: 8, marginLeft: -10}} />
                      <Text style={{color: 'white', fontWeight: 'bold', paddingRight: 5}}>
                        save
                      </Text>
                    </View>
                  </TouchableOpacity>}
                </View>
            </View>
                    <View style={{flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'flex-start'}}>
        <View style={{height: 50, alignSelf: 'stretch', paddingLeft: 10, paddingRight: 30, paddingTop: 10, alignItems: 'center', justifyContent: 'flex-start', flex: 0.5}}>
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
            {this.state.openModal &&
            <View style={{flex: 1, alignSelf: 'stretch', flex: 8, paddingLeft: 10, borderBottomWidth: 5, borderColor: colors.main, paddingRight: 10, backgroundColor: '#eee'}}>
              <TouchableOpacity activeOpacity={0.8} onPress={() => this.setState({project: null, openModal: false})}>
                <View style={{backgroundColor: 'white', padding: 15, borderBottomWidth: 1, borderColor: '#eee'}}>
                  <Text style={{color: 'darkgrey'}}>❌ (No project)</Text>
                </View>
              </TouchableOpacity>
              <ListView enableEmptySections dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} contentContainerStyle={{backgroundColor: 'white'}} />
            </View>}
            {(this.props.entry.type === 'progress' && 
            project && 
            project.hasProgress) && 
            <View style={{alignItems: 'center', padding: 10, paddingBottom: 15, alignSelf: 'stretch', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.1)', flex: 1}}>
              <View style={{alignItems: 'center', justifyContent: 'center', flex: 2}}>
                <Text style={{color: 'white', fontSize: 25}}>
                  {this.state.addedProgress}
                </Text>
              </View>
              <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                <Text style={{color: colors.lightAccent, fontWeight: 'bold'}}>{project.progressUnits}</Text>
              </View>
            </View>}
          <View style={styles.entryTextContainer}>
            <View style={{flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center'}}>
              <Image source={imageMap[this.props.entry.type]} style={{width: 40, height: 40, marginBottom: 5, marginRight: 5}} />
              <TextInput editable style={[styles.entryText, {flex: 1}]} multiline value={this.state.text} placeholder={'Enter text here'} onChangeText={(val) => this.handleTextChange(val, 'text')} />
            </View>
            <TextInput editable style={styles.entryDescription} multiline value={this.state.description} placeholder={'Enter additional details here'} onChangeText={(val) => this.handleTextChange(val, 'description')} />
            {this.props.entry.photo && <Image source={{ uri: `data:image/jpg;base64,${this.props.entry.photo}` }} style={{width: 200, height: 200, alignSelf: 'center', marginTop: 50, borderWidth: 2, borderColor: 'white'}} />}
          </View>
          <View style={{flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.2)', padding: 15, position: 'absolute', left: 0, right: 0, bottom: 50, alignSelf: 'stretch', justifyContent: 'space-between'}}>
            <View style={[styles.dateContainer, {flex: 1, alignItems: 'flex-start'}]}>
              <Text style={styles.date}>
                {moment.unix(this.props.entry.date).format('MM/DD/YYYY')}
              </Text>
            </View>
            <TouchableOpacity onPress={() => this.handleDelete()} style={{flex: 1, alignItems: 'flex-end'}}>
              <View style={[styles.entryTypeButton, {}]}>
                <Image source={borderlessImageMap.trash6} style={[styles.entryTypeImage, {width: 30, height: 33}]} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 63,
    flexDirection: 'column',
    backgroundColor: colors.main
  },
  topInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: colors.lightAccent,
    padding: 10,
  },
  entryTypeButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateContainer: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  date: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  deleteButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    flex: 1
  },
  deleteText: {
    textAlign: 'center',
    color: colors.main,
    fontWeight: 'bold'
  },
  entryTextContainer: {
    justifyContent: 'flex-start',
    padding: 10,
    backgroundColor: colors.main,
    flex: 10,
  },
  entryText: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  entryDescription: {
    color: colors.lightAccent,
    fontSize: 18,
  },
  saveButton: {
    padding: 20,
    backgroundColor: colors.lightAccent,
    borderRadius: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#555',
    shadowOpacity: 0.3,
  },
  saveText: {
    color: colors.main,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  entryTypeImage: {
    height: 30,
    width: 30,
  }
})

const mapStateToProps = (state) => {
  const { entries } = state
  const projects = _.map(state.projects, (val, uid) => {
    return { ...val, uid }
  })
  return { entries, projects }
}

export default connect(mapStateToProps, {
  EntryUpdate, EntrySave, EntryDelete, ProjectUpdateProgress
})(EntryDetail)
