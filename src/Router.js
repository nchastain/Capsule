import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { Text, View, Image } from 'react-native'
import { colors } from './utilities'
import LoginForm from './components/LoginForm'
import EntryAddForm from './components/EntryAddForm'
import EntryDetail from './components/EntryDetail'
import ProjectList from './components/ProjectList'
import ProjectAddForm from './components/ProjectAddForm'
import EntryAdditionForm from './components/EntryAdditionForm'
import ProjectDetails from './components/ProjectDetails'
import TabBar from './components/TabBar'
import Day from './components/Day'
import TagDetails from './components/TagDetails'
import EntryList from './components/EntryList'
import AllGrid from './components/AllGrid'
import TypeList from './components/TypeList'

// Simple component to render something in place of icon
const DayTabIcon = ({ selected, title }) => {
  return (
    <View style={{width: 60, padding: 5, alignItems: 'center', alignSelf: 'flex-start'}}>
      <Image source={selected ? require('./assets/calendar.png') : require('./assets/inactivecalendar.png')} style={{width: 25, height: 25, resizeMode: 'contain'}} />
      <View style={{marginTop: 3}}><Text style={{fontSize: 10, color: selected ? colors.main : 'darkgrey', fontWeight: 'bold'}}>Day</Text></View>
    </View>
  )
}

const ProjectTabIcon = ({ selected, title }) => {
  return (
    <View style={{width: 60, padding: 5, alignItems: 'center', alignSelf: 'flex-start', marginLeft: -20}}>
      <Image source={selected ? require('./assets/projects.png') : require('./assets/inactiveprojects.png')} style={{width: 25, height: 25, resizeMode: 'contain'}} />
      <View style={{marginTop: 3}}><Text style={{fontSize: 10, color: selected ? colors.main : 'darkgrey', fontWeight: 'bold'}}>Projects</Text></View>
    </View>
  )
}

const EntriesTabIcon = ({ selected, title }) => {
  return (
    <View style={{width: 60, padding: 5, alignItems: 'center', alignSelf: 'flex-end', marginRight: -20}}>
      <Image source={selected ? require('./assets/entries.png') : require('./assets/inactiveentries.png')} style={{width: 25, height: 25, resizeMode: 'contain'}} />
      <View style={{marginTop: 3}}><Text style={{fontSize: 10, color: selected ? colors.main : 'darkgrey', fontWeight: 'bold'}}>Entries</Text></View>
    </View>
  )
}

const AllTabIcon = ({ selected, title }) => {
  return (
    <View style={{width: 60, padding: 5, alignItems: 'center', alignSelf: 'flex-end'}}>
      <Image source={selected ? require('./assets/all.png') : require('./assets/inactiveall.png')} style={{width: 25, height: 25, resizeMode: 'contain'}} />
      <View style={{marginTop: 3}}><Text style={{fontSize: 10, color: selected ? colors.main : 'darkgrey', fontWeight: 'bold'}}>All</Text></View>
    </View>
  )
}

const RouterComponent = () => {
  return (
    <Router
      navigationBarStyle={styles.navBar}
      titleStyle={styles.navBarTitle}
      barButtonTextStyle={styles.barButtonTextStyle}
      barButtonIconStyle={styles.barButtonIconStyle}
      backButtonTextStyle={styles.backButtonTextStyle}
      rightButtonTextStyle={styles.rightButtonTextStyle}
      >
      {/* <Scene key='auth'>
        <Scene key='login' sceneStyle={{marginTop: 60}} component={LoginForm} title='Please Login' />
      </Scene> */}

      <Scene key='root'>
        {/* Tab Container */}
        <Scene key='tabbar' component={TabBar} tabs tabBarStyle={{ backgroundColor: '#eee' }}>

          {/* Tab and its scenes */}
          <Scene key='day' title='Day' icon={DayTabIcon}>
            <Scene key='Today' component={Day} title='Today' initial hideNavBar />
            <Scene key='TagDetailsDay' component={TagDetails} title='Tag Details' />
            <Scene key='EntryAdditionForm' component={EntryAdditionForm} hideNavBar={false} />
            <Scene key='EntryAdd' component={EntryAddForm} title='Add New Entry' hideNavBar={false} />
            <Scene key='DayEntryDetail' component={EntryDetail} title='Entry Detail' hideNavBar={false} />
          </Scene>

          {/* Tab and its scenes */}
          <Scene key='projects' title='Projects' icon={ProjectTabIcon}>
            <Scene key='ProjectList' component={ProjectList} title='Projects' onRight={() => Actions.ProjectAdd()} initial rightTitle='Add +' />
            <Scene key='ProjectAdd' component={ProjectAddForm} title='Add a Project' />
            <Scene key='ProjectDetails' component={ProjectDetails} title='Project Details' />
          </Scene>

          <Scene key='entries' title='Entries' icon={EntriesTabIcon}>
            <Scene key='EntryList' component={EntryList} title='Entries' initial />
            <Scene key='TypeList' component={TypeList} title='Type List' />
            <Scene key='EntryDetail' component={EntryDetail} title='Entry Detail' />
          </Scene>

          <Scene key='all' title='Tags' icon={AllTabIcon}>
            <Scene key='AllGrid' component={AllGrid} title='All' hideNavBar={false} />
          </Scene>

        {/* End of Tab Container */}
        </Scene>

      {/* End of root screen */}
      </Scene>
    </Router>
  )
}

export default RouterComponent

const styles = {
  navBar: {
    backgroundColor:'#e2daed',
    borderBottomColor: colors.main
  },
  navBarTitle: {
    color: colors.main,
    fontWeight: 'bold',
  },
  barButtonTextStyle: {
    color:colors.main,
  },
  barButtonIconStyle: {
    tintColor:colors.main
  },
  backButtonTextStyle: {
    color: colors.main
  },
  rightButtonTextStyle: {
    color: colors.main,
    fontWeight: 'bold'
  },
}
