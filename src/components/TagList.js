import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ListView } from 'react-native'
import { TagsFetch, TagSelect } from '../actions'
import { Actions } from 'react-native-router-flux'
import { colors } from '../utilities'

class TagList extends React.Component {
  componentWillMount () {
    this.props.TagsFetch()
    this.createDataSource(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource ({ tags }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(Object.values(tags).sort(function (a, b) {
      if (!a.text || !b.text) return -1
      if (a.text.toLowerCase() < b.text.toLowerCase()) return -1
      if (a.text.toLowerCase() > b.text.toLowerCase()) return 1
      return 0
    }))
  }

  handleSelect (tag) {
    this.props.TagSelect(tag)
  }

  getNotesForTag (tag) {
    const notesArr = Object.values(this.props.notes)
    const notesForTag = notesArr.filter(note => {
      return note.tagIDs && note.tagIDs.indexOf(tag.id) !== -1
    })
    return notesForTag
  }

  renderRow (tag) {
    let numNotes = this.props.notes ? this.getNotesForTag(tag).length : 0
    return (
      <TouchableOpacity style={rowStyle} onPress={() => this.handleSelect(tag)}
      >
        <View style={styles.containerStyle}>
          <View style={styles.goalContainerStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <View style={{flexDirection: 'row', width: 250, alignItems: 'center'}}>
                <View style={{marginRight: 5}}><Text style={styles.goalStyle}>#{tag.text}</Text></View>
                <Text style={{color: colors.main, fontWeight: 'bold'}}>({numNotes})</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}}>
                <Text style={{color: 'lightgray', fontWeight: 'bold', fontSize: 20}}>></Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
}

const styles = {
  rowStyle: {
    height: 65
  },
  containerStyle: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hourRecordStyle: {
    fontSize: 14,
    color: colors.main,
    fontWeight: 'bold'
  },
  hourRecordContainer: {
    padding: 5,
    borderRadius: 5,
    borderColor: colors.main,
    borderWidth: 1,
  },
  goalContainerStyle: {
    flexDirection: 'column',
    paddingLeft: 10,
    flex: 1,
    height: 80,
    justifyContent: 'center'
  },
  goalStyle: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  descriptionStyle: {
    fontSize: 12,
    color: '#555',
  },
  timeStyle: {
    fontSize: 18,
    color: 'white',
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  dateStyle: {
    fontSize: 12,
    color: colors.main,
  },
  buttonStyle: {
    borderColor: '#eee',
    borderWidth: 3,
    backgroundColor: colors.main,
    borderRadius: 40,
    height: 80,
    width: 80,
    alignItems: 'center', 
    justifyContent:'center'
  },
  container: {
    flex: 1,
    marginTop: 65,
    marginBottom: 48
  }
}

const mapStateToProps = state => {
  const { tags, notes } = state
  return { tags, notes }
}

export default connect(mapStateToProps, { TagsFetch, TagSelect })(TagList)
