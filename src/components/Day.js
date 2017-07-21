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
          <View style={styles.entryDurationContainer}>
            <Text style={styles.entryDuration}>{secondsToString(entry.seconds)}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text>{entryProject.title}</Text>
            {entry.description ? <Text>{entry.description}</Text> : null}
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
          <View style={{ flex: 1, alignSelf: 'stretch' }}>
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ marginRight: 0, alignItems: 'flex-start', alignSelf: 'stretch', flex: 1, justifyContent: 'center'}}><TouchableOpacity style={{justifyContent: 'center'}}><Text style={{color: '#a083c4', fontSize: 30, fontWeight: 'bold'}}>Hi</Text></TouchableOpacity></View>
              <Text style={{ flex: 5, fontSize: 12 }}>{note.text.replace(/(\B#\w\w+\w+)/g, '')}</Text>
            </View>
          </View>
        </View>
      )
    })
  }


  // {note.tagIDs && note.tagIDs.length > 0 && <View style={{ width: 100 }}>
  //               {note.tagIDs.map((tagID, idx) => (
  //                 <TouchableOpacity key={idx} onPress={() => that.handleHashtagLookup(that.findTagByID(tagID))}>
  //                   <Text style={{ color: '#a083c4', fontWeight: 'bold', fontSize: 16 }}>#{that.findTagByID(tagID).text}</Text>
  //                 </TouchableOpacity>
  //               ))}
  //             </View>}

  addProgress () {
    Actions.EntryAdd()
  }

  addNote () {
    Actions.NoteAddForm()
  }

  render () {
    const entriesArr = this.props.entries ? Object.values(this.props.entries) : []
    const notesArr = this.props.notes ? Object.values(this.props.notes) : []
    const isFromToday = (date) => moment(new Date(date)).get('date') === moment(new Date()).get('date')
    const dayEntries = entriesArr.filter(entry => isFromToday(entry.date))
    const dayNotes = notesArr.filter(note => isFromToday(note.date))
    return (
      <View style={{flex: 1, backgroundColor: '#a083c4'}}>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.topBarButton} onPress={this.addNote.bind(this)}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>+ Add note</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBarButton} onPress={this.addProgress.bind(this)}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>+ Add progress</Text>
          </TouchableOpacity>
        </View>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={{flex: 1}}>
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
    justifyContent: 'flex-start',
    padding: 10,
    alignSelf: 'stretch',
    flex: 1,
    backgroundColor: '#a083c4',
    marginBottom: 50,
  },
  topBar: {
    paddingBottom: 5,
    paddingTop: 70,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
    backgroundColor: '#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topBarButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#a083c4',
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
  entryDurationContainer: {
    width: 100,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  entryDuration: {
    color: '#a083c4',
    fontWeight: 'bold'
  },
  dayEntry: {
    backgroundColor: 'white',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 5,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: 'column',
    shadowOffset: { width: 4,  height: 4,  },
    shadowColor: '#555',
    shadowOpacity: 0.3,
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