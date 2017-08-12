import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Switch, TextInput } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import { ProjectClear, ProjectComplete, ProjectUpdate, ProjectDelete, EntryDelete } from '../actions'
import { secondsToString, colors, borderlessImageMap, typeMap } from '../utilities'
import moment from 'moment'
import _ from 'lodash'

class ProjectDetails extends React.Component {
  constructor (props) {
    super(props)
    this.state = {complete: props.project.complete, title: props.project.title}
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.project.complete !== this.state.complete) {
      this.setState({complete: true})
    }
  }

  componentWillUnmount () {
    this.props.ProjectClear()
  }

  handleProjectComplete () {
    this.setState({complete: !this.state.complete}, () => {
      this.props.ProjectComplete(this.props.project.uid, this.state.complete)
    })
  }

  handleTextChange (val) {
    this.setState({edited: val.length > 0, title: val}, function() {
      this.props.ProjectUpdate(this.props.project.uid, 'title', this.state.title)
    })
  }

  handleDelete (projectEntries) {
    this.props.ProjectDelete(this.props.project.uid)
    const entryIDs = projectEntries.map(entry => entry.uid)
    entryIDs.forEach((entryID) => this.props.EntryDelete({uid: entryID}))
  }

  buildCompleteButton () {
    if (!this.props.project.hasProgress) {
      return (
      <View style={{flexDirection: 'row', alignItems: 'center', alignSelf: 'stretch', justifyContent: 'flex-end', marginBottom: 10, marginTop: 15}}>
        <Text style={{color: colors.lightAccent, paddingRight: 10}}>
          Complete? 
        </Text>
        <Switch
          value={this.state.complete}
          style={{backgroundColor: 'white', borderRadius: 20}}
          onValueChange={() => this.handleProjectComplete()}
          onTintColor={colors.lightAccent}
        />
      </View>
      )
    }
  }

  render () {
    const entriesArr = Object.values(this.props.entries) || []
    const projectEntries = entriesArr.filter(entry => entry.projectID === this.props.project.uid)
    const formattedHoursLogged = this.props.progressCurrent === 0 ? 0 : parseFloat(this.props.project.progressCurrent.toFixed(1))
    const createReadableDate = (date) => moment(new Date(date)).format('MM/DD/YYYY')
    return (
      <View style={styles.container}>
        <View style={{alignSelf: 'stretch', paddingBottom: 10, paddingTop: 20}}>
          {this.props.project.hasProgress && <Text style={[styles.timeStyle, {color: colors.lightAccent}]}>{formattedHoursLogged}/{this.props.project.progressTarget} {this.props.project.progressUnits}</Text>}
            <View style={{flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{flex: 1}}>
            <TextInput
              editable
              style={[styles.projectTitle, {marginLeft: -10}]}
              multiline
              value={this.state.title}
              placeholder={'Enter project title here'}
              onChangeText={(val) => this.handleTextChange(val)} 
            />
            </View>
            </View>
        </View>
        {!this.props.project.hasProgress && <View style={{alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.2)'}}>
        <View style={{justifyContent: 'flex-end', alignSelf: 'flex-end', flexDirection: 'row', padding: 10, paddingTop: 0}}>
          {this.buildCompleteButton()}
        </View>
        </View>}
        <ScrollView style={styles.projectEntriesContainer} >{projectEntries.map((entry, idx) => 
          <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.ProjectEntryDetail({entry, location: 'project'})} key={idx}>
            <View style={{borderRadius: 10, flexDirection: 'row', marginBottom: 10, padding: 20, paddingLeft: 10, paddingRight: 15, backgroundColor: 'white', alignItems: 'center'}}>
              <View style={{marginRight: 10, width: 30}}><Image source={borderlessImageMap[entry.type]} style={{width: 30, height: 30}} /></View>
              <View style={[styles.projectEntry, styles.descriptionContainer, {flex: 2}]}>
                <Text style={[(!entry.text || entry.text.length === 0) && {color: 'rgba(0,0,0,0.3)'}, {fontSize: 12, fontWeight: 'bold', color: 'rgba(0,0,0,0.7)'}]}>{entry.text && entry.text.length > 0 ? entry.text : '(No description)'}</Text>
                {entry.seconds > 0 && <Text style={styles.timeString}>{secondsToString(entry.seconds)}</Text>}
              </View>
              <View style={[styles.projectEntry, styles.dateStringContainer, {alignItems: 'flex-end', width: 50}]}><Text style={styles.timeString}>{createReadableDate(entry.date)}</Text></View>
            </View>
          </TouchableOpacity>
          ).reverse()}
          <View style={{height: 40}} />
        </ScrollView>
        <View style={{flexDirection: 'row', backgroundColor: 'rgba(0,0,0,0.2)', padding: 15, position: 'absolute', left: 0, right: 0, bottom: 50, alignSelf: 'stretch', justifyContent: 'space-between'}}>
            <TouchableOpacity onPress={() => this.handleDelete(projectEntries)} style={{flex: 1, alignItems: 'flex-end'}}>
              <View style={[styles.entryTypeButton, {}]}>
                <Image source={borderlessImageMap.trash6} style={[styles.entryTypeImage, {width: 30, height: 33}]} />
              </View>
            </TouchableOpacity>
          </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.main,
    paddingBottom: 50,
  },
  statusButton: {
    padding: 10,
    borderRadius: 10,
    borderColor: colors.lightAccent,
    borderWidth: 2,
  },
  completeStatusButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderWidth: 0,
  },
  dateStringContainer: {
    width: 60,
    alignItems: 'flex-start',
  },
  descriptionContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  timeString: {
    color: colors.main,
  },
  timeStringContainer: {
    width: 30,
    alignItems: 'flex-end',
    justifyContent: 'center'
  },
  projectTitle: {
    fontSize: 18,
    textAlign: 'center',
    paddingBottom: 10,
    color: 'rgba(0,0,0,0.5)',
    fontWeight: 'bold'
  },
  projectEntriesContainer: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    alignSelf: 'stretch',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  projectEntry: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    justifyContent: 'center',
  },
  timeStyle: {
    fontSize: 18,
    color: 'white',
    overflow: 'hidden',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonStyle: {
    borderColor: '#eee',
    borderWidth: 3,
    backgroundColor: colors.main,
    borderRadius: 100,
    height: 200,
    width: 200,
    alignItems: 'center', 
    justifyContent:'center'
  },
})

const mapStateToProps = state => {
  const entries = _.map(state.entries, (val, uid) => {
    return { ...val, uid }
  })
  const { project } = state
  return { project, entries }
}

export default connect(mapStateToProps, { ProjectClear, ProjectComplete, ProjectUpdate, ProjectDelete, EntryDelete })(ProjectDetails);