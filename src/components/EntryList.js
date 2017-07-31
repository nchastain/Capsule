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
import { imageMap, colors, borderlessImageMap } from '../utilities'
import { NotesFetch, EntriesFetch, ProjectsFetch, TagsFetch, TagSelect } from '../actions'
import _ from 'lodash'

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
      <View style={{flex: 1, alignSelf: 'stretch', backgroundColor: colors.main, paddingTop: 65}}>
        <ScrollView contentContainerStyle={styles.container}>
          {entries.map((entry, idx) => (
              <View key={idx} style={{backgroundColor: 'white', borderRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, marginBottom: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft: 5, paddingRight: 15}}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
                  <TouchableOpacity activeOpacity={0.8} onPress={() => this.goToEntryType(entry.type)}>
                    <View style={{padding: 5, marginRight: 10, width: 45}}>
                      <Image source={borderlessImageMap[entry.type]} style={{height: 45, width: 45}} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity activeOpacity={0.8} key={idx} onPress={() => Actions.EntryDetail({entry: entry, title: entry.text, location: 'entryList'})}>
                    <View style={{flex: 1, alignSelf: 'center', alignItems: 'flex-start', justifyContent: 'center', width: 230, paddingRight: 10, paddingLeft: 5}}>
                      <Text style={{color: '#555', fontWeight: 'bold'}}>{entry.text}</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{}}>
                  <Text style={{color: colors.main}}>{moment(new Date(entry.date)).format('MMM DD')}</Text>
                </View>
              </View>
          )).reverse()}
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
    backgroundColor: colors.main,
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