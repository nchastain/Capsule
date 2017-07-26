import React from 'react'
import { View, ScrollView, Text, Dimensions, TouchableOpacity, Image } from 'react-native'
import { Actions } from 'react-native-router-flux'
// import { Grid, Row, Col } from 'react-flexbox-grid'
import { colors, lightColorMap, borderlessImageMap, imageMap, darkColorMap, entryTypes } from '../utilities'
import { connect } from 'react-redux'
import _ from 'lodash'

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

  goToEntryType (entryType) {
    let entries = this.props.entries ? Object.values(this.props.entries) : []
    entries = this.props.entries.filter(entry => entry.type === entryType)
    Actions.TypeList({ entryType, entries, title: `${entryType[0].toUpperCase()}${entryType.substring(1)}${entryType !== 'progress' ? 's' : ''}`, location: 'all'})
  }

  createCardForEntryType(entryType, idx) {
    if (entryType === 'projects') {
      return (
        <TouchableOpacity key={idx} activeOpacity={0.8} onPress={() => Actions.projects()}>
          <View style={{ height: 128, borderRadius: 10, backgroundColor: '#555', alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', shadowOffset: {width: 2, height: 2},
      shadowColor: '#555',
      shadowOpacity: 0.3, overflow: 'hidden'}}>
            <Image source={imageMap[entryType]} style={{position: 'absolute', width: 170, height: 170, opacity: 0.4}} />
            <View style={{position: 'absolute', padding: 2}}>
              <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold', textShadowColor: '#555', textShadowOffset: {width: 1, height: 1}, backgroundColor: 'rgba(0,0,0,0)'}}>
                Projects
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity key={idx} activeOpacity={0.8} onPress={() => this.goToEntryType(entryType)}>
        <View style={{ height: 128, borderRadius: 10, backgroundColor: lightColorMap[entryType], alignSelf: 'stretch', justifyContent: 'center', alignItems: 'center', shadowOffset: {width: 2, height: 2},
    shadowColor: '#555',
    shadowOpacity: 0.3, overflow: 'hidden'}}>
          <Image source={imageMap[entryType]} style={{position: 'absolute', width: 170, height: 170, opacity: 0.4}} />
          <View style={{position: 'absolute', padding: 2}}>
            <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold', textShadowColor: darkColorMap[entryType], textShadowOffset: {width: 1, height: 1}, backgroundColor: 'rgba(0,0,0,0)'}}>
              {`${entryType[0].toUpperCase()}${entryType.substring(1)}${entryType !== 'progress' ? 's' : ''}`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <ScrollView contentContainerStyle={{paddingTop: 30, justifyContent: 'flex-start', alignItems: 'flex-start', flex: 1, backgroundColor: colors.main}}>
        <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
          <View style={{flex: 1, paddingRight: 10}}>{this.createCardForEntryType('experience')}</View>
          <View style={{flex: 1}}>{this.createCardForEntryType('habit')}</View>
        </View>
        <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
          <View style={{flex: 1, paddingRight: 10}}>{this.createCardForEntryType('milestone')}</View>
          <View style={{flex: 1}}>{this.createCardForEntryType('progress')}</View>
        </View>
        <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
          <View style={{flex: 1, paddingRight: 10}}>{this.createCardForEntryType('note')}</View>
          <View style={{flex: 1,}}>{this.createCardForEntryType('view')}</View>
        </View>
        <View style={{flexDirection: 'row', paddingLeft: 10, paddingRight: 10, paddingBottom: 10}}>
          <View style={{flex: 1, paddingRight: 10}}>{this.createCardForEntryType('journal')}</View>
          <View style={{flex: 1}}>{this.createCardForEntryType('projects')}</View>
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = state => {
  const entries = _.map(state.entries, (val, uid) => {
    return { ...val, uid }
  })
  return { entries }
}

export default connect(mapStateToProps)(AllGrid)
