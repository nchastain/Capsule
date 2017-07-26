import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import moment from 'moment'
import DateHeader from './DateHeader'
import { imageMap, colors } from '../utilities'
import { NotesFetch, EntriesFetch, ProjectsFetch, TagsFetch, TagSelect } from '../actions'
import _ from 'lodash'

class Day extends React.Component {
  constructor (props) {
    super(props)
    this.deviceWidth = Dimensions.get('window').width
    this.deviceHeight = Dimensions.get('window').height
  }

  componentWillMount () {
    this.props.NotesFetch()
    this.props.EntriesFetch()
    this.props.ProjectsFetch()
    this.props.TagsFetch()
  }

  onLayout (evt) {
    this.deviceHeight = evt.nativeEvent.layout.height
    this.deviceWidth = evt.nativeEvent.layout.width
  }

  buildDayEntries (dayEntries) {
    return dayEntries.map((entry, idx) => (
      <TouchableOpacity activeOpacity={0.8} key={idx} onPress={() => Actions.DayEntryDetail({entry: entry, title: entry.text, location: 'today'})}>
        <View key={idx} style={{backgroundColor: 'white', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 5, borderBottomWidth: 1, borderColor: '#eee', paddingRight: 5, paddingLeft: 5, paddingBottom: 15}}>
            <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'stretch'}}>
              <View style={{ padding: 10, paddingTop: 10, paddingLeft: 5, paddingBottom: 10, borderRadius: 13, marginRight: 0 }}>
                <Image source={imageMap[entry.type]} style={{height: 26, width: 26}} />
              </View>
              <View style={{flexDirection: 'row', alignSelf: 'stretch', alignItems: 'center', justifyContent: 'space-between', width: 250}}>
                <Text style={{color: '#555', fontWeight: 'bold'}}>{entry.text}</Text>
              </View>
              <View style={{flex: 1}}><Text style={{color: 'lightgray', fontSize: 18}}>></Text></View>
            </View>
        </View>
      </TouchableOpacity>
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
    const entriesArr = this.props.entries ? Object.values(this.props.entries) : []
    const isFromToday = (date) => moment(new Date(date)).get('date') === moment(new Date()).get('date')
    const dayEntries = entriesArr.filter(entry => isFromToday(entry.date))
    return (
      <View style={{flex: 1, alignSelf: 'stretch', backgroundColor: colors.main}}>
        <View style={{alignItems: 'center', paddingBottom: 10, backgroundColor: '#e2daed', paddingTop: 30, alignSelf: 'stretch', justifyContent: 'center'}}><Image style={{height: 30, resizeMode: 'contain'}} source={require('.././assets/logo.png')} /></View>
        {dayEntries.length === 0 &&
          <View style={{alignSelf: 'stretch', justifyContent: 'center', marginTop: 15, marginBottom: (this.deviceHeight - 120) / 4, borderRadius: 10, marginLeft: 30, marginRight: 30, padding: 10, height: 200, alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.1)'}}>
           {this.displayEmptyMessage()}
        </View>}
        {dayEntries.length !== 0 && <ScrollView contentContainerStyle={styles.container}>
          <DateHeader deviceWidth={this.deviceWidth} label='TODAY' />
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
    backgroundColor: colors.main,
    padding: 10,
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

export default connect(mapStateToProps, { NotesFetch, EntriesFetch, ProjectsFetch, TagsFetch, TagSelect })(Day)