import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import { Text, View } from 'react-native'
import LoginForm from './components/LoginForm'
import EntryList from './components/EntryList'
import EntryAddForm from './components/EntryAddForm'
import EntryEdit from './components/EntryEdit'
import ProjectList from './components/ProjectList'
import TagList from './components/TagList'
import ProjectAddForm from './components/ProjectAddForm'
import NoteAddForm from './components/NoteAddForm'
import ProjectDetails from './components/ProjectDetails'
import Day from './components/Day'
import FontAwesome, { Icons } from 'react-native-fontawesome';
import TagDetails from './components/TagDetails'

// Example Imports
import ScarletScreen from './components/ScarletScreen'
import GrayScreen from './components/GrayScreen'
import GoldScreen from './components/GoldScreen'
import BlackScreen from './components/BlackScreen'

// Simple component to render something in place of icon
const TabIcon = ({ selected, title }) => {
  return (
    <View>
      <Text style={{ color: selected ? 'orange' : 'darkgrey', fontWeight: 'bold' }}>{title}</Text>
    </View>
  )
}

const RouterComponent = () => {
  return (
    <Router>
      {/* <Scene key='auth'>
        <Scene key='login' sceneStyle={{marginTop: 60}} component={LoginForm} title='Please Login' />
      </Scene> */}

      <Scene key='root'>

        {/* Tab Container */}
        <Scene key='tabbar' tabs tabBarStyle={{ backgroundColor: '#eee', borderColor: 'lightgrey', borderTopWidth: 1 }}>

          {/* Tab and its scenes */}
          <Scene key='progress' title='Entries' icon={TabIcon}>
            <Scene key='EntryList' component={EntryList} sceneStyle={{marginTop: 60}} title='Entries' initial onRight={() => Actions.EntryAdd()} rightTitle='+ Add'/>
            <Scene key='EntryAdd' component={EntryAddForm} title='Add New Entry' />
            <Scene key='EntryEdit' component={EntryEdit} title='Edit Entry' />
          </Scene>

          {/* Tab and its scenes */}
          <Scene key='projects' title='Projects' icon={TabIcon}>
            <Scene key='ProjectList' component={ProjectList} title='Projects' onRight={() => Actions.ProjectAdd()} initial rightTitle='+ Add' />
            <Scene key='ProjectAdd' component={ProjectAddForm} title='Add a Project' />
            <Scene key='ProjectDetails' component={ProjectDetails} title='Project Details' />
          </Scene>

          {/* Tab and its scenes */}
          <Scene key='days' title='Days' icon={TabIcon}>
            <Scene key='Today' component={Day} title='Today' initial />
            <Scene key='TagDetails' component={TagDetails} title='Tag Details' />
            <Scene key='NoteAdd' component={NoteAddForm} title='Add a Note' />
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


/* <Scene key='main'>
          <Scene
            onRight={() => Actions.EntryAdd()}
            rightTitle='+ Add'
            key='EntryList'
            component={EntryList}
            sceneStyle={{marginTop: 60}}
            title='Progress Log'
            initial
          />
          <Scene key='EntryAdd' component={EntryAddForm} title='Add New Entry' />
          <Scene key='EntryEdit' component={EntryEdit} title='Edit Entry' />
        </Scene>
      </Scene>
    </Router> */