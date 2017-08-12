import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity, ListView, TouchableWithoutFeedback, Image, Keyboard } from 'react-native'
import { ProjectsFetch, ProjectSelect } from '../actions'
import { colors, borderlessImageMap, typeMap, hexToRGB } from '../utilities'
import Search from 'react-native-search-box'

class ProjectList extends React.Component {
  constructor () {
    super()
    this.state = {activeStatus: 'all', searchTerm: '', projectCount: 0}
  }

  componentWillMount () {
    this.props.ProjectsFetch()
    if (this.props.projects) this.createDataSource(this.props.projects)
  }

  componentWillReceiveProps (nextProps) {
    this.createDataSource(nextProps.projects)
  }

  createDataSource (projects) {
    let filteredProjects = projects ? projects : []
    switch (this.state.activeStatus) {
      case 'current':
        filteredProjects = filteredProjects.filter(project => !project.complete)
        break
      case 'complete':
        filteredProjects = filteredProjects.filter(project => project.complete)
        break
      default:
        break
    }
    filteredProjects = filteredProjects.filter(project => project.title.indexOf(this.state.searchTerm) !== -1)
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.setState({projectCount: filteredProjects.length, dataSource: ds.cloneWithRows(filteredProjects.sort((a, b) => b.time - a.time))})
  }

  handleSelect (project) {
    this.props.ProjectSelect(project)
  }

  renderProgressBar (project) {
    let percentComplete = (project.progressCurrent) / (project.progressTarget)
    if (project.complete) {
      return (
        <View style={{alignSelf: 'stretch', flexDirection: 'row', backgroundColor: colors.main, alignItems: 'center', borderRadius: 20}}>
          <View style={{backgroundColor: colors.main, flex: 1, alignItems: 'flex-end', borderRadius: 20}} />
          <View style={{backgroundColor: colors.main, padding: 5, paddingRight: 15, borderRadius: 20}}>
            <Image source={borderlessImageMap.whiteComplete} style={{height: 18, width: 20, marginRight: -3}} />
          </View>
        </View>
      )
    }

    switch (percentComplete) {
      case 0:
        return (
          <View style={{alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center'}}>
            <View style={{backgroundColor: '#eee', padding: 5, flex: 1, borderRadius: 20}}>
              <Text style={{color: colors.main, fontWeight: 'bold', fontSize: 12, paddingLeft: 10, marginRight: -3}}>
                0%
              </Text>
            </View>
          </View>
        )
      case 1:
        return (
          <View style={{alignSelf: 'stretch', flexDirection: 'row', backgroundColor: colors.main, alignItems: 'center', borderRadius: 20}}>
            <View style={{backgroundColor: colors.main, flex: 1, alignItems: 'flex-end', borderRadius: 20}}>
              <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12, borderRadius: 20}}>
                100%
              </Text>
            </View>
            <View style={{backgroundColor: colors.main, padding: 5, paddingRight: 15, borderRadius: 20}}>
              <Image source={borderlessImageMap.whiteComplete} style={{height: 18, width: 20, marginRight: -3}} />
            </View>
          </View>
        )
      default:
        return (
          <View style={{alignSelf: 'stretch', flexDirection: 'row', alignItems: 'center', borderRadius: 20, backgroundColor: colors.main}}>
            <View style={{flex: percentComplete, backgroundColor: colors.main, padding: 5, alignItems: 'flex-end', borderTopLeftRadius: 20, borderBottomLeftRadius: 20, paddingLeft: 10, height: 25}}>
              {percentComplete > 0.08 && <Text style={{color: 'white', fontWeight: 'bold', fontSize: 12, textAlign: 'right'}}>{(percentComplete * 100).toFixed(0)}%</Text>}
            </View>
            <View style={{flex: 1 - percentComplete, backgroundColor: '#eee', padding: 5, alignSelf: 'stretch', borderTopRightRadius: 20, borderBottomRightRadius: 20, marginRight: -3}} />
          </View>
        )
    }
  }

  renderRow (project) {
    const formattedProgress = parseFloat(project.progressCurrent.toFixed(1))
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={() => this.handleSelect(project)}>
        <View style={{marginBottom: 20, backgroundColor: 'white', flex: 1, flexDirection: 'column', borderBottomWidth: 1, borderColor: '#eee'}}>
          <View style={{marginLeft: 10, marginRight: 10}}>{project.hasProgress && this.renderProgressBar(project)}</View>
          <View style={{padding: 10, backgroundColor: 'white', marginLeft: 10, marginRight: 10, paddingBottom: 30}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{flex: 1}}><Text style={{color: colors.main, fontSize: 16, fontWeight: 'bold'}}>{project.title}</Text></View>
            </View>
            {project.hasProgress && <Text style={{color: colors.lightAccent, fontWeight: 'bold', fontSize: 14}}>{formattedProgress}/{project.progressTarget} {project.progressUnits}</Text>}
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  checkActiveType (status) {
    return this.state.activeStatus === status ? {backgroundColor: colors.main, borderRadius: 10} : {backgroundColor: 'transparent', borderRadius: 10}
  }

  render () {
    let projects = []
    if (this.props.projects) projects = this.props.projects
    return (
      <View style={styles.container}>
        <Search 
          ref='search_box' 
          onChangeText={(val) => this.setState({searchTerm: val}, () => this.createDataSource(projects))} 
          afterSearch={() => Keyboard.dismiss()} 
          backgroundColor={colors.lightAccent}
          titleCancelColor={colors.main}
        />
        <View style={{flexDirection: 'column', backgroundColor: hexToRGB(colors.main, 0.4), padding: 10, paddingTop: 5, alignItems: 'center', justifyContent: 'space-between'}}>
          <View style={{alignItems: 'center', flexDirection: 'row', alignSelf: 'stretch', justifyContent: 'space-between'}}>
            <View style={{flexDirection: 'row'}}>
              <TouchableWithoutFeedback onPress={() => this.setState({activeStatus: 'all'}, () => this.createDataSource(projects))}>
                <View style={styles.filterContainer}>
                  <View style={[{alignItems: 'center', justifyContent: 'center', padding: 5}, this.checkActiveType('all')]}>
                    <Text style={this.state.activeStatus === 'all' ? styles.activeStatusText: styles.statusText}>all</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.setState({activeStatus: 'current', activeType: this.state.activeType}, () => this.createDataSource(projects))}>
                <View style={styles.filterContainer}>
                  <View style={[{alignItems: 'center', justifyContent: 'center', padding: 5}, this.checkActiveType('current')]}>
                    <Text style={this.state.activeStatus === 'current' ? styles.activeStatusText : styles.statusText}>current</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.setState({activeStatus: 'complete', activeType: this.state.activeType}, () => this.createDataSource(projects))}>
                <View style={styles.filterContainer}>
                  <View style={[{alignItems: 'center', justifyContent: 'center', padding: 5}, this.checkActiveType('complete')]}>
                    <Text style={this.state.activeStatus === 'complete' ? styles.activeStatusText : styles.statusText}>complete</Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </View>
            {this.state.projectCount > 4 && <View style={{alignItems: 'center', justifyContent: 'center', paddingRight: 5}}>
              <Text style={{textAlign: 'right', color: colors.main, fontWeight: 'bold'}}>{this.state.projectCount} project{this.state.projectCount === 1 ? '' : 's'}</Text>
            </View>}
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
  statusText: {
    fontWeight: 'bold',
    paddingRight: 5,
    paddingLeft: 5,
    color: colors.main,
  },
  activeStatusText: {
    color: 'white',
    fontWeight: 'bold',
    paddingLeft: 5,
    paddingRight: 5,
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
    flexDirection: 'column',
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
    flexDirection: 'column',
  }
}

const mapStateToProps = state => {
  const projects = _.map(state.projects, (val, uid) => {
    return { ...val, uid }
  })

  return { projects }
}

export default connect(mapStateToProps, { ProjectsFetch, ProjectSelect })(ProjectList)
