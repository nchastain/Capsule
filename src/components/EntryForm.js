import _ from 'lodash'
import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import { EntryUpdate, EntryClear, ProjectsFetch } from '../actions'
import { Input, ModalMessage } from './common'

class EntryForm extends Component {
  constructor () {
    super()
    this.state = { showModal: false }
  }

  componentWillMount () {
    this.props.ProjectsFetch()
  }

  componentWillUnmount () {
    this.props.EntryClear()
  }

  buildGoalItem (project, idx) {
    const { goalItemStyle, goalTextStyle, goalItemContainer } = styles
    return (
      <View style={goalItemContainer} key={idx}>
        <TouchableOpacity style={goalItemStyle} onPress={() => this.setState({ showModal: !this.state.showModal }, function () {
            this.props.EntryUpdate({ prop: 'goal', value: project.title })
          })}>
          <Text style={goalTextStyle}>{project.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  buildGoalList () {
    const projects = this.props.projects
    console.log(projects, 'ng;')
    if (!projects) return
    return (
      <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', padding: 10 }}>
        <Text style={{color: 'orange', padding: 10, textAlign: 'center', fontWeight: 'bold'}}>Select a project from the list below</Text>
        {projects.map((project, idx) => this.buildGoalItem(project, idx))}
      </ScrollView>
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
                Click here to select a project
              </Text>
            </View>
          }
        </TouchableOpacity>
        <Modal
          visible={this.state.showModal && Boolean(this.props.projects)}
          animationType={'slide'}
          transparent
        >
          <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
            <View style={{ flex: 1, marginLeft: 40, marginRight: 40, marginTop: 40, marginBottom: 40, backgroundColor: '#eee', justifyContent: 'flex-start', borderRadius: 10 }}>
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
    height: 150
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
    justifyContent: 'flex-start'
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
  
  const projects = _.map(state.projects, (val, uid) => {
    return { ...val, uid }
  })

  const { goals } = state
  return { goal, description, goals, projects }
}

export default connect(mapStateToProps, { EntryUpdate, ProjectsFetch, EntryClear })(EntryForm)
