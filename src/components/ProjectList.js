import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ListView } from 'react-native'
import { ProjectsFetch, ProjectSelect } from '../actions'
import { Actions } from 'react-native-router-flux'

class ProjectList extends React.Component {
  componentWillMount () {
    this.props.ProjectsFetch()
    this.createDataSource(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource ({ projects }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.dataSource = ds.cloneWithRows(projects.sort((a, b) => b.time - a.time))
  }

  handleSelect (project) {
    this.props.ProjectSelect(project)
  }

  renderRow (project) {
    const {containerStyle, hourRecordStyle, goalContainerStyle, rowStyle, goalStyle} = styles
    const formattedHoursLogged = parseFloat(project.hoursLogged.toFixed(1))
    return (
      <TouchableOpacity style={rowStyle} onPress={() => this.handleSelect(project)}
      >
        <View style={containerStyle}>
          <View style={goalContainerStyle}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={goalStyle}>{project.title}</Text>
              <View style={styles.hourRecordContainer}><Text style={hourRecordStyle}>{formattedHoursLogged}/{project.hoursGoal} hours</Text></View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
}

const styles = {
  rowStyle: {
    height: 65
  },
  containerStyle: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  hourRecordStyle: {
    fontSize: 14,
    color: 'orange',
    fontWeight: 'bold'
  },
  hourRecordContainer: {
    padding: 5,
    borderRadius: 5,
    borderColor: 'orange',
    borderWidth: 1,
  },
  goalContainerStyle: {
    flexDirection: 'column',
    paddingLeft: 10,
    flex: 1,
    height: 80,
    justifyContent: 'center'
  },
  goalStyle: {
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
    color: 'orange',
  },
  buttonStyle: {
    borderColor: '#eee',
    borderWidth: 3,
    backgroundColor: 'orange',
    borderRadius: 40,
    height: 80,
    width: 80,
    alignItems: 'center', 
    justifyContent:'center'
  },
  container: {
    flex: 1,
    marginTop: 65,
    marginBottom: 48
  }
}

const mapStateToProps = state => {
  const projects = _.map(state.projects, (val, uid) => {
    return { ...val, uid }
  })

  return { projects }
}

export default connect(mapStateToProps, { ProjectsFetch, ProjectSelect })(ProjectList)
