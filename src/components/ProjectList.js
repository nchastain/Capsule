import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ListView, TouchableWithoutFeedback, Image } from 'react-native'
import { ProjectsFetch, ProjectSelect } from '../actions'
import { Actions } from 'react-native-router-flux'
import { colors, imageMap, borderlessImageMap } from '../utilities'

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

  /* renderRow (project) {
    const formattedHoursLogged = parseFloat(project.hoursLogged.toFixed(1))
    return (
      <TouchableOpacity activeOpacity={0.8} style={styles.rowStyle} onPress={() => this.handleSelect(project)}>
        <View style={project.complete ? [styles.buttonStyle, styles.completeButtonStyle] : styles.buttonStyle}>
          {project.complete
            ? <Image source={borderlessImageMap.complete} style={{height: 35, width: 39, opacity: 0.3}} />
            : <Text style={styles.timeStyle}>{formattedHoursLogged}/{project.hoursGoal}</Text>
          }
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
  } */

  renderProgressBar (project) {
    const percentComplete = parseInt(project.hoursLogged) / parseInt(project.hoursGoal)
    switch (percentComplete) {
      case 0:
        return (
          <View style={{alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{backgroundColor: '#eee', padding: 5, flex: 1, borderRadius: 20}}><Text style={{color: colors.main, fontWeight: 'bold', fontSize: 12, paddingLeft: 10, marginRight: -3}}>0%</Text></View>
          </View>
        )
      case 1:
        return (
          <View style={{alignSelf: 'stretch', flexDirection: 'row', backgroundColor: colors.main, alignItems: 'center', borderRadius: 20}}>
            <View style={{backgroundColor: colors.main, flex: 1, alignItems: 'flex-end', borderRadius: 20}}><Text style={{color: 'white', fontWeight: 'bold', fontSize: 12, borderRadius: 20}}>100%</Text></View>
            <View style={{backgroundColor: colors.main, padding: 5, paddingRight: 15, borderRadius: 20}}><Image source={borderlessImageMap.whiteComplete} style={{height: 18, width: 20, marginRight: -3}} /></View>
          </View>
        )
      default:
        return (
          <View style={{alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', borderRadius: 20, backgroundColor: colors.main}}>
            <View style={{flex: percentComplete, backgroundColor: colors.main, padding: 5, alignItems: 'flex-end', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, paddingLeft: 10}}><Text style={{color: 'white', fontWeight: 'bold', fontSize: 12}}>{percentComplete * 100}%</Text></View>
            <View style={{flex: 1 - percentComplete, backgroundColor: '#eee', padding: 5, alignSelf: 'stretch', borderTopRightRadius: 20, borderBottomRightRadius: 20, marginRight: -3}}></View>
          </View>
        )
    }
  }

  renderRow (project) {
    const formattedHoursLogged = parseFloat(project.hoursLogged.toFixed(1))
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleSelect(project)}>
        <View style={{marginBottom: 20, marginLeft: 10, marginRight: 10, backgroundColor: 'white', flex: 1, flexDirection: 'column'}}>
          {this.renderProgressBar(project)}
          <View style={{padding: 10, backgroundColor: 'white', paddingBottom: 30}}>
            <Text style={{color: colors.main, fontSize: 16, fontWeight: 'bold'}}>{project.title}</Text>
            <Text style={{color: colors.lightAccent, fontWeight: 'bold', fontSize: 14}}>{formattedHoursLogged}/{project.hoursGoal} hours</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={{padding: 10, paddingBottom: 5, alignSelf: 'stretch', backgroundColor: colors.main, justifyContent: 'flex-end', alignItems: 'center', flexDirection: 'row'}}>
          <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.ProjectAdd()}>
            <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10, paddingLeft: 0, borderRadius: 10, shadowOffset: {width: 2, height: 2},
      shadowColor: '#555',
      shadowOpacity: 0.3,}}>
              <Image source={imageMap.addproject} style={{height: 18, backgroundColor: 'white', width: 30}} />
              <Text style={{color: colors.main, fontSize: 16, fontWeight: 'bold', marginLeft: 5}}>New</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{alignSelf: 'stretch', alignItems: 'flex-start'}}>
          <View style={{padding: 10, paddingBottom: 0, paddingLeft: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'flex-start', backgroundColor: colors.main, alignSelf: 'stretch'}}>
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
        <ListView enableEmptySections dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} contentContainerStyle={{paddingBottom: 70, backgroundColor: 'white', paddingTop: 20}} />
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
    fontSize: 14
  },
  inactiveFilterText: {
    color: colors.main, 
    fontSize: 14,
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
    // textDecorationLine: 'line-through',
  },
  dateStyle: {
    fontSize: 12,
    color: colors.main,
  },
  buttonStyle: {
    borderColor: '#eee',
    borderWidth: 3,
    backgroundColor: colors.main,
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center', 
    justifyContent:'center'
  },
  completeButtonStyle: {
    backgroundColor: 'white',
  },
  container: {
    flex: 1,
    marginTop: 64,
    backgroundColor: 'white',
  }
}

const mapStateToProps = state => {
  const projects = _.map(state.projects, (val, uid) => {
    return { ...val, uid }
  })

  return { projects }
}

export default connect(mapStateToProps, { ProjectsFetch, ProjectSelect })(ProjectList)
