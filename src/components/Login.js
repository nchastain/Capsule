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

  handleLogin() {
    this.props.loginUser({email: this.state.email, password: this.state.password})
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
          style={styles.loginButtonContainer}
          onPress={this.handleLogin.bind(this)}>
          <Text style={styles.loginButton}>Login</Text>
        </TouchableOpacity>
        <View style={{flexDirection: 'row', alignSelf: 'stretch', position: 'absolute', bottom: 10, left: 0, right: 0, justifyContent: 'space-between', padding: 30}}>
          <TouchableOpacity activeOpacity={0.8} style={{flex: 1}}><Text style={styles.loginLink}>Forgot password</Text></TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={{flex: 1}}><Text style={[styles.loginLink, {textAlign: 'right'}]}>Create an account</Text></TouchableOpacity>
        </View>
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
  loginLink: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
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

export default connect(null, {loginUser})(Login)