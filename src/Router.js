import React from 'react'
import { Scene, Router, Actions } from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import EntryList from './components/EntryList'
import EntryAddForm from './components/EntryAddForm'
import EntryEdit from './components/EntryEdit'

const RouterComponent = () => {
  return (
    <Router>
      <Scene key='auth'>
        <Scene key='login' sceneStyle={{marginTop: 60}} component={LoginForm} title='Please Login' />
      </Scene>

      <Scene key='main'>
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
    </Router>
  )
}

export default RouterComponent
