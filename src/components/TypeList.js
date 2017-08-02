import React from 'react'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from 'react-native'
import EntryListItem from './EntryListItem'
import { borderlessImageMap, colors } from '../utilities'

class TypeList extends React.Component {
  displayEntries () {
    const entries = this.props.entries.filter(entry => entry.type === this.props.entryType)
    return (
      <View style={{flex: 1, alignSelf: 'stretch', backgroundColor: colors.main}}>
        <ScrollView contentContainerStyle={styles.container}>
          {entries.map((entry, idx) => (
              <EntryListItem entry={entry} hasDate />
          )).reverse()}
        </ScrollView>
      </View>
    )
  }

  render () {
    return (
      <View style={styles.outerContainer}>
        {this.displayEntries()}
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
  dateText: {
    color: colors.main
  },
  icon: {
    height: 45,
    width: 45
  },
  imageContainer: {
    padding: 5,
    marginRight: 10,
    width: 45
  },
  inner: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 64,
    backgroundColor: colors.main,
  },
  text: {
    color: '#555',
    fontWeight: 'bold'
  },
  textContainer: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'center',
    width: 230,
    paddingRight: 10,
    paddingLeft: 5
  },
})

export default TypeList
