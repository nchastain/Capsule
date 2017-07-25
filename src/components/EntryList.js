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

class EntryList extends React.Component {

  buildEntries (dayEntries) {
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

  buildNotes (dayNotes) {
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

  addProgress () {
    Actions.EntryAdd()
  }

  addNote () {
    Actions.NoteAddForm()
  }

  displayEmptyMessage () {
    return (
      <View>
        <Text style={{fontSize: 25, textAlign: 'center', color: '#e2daed', fontWeight: 'bold', alignSelf: 'center'}}>
          Nothing here yet.
        </Text>
        <View style={{alignItems: 'center', padding: 20}}><Image source={require('.././assets/inbox.png')} style={{height: 50, resizeMode: 'contain'}} /></View>
        <Text style={{fontSize: 22, textAlign: 'center', color: '#e2daed', fontWeight: 'bold', alignSelf: 'center'}}>
          Click + to add an entry. 
        </Text>
      </View>
    )
  }

  render () {
    const entries = Object.values(this.props.entries)
    const imageMap = {
      note: require('.././assets/note.png'),
      experience: require('.././assets/experience.png'),
      view: require('.././assets/sight.png'),
      journal: require('.././assets/journal.png'),
      milestone: require('.././assets/milestone.png'),
      habit: require('.././assets/habit.png'),
      progress: require('.././assets/progress.png')
    }
    const lightColorMap = {
      note: '#8AC3FB',
      journal: '#FFBDFA',
      milestone: '#F6DF7F',
      view: '#B09BFF',
      progress: '#9EE986',
      habit: '#FFC566',
      experience: '#F96262'
    }
    return (
      <View style={{flex: 1, alignSelf: 'stretch', backgroundColor: '#a083c4', paddingTop: 65}}>
        <ScrollView contentContainerStyle={styles.container}>
          {entries.map((entry, idx) => (
            <View key={idx} style={{backgroundColor: 'white', borderRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, marginBottom: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', paddingRight: 10}}>
              <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                <View style={{padding: 5, borderRightWidth: 1, borderColor: '#eee', marginRight: 10, backgroundColor: '#eee', borderTopLeftRadius: 10, borderBottomLeftRadius: 10 }}>
                  <Image source={imageMap[entry.type]} style={{height: 40, width: 40}} />
                </View>
                <View>
                  <Text style={{color: '#555', fontWeight: 'bold'}}>{entry.text}</Text>
                </View>
              </View>
              <View style={{alignItems: 'flex-end'}}>
                <Text style={{color: '#a083c4'}}>{moment(new Date(entry.date)).format('MMM DD')}</Text>
              </View>
            </View>
          ))}
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
    backgroundColor: '#a083c4',
    paddingBottom: 80,
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

export default connect(mapStateToProps, { NotesFetch, EntriesFetch, ProjectsFetch, TagsFetch, TagSelect })(EntryList)