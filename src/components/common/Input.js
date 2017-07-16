import React from 'react' 
import { TextInput, View, Text } from 'react-native' 

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
  const { inputStyle, labelStyle, containerStyle } = styles 

  return (
    <View style={containerStyle}>
      {label && <Text style={labelStyle}>{label}</Text>}
      <TextInput
        secureTextEntry={secureTextEntry}
        placeholder={placeholder}
        autoCorrect={false}
        style={inputStyle}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  ) 
} 

const styles = {
  inputStyle: {
    color: '#555',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 20,
    lineHeight: 23,
    flex: 1,
    textAlign: 'center'
  },
  labelStyle: {
    fontSize: 18,
    padding: 5,
    paddingLeft: 0,
    paddingRight: 0,
    color: 'orange',
    width: 90,
    textAlign: 'left'
  },
  containerStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50
  }
} 

export { Input } 
