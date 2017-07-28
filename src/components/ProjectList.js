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
    this.state = {activeFilter: 'current', activeType: 'all'}
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
    switch (this.state.activeType) {
      case 'education':
        filteredProjects = projects.filter(project => project.type === 'education')
        break
      case 'art':
        filteredProjects = projects.filter(project => project.type === 'art')
        break
      case 'enterprise':
        filteredProjects = projects.filter(project => project.type === 'enterprise')
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

  renderProgressBar (project) {
    let percentComplete = (project.hoursLogged) / (project.hoursGoal)
    console.log(percentComplete)
    if (project.complete && !project.timed) {
      return (
        <View style={{alignSelf: 'stretch', flexDirection: 'row', backgroundColor: colors.main, alignItems: 'center', borderRadius: 20}}>
          <View style={{backgroundColor: colors.main, flex: 1, alignItems: 'flex-end', borderRadius: 20}} />
          <View style={{backgroundColor: colors.main, padding: 5, paddingRight: 15, borderRadius: 20}}><Image source={borderlessImageMap.whiteComplete} style={{height: 18, width: 20, marginRight: -3}} /></View>
        </View>
      )
    }
    if (!project.timed) return null

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
            <View style={{flex: percentComplete, backgroundColor: colors.main, padding: 5, alignItems: 'flex-end', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, paddingLeft: 10, height: 25}}>
              {percentComplete > 0.08 && <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'right'}}>{(percentComplete * 100).toFixed(0)}%</Text>}</View>
            <View style={{flex: 1 - percentComplete, backgroundColor: '#eee', padding: 5, alignSelf: 'stretch', borderTopRightRadius: 20, borderBottomRightRadius: 20, marginRight: -3}}></View>
          </View>
        )
    }
  }

  renderRow (project) {
    const formattedHoursLogged = parseFloat(project.hoursLogged.toFixed(1))
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleSelect(project)}>
        <View style={{marginBottom: 20, backgroundColor: 'white', flex: 1, flexDirection: 'column', borderBottomWidth: 1, borderColor: '#eee'}}>
          <View style={{marginLeft: 10, marginRight: 10}}>{this.renderProgressBar(project)}</View>
          <View style={{padding: 10, backgroundColor: 'white', paddingBottom: 30, paddingTop: 10, marginLeft: 10, marginRight: 10}}>
            <Text style={{color: colors.main, fontSize: 16, fontWeight: 'bold'}}>{project.title}</Text>
            {project.timed && <Text style={{color: colors.lightAccent, fontWeight: 'bold', fontSize: 14}}>{formattedHoursLogged}/{project.hoursGoal} hours</Text>}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  checkActiveType (typeName) {
    return this.state.activeType === typeName
    ? {borderWidth: 5, borderColor: colors.main, borderRadius: 25, width: 50, height: 50, backgroundColor: 'white'}
    : {borderWidth: 0, borderRadius: 20, width: 40, height: 40}
  }
  
  render () {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'column', width: 80, backgroundColor: colors.lightAccent, alignItems: 'center', justifyContent: 'space-between', paddingBottom: 60}}>
          <View style={{alignItems: 'center'}}>
            <View><Text style={{color: colors.main, fontWeight: 'bold', fontSize: 12, textAlign: 'center', paddingBottom: 5, paddingTop: 10}}>TYPE</Text></View>
            <TouchableWithoutFeedback onPress={() => this.setState({activeType: 'all'}, () => this.createDataSource(this.props))}>
              <View style={[{width: 40, height: 40, margin: 5, alignItems: 'center', justifyContent: 'center'}, this.checkActiveType('all', 'type')]}>
                <Text style={{fontSize: 20, textAlign: 'center', marginTop: 0, marginRight: -2}}>⭕️</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({activeType: 'art'}, () => this.createDataSource(this.props))}>
              <View style={[{width: 40, height: 40, margin: 5, alignItems: 'center', justifyContent: 'center'}, this.checkActiveType('art', 'type')]}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>🎨</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({activeType: 'education'}, () => this.createDataSource(this.props))}>
              <View style={[{width: 40, height: 40, margin: 5, alignItems: 'center', justifyContent: 'center'}, this.checkActiveType('education', 'type')]}>
                <Text style={{fontSize: 20, textAlign: 'center'}}>📚</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({activeType: 'enterprise'}, () => this.createDataSource(this.props))}>
              <View style={[{width: 40, height: 40, margin: 5, alignItems: 'center', justifyContent: 'center'}, this.checkActiveType('enterprise', 'type')]}>
                <Text style={{fontSize: 20, textAlign: 'center', marginTop: -5, marginRight: -2}}>💼</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{alignItems: 'center'}}>
            <View><Text style={{color: colors.main, fontWeight: 'bold', fontSize: 12, textAlign: 'center', paddingBottom: 5}}>STATUS</Text></View>
            <TouchableWithoutFeedback onPress={() => this.setState({activeFilter: 'all'}, () => this.createDataSource(this.props))}>
              <View style={styles.filterContainer}>
              <Text style={[{fontSize: 15, fontWeight: 'bold', color: 'rgba(0,0,0,0.5)'}, this.state.activeFilter === 'all' ? {fontWeight: 'bold', color: 'white'} : null]}>all</Text>
            </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({activeFilter: 'current'}, () => this.createDataSource(this.props))}>
              <View style={styles.filterContainer}>
                <Text style={[{fontSize: 15, fontWeight: 'bold', color: 'rgba(0,0,0,0.5)'}, this.state.activeFilter === 'current' ? {fontWeight: 'bold', color: 'white'} : null]}>current</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({activeFilter: 'complete'}, () => this.createDataSource(this.props))}>
              <View style={styles.filterContainer}>
                <Text style={[{fontSize: 15, fontWeight: 'bold', color: 'rgba(0,0,0,0.5)'}, this.state.activeFilter === 'complete' ? {fontWeight: 'bold', color: 'white'} : null]}>done</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
        <View style={{flexDirection: 'column', flex: 1}}>
          <ListView enableEmptySections dataSource={this.state.dataSource} renderRow={this.renderRow.bind(this)} contentContainerStyle={{paddingBottom: 70, backgroundColor: 'white', paddingTop: 20}} />
        </View>
      </View>
    )
  }
}

          {/* <View style={{alignSelf: 'stretch', alignItems: 'flex-start'}}>
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
          </View> */}

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
  filterContainer: {
    paddingTop: 15,
    paddingBottom: 15,
    paddingLeft: 5,
    paddingRight: 5,
    alignItems: 'center',
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
    flexDirection: 'row',
  }
}

const mapStateToProps = state => {
  const projects = _.map(state.projects, (val, uid) => {
    return { ...val, uid }
  })

  return { projects }
}

export default connect(mapStateToProps, { ProjectsFetch, ProjectSelect })(ProjectList)
