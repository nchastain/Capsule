import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { Text, View, Image } from 'react-native'
import LoginForm from './components/LoginForm'
import EntryAddForm from './components/EntryAddForm'
import EntryEdit from './components/EntryEdit'
import ProjectList from './components/ProjectList'
import TagList from './components/TagList'
import ProjectAddForm from './components/ProjectAddForm'
import NoteAddForm from './components/NoteAddForm'
import ProjectDetails from './components/ProjectDetails'
import Day from './components/Day'
import TagDetails from './components/TagDetails'

// Simple component to render something in place of icon
const DayTabIcon = ({ selected, title }) => {
  return (
    <View style={{padding: 5, alignItems: 'center'}}>
      <Image source={selected ? require('./assets/calendar.png') : require('./assets/inactivecalendar.png')} style={{width: 25, height: 25, resizeMode: 'contain'}} />
      <Text style={{fontSize: 10, color: selected ? '#a083c4' : 'darkgrey', fontWeight: 'bold'}}>DAYS</Text>
    </View>
  )
}

const ProjectTabIcon = ({ selected, title }) => {
  return (
    <View style={{padding: 5, alignItems: 'center'}}>
      <Image source={selected ? require('./assets/projects.png') : require('./assets/inactiveprojects.png')} style={{width: 25, height: 25, resizeMode: 'contain'}} />
      <Text style={{fontSize: 10, color: selected ? '#a083c4' : 'darkgrey', fontWeight: 'bold'}}>PROJECTS</Text>
    </View>
  )
}

const TagTabIcon = ({ selected, title }) => {
  return (
    <View style={{padding: 5, alignItems: 'center'}}>
      <Image source={selected ? require('./assets/tags.png') : require('./assets/inactivetags.png')} style={{width: 25, height: 25, resizeMode: 'contain'}} />
      <Text style={{fontSize: 10, color: selected ? '#a083c4' : 'darkgrey', fontWeight: 'bold'}}>TAGS</Text>
    </View>
  )
}

const AddTabIcon = () => {
  return (
    <View style={{alignItems: 'flex-end'}}>
      <Image source={require('./assets/addicon.png')} style={{width: 35, height: 35, resizeMode: 'contain'}} />
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
        <Scene key='tabbar' tabs tabBarStyle={{ backgroundColor: '#eee', borderColor: 'lightgrey', borderTopWidth: 1 }}>

          {/* Tab and its scenes */}
          <Scene key='days' title='Days' icon={DayTabIcon}>
            <Scene key='Today' component={Day} title='Today' initial hideNavBar />
            <Scene key='TagDetailsDay' component={TagDetails} title='Tag Details' />
            <Scene key='NoteAddForm' component={NoteAddForm} title='Add a Note' hideNavBar={false} />
            <Scene key='EntryAdd' component={EntryAddForm} title='Add New Entry' hideNavBar={false} />
          </Scene>

          {/* Tab and its scenes */}
          <Scene key='projects' title='Projects' icon={ProjectTabIcon}>
            <Scene key='ProjectList' component={ProjectList} title='Projects' onRight={() => Actions.ProjectAdd()} initial rightTitle='Add +' />
            <Scene key='ProjectAdd' component={ProjectAddForm} title='Add a Project' />
            <Scene key='ProjectDetails' component={ProjectDetails} title='Project Details' />
          </Scene>

          <Scene key='tags' title='Tags' icon={TagTabIcon}>
            <Scene key='TagList' component={TagList} title='Tags' initial />
            <Scene key='TagDetails' component={TagDetails} title='Tag Details' />
          </Scene>

          <Scene key='add' title='Tags' icon={AddTabIcon}>
            <Scene key='EntryAdd' component={EntryAddForm} title='Add New Entry' hideNavBar={false} />
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
    borderBottomColor: '#a083c4'
  },
  navBarTitle: {
    color: '#a083c4',
    fontWeight: 'bold',
  },
  barButtonTextStyle: {
    color:'#a083c4',
  },
  barButtonIconStyle: {
    tintColor:'#a083c4'
  },
  backButtonTextStyle: {
    color: '#a083c4'
  },
  rightButtonTextStyle: {
    color: '#a083c4',
    fontWeight: 'bold'
  },
}
