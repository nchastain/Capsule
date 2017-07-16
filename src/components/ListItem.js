import React,
{ Component } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { secondsToString } from '../utilities'

class ListItem extends Component {
  onRowPress () {
    Actions.EntryEdit({ entry: this.props.entry })
  }

  showDescription () {
    const description = this.props.entry.description
    const { descriptionStyle } = styles
    return description ? <Text style={descriptionStyle}>{description}</Text> : null
  }

  render () {
    const { goal, time } = this.props.entry
    const date = moment(new Date(this.props.entry.date)).format('MM/DD/YYYY')
    const {containerStyle, goalContainerStyle, goalStyle, descriptionStyle, timeStyle, dateStyle, buttonStyle} = styles
    return (
      <TouchableOpacity onPress={this.onRowPress.bind(this)}>
        <View style={containerStyle}>
          <View style={buttonStyle}><Text style={timeStyle}>{secondsToString(time)}</Text></View>
          <View style={goalContainerStyle}>
            <View><Text style={goalStyle}>{goal}</Text></View>
            <View>{this.showDescription()}<Text style={dateStyle}>{date}</Text></View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = {
  containerStyle: {
    height: 100,
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  goalContainerStyle: {
    flexDirection: 'column',
    paddingLeft: 10,
    flex: 1,
    height: 80,
    justifyContent: 'center'
  },
  goalStyle: {
    fontSize: 16,
    color: '#555',
    fontWeight: '600',
  },
  descriptionStyle: {
    fontSize: 12,
    color: '#555',
  },
  timeStyle: {
    fontSize: 18,
    color: 'white',
    overflow: 'hidden',
    // backgroundColor: '#555',
    fontWeight: 'bold',
    // width: 80,
  },
  dateStyle: {
    fontSize: 12,
    color: 'orange',
  },
  buttonStyle: {
    borderColor: '#eee',
    borderWidth: 3,
    backgroundColor: 'orange',
    borderRadius: 40,
    height: 80,
    width: 80,
    alignItems: 'center', 
    justifyContent:'center'
  }
}

export default ListItem