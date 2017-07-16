import React, { Component } from 'react' 
import { Text } from 'react-native' 
import { connect } from 'react-redux' 
import { View } from 'react-native'
import { emailChanged, passwordChanged, loginUser } from '../actions' 
import { Card, CardSection, Input, Button, Spinner } from './common' 

class LoginForm extends Component {
  onEmailChange(text) {
    this.props.emailChanged(text) 
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text) 
  }

  onButtonPress() {
    const { email, password } = this.props 

    this.props.loginUser({ email, password }) 
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" /> 
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Login
      </Button>
    ) 
  }

  render() {
    return (
      <View>
      <View style={styles.loginFormContainer}>
        <Input
          label="Email"
          placeholder="email@gmail.com"
          onChangeText={this.onEmailChange.bind(this)}
          value={this.props.email}
        />

        <Input
          secureTextEntry
          label="Password"
          placeholder="password"
          onChangeText={this.onPasswordChange.bind(this)}
          value={this.props.password}
        />
      </View>
      <Text style={styles.errorTextStyle}>
        {this.props.error}
      </Text>
      <View style={{marginLeft: 10, marginRight: 10}}>{this.renderButton()}</View>
      </View>
    ) 
  }
}

const styles = {
  loginFormContainer: {
    marginTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
} 

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth 

  return { email, password, error, loading } 
} 

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm) 
