import React from 'react'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import { borderlessImageMap, colors } from '../utilities'

class TypeList extends React.Component {
  displayEntries () {
    return this.props.entries.map(entry => (
      <View key={entry.uid} style={styles.container}>
        <View style={styles.inner}>
          <View style={styles.imageContainer}>
            <Image source={borderlessImageMap[entry.type]} style={styles.icon} />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => Actions.EntryDetail({
              entry: entry,
              title: entry.text,
              location: this.props.location
            })}
          >
            <View style={styles.textContainer}>
              <Text style={styles.text}>{entry.text}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.dateText}>
            {moment(new Date(entry.date)).format('MMM DD')}
          </Text>
        </View>
      </View>
    ))
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
    backgroundColor: 'white',
    borderRadius: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    marginBottom: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 5,
    paddingRight: 15
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
    alignItems: 'center'
  },
  outerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 75,
    backgroundColor: colors.main
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
