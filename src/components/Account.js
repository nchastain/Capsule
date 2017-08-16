import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { 
  logoutUser
} from '../actions'
import { connect } from 'react-redux'
import { colors } from '../utilities'

class Account extends React.Component {
  render() {
    return (
      <View style={{backgroundColor: colors.main, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}
          onPress={() => this.props.logoutUser()}
        >
          <Text style={{color: colors.main, fontSize: 18, fontWeight: 'bold'}}>Log out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

export default connect(null, { logoutUser })(Account)