import React from 'react'
import moment from 'moment'
import { View, Text, TouchableOpacity } from 'react-native'
import { Button } from './common/Button'
import { connect } from 'react-redux'
import { EntryUpdate, EntryAdd, ProjectUpdateProgress } from '../actions'

class Stopwatch extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      secondsElapsed: 0,
      stopped: true,
      saved: null,
      lastClearedIncrementer: null,
    }
    this.incrementer = null
  }

  componentWillUnmount () {
    clearInterval(this.incrementer)
  }

  handleStart () {
    this.incrementer = setInterval(() =>
      this.setState({
        secondsElapsed: this.state.secondsElapsed + 1,
        stopped: false
      })
    , 1000)
  }

  handleStop () {
    clearInterval(this.incrementer)
    this.setState({lastClearedIncrementer: this.incrementer, stopped: true})
  }

  handleTouchClock () {
    this.state.stopped
    ? this.handleStart()
    : this.handleStop()
  }

  handleReset () {
    clearInterval(this.incrementer)
    this.setState({secondsElapsed: 0, saved: null, stopped: true})
  }

  handleSave () {
    const { project, description, projectID } = this.props
    const date = new Date().getTime()
    this.setState({saved: this.state.secondsElapsed}, function () {
      this.props.EntryAdd({ description, date, seconds: this.state.saved, projectID })
      this.props.ProjectUpdateProgress(projectID, this.state.saved)
    })
  }

  render () {
    const { stopwatch, stopwatchTimer, resetContainer, startStopContainer, counterContainer, stopwatchActionsContainer, timeContainer, saveContainer, disabledBtn, disabledText, btn, startBtn, stopBtn, saveBtn, resetBtn } = styles
    return (
      <View style={stopwatch}>
        {this.state.secondsElapsed === 0
        ? <View style={counterContainer}>
            <View onPress={this.handleTouchClock.bind(this)} style={[timeContainer, disabledBtn]}>
              <Text style={[stopwatchTimer, disabledText]}>
                {formattedSeconds(this.state.secondsElapsed)}
              </Text>
            </View>
          </View>
        : <View style={counterContainer}>
            <TouchableOpacity onPress={this.handleTouchClock.bind(this)} style={timeContainer}>
              <Text style={stopwatchTimer}>
                {formattedSeconds(this.state.secondsElapsed)}
              </Text>
            </TouchableOpacity>
          </View>
        }
        <View style={stopwatchActionsContainer}>
          <View style={resetContainer}>
            {this.state.secondsElapsed === 0
            ? <View style={[btn, resetBtn, disabledBtn]}>
                <Text style={{ color: '#eee', fontWeight: 'bold', fontSize: 20}}>reset</Text>
              </View>
            : <TouchableOpacity onPress={this.handleReset.bind(this)} style={[btn, resetBtn]}>
                <Text style={{color: '#555', fontWeight: 'bold', fontSize: 20}}>reset</Text>
              </TouchableOpacity>
            }
          </View>
          <View style={startStopContainer}>
            {this.props.projectID
            ? this.state.stopped || this.incrementer === this.state.lastClearedIncrementer
              ? <TouchableOpacity onPress={this.handleStart.bind(this)} style={[btn, startBtn]}>
                <Text style={{color: 'green', fontSize: 20, fontWeight: 'bold'}}>start</Text>
              </TouchableOpacity>
              : <TouchableOpacity onPress={this.handleStop.bind(this)} style={[btn, stopBtn]}>
                  <Text style={{color: 'red', fontSize: 20, fontWeight: 'bold'}}>pause</Text>
                </TouchableOpacity>
            : <View style={[btn, startBtn, disabledBtn]}>
                <Text style={{color: '#eee', fontSize: 20, fontWeight: 'bold'}}>start</Text>
              </View>
            }
          </View>
        </View>
        {this.state.secondsElapsed !== 0
        ? <TouchableOpacity onPress={this.handleSave.bind(this)} style={saveContainer}>
            <Text style={saveBtn}>save</Text>
          </TouchableOpacity>
        : <View style={[saveContainer, disabledBtn]}>
            <Text style={saveBtn}>save</Text>
          </View>
        }
      </View>
    )
  }
}

const formattedSeconds = (sec) => (
  Math.floor(sec / 60) +
    ':' +
  ('0' + sec % 60).slice(-2)
)

const styles = {
  stopwatch: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: '#eee',
    marginBottom: 50
  },
  stopwatchTimer: {
    fontSize: 35,
    color: 'orange',
    fontWeight: 'bold'
  },
  counterContainer: {
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 3,
  },
  resetContainer: {
    flex: 1,
  },
  startStopContainer: {
    flex: 1,
  },
  disabledBtn: {
    backgroundColor: 'white',
    borderTopWidth: 3,
    borderColor: 'white'
  },
  disabledText: {
    color: '#eee'
  },
  stopwatchActionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    flex: 1,
    paddingBottom: 30
  },
  timeContainer: {
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 125,
    backgroundColor: 'white',
    height: 225,
    width: 225,
    alignItems: 'center',
    justifyContent:'center',
  },
  saveContainer: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'orange',
    height: 75
  },
  btn: {
    backgroundColor: 'orange',
    borderRadius: 50,
    width: 100,
    height: 100,
    alignItems: 'center', 
    justifyContent:'center',
    alignSelf: 'flex-end'
  },
  startBtn: {
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  stopBtn: {
    borderColor: 'lightgray',
    borderWidth: 1,
    backgroundColor: 'white'
  },
  saveBtn: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#eee',
    alignSelf: 'center'
  },
  resetBtn: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderColor: 'lightgray',
    borderWidth: 1
  }
}

const mapStateToProps = (state) => {
  const { project, description, time, projectID } = state.entryForm
  return { project, description, time, projectID }
}

export default connect(mapStateToProps, {
  EntryUpdate, EntryAdd, ProjectUpdateProgress
})(Stopwatch)
