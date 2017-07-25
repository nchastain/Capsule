import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, TouchableOpacity } from 'react-native'

const AddModal = (props) => {
  return (
    <View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.6)'}}>
      <View style={{ flex: 1, marginLeft: 30, marginRight: 30, marginTop: 90, borderRadius: 10, marginBottom: 90, padding: 10, backgroundColor: '#eee', justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1}}>
        <TouchableOpacity style={{height: 100, borderRadius: 10, borderColor: 'darkgray', width: 100, borderWidth: 1, alignItems: 'center', justifyContent: 'center'}} onPress={props.goToAddForm('journal')}>
          <Text>Journal</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default AddModal