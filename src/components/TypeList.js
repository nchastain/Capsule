import React from 'react'
import { View, Text } from 'react-native'

class TypeList extends React.Component {
  render () {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#eee'}}>
        <Text>Hello, world! This is a type list for {this.props.entryType}</Text>
      </View>
    )
  }
}

export default TypeList
