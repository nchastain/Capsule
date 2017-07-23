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
    const formattedHoursLogged = parseFloat(project.hoursLogged.toFixed(1))
    return (
      <TouchableOpacity style={styles.rowStyle} onPress={() => this.handleSelect(project)}>
        <View style={project.complete ? [styles.buttonStyle, styles.completeButtonStyle] : styles.buttonStyle }><Text style={project.complete ? [styles.timeStyle, styles.completeTextStyle] : styles.timeStyle}>{formattedHoursLogged}/{project.hoursGoal}</Text></View>
        <View style={styles.projectStyle}>
          <Text style={project.complete ? [styles.projectTitleStyle, styles.completeTextStyle] : styles.projectTitleStyle }>
            {project.title}
          </Text>
          <Text style={project.complete ? [styles.projectInfoStyle, styles.completeTextStyle] : styles.projectInfoStyle}>{formattedHoursLogged}/{project.hoursGoal} hours</Text>
        </View>
        <View style={{marginRight: 10}}><Text style={{color: 'lightgray', fontSize: 18}}>></Text></View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
    padding: 10,
  },
  containerStyle: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  hourRecordStyle: {
    fontSize: 18,
    color: '#a083c4',
    fontWeight: 'bold'
  },
  hourRecordContainer: {
    padding: 5
  },
  goalContainerStyle: {
    flexDirection: 'column',
    paddingLeft: 10,
    flex: 1,
    justifyContent: 'center'
  },
  projectTitleStyle: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  projectStyle: {
    marginLeft: 15,
    flex: 1,
    flexDirection: 'column',
  },
  projectInfoStyle: {
    color: '#a083c4',
    fontSize: 14
  },
  descriptionStyle: {
    fontSize: 12,
    color: '#555',
  },
  timeStyle: {
    fontSize: 14,
    color: 'white',
    overflow: 'hidden',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  completeTextStyle: {
    color: 'lightgray',
    textDecorationLine: 'line-through',
  },
  dateStyle: {
    fontSize: 12,
    color: '#a083c4',
  },
  buttonStyle: {
    borderColor: '#eee',
    borderWidth: 3,
    backgroundColor: '#a083c4',
    borderRadius: 40,
    height: 80,
    width: 80,
    alignItems: 'center', 
    justifyContent:'center'
  },
  completeButtonStyle: {
    backgroundColor: 'white'
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
