import React from 'react'
import {View, Text, TextInput, Button, Image, TouchableOpacity} from 'react-native'
import { colors, imageMap, hexToRGB } from '../utilities'
import LogoBar from './LogoBar'
import { 
  loginUser
} from '../actions'
import { connect } from 'react-redux'

class Login extends React.Component {
  
  constructor() {
    super()
    this.state = {email: '', password: ''}
  }

  handleLogin(email, password) {
    loginUser({email: this.state.email, password: this.state.password})
  }

  render() {
    return (
      <View style={styles.loginContainer}>
        <View style={styles.logoheader}>
          <Image style={styles.logoImage} source={imageMap.whitelogo} />
        </View>
        <TextInput
          style={styles.loginFormElement}
          placeholder={'Enter e-mail'}
          onChangeText={value => this.setState({email: value})}
        />
        <TextInput
          style={styles.loginFormElement}
          placeholder={'Enter password'}
          secureTextEntry
          onChangeText={value => this.setState({password: value})}
        />
        <TouchableOpacity
          style={styles.loginButtonContainer}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = {
  loginContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: colors.main,
    paddingLeft: 25,
    paddingRight: 25,
  },
  loginFormElement: {
    height: 50,
    textAlign: 'center',
    backgroundColor: 'white',
    borderColor: '#eee',
    borderWidth: 1, 
  },
  loginButtonContainer: {
    backgroundColor: hexToRGB('#000000', 0.5),
    padding: 20,
    alignSelf: 'stretch',
  },
  loginButton: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#eee',
    fontSize: 20,
  },
  logoheader: {
    height: 80,
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  logoImage: {
    height: 50,
    resizeMode: 'contain'
  },
}

export default connect(null, loginUser)(Login)