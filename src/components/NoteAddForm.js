import React from 'React'
import { View, Text, Keyboard, StyleSheet, TextInput, TouchableWithoutFeedback } from 'react-native'
import { NoteAdd } from '../actions'
import { connect } from 'react-redux'

class NoteAddForm extends React.Component {
  constructor () {
    super()
    this.state = {text: ''}
  }

  onButtonPress () {
    this.props.NoteAdd(
      {
        text: this.state.text.replace(/\r?\n|\r/, ''),
        date: new Date().getTime(),
        tags: this.state.text.match(/(\B#\w\w+\w+)/g)
      }
    )
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
              onPress={() => this.onButtonPress()}
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

export default connect(null, { NoteAdd })(NoteAddForm)
