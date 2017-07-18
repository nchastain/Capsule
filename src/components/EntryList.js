import _ from 'lodash'
import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { ListView, View } from 'react-native'
import { EntriesFetch, ProjectsFetch, loginUser } from '../actions'
import ListItem from './ListItem'

class EntryList extends Component {
  componentWillMount () {
    this.props.loginUser({email: 'Test@test.com', password: 'password'})
    this.props.EntriesFetch()
    this.props.ProjectsFetch()
    this.createDataSource(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource ({ entries }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    let sortedEntries = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    this.dataSource = ds.cloneWithRows(sortedEntries)
  }

  renderRow (entry) {
    return <ListItem entry={entry} />
  }

  render () {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        style={{ marginTop: 10, marginBottom: 50, backgroundColor: 'white' }}
      />
    )
  }
}

const mapStateToProps = state => {
  const entries = _.map(state.entries, (val, uid) => {
    return { ...val, uid }
  })

  const projects = _.map(state.projects, (val, uid) => {
    return { ...val, uid }
  })

  return { entries, projects }
}

export default connect(mapStateToProps, { EntriesFetch, ProjectsFetch, loginUser })(EntryList)
