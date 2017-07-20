import React from 'React'
import { View, Text, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native'
import { NoteAdd, AddTag, TagsFetch } from '../actions'
import { connect } from 'react-redux'

class NoteAddForm extends React.Component {
  constructor () {
    super()
    this.state = {text: '', ran: false}
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.tags !== this.props.tags && !this.state.ran) {
      let tagIDArr = []
      const addTagID = function (potentialTag) {
        let existingTag = Object.values(nextProps.tags).filter(obj => obj.text === potentialTag)[0]
        let tagID = existingTag.id
        tagIDArr.push(tagID)
      }
      const potentialTags = this.state.text.match(/(\B#\w\w+\w+)/g)
      const formattedPotentialTags = potentialTags.map(tag => tag.replace('#', ''))
      if (formattedPotentialTags.length > 0) {
        formattedPotentialTags.forEach(addTagID)
      }

      this.props.NoteAdd(
        {
          text: this.state.text.replace(/\r?\n|\r/, ''),
          date: new Date().getTime(),
          tagIDs: tagIDArr || []
        }
      )
      this.setState({ran: true})
    }
  }

  createTagIDArr (potentialTags) {
    let tagIDArr = []
    let that = this
    const addTagID = function (potentialTag) {
      let existingTag = Object.values(that.props.tags).filter(obj => obj.text === potentialTag)[0]
      let tagID = existingTag.id
      tagIDArr.push(tagID)
    }
    potentialTags.forEach(addTagID)
    return tagIDArr
  }

  onButtonPress () {
    let that = this

    // Tag logic
    const potentialTags = this.state.text.match(/(\B#\w\w+\w+)/g)
    const formattedPotentialTags = potentialTags.map(tag => tag.replace('#', ''))
    const existingTagObjs = this.props.tags ? Object.values(this.props.tags) : []
    const existingTags = existingTagObjs.map(tagObj => tagObj.text)
    const AddTagIfNew = function (potentialTag) {
      if (existingTags.length === 0 || existingTags.indexOf(potentialTag) === -1) {
        that.props.AddTag(potentialTag)
      }
    }
    formattedPotentialTags.forEach(AddTagIfNew)
  }

  render () {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View style={{padding: 20, height: 100, alignSelf: 'stretch', margin: 20, marginTop: 90, backgroundColor: 'white'}}>
            <TextInput
              value={this.state.text}
              placeholder='Add your note here'
              numberOfLines={3}
              fontSize={20}
              multiline
              style={{backgroundColor: 'white', alignSelf: 'stretch'}}
              onChangeText={value => this.setState({text: value})}
            />
          </View>
          <View style={{margin: 10, height: 50, alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange', height: 50, padding: 20, borderRadius: 5}}>
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
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: 'gray'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold',
  },
})

const mapStateToProps = state => {
  const { tags } = state
  return { tags }
}

export default connect(mapStateToProps, { NoteAdd, AddTag, TagsFetch })(NoteAddForm)
