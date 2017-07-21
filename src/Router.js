import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { Text, View } from 'react-native'
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
const TabIcon = ({ selected, title }) => {
  return (
    <View>
      <Text style={{ color: selected ? '#a083c4' : 'darkgrey', fontWeight: 'bold' }}>{title}</Text>
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
          <Scene key='projects' title='Projects' icon={TabIcon}>
            <Scene key='ProjectList' component={ProjectList} title='Projects' onRight={() => Actions.ProjectAdd()} initial rightTitle='Add +' />
            <Scene key='ProjectAdd' component={ProjectAddForm} title='Add a Project' />
            <Scene key='ProjectDetails' component={ProjectDetails} title='Project Details' />
          </Scene>

          {/* Tab and its scenes */}
          <Scene key='days' title='Days' icon={TabIcon}>
            <Scene key='Today' component={Day} title='Today' initial />
            <Scene key='TagDetailsDay' component={TagDetails} title='Tag Details' />
            <Scene key='NoteAddForm' component={NoteAddForm} title='Add a Note' />
            <Scene key='EntryAdd' component={EntryAddForm} title='Add New Entry' />
          </Scene>

          <Scene key='tags' title='Tags' icon={TabIcon}>
            <Scene key='TagList' component={TagList} title='Tags' initial />
            <Scene key='TagDetails' component={TagDetails} title='Tag Details' />
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
    color: '#555',
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
