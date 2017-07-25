import React from 'react'
import { View, Text, Dimensions, TouchableOpacity } from 'react-native'
// import { Grid, Row, Col } from 'react-flexbox-grid'

class AllGrid extends React.Component {
  constructor (props) {
    super(props)
    this.deviceWidth = Dimensions.get('window').width
    this.deviceHeight = Dimensions.get('window').height
  }

  onLayout (evt) {
    this.deviceHeight = evt.nativeEvent.layout.height
    this.deviceWidth = evt.nativeEvent.layout.width
  }

  render () {
    return (
      <View style={{paddingLeft: 5, paddingTop: 75, paddingRight: 5, justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'flex-start', flex: 1, backgroundColor: '#a083c4'}}>
        <TouchableOpacity style={{padding: 5, height: 100, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{ height: 100, padding: 10, borderRadius: 5, backgroundColor: '#eee', alignSelf: 'stretch' }}>
            <Text>
              Hi
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={{padding: 5, height: 100, flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View style={{ height: 100, padding: 10, borderRadius: 5, backgroundColor: '#eee', alignSelf: 'stretch' }}>
            <Text>
              Hi
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default AllGrid
