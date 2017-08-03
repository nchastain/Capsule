import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'
import moment from 'moment'

class TagDetails extends React.Component {
  render () {
    const notesArr = Object.values(this.props.notes) || []
    const notesForTag = notesArr.filter(note => {
      return note.tagIDs && note.tagIDs.indexOf(this.props.tag.id) !== -1
    })
    const createText = note => note.text.replace(/(\B#\w\w+\w+)/g, '')
    return (
      <View style={styles.container}>
        {notesForTag.map((note, idx) => (
          <View key={idx} style={styles.details}>
            <Text style={styles.date}>
              {moment(new Date(note.date)).format('MM/DD/YYYY')}
            </Text>
            <Text style={styles.text}>{createText(note)}</Text>
          </View>
        ))}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 70,
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'white',
  },
  date: {
    width: 100,
    color: '#a083c4',
    fontWeight: 'bold',
    marginRight: 5
  },
  details: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgray',
  },
  text: {
    fontSize: 16,
    color: '#555',
    flex: 1
  },
})

const mapStateToProps = state => {
  const { tag, notes } = state
  return { tag, notes }
}

export default connect(mapStateToProps)(TagDetails)
