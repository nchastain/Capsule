import React from 'react'
import { connect } from 'react-redux'
import { Text, View, Keyboard, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native'
import { EntryUpdate, EntrySave, EntryDelete, ProjectUpdateProgress } from '../actions'
import { colors } from '../utilities'

class EntryDetail extends React.Component {
  constructor (props) {
    super(props)
    this.state = {edited: false}
  }

  render () {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.main, flexDirection: 'row', paddingRight: 30, paddingLeft: 30}}>
          <View style={{flex: 3}}><TextInput style={{textAlign: 'left'}} placeholderColor='white' placeholder={this.props.entry.text} onChangeText={(val) => this.setState({edited: val.length > 0, entryText: val})} /></View>
          {this.state.edited
            ? <TouchableOpacity onPress={() => this.props.EntryUpdate({...this.props.entry, text: this.state.entryText}, this.props.location)}><View style={{padding: 10, backgroundColor: 'white', borderRadius: 5, shadowOffset: {width: 2, height: 2}, shadowColor: '#555', shadowOpacity: 0.3}}>
                <Text style={{color: colors.main}}>save changes</Text></View>
              </TouchableOpacity>
            : <View style={{padding: 10}}><Text style={{color: '#DDC6FA', fontWeight: 'bold'}}>click title to edit</Text></View>
          }
          <TouchableOpacity onPress={() => this.props.EntryDelete({uid: this.props.entry.uid}, this.props.location)}><View style={{padding: 10, backgroundColor: 'white', borderRadius: 10}}><Text style={{color: colors.main}}>Delete</Text></View></TouchableOpacity>
        </View>        

      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = (state) => {
  const { entries } = state
  return { entries }
}

export default connect(mapStateToProps, {
  EntryUpdate, EntrySave, EntryDelete, ProjectUpdateProgress
})(EntryDetail)
