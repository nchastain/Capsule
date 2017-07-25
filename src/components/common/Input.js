import React from 'react' 
import { TextInput, View, Text } from 'react-native' 

const Input = ({ label, value, onChangeText, placeholder, placeholderColor, secureTextEntry, style }) => {
  const { inputStyle, labelStyle} = inputStyles 

  return (
    <TextInput
      secureTextEntry={secureTextEntry}
      placeholder={placeholder}
      placeholderColor={placeholderColor}
      autoCorrect={false}
      style={[inputStyle, style]}
      value={value}
      onChangeText={onChangeText}
      placeholderColor='white'
    />
  ) 
} 

const inputStyles = {
  inputStyle: {
    color: 'white',
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
    color: 'white',
    width: 90,
    textAlign: 'left'
  },
} 

export { Input } 
