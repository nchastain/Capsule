import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import moment from 'moment'
import { secondsToString } from '../utilities'
import { NotesFetch, TagSelect } from '../actions'

class Day extends React.Component {

  componentWillMount () {
    this.props.NotesFetch()
  }

  buildDayEntries (dayEntries) {
    const that = this
    return dayEntries.map(function (entry, idx) {
      let entryProject = that.props.projects[entry.projectID]
      return (
        <View style={styles.dayEntry} key={idx} >
          <View>
            <Text>{entryProject.title}</Text>
            {entry.description ? <Text>{entry.description}</Text> : null}
          </View>
          <View style={styles.entryDurationContainer}>
            <Text style={styles.entryDuration}>{secondsToString(entry.seconds)}</Text>
          </View>
        </View>
      )
    })
  }

  findTagByID (id) {
    let tagObj = this.props.tags ? Object.values(this.props.tags).filter(tagObj => tagObj.id === id)[0] : {text: ''}
    return tagObj
  }

  handleHashtagLookup (tag) {
    this.props.TagSelect(tag)
  }

  buildDayNotes (dayNotes) {
    const that = this
    return dayNotes.map(function (note, idx) {
      return (
        <View style={styles.dayEntry} key={idx} >
          <View style={{ flex: 1 }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ width: 100, flexDirection: 'column', justifyContent: 'center' }}>
              {note.tagIDs.map((tagID, idx) => (
                <TouchableOpacity key={idx} style={{marginBottom: 10, marginTop: 10}} onPress={() => that.handleHashtagLookup(that.findTagByID(tagID))}>
                  <Text style={{ color: 'orange', fontWeight: 'bold', fontSize: 16 }}>#{that.findTagByID(tagID).text}</Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={{ flex: 1 }}>{note.text.replace(/(\B#\w\w+\w+)/g, '')}</Text>
          </View>
          </View>
        </View>
      )
    })
  }

  addProgress () {
    Actions.EntryAdd()
  }

  addNote () {
    Actions.NoteAdd()
  }

  render () {
    const entriesArr = this.props.entries ? Object.values(this.props.entries) : []
    const notesArr = this.props.notes ? Object.values(this.props.notes) : []
    const isFromToday = (date) => moment(new Date(date)).get('date') === moment(new Date()).get('date')
    const dayEntries = entriesArr.filter(entry => isFromToday(entry.date))
    const dayNotes = notesArr.filter(note => isFromToday(note.date))
    return (
      <View style={{marginTop: 62, marginBottom: 50}}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.topBarButton} onPress={this.addNote.bind(this)}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#555'}}>+ Add note</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBarButton} onPress={this.addProgress.bind(this)}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: '#555'}}>+ Add progress</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={{alignSelf: 'stretch'}}>
            {this.buildDayEntries(dayEntries)}
            {this.buildDayNotes(dayNotes)}
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 0,
    alignSelf: 'stretch',
  },
  topBar: {
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topBarButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    margin: 10,
  },
  entryDurationContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  entryDuration: {
    color: 'orange'
  },
  dayEntry: {
    backgroundColor: 'white',
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    paddingLeft: 20,
    flexDirection: 'row'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff'
  }
})

const mapStateToProps = state => {
  const { entries, projects, project, notes, tags } = state
  return { entries, projects, project, notes, tags }
}

export default connect(mapStateToProps, { NotesFetch, TagSelect })(Day)