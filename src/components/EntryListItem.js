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
              {!this.props.entry.photo && <View style={styles.entryIconContainer}>
                <Image source={imageMap[this.props.entry.type]} style={styles.entryIcon} />
              </View>}
              <View>
              {this.props.entry.photo && 
                <View style={{flexDirection: 'row'}}>
                <Image
                  source={{ uri: `data:image/jpg;base64,${this.props.entry.photo}` }}
                  style={{width: 50, height: 50, marginLeft: 5, borderRadius: 25,}} 
                />
                <View style={[styles.entryIconContainer, {marginLeft: -20 }]}>
                  <Image source={imageMap[this.props.entry.type]} style={[styles.entryIcon]} />
                </View>
                </View>
              }
              </View>
              <View style={styles.dayEntryTextContainer}>
                <Text style={styles.entryText}>
                  {this.props.entry.text}
                </Text>
              </View>
              {dateOrNav(this.props.hasDate, this.props.entry)}
            </View>
            {this.props.hasDate
              && this.props.entry.tags 
              && Object.keys(this.props.entry.tags).length > 0
              && <View style={{paddingRight: 5, paddingBottom: 5, flexDirection: 'row', justifyContent: 'flex-end', alignSelf: 'stretch'}}>{Object.keys(this.props.entry.tags).map(tag => 
                <View style={{marginLeft: 10, backgroundColor: '#eee', padding: 4, borderRadius: 5}} key={tag}>
                  <Text style={{color: colors.main, fontSize: 10, fontWeight: 'bold'}}>{this.props.entry.tags[tag]}</Text>
                </View>
              )}</View>
            }
          </View>
        </TouchableOpacity>
      </Swipeable>
    )
  }
}

const dateOrNav = (hasDate, entry) => (
  hasDate
  ? <View style={{alignItems: 'flex-end', flex: 1}}>
      <Text style={{color: colors.main, width: 100, textAlign: 'right'}}>{moment.unix(entry.date).format('MMM DD')}</Text>
    </View>
  : <View style={{flex: 1}}>{entry.tags 
      && Object.keys(entry.tags).length > 0
      && <View style={{paddingRight: 5, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center'}}>{Object.keys(entry.tags).map(tag => 
        <View style={{marginLeft: 10}} key={tag}>
          <Text style={{color: colors.main, fontSize: 10, fontWeight: 'bold'}}>{entry.tags[tag]}</Text>
        </View>
      )}</View>
    }</View>
)

const styles = StyleSheet.create({
  dayEntryList: {
    backgroundColor: 'white',
    justifyContent: 'space-between',
    flexDirection: 'column',
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
    flex: 1,
  },
  entryText: {
    color: '#555',
    fontWeight: 'bold'
  },
  entryNavContainer: {
    flex: 0.5,
    alignItems: 'flex-end'
  },
  entryNavIcon: {
    color: '#eee',
    fontSize: 18,
    fontWeight: 'bold'
  },
})

export default connect(null, { EntryDelete })(EntryListItem)