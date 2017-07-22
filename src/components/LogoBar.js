import React from 'react'
import { View, Image } from 'react-native'

const LogoBar = () => (
  <View style={styles.logoContainer}>
    <Image source={require('.././assets/logo.png')} />
  </View>
)

const styles = {
  logoContainer: {
    alignItems: 'center',
    paddingBottom: 10,
    backgroundColor:'#e2daed',
    paddingTop: 30,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  logo: {
    height: 30,
    resizeMode: 'contain'
  }
}

export default LogoBar

