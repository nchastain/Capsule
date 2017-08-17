import React from 'react'
import {View, Text, TextInput, Button, Image, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native'
import { colors, imageMap, hexToRGB } from '../utilities'
import LogoBar from './LogoBar'
import { 
  loginUser,
  authenticate
} from '../actions'
import { Actions } from 'react-native-router-flux'
import { connect } from 'react-redux'

class Login extends React.Component {
  
  constructor() {
    super()
    this.state = {email: '', password: '', loading: false, loginMessage: '', newUser: false}
  }

  handleLogin() {
    this.setState({loading: true}, () => {
      this.props.loginUser({email: this.state.email, password: this.state.password})
    })
  }

  handleCreateAccount() {
    if (this.state.password !== this.state.password2) {
      this.setState({loginMessage: 'Passwords do not match'})
      return
    }
    this.setState({loading: true}, () => {
      this.props.auth(this.state.email, this.state.password)
    })
  }

  setErrorMsg (err) { return { loginMessage: err } }
  
  resetPassword () {
    this.setState({loginMessage: 'Password reset email sent'})
    resetPassword(this.state.email)
      .then(() => this.setState({loginMessage: `Password reset email sent to ${this.state.email}.`}))
      .catch((err) => this.setState({loginMessage: `Email address not found.`}))
  }

  newOrReturning () {
    const returningInput = (
      <View style={{alignSelf: 'stretch'}}>
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
        {this.state.loading && <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30}}>
          <ActivityIndicator animating={this.state.loading} color='white' />
          <Text style={{marginLeft: 10, color: 'white'}}>Loading...</Text>
        </View>}
      </View>
    )
    const newInput = (
      <View style={{alignSelf: 'stretch'}}>
        <TextInput
          style={styles.loginFormElement}
          placeholder={'Enter your e-mail'}
          onChangeText={value => this.setState({email: value})}
        />
        <TextInput
          style={styles.loginFormElement}
          placeholder={'Enter a password'}
          secureTextEntry
          onChangeText={value => this.setState({password: value})}
        />
        <TextInput
          style={styles.loginFormElement}
          placeholder={'Re-enter a password'}
          secureTextEntry
          onChangeText={value => this.setState({password2: value})}
        />
        <TouchableOpacity
          style={styles.loginButtonContainer}
          onPress={this.handleLogin.bind(this)}>
          <Text style={styles.loginButton}>Create Account</Text>
        </TouchableOpacity>
      </View>
    )
    return this.state.newUser ? newInput : returningInput
  }

  buildMessage () {
    const message = (
      <View style={styles.messageContainer}>
        <Text style={styles.message}>{this.state.loginMessage}</Text>
      </View>
    )

    return this.state.loginMessage ? message : null
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginContainer}>
          <View style={styles.logoheader}>
            <Image style={styles.logoImage} source={imageMap.whitelogo} />
            {this.buildMessage()}
          </View>
          {this.newOrReturning()}
          <View style={styles.bottomLoginLinks}>
            {!this.state.newUser &&
              <TouchableOpacity
                onPress={() => this.resetPassword()}
                activeOpacity={0.8}
                style={{flex: 1}}
              >
                <Text style={styles.loginLink}>Forgot password</Text>
              </TouchableOpacity>
            }
            <TouchableOpacity
              onPress={() => this.setState({newUser: !this.state.newUser, loginMessage: ''})}
              activeOpacity={0.8}
              style={{flex: 1}}
            >
              <Text style={[styles.loginLink, {textAlign: 'right'}]}>
                {this.state.newUser ? 'Login' : 'Create an account'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = {
  bottomLoginLinks: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    padding: 30
  },
  loginContainer: {
    justifyContent: 'flex-start',
    paddingTop: 30, 
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
    color: colors.main,
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
  message: {
    color: colors.main,
    fontWeight: 'bold'
  },
  messageContainer: {
    padding: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
    borderRadius: 10,
    backgroundColor: colors.lightAccent
  }
}

export default connect(null, {loginUser, authenticate})(Login)