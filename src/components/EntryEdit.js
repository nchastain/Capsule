import _ from 'lodash'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Communications from 'react-native-communications'
import EntryForm from './EntryForm'
import Stopwatch from './Stopwatch'
import { Text, View } from 'react-native'
import { EntryUpdate, EntrySave, EntryDelete } from '../actions'
import { Card, CardSection, Button, Confirm, Input } from './common'
import { secondsToString } from '../utilities'

class EntryEdit extends Component {
  state = { showModal: false }

  componentWillMount() {
    _.each(this.props.entry, (value, prop) => {
      this.props.EntryUpdate({ prop, value })
    })
  }

  onButtonPress() {
    const { uid } = this.props.entry
    const { goal, description, time } = this.props
    this.props.EntrySave({ 
      goal: goal || this.props.entry.goal,
      description: description || this.props.entry.description,
      time: time || this.props.entry.time,
      uid
    })
  }

  onAccept() {
    const { uid } = this.props.entry

    this.props.EntryDelete({ uid })
  }

  onDecline() {
    this.setState({ showModal: false })
  }

  render() {
    return (
      <View>
        <EntryForm />
        <Text style={{alignSelf: 'center', flex: 1}} label='Time'>{secondsToString(this.props.time)}</Text>
        <Button onPress={this.onButtonPress.bind(this)}>
          Save Changes
        </Button>
        <Button onPress={() => this.setState({ showModal: !this.state.showModal })}>
          Delete Log Entry
        </Button>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  const { goal, description, time } = state.entryForm
  return { goal, description, time }
}

export default connect(mapStateToProps, {
  EntryUpdate, EntrySave, EntryDelete
})(EntryEdit)