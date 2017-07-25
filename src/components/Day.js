import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import moment from 'moment'
import { secondsToString } from '../utilities'
import { NotesFetch, EntriesFetch, ProjectsFetch, TagsFetch, TagSelect } from '../actions'

class Day extends React.Component {

  componentWillMount () {
    this.props.NotesFetch()
    this.props.EntriesFetch()
    this.props.ProjectsFetch()
    this.props.TagsFetch()
  }

  buildDayEntries (dayEntries) {
    const that = this
    return !this.props.projects ? null : dayEntries.map(function (entry, idx) {
      let entryProject = that.props.projects[entry.projectID]
      return that.props.projects[entry.projectID] ? (
        <View key={idx} style={{
          // alignSelf: 'stretch',
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          backgroundColor: 'white',
          marginBottom: 5,
          marginTop: 5,
          padding: 30,
          paddingLeft: 0,
          shadowOffset: { width: 2, height: 2 },
          shadowColor: '#555',
          shadowOpacity: 0.3,
          borderRadius: 5,
          }}>
          <View style={{width: 60, alignItems: 'flex-start', marginLeft: 15}}>
            <Text style={{color: '#a083c4', fontWeight: 'bold'}}>{secondsToString(entry.seconds)}</Text>
          </View>
          <View>
            <Text style={{fontSize: 16, color: '#555', fontWeight: 'bold'}}>{entryProject.title}</Text>
            {entry.description ? <Text style={{color: '#555'}}>{entry.description}</Text> : null}
          </View>
        </View>
      ) : null
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
              <View style={{
                marginRight: 0,
                alignItems: 'flex-start',
                alignSelf: 'stretch',
                flex: 1,
                justifyContent: 'center',
              }}>
                <TouchableOpacity style={{justifyContent: 'center'}}>
                  <Text style={{color: '#a083c4', fontSize: 30, fontWeight: 'bold'}}>
                    Hi
                  </Text>
                </TouchableOpacity>
              </View>
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
    Actions.EntryAdditionForm({entryType: 'progress'})
  }

  addNote () {
    Actions.EntryAdditionForm({entryType: 'note'})
  }

  displayEmptyMessage () {
    return (
      <View>
        <Text style={{fontSize: 25, textAlign: 'center', color: '#e2daed', fontWeight: 'bold', alignSelf: 'center'}}>
          Nothing here yet.
        </Text>
        <View style={{alignItems: 'center', padding: 20}}><Image source={require('.././assets/inbox.png')} style={{height: 50, resizeMode: 'contain'}} /></View>
        <Text style={{fontSize: 22, textAlign: 'center', color: '#e2daed', fontWeight: 'bold', alignSelf: 'center'}}>
          Click + to add something{'\n'}to today's capsule.
        </Text>
      </View>
    )
  }

  render () {
    const entriesArr = Object.values(this.props.entries)
    const notesArr = this.props.notes ? Object.values(this.props.notes) : []
    const isFromToday = (date) => moment(new Date(date)).get('date') === moment(new Date()).get('date')
    const dayEntries = entriesArr.filter(entry => isFromToday(entry.date))
    const dayNotes = notesArr.filter(note => isFromToday(note.date))
    return (
      <View style={{flex: 1, alignSelf: 'stretch', backgroundColor: '#a083c4'}}>
        <View style={{alignItems: 'center', paddingBottom: 10, backgroundColor:'#e2daed', paddingTop: 30, alignSelf: 'stretch', justifyContent: 'center'}}><Image style={{height: 30, resizeMode: 'contain'}} source={require('.././assets/logo.png')} /></View>
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.topBarButton} onPress={this.addNote.bind(this)}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>+ Add note</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.topBarButton} onPress={this.addProgress.bind(this)}>
            <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>+ Add progress</Text>
          </TouchableOpacity>
        </View>
        {dayEntries.length === 0 && dayNotes.length === 0 && 
          <View style={{alignSelf: 'stretch', justifyContent: 'center', marginTop: 120, borderRadius: 10, marginLeft: 30, marginRight: 30, padding: 10, paddingTop: 20, paddingBottom: 20, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)'}}>
           {this.displayEmptyMessage()}
        </View>}
        {dayEntries.length !== 0 || dayNotes.length !== 0 && <ScrollView contentContainerStyle={styles.container}>
          {this.buildDayEntries(dayEntries)}
          {this.buildDayNotes(dayNotes)}
        </ScrollView>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    padding: 10,
    alignSelf: 'stretch',
    backgroundColor: '#a083c4',
    paddingBottom: 60,
  },
  topBar: {
    paddingBottom: 5,
    paddingTop: 5, 
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
    padding: 10,
    paddingTop: 30,
    paddingBottom: 30,
    flexDirection: 'column',
    shadowOffset: { width: 2,  height: 2,  },
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

export default connect(mapStateToProps, { NotesFetch, EntriesFetch, ProjectsFetch, TagsFetch, TagSelect })(Day)