import React from 'react'
import { View, ScrollView, Text, Dimensions, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { colors, lightColorMap, imageMap, darkColorMap } from '../utilities'
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

  createCardForEntryType (entryType, idx) {
    if (entryType === 'projects') {
      return (
        <TouchableOpacity key={idx} activeOpacity={0.8} onPress={() => Actions.projects()}>
          <View style={styles.entryTypeContainer}>
            <Image source={imageMap[entryType]} style={styles.entryImage} />
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
        <View style={[styles.cardContainer, {backgroundColor: lightColorMap[entryType]}]}>
          <Image source={imageMap[entryType]} style={styles.cardImage} />
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
      <ScrollView contentContainerStyle={styles.cardOuterContainer}>
        <View style={styles.cardRow}>
          <View style={styles.cardLeft}>{this.createCardForEntryType('experience')}</View>
          <View style={{flex: 1}}>{this.createCardForEntryType('habit')}</View>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.cardLeft}>{this.createCardForEntryType('milestone')}</View>
          <View style={{flex: 1}}>{this.createCardForEntryType('progress')}</View>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.cardLeft}>{this.createCardForEntryType('note')}</View>
          <View style={{flex: 1,}}>{this.createCardForEntryType('view')}</View>
        </View>
        <View style={styles.cardRow}>
          <View style={styles.cardLeft}>{this.createCardForEntryType('journal')}</View>
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

const styles = StyleSheet.create({
  entryTypeContainer: {
    height: 128,
    borderRadius: 10,
    backgroundColor: '#555',
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#555',
    shadowOpacity: 0.3,
    overflow: 'hidden'
  },
  cardOuterContainer: {
    paddingTop: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    backgroundColor: colors.main
  },
  cardContainer: {
    height: 128,
    borderRadius: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#555',
    shadowOpacity: 0.3,
    overflow: 'hidden',
  },
  cardLeft: {
    flex: 1,
    paddingRight: 10
  },
  cardImage: {
    position: 'absolute',
    width: 170,
    height: 170,
    opacity: 0.4
  },
  entryImage: {
    position: 'absolute',
    width: 170,
    height: 170,
    opacity: 0.4
  },
  cardRow: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  }
})

export default connect(mapStateToProps)(AllGrid)