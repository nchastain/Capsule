import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import moment from 'moment'
import Swipeable from 'react-native-swipeable'
import DateHeader from './DateHeader'
import EntryListItem from './EntryListItem'
import DayHero from './DayHero'
import { imageMap, borderlessImageMap, bannerImages, colors, getEntriesForDay, getImageForDay } from '../utilities'
import { NotesFetch, EntriesFetch, ProjectsFetch, DaysFetch, TagsFetch, TagSelect } from '../actions'
import _ from 'lodash'

class Day extends React.Component {
  constructor (props) {
    super(props)
    let deviceWidth = Dimensions.get('window').width
    let deviceHeight = Dimensions.get('window').height
    this.state = {activeDay: props.activeDay || moment(), deviceWidth, deviceHeight }
  }

  componentWillMount () {
    this.props.NotesFetch()
    this.props.EntriesFetch()
    this.props.ProjectsFetch()
    this.props.TagsFetch()
    this.props.DaysFetch()
  }

  onLayout (evt) {
    this.setState({
      deviceHeight: evt.nativeEvent.layout.height,
      deviceWidth: evt.nativeEvent.layout.width
    })
  }

  buildDayEntries (entries) {
    return entries.map((entry, idx) => (
      <EntryListItem key={idx} entry={entry} />
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
        <View style={styles.inboxImageContainer}>
          <Image source={imageMap.inbox} style={styles.inboxImage} />
        </View>
        <Text style={styles.emptyMessageText}>
          Click  <Image source={imageMap.addIcon} style={{height: 26, width: 26, backgroundColor: 'white', borderWidth: 2, borderColor: 'white', borderRadius: 13}} />  to add something{'\n'}to the day's capsule.
        </Text>
      </View>
    )
  }

  createDateText (dayInput) {
    return (
      <Text style={styles.dateText}>
        {moment(dayInput).format('MMMM Do, YYYY')}
      </Text>
    )
  }

  buildEmptyContainer () {
    return (
      <View style={[styles.emptyMessage, {marginBottom: (this.deviceHeight - 120) / 4}]}>
        {this.displayEmptyMessage()}
      </View>
    )
  }

  buildContainer (dayEntries) {
    const that = this
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <DateHeader deviceWidth={this.state.deviceWidth} label='TODAY' day={that.state.activeDay} />
        {this.buildDayEntries(dayEntries)}
      </ScrollView>
    )
  }

  handleDayNavigation (direction, isToday) {
    if (isToday && direction === 'right') return null
    else if (direction === 'left') {
      this.setState({activeDay: moment(this.state.activeDay).subtract(1, 'days')}, function() {
      })
    }
    else if (direction === 'right') {
      this.setState({activeDay: moment(this.state.activeDay).add(1, 'days')})
    }
  }

  render () {
    let dayEntries = getEntriesForDay(this.props.days, this.props.entries, moment(this.state.activeDay).format('MMDDYYYY'))
    return (
      <View style={styles.fullContainer}>
        <View style={styles.logoheader}>
          <Image style={styles.logoImage} source={imageMap.logo} />
        </View>
          <View style={{position: 'absolute', top: 32, right: 8, flex: 1}}>
            <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.Calendar()}>
            <Image source={borderlessImageMap.fullcalendar} style={{height: 26, width: 35, resizeMode: 'contain'}} />
            </TouchableOpacity>
          </View>
        <DayHero nav day={this.state.activeDay} days={this.props.days} entries={this.props.entries} handleDayNavigation={this.handleDayNavigation.bind(this)} />
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
    paddingBottom: 90,
    paddingTop: 0,
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
  dayEntryImageContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  dayEntryText: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250
  },
  dateText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
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
  emptyHeroContainer: {
    height: 100,
    backgroundColor: 'rgba(0,0,0,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
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
  emptyMessageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
  },
  entryDuration: {
    color: colors.main,
    fontWeight: 'bold'
  },
  fullContainer: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: colors.main,
  },
  inboxImage: {
    height: 50,
    resizeMode: 'contain',
  },
  inboxImageContainer: {
    alignItems: 'center',
    padding: 20,
  },
  innerDayEntryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  logoheader: {
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor: '#e2daed',
    paddingTop: 30,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  logoImage: {
    height: 30,
    resizeMode: 'contain'
  },
  opacityContainer: {
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 100,
    width: 1000,
    alignSelf: 'stretch'
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
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff'
  }
})

const mapStateToProps = state => {
  const { projects, project, notes, tags, days } = state
  const entries = _.map(state.entries, (val, uid) => {
    return { ...val, uid }
  })
  return { entries, projects, project, notes, tags, days }
}

export default connect(mapStateToProps, { NotesFetch, EntriesFetch, ProjectsFetch, DaysFetch, TagsFetch, TagSelect })(Day)
