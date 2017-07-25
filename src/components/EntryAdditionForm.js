import React from 'React'
import { View, Text, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback, Image } from 'react-native'
import { NoteAdd, AddTag, TagsFetch, AddEntry } from '../actions'
import { connect } from 'react-redux'
import ParsedText from 'react-native-parsed-text'
import uuid from 'react-native-uuid'

class EntryAdditionForm extends React.Component {
  constructor (props) {
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
      tagIDs: allTagIDs,
      type: this.props.entryType
    }
    newTagObjs.forEach(this.props.AddTag)
    this.props.AddEntry(noteObj)
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

    const backgroundMap = {
      note: '#8AC3FB',
      journal: '#FFBDFA',
      milestone: '#F6DF7F',
      view: '#B09BFF',
      progress: '#9EE986',
      habit: '#FFC566',
      experience: '#F96262'
    }

    const buttonMap = {
      note: '#4A90E2',
      journal: '#FD8AD7',
      milestone: '#F5C523',
      view: '#5D34FA',
      progress: '#21AC34',
      habit: '#F59123',
      experience: '#D0021B'
    }

    const imageMap = {
      note: require('.././assets/note.png'),
      experience: require('.././assets/experience.png'),
      view: require('.././assets/sight.png'),
      journal: require('.././assets/journal.png'),
      milestone: require('.././assets/milestone.png'),
      habit: require('.././assets/habit.png'),
      progress: require('.././assets/progress.png'),
    }

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', alignSelf: 'stretch', backgroundColor: '#a083c4'}}>
          <View style={{marginTop: 90, width: 80, borderRadius: 40, height: 80, shadowOffset: { width: 2,  height: 2}, shadowColor: '#555', shadowOpacity: 0.3}}>
            <Image source={imageMap[this.props.entryType]} style={{width: 80, height: 80}} />
          </View>
          <View style={{padding: 20, height: 100, alignSelf: 'stretch', borderRadius: 10, borderColor: '#eee', borderWidth: 1, margin: 20, backgroundColor: 'white',     shadowOffset: { width: 2,  height: 2},
    shadowColor: '#555',
    shadowOpacity: 0.3}}>
            <TextInput
              placeholder={`Add ${this.props.entryType} here`}
              numberOfLines={3}
              multiline
              style={{backgroundColor: 'white', alignSelf: 'stretch', fontSize: 20}}
              onChangeText={value => this.setState({text: value})}
            ><Text>{parts}</Text></TextInput>
          </View>
          <View style={[styles.addNoteButton, {borderRadius: 10, backgroundColor: buttonMap[this.props.entryType], width: 250}]}>
            <Text
              style={styles.welcome}
              onPress={this.onButtonPress.bind(this)}
            >
              Add {this.props.entryType}
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  addNoteButton: {
    margin: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#a083c4',
    padding: 20,
    borderRadius: 5,
    shadowOffset: { width: 2,  height: 2},
    shadowColor: '#555',
    shadowOpacity: 0.3
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

export default connect(mapStateToProps, { NoteAdd, AddTag, AddEntry, TagsFetch })(EntryAdditionForm)
