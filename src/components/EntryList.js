import _ from 'lodash'
import React, { Component } from 'react'
import moment from 'moment'
import { connect } from 'react-redux'
import { ListView } from 'react-native'
import { EntriesFetch } from '../actions'
import ListItem from './ListItem'

class EntryList extends Component {
  componentWillMount () {
    this.props.EntriesFetch()

    this.createDataSource(this.props)
  }

  componentWillReceiveProps (nextProps) {
    this.createDataSource(nextProps)
  }

  createDataSource ({ entries }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    })

    this.dataSource = ds.cloneWithRows(entries.reverse())
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
      />
    )
  }
}

const mapStateToProps = state => {
  const entries = _.map(state.entries, (val, uid) => {
    return { ...val, uid }
  })

  // const sortedEntries = entries.sort(function (a, b) {
  //   debugger;
  //   return moment.unix(new Date(a.date)).isBefore(moment.unix(new Date(b.date))) ? -1 : 1
  // })

  return { entries }
}

export default connect(mapStateToProps, { EntriesFetch })(EntryList)
