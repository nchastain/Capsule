import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
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
    this.state = {activeDay: new Date()}
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
        <View key={idx} style={{backgroundColor: 'white', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 5, borderBottomWidth: 1, borderColor: '#eee', paddingRight: 5, paddingLeft: 5, paddingBottom: dayEntries.length === 1 ? 15 : 5}}>
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
        <Text style={styles.emptyMessageText}>
          Nothing here yet.
        </Text>
        <View style={{alignItems: 'center', padding: 20}}>
          <Image source={require('.././assets/inbox.png')} style={styles.inboxImage} />
        </View>
        <Text style={styles.emptyMessageText}>
          Click + to add something{'\n'}to today's capsule.
        </Text>
      </View>
    )
  }

  createDateText () {
    return (
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 30}}>
        {moment(this.state.activeDay).format('MMMM Do, YYYY')}
      </Text>
    )
  }

  buildEmptyContainer () {
    return (
      <View>
        <View style={styles.emptyHeroContainer}>
          <Image source={{uri: `https://placeimg.com/${this.deviceWidth}/100/nature`}} style={[styles.heroImage, {width: this.deviceWidth}]} />
          <View style={{backgroundColor: 'rgba(0,0,0,0.5)', position: 'absolute', left: 0, top: 0, height: 100, width: this.deviceWidth}} />
          <View>
            {this.createDateText()}
          </View>
        </View>
        <View style={[styles.emptyMessage, {marginBottom: (this.deviceHeight - 120) / 4}]}>
         {this.displayEmptyMessage()}
        </View>
      </View>
    )
  }

  buildContainer (dayEntries) {
    const that = this
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.heroContainer}>
          <Image source={{uri: `https://placeimg.com/${this.deviceWidth}/100/nature`}} style={{position: 'absolute', left: 0, top: 0, height: 100, width: this.deviceWidth}} />
          <View style={[styles.opacityContainer, {width: this.deviceWidth}]} />
          <View>{this.createDateText()}</View>
        </View>
        <DateHeader deviceWidth={that.deviceWidth} label='TODAY' />
        {this.buildDayEntries(dayEntries)}
      </ScrollView>
    )
  }

  render () {
    const entriesArr = this.props.entries ? Object.values(this.props.entries) : []
    const isFromToday = (date) => moment(new Date(date)).get('date') === moment(new Date()).get('date')
    const dayEntries = entriesArr.filter(entry => isFromToday(entry.date))
    return (
      <View style={{flex: 1, alignSelf: 'stretch', backgroundColor: colors.main}}>
        <View style={styles.logoheader}>
          <Image style={{height: 30, resizeMode: 'contain'}} source={require('.././assets/logo.png')} />
        </View>
        {dayEntries.length === 0 ? this.buildEmptyContainer() : this.buildContainer(dayEntries)}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: colors.main,
    padding: 0,
    paddingBottom: 60,
    paddingTop: 0,
  },
  heroContainer: {
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  emptyHeroContainer: {
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  opacityContainer: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    position: 'absolute',
    left: 0,
    top: 0,
    height: 100, 
  },
  emptyMessage: {
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 10,
    marginTop: 30,
    marginLeft: 30,
    marginRight: 30,
    padding: 10,
    height: 220,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)'
  },
  logoheader: {
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: '#e2daed',
    paddingTop: 30,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  emptyMessageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  inboxImage: {
    height: 50,
    resizeMode: 'contain',
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
  heroImage: {
    position: 'absolute',
    left: 0,
    top: 0,
    height: 100,
  },
  topBarButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: colors.main,
    flex: 1,
    alignItems: 'center',
    margin: 5,
  },
  detailArrowText: {
    color: 'lightgray',
    fontSize: 18
  },
  entryDurationContainer: {
    width: 100,
    alignItems: 'flex-start',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  dayEntryText: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250
  },
  innerDayEntryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  dayEntryTextContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250
  },
  entryDuration: {
    color: colors.main,
    fontWeight: 'bold'
  },
  dayEntryImageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch'
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
  dayEntryContainer: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingRight: 5,
    paddingLeft: 5,
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