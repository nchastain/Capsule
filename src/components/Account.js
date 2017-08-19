import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { logoutUser } from '../actions'
import { connect } from 'react-redux'
import { colors } from '../utilities'

class Account extends React.Component {
  constructor() {
    super()
    this.state = {image: null}
  }

  render() {
    let { image } = this.state
    return (
      <View style={styles.accountContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.logoutButton}
          onPress={() => this.props.logoutUser()}
        >
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  accountContainer: {
    backgroundColor: colors.main,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoutButton: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10
  },
  logoutText: {
    color: colors.main,
    fontSize: 18,
    fontWeight: 'bold'
  }
})

export default connect(null, { logoutUser })(Account)