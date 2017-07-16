import React from 'react'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
import reducers from './src/reducers'
import Router from './src/Router'

class App extends React.Component {
  componentWillMount () {
    const config = {
      apiKey: 'AIzaSyD_rcBfMSBbltf2xbe2f5cst-qdILGrYVE',
      authDomain: 'capsule-12c0c.firebaseapp.com',
      databaseURL: 'https://capsule-12c0c.firebaseio.com',
      projectId: 'capsule-12c0c',
      storageBucket: '',
      messagingSenderId: '647282905704'
    }
    firebase.initializeApp(config)
  }

  render () {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}

export default App
