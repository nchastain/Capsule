import _ from 'lodash'
import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableOpacity, Modal } from 'react-native'
import { connect } from 'react-redux'
import { EntryUpdate, EntryClear, ProjectsFetch } from '../actions'
import { Input } from './common'
import { colors } from '../utilities'

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

  buildProjectItem (project, idx) {
    const { ProjectItemStyle, ProjectTextStyle, ProjectItemContainer } = styles
    return (
      <View style={ProjectItemContainer} key={idx}>
        <TouchableOpacity
          style={ProjectItemStyle}
          onPress={() => this.setState({ showModal: !this.state.showModal }, function () {
            this.props.EntryUpdate({ prop: 'projectID', value: project.uid })
          })}>
          <Text style={ProjectTextStyle}>{project.title}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  buildProjectList () {
    const projects = this.props.projects
    if (!projects) return
    return (
      <ScrollView contentContainerStyle={{ justifyContent: 'flex-start', alignItems: 'center', padding: 10 }}>
        <TouchableOpacity
          style={{height: 25, alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'flex-end'}}
          onPress={() => this.setState({ showModal: !this.state.showModal })}>
            <Text style={{fontSize: 10, fontWeight: 'bold', color: '#555'}}>CLOSE</Text>
        </TouchableOpacity>
        <Text style={{color: colors.main, padding: 10, textAlign: 'center', fontWeight: 'bold'}}>Select a project from the list below</Text>
        {projects.map((project, idx) => this.buildProjectItem(project, idx))}
      </ScrollView>
    )
  }

  render () {
    const { containerStyle, buttonStyle, selectProjectStyle } = styles
    let selectedProject = this.props.projects.filter(obj => obj.uid === this.props.projectID)[0]
    return (
      <View style={containerStyle}>
        <TouchableOpacity style={buttonStyle} onPress={() => this.setState({ showModal: !this.state.showModal })}>
          {this.props.projectID
          ? <Text style={{color: colors.main, fontSize: 20, fontWeight: 'bold', textAlign: 'center'}}>
              {selectedProject.title}
            </Text>
          : <View style={{padding: 10, marginBottom: 5, backgroundColor: colors.main, borderRadius: 10}}>
              <Text style={selectProjectStyle}>
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
              {this.buildProjectList()}
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
  ProjectItemContainer: {
    padding: 10,
    alignSelf: 'stretch'
  },
  ProjectTextStyle: {
    color: '#555',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    alignSelf: 'stretch'
  },
  ProjectItemStyle: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: 'white',
    padding: 12,
    justifyContent: 'flex-start',
    alignSelf: 'stretch'
  },
  containerStyle: {
    marginTop: 75,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10,
    borderColor: '#eee',
    borderBottomWidth: 3
  },
  selectProjectStyle: {
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
  const { project, description, projectID } = state.entryForm
  
  const projects = _.map(state.projects, (val, uid) => {
    return { ...val, uid }
  })

  return { project, description, projects, projectID }
}

export default connect(mapStateToProps, { EntryUpdate, ProjectsFetch, EntryClear })(EntryForm)
