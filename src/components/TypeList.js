import React from 'react'
import moment from 'moment'
import { Actions } from 'react-native-router-flux'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { borderlessImageMap, colors, lightColorMap } from '../utilities'


class TypeList extends React.Component {

  displayEntries () {
    return this.props.entries.map(entry => (
      <View key={entry.uid} style={{backgroundColor: 'white', borderRadius: 10, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, marginBottom: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', padding: 10, paddingLeft: 5, paddingRight: 15}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
          <View style={{padding: 5, marginRight: 10, width: 45}}>
            <Image source={borderlessImageMap[entry.type]} style={{height: 45, width: 45}} />
          </View>
          <TouchableOpacity activeOpacity={0.8} onPress={() => Actions.EntryDetail({entry: entry, title: entry.text, location: this.props.location})}>
            <View style={{flex: 1, alignSelf: 'center', alignItems: 'flex-start', justifyContent: 'center', width: 230, paddingRight: 10, paddingLeft: 5}}>
              <Text style={{color: '#555', fontWeight: 'bold'}}>{entry.text}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <Text style={{color: colors.main}}>{moment(new Date(entry.date)).format('MMM DD')}</Text>
        </View>
      </View>
    ))
  }

  render () {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-start', paddingTop: 75, backgroundColor: colors.main}}>
        {this.displayEntries()}
      </View>
    )
  }
}

export default TypeList
