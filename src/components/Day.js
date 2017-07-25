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
    const imageMap = {
      note: require('.././assets/barenote.png'),
      experience: require('.././assets/bareexperience.png'),
      view: require('.././assets/bareview.png'),
      journal: require('.././assets/barejournal.png'),
      milestone: require('.././assets/baremilestone.png'),
      habit: require('.././assets/barehabit.png'),
      progress: require('.././assets/bareprogress.png')
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
    return dayEntries.map((entry, idx) => (
      <View key={idx} style={{backgroundColor: 'white', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 5, borderBottomWidth: 1, borderColor: '#eee', paddingRight: 5, paddingLeft: 5}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <View style={{padding: 10, paddingTop: entry.type === 'view' ? 15 : 10, paddingBottom: entry.type === 'view' ? 15 : 10, borderRadius: 13, marginRight: 5 }}>
            <Image source={imageMap[entry.type]} style={{height: entry.type === 'view' ? 16 : 26, width: 26}} />
          </View>
          <View>
            <Text style={{color: '#555', fontWeight: 'bold'}}>{entry.text}</Text>
          </View>
        </View>
      </View>
    ))
}

  findTagByID (id) {
    let tagObj = this.props.tags ? Object.values(this.props.tags).filter(tagObj => tagObj.id === id)[0] : {text: ''}
    return tagObj
  }

  handleHashtagLookup (tag) {
    this.props.TagSelect(tag)
  }

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
    const isFromToday = (date) => moment(new Date(date)).get('date') === moment(new Date()).get('date')
    const dayEntries = entriesArr.filter(entry => isFromToday(entry.date))
    return (
      <View style={{flex: 1, alignSelf: 'stretch', backgroundColor: '#a083c4'}}>
        <View style={{alignItems: 'center', paddingBottom: 10, backgroundColor: '#e2daed', paddingTop: 30, alignSelf: 'stretch', justifyContent: 'center'}}><Image style={{height: 30, resizeMode: 'contain'}} source={require('.././assets/logo.png')} /></View>
        {dayEntries.length === 0 &&
          <View style={{alignSelf: 'stretch', justifyContent: 'center', marginTop: 120, borderRadius: 10, marginLeft: 30, marginRight: 30, padding: 10, paddingTop: 20, paddingBottom: 20, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)'}}>
           {this.displayEmptyMessage()}
        </View>}
        {dayEntries.length !== 0 && <ScrollView contentContainerStyle={styles.container}>
          {this.buildDayEntries(dayEntries)}
        </ScrollView>}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
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