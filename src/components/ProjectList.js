import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ListView, TouchableWithoutFeedback, Image } from 'react-native'
import { ProjectsFetch, ProjectSelect } from '../actions'
import { Actions } from 'react-native-router-flux'
import { colors, imageMap, borderlessImageMap, typeMap } from '../utilities'

class ProjectList extends React.Component {
  constructor () {
    super()
    this.state = {activeStatus: 'current', activeType: 'all'}
  }
  componentWillMount () {
    this.props.ProjectsFetch()
    this.createDataSource(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource ({ projects }) {
    console.log(this.state.activeStatus, this.state.activeType)
    let filteredProjects
    switch (this.state.activeStatus) {
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
        filteredProjects = filteredProjects.filter(project => project.type === 'education') || []
        break
      case 'art':
        filteredProjects = filteredProjects.filter(project => project.type === 'art') || []
        break
      case 'enterprise':
        filteredProjects = filteredProjects.filter(project => project.type === 'enterprise') || []
        break
      case 'all':
        break
      default:
        break
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
          <View style={{padding: 10, backgroundColor: 'white', marginLeft: 10, marginRight: 10, paddingBottom: 30}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{alignItems: 'center', marginTop: -4, paddingRight: 4, width: 25}}><Text>{project.type ? typeMap[project.type] : typeMap['enterprise']}</Text></View>
              <View style={{flex: 1}}><Text style={{color: colors.main, fontSize: 16, fontWeight: 'bold'}}>{project.title}</Text></View>
            </View>
            {project.timed && <Text style={{color: colors.lightAccent, fontWeight: 'bold', fontSize: 14}}>{formattedHoursLogged}/{project.hoursGoal} hours</Text>}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  checkActiveType (typeName, status) {
    const statusOrType = status ? this.state.activeStatus : this.state.activeType
    return statusOrType === typeName
    ? status ? {borderColor: colors.main, backgroundColor: 'white', borderWidth: 5} : {borderColor: colors.main, borderWidth: 5, borderRadius: 25, backgroundColor: 'white'}
    : {}
  }
  
  render () {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'column', width: 70, backgroundColor: colors.lightAccent, alignItems: 'center', justifyContent: 'space-between', paddingBottom: 60}}>
          <View style={{alignItems: 'center'}}>
            <View><Text style={{color: 'rgba(0,0,0,0.3)', fontWeight: 'bold', fontSize: 12, textAlign: 'center', paddingBottom: 10, paddingTop: 10}}>TYPE</Text></View>
            <TouchableWithoutFeedback onPress={() => this.setState({activeType: 'all'}, () => this.createDataSource(this.props))}>
              <View style={[{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}, this.checkActiveType('all')]}>
                <Image source={borderlessImageMap.allstatus} style={{height: 8, resizeMode: 'contain'}} />
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({activeType: 'art'}, () => this.createDataSource(this.props))}>
              <View style={[{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}, this.checkActiveType('art')]}>
                <Text style={{fontSize: 15, textAlign: 'center'}}>🎨</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({activeType: 'education'}, () => this.createDataSource(this.props))}>
              <View style={[{width: 50, height: 50, alignItems: 'center', justifyContent: 'center'}, this.checkActiveType('education')]}>
                <Text style={{fontSize: 15, textAlign: 'center'}}>📚</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({activeType: 'enterprise'}, () => this.createDataSource(this.props))}>
              <View style={[{width: 50, height: 50, marginBottom: 0, alignItems: 'center', justifyContent: 'center', overflow: 'hidden'}, this.checkActiveType('enterprise')]}>
                <Text style={{fontSize: 15, textAlign: 'center', marginTop: -5, marginRight: -2}}>💼</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>

          <View style={{alignItems: 'center'}}>
            <View><Text style={{color: 'rgba(0,0,0,0.3)', fontWeight: 'bold', fontSize: 12, textAlign: 'center', paddingBottom: 10}}>STATUS</Text></View>
            <TouchableWithoutFeedback onPress={() => this.setState({activeStatus: 'all', activeType: this.state.activeType}, () => this.createDataSource(this.props))}>
              <View style={styles.filterContainer}>
                <View style={[{alignItems: 'center', justifyContent: 'center', borderRadius: 25, height: 50, width: 50}, this.checkActiveType('all', true)]}><Image source={borderlessImageMap.allstatus} style={[{height: 8, resizeMode: 'contain'}]} /></View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({activeStatus: 'current', activeType: this.state.activeType}, () => this.createDataSource(this.props))}>
              <View style={styles.filterContainer}>
                <View style={[{alignItems: 'center', justifyContent: 'center', borderRadius: 25, height: 50, width: 50}, this.checkActiveType('current', true)]}><Image source={borderlessImageMap.nowstatus} style={[{height: 8, resizeMode: 'contain'}]} /></View>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.setState({activeStatus: 'complete', activeType: this.state.activeType}, () => this.createDataSource(this.props))}>
              <View style={styles.filterContainer}>
                <View style={[{alignItems: 'center', justifyContent: 'center', borderRadius: 25, height: 50, width: 50}, this.checkActiveType('complete', true)]}><Image source={borderlessImageMap.donestatus} style={[{height: 8, resizeMode: 'contain'}]} /></View>
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
