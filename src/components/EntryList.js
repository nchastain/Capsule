import React from 'react'
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
import { colors, borderlessImageMap } from '../utilities'
import { NotesFetch, EntriesFetch, ProjectsFetch, TagsFetch, TagSelect } from '../actions'
import _ from 'lodash'
import EntryListItem from './EntryListItem'

class EntryList extends React.Component {
  findTagByID (id) {
    let tagObj = this.props.tags ? Object.values(this.props.tags).filter(tagObj => tagObj.id === id)[0] : {text: ''}
    return tagObj
  }

  handleHashtagLookup (tag) {
    this.props.TagSelect(tag)
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

  goToEntryType (entryType) {
    const entries = this.props.entries.filter(entry => entry.type === entryType)
    Actions.TypeList({ entryType, entries, title: `${entryType[0].toUpperCase()}${entryType.substring(1)}${entryType !== 'progress' ? 's' : ''}`, location: 'entrylist'})
  }
 
  render () {
    const entries = this.props.entries ? Object.values(this.props.entries) : []
    return (
      <View style={{flex: 1, alignSelf: 'stretch', backgroundColor: colors.main, paddingTop: 64}}>
        <ScrollView contentContainerStyle={styles.container}>
          {entries.map((entry, idx) => (
            <EntryListItem entry={entry} hasDate key={idx} />
          )).reverse()}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: colors.main,
    paddingBottom: 90,
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
    backgroundColor: colors.main,
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
    color: colors.main,
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
    shadowOffset: {width: 2, height: 2},
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
  const { projects, project, notes, tags } = state
  const entries = _.map(state.entries, (val, uid) => {
    return { ...val, uid }
  })
  return { entries, projects, project, notes, tags }
}

export default connect(mapStateToProps, { NotesFetch, EntriesFetch, ProjectsFetch, TagsFetch, TagSelect })(EntryList)