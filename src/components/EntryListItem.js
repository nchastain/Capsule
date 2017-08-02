import React from 'react'
import { TouchableOpacity, View, Image, Text, StyleSheet } from 'react-native'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { imageMap, colors } from '../utilities'

const EntryListItem = ({ entry, hasDate }) => (
  <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.DayEntryDetail({entry: entry, title: entry.text, location: 'today'})}>
    <View style={styles.dayEntryList}>
      <View style={styles.dayEntryRow}>
        <View style={styles.entryIconContainer}>
          <Image source={imageMap[entry.type]} style={styles.entryIcon} />
        </View>
        <View style={styles.dayEntryTextContainer}>
          <Text style={styles.entryText}>
            {entry.text}
          </Text>
        </View>
        {dateOrNav(hasDate, entry)}
      </View>
    </View>
  </TouchableOpacity>
)

const dateOrNav = (hasDate, entry) => (
  hasDate
  ? <View style={{alignItems: 'flex-end', flex: 1}}>
      <Text style={{color: colors.main, textAlign: 'right'}}>{moment(new Date(entry.date)).format('MMM DD')}</Text>
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

export default EntryListItem