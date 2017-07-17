import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Picker } from 'react-native'
import { EntryUpdate, EntryAdd } from '../actions'
import EntryForm from './EntryForm'
import Stopwatch from './Stopwatch'

class EntryAddForm extends Component {
  onButtonPress () {
    const { goal, description, time } = this.props

    this.props.EntryAdd({ goal, description, time })
  }

  render () {
    const { entireContainer, entryForm, stopwatch } = styles
    return (
      <View style={entireContainer}>
        <EntryForm style={entryForm} {...this.props} />
        <Stopwatch style={stopwatch} {...this.props} />
      </View>
    )
  }
}

const styles = {
  entireContainer: {
    flex: 1,
    flexDirection: 'column'
  },
  entryForm: {
    height: 200,
    flex: 1
  },
  stopwatch: {
    flex: 1
  }
}
const mapStateToProps = (state) => {
  const { goal, description, time } = state.entryForm

  return { goal, description, time }
}

export default connect(mapStateToProps, {
  EntryUpdate, EntryAdd
})(EntryAddForm)
