import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

const AddModal = props => {
  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <TouchableOpacity style={styles.addForm} onPress={props.goToAddForm('journal')}>
          <Text>Journal</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)'
  },
  modal: {
    flex: 1,
    marginLeft: 30,
    marginRight: 30,
    marginTop: 90,
    borderRadius: 10,
    marginBottom: 90,
    padding: 10,
    backgroundColor: '#eee',
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  addForm: {
    height: 100,
    borderRadius: 10,
    borderColor: 'darkgray',
    width: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default AddModal
