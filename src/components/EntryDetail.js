import React from 'react'
import { connect } from 'react-redux'
import { Text, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, TextInput, StyleSheet, Image } from 'react-native'
import { EntryUpdate, EntrySave, EntryDelete, ProjectUpdateProgress } from '../actions'
import { colors, borderlessImageMap } from '../utilities'
import moment from 'moment'

class EntryDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {edited: false, text: props.entry.text}
  }

  handleTextChange (val) {
    this.setState({edited: val.length > 0, text: val})
  }

  handleSave () {
    this.props.EntryUpdate({...this.props.entry, text: this.state.text}, this.props.location)
  }

  handleDelete () {
    this.props.EntryDelete({uid: this.props.entry.uid}, this.props.location)
  }

  saveButton () {
    return (
      <TouchableOpacity onPress={this.handleSave.bind(this)}>
        <View style={styles.saveButton}>
          <Text style={styles.saveText}>save changes</Text>
        </View>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container}>
          <View style={styles.topInfoBar}>
            <View style={[styles.entryTypeButton, {flexDirection: 'row', alignItems: 'center'}]}>
              <Image source={borderlessImageMap[this.props.entry.type]} style={styles.entryTypeImage} />
            </View>
            <View style={styles.dateContainer}>
              <Text style={styles.date}>
                {moment(new Date(this.props.entry.date)).format('MM/DD/YYYY')}
              </Text>
            </View>
            <TouchableOpacity onPress={() => this.handleDelete()}>
              <View style={styles.entryTypeButton}>
                <Image source={borderlessImageMap.trash6} style={[styles.entryTypeImage, {width: 20, height: 23}]} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.entryTextContainer}>
            <TextInput editable style={styles.entryText} multiline value={this.state.text} placeholder={'Enter text here'} onChangeText={(val) => this.handleTextChange(val)} />
          </View>
          <View style={{margin: 30, marginTop: 0}}>{this.state.edited && this.saveButton()}</View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 63,
    flexDirection: 'column',
    backgroundColor: colors.main
  },
  topInfoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    backgroundColor: colors.lightAccent,
    padding: 10,
  },
  entryTypeButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  dateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  date: {
    color: colors.main,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  deleteButton: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    flex: 1
  },
  deleteText: {
    textAlign: 'center',
    color: colors.main,
    fontWeight: 'bold'
  },
  entryTextContainer: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 30,
    backgroundColor: 'white',
    margin: 30,
    borderRadius: 10,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#555',
    shadowOpacity: 0.3,
  },
  entryText: {
    fontSize: 18,
    color: colors.main,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  saveButton: {
    padding: 20,
    backgroundColor: colors.lightAccent,
    borderRadius: 5,
    shadowOffset: {width: 2, height: 2},
    shadowColor: '#555',
    shadowOpacity: 0.3,
  },
  saveText: {
    color: colors.main,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  entryTypeImage: {
    height: 30,
    width: 30,
  }
})

const mapStateToProps = (state) => {
  const { entries } = state
  return { entries }
}

export default connect(mapStateToProps, {
  EntryUpdate, EntrySave, EntryDelete, ProjectUpdateProgress
})(EntryDetail)
