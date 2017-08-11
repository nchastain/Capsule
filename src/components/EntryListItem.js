import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet, TouchableHighlight } from 'react-native'
import moment from 'moment'
import Swipeable from 'react-native-swipeable'
import { Actions } from 'react-native-router-flux'
import { EntryDelete } from '../actions'
import { imageMap, colors, borderlessImageMap } from '../utilities'
import { connect } from 'react-redux'

class EntryListItem extends React.Component {

  handleDelete () {
    this.props.EntryDelete({uid: this.props.entry.uid})
  }

  render() {
    const deleteButton = () => {
      return [
        <TouchableHighlight 
        style={{backgroundColor: '#D0021B', flexDirection: 'row', alignSelf: 'stretch', flex: 1, alignItems: 'center'}}
        onPress={this.handleDelete.bind(this)}
        >
          <Image source={borderlessImageMap.trash6} style={{width: 28, height: 30, marginLeft: 18}} />
        </TouchableHighlight>
      ]
    }
    return (
      <Swipeable
        rightButtons={deleteButton()}
        rightButtonWidth={60}
        onRightActionRelease={this.handleDelete.bind(this)}
        rightActionActivationDistance={200}
      >
        <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.DayEntryDetail({entry: this.props.entry, title: this.props.entry.text, location: 'today'})}>
          <View style={styles.dayEntryList}>
            <View style={styles.dayEntryRow}>
              <View style={styles.entryIconContainer}>
                <Image source={imageMap[this.props.entry.type]} style={styles.entryIcon} />
              </View>
              <View style={styles.dayEntryTextContainer}>
                <Text style={styles.entryText}>
                  {this.props.entry.text}
                </Text>
              </View>
              {dateOrNav(this.props.hasDate, this.props.entry)}
            </View>
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }
}

const dateOrNav = (hasDate, entry) => (
  hasDate
  ? <View style={{alignItems: 'flex-end', flex: 1}}>
      <Text style={{color: colors.main, textAlign: 'right'}}>{moment.unix(entry.date).format('MMM DD')}</Text>
    </View>
  : <View style={styles.entryNavContainer}>
      <Text style={styles.entryNavIcon}>></Text>
    </View>
)

const styles = StyleSheet.create({
  dayEntryList: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 5
  },
  dayEntryRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    flex: 1,
    marginRight: 10,
  },
  entryIcon: {
    width: 35,
    height: 35
  },
  entryIconContainer: {
    padding: 10,
    paddingLeft: 5,
    borderRadius: 13,
    marginRight: 0,
  },
  dayEntryTextContainer: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 250
  },
  entryText: {
    color: '#555',
    fontWeight: 'bold'
  },
  entryNavContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  entryNavIcon: {
    color: '#eee',
    fontSize: 18,
    fontWeight: 'bold'
  },
})

export default connect(null, { EntryDelete })(EntryListItem)