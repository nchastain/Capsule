import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { secondsToString, getProjectByID, colors } from '../utilities'
import _ from 'lodash'

class ListItem extends Component {
  onRowPress () {
    Actions.EntryEdit({ entry: this.props.entry })
  }

  showDescription () {
    const description = this.props.entry.description
    const { descriptionStyle } = styles
    return description ? <Text style={descriptionStyle}>{description}</Text> : null
  }

  render () {
    const { projectID, seconds } = this.props.entry
    const date = moment(new Date(this.props.entry.date)).format('MM/DD/YYYY')
    const selectedProject = getProjectByID(projectID, this.props.projects)
    const {containerStyle, projectContainerStyle, projectStyle, timeStyle, dateStyle, buttonStyle} = styles
    if (!selectedProject) return null
    return (
      <TouchableOpacity onPress={this.onRowPress.bind(this)}>
        <View style={containerStyle}>
          <View style={buttonStyle}><Text style={timeStyle}>{secondsToString(seconds)}</Text></View>
          <View style={projectContainerStyle}>
            <View><Text style={projectStyle}>{selectedProject.title}</Text></View>
            <View>{this.showDescription()}<Text style={dateStyle}>{date}</Text></View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = {
  containerStyle: {
    height: 100,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  projectContainerStyle: {
    flexDirection: 'column',
    paddingLeft: 10,
    flex: 1,
    height: 80,
    justifyContent: 'center'
  },
  projectStyle: {
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
  }
}

const mapStateToProps = state => {

  const projects = _.map(state.projects, (val, uid) => {
    return { ...val, uid }
  })

  return { projects }
}

export default connect(mapStateToProps)(ListItem)
