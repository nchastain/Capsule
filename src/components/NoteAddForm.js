import React from 'React'
import { View, Text, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native'
import { NoteAdd, AddTag, TagsFetch } from '../actions'
import { connect } from 'react-redux'
import ParsedText from 'react-native-parsed-text'
import uuid from 'react-native-uuid'

class NoteAddForm extends React.Component {
  constructor () {
    super()
    this.state = {text: '', ran: false, newTags: false}
  }

  extractTagsFromInput () {
    const newTags = this.state.text.match(/(\B#\S+)/g)
    return newTags ? newTags.map(tag => tag.replace('#', '')) : []
  }

  onButtonPress () {
    const tagsFromInput = this.extractTagsFromInput()
    const oldTags = Object.values(this.props.tags)
    const oldTagTitles = oldTags.map(tag => tag.text)
    const tagMatches = oldTags.filter(tag => tagsFromInput.indexOf(tag.text) !== -1)
    const existingIDs = tagMatches.map(tag => tag.id)
    const newTags = tagsFromInput.filter(tag => oldTagTitles.indexOf(tag) === -1)
    const newTagObjs = newTags.map(newTag => ({ text: newTag, id: uuid.v4() }))
    const newIDs = newTagObjs.map(newTagObj => newTagObj.id)
    const allTagIDs = [...existingIDs, ...newIDs]
    const noteObj = {
      text: this.state.text.replace(/\r?\n|\r/, ''),
      date: new Date().getTime(),
      tagIDs: allTagIDs
    }
    newTagObjs.forEach(this.props.AddTag)
    this.props.NoteAdd(noteObj)
  }

  render () {
        //define delimiter
    let delimiter = /\s+/

    //split string
    let _text = this.state.text
    let token, index, parts = []
    while (_text) {
      delimiter.lastIndex = 0
      token = delimiter.exec(_text)
      if (token === null) {
        break
      }
      index = token.index
      if (token[0].length === 0) {
        index = 1
      }
      parts.push(_text.substr(0, index))
      parts.push(token[0])
      index = index + token[0].length
      _text = _text.slice(index)
    }
    parts.push(_text)

    //highlight hashtags
    parts = parts.map((text) => {
      if (/^#/.test(text)) {
        return <Text key={text} style={styles.hashtag}>{text}</Text>
      } else {
        return text
      }
    })

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{padding: 20, height: 100, alignSelf: 'stretch', borderColor: 'lightgray', borderWidth: 1, margin: 20, marginTop: 90, backgroundColor: 'white'}}>
            <TextInput
              placeholder='Add your note here'
              numberOfLines={3}
              multiline
              style={{backgroundColor: 'white', alignSelf: 'stretch', fontSize: 20}}
              onChangeText={value => this.setState({text: value})}
            ><Text>{parts}</Text></TextInput>
          </View>
          <View style={{margin: 10, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: '#a083c4', padding: 20, borderRadius: 5}}>
            <Text
              style={styles.welcome}
              onPress={this.onButtonPress.bind(this)}
            >
              Add Note
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: '#eee'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },
  hashtag: {
    color: '#a083c4',
    fontWeight: 'bold'
  }
})

const mapStateToProps = state => {
  const { tags } = state
  return { tags }
}

export default connect(mapStateToProps, { NoteAdd, AddTag, TagsFetch })(NoteAddForm)
