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
    console.log(notesArr)
    const notesForTag = notesArr.filter(note => (
      note.tags.indexOf(this.props.tag) !== -1
    ))
    return (
      <View style={styles.container}>
        {notesForTag.map((note, idx) => (
          <View key={idx} style={{flexDirection: 'row', padding: 0, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{width: 75, color: 'orange', marginRight: 5}}>{moment(new Date(note.date)).format('MM/DD/YYYY')}</Text>
            <Text style={styles.welcome}>{note.text}</Text>
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
    padding: 10,
    paddingTop: 100,
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#7851a9',
  },
  welcome: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1
  },
})

const mapStateToProps = state => {
  const { tag, notes } = state
  return { tag, notes }
}

export default connect(mapStateToProps)(TagDetails)
