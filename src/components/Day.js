import React from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import moment from 'moment'
import Swipeable from 'react-native-swipeable'
import DateHeader from './DateHeader'
import EntryListItem from './EntryListItem'
import DayHero from './DayHero'
import {
  imageMap,
  descriptionMap,
  borderlessImageMap,
  bannerImages,
  colors,
  getEntriesForDay,
  getImageForDay,
  isToday,
  entryTypeList
} from '../utilities'
import { 
  EntriesFetch,
  ProjectsFetch,
  DaysFetch,
  TagsFetch,
  TagSelect
} from '../actions'
import _ from 'lodash'

class Day extends React.Component {
  constructor (props) {
    super(props)
    let deviceWidth = Dimensions.get('window').width
    let deviceHeight = Dimensions.get('window').height
    this.state = {
      activeDay: props.activeDay || moment(),
      deviceWidth,
      deviceHeight,
      showModal: false
    }
  }

  componentWillMount () {
    this.loadInitialContent()
  }

  loadInitialContent () {
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
    let tagObj = this.props.tags 
    ? Object.values(this.props.tags).filter(tagObj => tagObj.id === id)[0]
    : {text: ''}
    return tagObj
  }

  goToAddForm(type) {
    this.setState({showModal: !this.state.showModal}, function() {
      Actions.EntryAdditionForm({entryType: type, title: `Add ${type}`, day: this.state.activeDay})
    })
  }

  createAddFormLink(type) {
    return (
      <TouchableOpacity onPress={() => this.goToAddForm(type)} style={{flex: 1, alignSelf: 'stretch'}}>
        <View style={styles.tabContainer}>
          <Image source={imageMap[type]} style={{width: 40, height: 40, marginRight: 10, resizeMode: 'contain'}} />
          <View>
            <Text style={[styles.tabText, {flex: 1}]}>
              Add {descriptionMap[type]}
            </Text>
            <Text style={{flex: 1, color: colors.main}}>
              {moment(this.state.activeDay).format('MMMM Do, YYYY')}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  handleHashtagLookup (tag) {
    this.props.TagSelect(tag)
  }

  displayEmptyMessage () {
    return (
      <View>
        <Text style={styles.emptyMessageText}>
          Nothing here yet.
        </Text>
        <View style={styles.inboxImageContainer}>
          <Image source={imageMap.addIcon} style={styles.addImage} />
        </View>
        <Text style={styles.emptyMessageText}>
          Click here to add something{'\n'}to the day's capsule.
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
        <TouchableOpacity onPress={() => this.setState({showModal: true})}>
          {this.displayEmptyMessage()}
        </TouchableOpacity>
      </View>
    )
  }

  buildContainer (dayEntries) {
    const that = this
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <DateHeader deviceWidth={this.state.deviceWidth} label='TODAY' day={that.state.activeDay} />
        {this.buildDayEntries(dayEntries)}
        {dayEntries.length !== 0 && !isToday(this.state.activeDay) && this.buildAddMore()}
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

  buildAddMore () {
    return (
      <View style={styles.addMore}>
        <TouchableOpacity onPress={() => this.setState({showModal: true})}>
          <View style={styles.postAddContainer}>
            <Image source={imageMap.addIcon} style={{height: 26, width: 26, backgroundColor: 'white', borderRadius: 13, borderWidth: 1, borderColor: 'white'}} />
            <Text style={[styles.emptyMessageText, {paddingLeft: 10, paddingRight: 10, fontSize: 13}]}>
              Click here to add something to the day's capsule.
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
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
        <Modal
          visible={this.state.showModal}
          animationType={'fade'}
          transparent
        >
            <TouchableWithoutFeedback onPress={() => this.setState({showModal: !this.state.showModal})}>
              <View style={styles.addLinkContainer}>
                <View style={styles.addLinkInner}>
                  {this.createAddFormLink('journal')}
                  {this.createAddFormLink('milestone')}
                  {this.createAddFormLink('view')}
                  {this.createAddFormLink('experience')}
                  {this.createAddFormLink('habit')}
                  {this.createAddFormLink('progress')}
                  {this.createAddFormLink('note')}
                </View>
                  <View style={styles.downIconContainer}>
                    <TouchableOpacity onPress={() => this.setState({showModal: !this.state.showModal})}>
                      <Image source={imageMap.closeIcon} style={styles.downArrow} />
                    </TouchableOpacity>
                  </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
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
  addLinkContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 30,
    paddingBottom: 55,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addLinkInner: {
    flex: 1,
    backgroundColor: '#eee',
    borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 20,
  },
  downIconContainer: {
    position: 'absolute',
    bottom: 0,
    height: 80,
    width: 80,
    backgroundColor: '#eee',
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  downArrow: {
    width: 65,
    height: 65,
    resizeMode: 'contain'
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
  addMore: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.1)',
  },
  emptyMessageText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
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
  addImage: {
    height: 70,
    resizeMode: 'contain',
    backgroundColor: 'white', 
    borderRadius: 35,
    borderWidth: 5,
    borderColor: 'white',
    width: 70,
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
  postAddContainer: {
    alignSelf: 'stretch',
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  tabContainer: {
    padding: 15,
    paddingLeft: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'lightgray',
    borderRadius: 10,
    alignSelf: 'stretch',
    shadowOffset: { width: 2,  height: 2},
    shadowColor: '#555',
    shadowOpacity: 0.3
  },
  tabText: {
    fontSize: 14,
    color: '#555',
    fontWeight: 'bold',
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

export default connect(mapStateToProps, { EntriesFetch, ProjectsFetch, DaysFetch, TagsFetch, TagSelect })(Day)
