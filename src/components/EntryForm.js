import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import { EntryUpdate, EntryClear } from '../actions'
import { Input, ModalMessage } from './common'

class EntryForm extends Component {
  constructor() {
    super()
    this.state = { showModal: false }
  }

  componentWillUnmount () {
    this.props.EntryClear()
  }

  buildGoalList () {
    const { goalItemStyle, goalTextStyle, goalItemContainer } = styles
    return (
      <View style={{ justifyContent: 'flex-start', flex: 1, padding: 10 }}>
        <Text style={{color: 'orange', padding: 10, textAlign: 'center', fontWeight: 'bold'}}>Select a goal from the list below</Text>
        <View style={goalItemContainer}>
          <TouchableOpacity style={goalItemStyle} onPress={() => this.setState({ showModal: !this.state.showModal }, function () {
              this.props.EntryUpdate({ prop: 'goal', value: 'Build V1 of Capsule for 100 hours' })
            })}>
            <Text style={goalTextStyle}>Build V1 of Capsule for 100 hours</Text>
          </TouchableOpacity>
        </View>
        <View style={goalItemContainer}>
          <TouchableOpacity style={goalItemStyle} onPress={() => this.setState({ showModal: !this.state.showModal }, function () {
            this.props.EntryUpdate({ prop: 'goal', value: 'Study Web development for 100 hours' })
          })}>
            <Text style={goalTextStyle}>Study Web development for 100 hours</Text>
          </TouchableOpacity>
        </View>
        <View style={goalItemContainer}>
          <TouchableOpacity style={goalItemStyle} onPress={() => this.setState({ showModal: !this.state.showModal }, function () {
            this.props.EntryUpdate({ prop: 'goal', value: 'Study product management for 100 hours' })
          })}>
            <Text style={goalTextStyle}>Study product management for 100 hours</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  render () {
    const { containerStyle, buttonStyle, selectGoalStyle } = styles
    return (
      <View style={containerStyle}>
        <TouchableOpacity style={buttonStyle} onPress={() => this.setState({ showModal: !this.state.showModal })}>
          {this.props.goal
          ? <Text style={{color: 'orange', fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
              {this.props.goal}
            </Text>
          : <View style={{padding: 10, marginBottom: 5, backgroundColor: 'orange', borderRadius: 10}}>
              <Text style={selectGoalStyle}>
                Click here to select a goal
              </Text>
            </View>
          }
        </TouchableOpacity>
        <Modal
          visible={this.state.showModal}
          animationType={'slide'}
          transparent
        >
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
            <View style={{ flex: 1, alignSelf: 'stretch', marginLeft: 40, marginRight: 40, marginTop: 40, marginBottom: 40, backgroundColor: '#eee', justifyContent: 'center', borderRadius: 10 }}>
              {this.buildGoalList()}
            </View>
          </View>
        </Modal>
        <Input
          placeholder='Additional details'
          value={this.props.description}
          onChangeText={value => this.props.EntryUpdate({ prop: 'description', value })}
        />
      </View>
    )
  }
}

const styles = {
  buttonStyle: {
    backgroundColor: 'white'
  },
  goalItemContainer: {
    padding: 10,
    flex: 1
  },
  goalTextStyle: {
    color: '#555',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  goalItemStyle: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 10,
    flex: 1,
    justifyContent: 'center'
  },
  containerStyle: {
    marginTop: 75,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderColor: '#eee',
    borderBottomWidth: 3
  },
  selectGoalStyle: {
    alignSelf: 'center',
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20
  },
  modalStyle: {
    backgroundColor: 'rgba(0,0,0,0.75)'
  },
  modalTextStyle: {
    color: 'black',
    backgroundColor: 'white',
  },
  modalContainerStyle: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  }
}

const mapStateToProps = (state) => {
  const { goal, description } = state.entryForm
  const { goals } = state
  return { goal, description, goals }
}

export default connect(mapStateToProps, { EntryUpdate, EntryClear })(EntryForm)
