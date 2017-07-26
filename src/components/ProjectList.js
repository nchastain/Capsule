import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ListView, TouchableWithoutFeedback } from 'react-native'
import { ProjectsFetch, ProjectSelect } from '../actions'
import { Actions } from 'react-native-router-flux'
import { colors } from '../utilities'

class ProjectList extends React.Component {
  constructor () {
    super()
    this.state = {activeFilter: 'current'}
  }
  componentWillMount () {
    this.props.ProjectsFetch()
    this.createDataSource(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource ({ projects }) {
    let filteredProjects
    switch (this.state.activeFilter) {
      case 'current':
        filteredProjects = projects.filter(project => !project.complete)
        break
      case 'complete':
        filteredProjects = projects.filter(project => project.complete)
        break
      case 'all':
        filteredProjects = projects
        break
      default:
        filteredProjects = projects
    }
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })
    this.setState({dataSource: ds.cloneWithRows(filteredProjects.sort((a, b) => b.time - a.time))})
  }

  handleSelect (project) {
    this.props.ProjectSelect(project)
  }

  renderRow (project) {
    const formattedHoursLogged = parseFloat(project.hoursLogged.toFixed(1))
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.rowStyle} onPress={() => this.handleSelect(project)}>
        <View style={project.complete ? [styles.buttonStyle, styles.completeButtonStyle] : styles.buttonStyle }>
          <Text style={project.complete ? [styles.timeStyle, styles.completeTextStyle] : styles.timeStyle}>{formattedHoursLogged}/{project.hoursGoal}</Text>
        </View>
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
        <View style={{alignSelf: 'stretch', alignItems: 'flex-start'}}>
          <View style={{padding: 10, paddingBottom: 0, paddingLeft: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start'}}>
            <TouchableWithoutFeedback onPress={() => this.setState({activeFilter: 'current'}, () => this.createDataSource(this.props))}>
              <View style={this.state.activeFilter === 'current' ? styles.filterButtonActive : styles.filterButtonInactive}>
                <Text style={this.state.activeFilter === 'current' ? styles.activeFilterText : styles.inactiveFilterText}>current</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({activeFilter: 'complete'}, () => this.createDataSource(this.props))}>
              <View style={this.state.activeFilter === 'complete' ? styles.filterButtonActive : styles.filterButtonInactive}>
                <Text style={this.state.activeFilter === 'complete' ? styles.activeFilterText : styles.inactiveFilterText}>complete</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({activeFilter: 'all'}, () => this.createDataSource(this.props))}>
              <View style={this.state.activeFilter === 'all' ? styles.filterButtonActive : styles.filterButtonInactive}>
                <Text style={this.state.activeFilter === 'all' ? styles.activeFilterText : styles.inactiveFilterText}>all</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <ListView enableEmptySections dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} style={{marginLeft: 10, marginRight: 10}} />
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
    backgroundColor: 'white',
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
  filterButtonActive: {
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: 'white',
    // borderRadius: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderColor: 'white',
    borderWidth: 1,
    margin: 5,
    marginBottom: 0,
  },
  filterButtonInactive: {
    padding: 8,
    paddingLeft: 12,
    paddingRight: 12,
    margin: 5,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderWidth: 1,
    borderColor: colors.lightAccent,
    backgroundColor: colors.lightAccent,
    borderBottomWidth: 0,
    marginBottom: 0,
  },
  activeFilterText: {
    color: colors.main,
    fontWeight: 'bold',
    fontSize: 12
  },
  inactiveFilterText: {
    color: colors.main, 
    fontSize: 12,
    fontWeight: 'bold'
  },
  hourRecordStyle: {
    fontSize: 18,
    color: colors.main,
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
    color: colors.main,
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
  },
  completeButtonStyle: {
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    marginTop: 64,
    marginBottom: 48,
    backgroundColor: colors.main,
  }
}

const mapStateToProps = state => {
  const projects = _.map(state.projects, (val, uid) => {
    return { ...val, uid }
  })

  return { projects }
}

export default connect(mapStateToProps, { ProjectsFetch, ProjectSelect })(ProjectList)
