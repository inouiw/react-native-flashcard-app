import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { black, white } from '../utils/colors'
import { saveDeckTitle } from '../utils/dataAccess'

export default class NewDeck extends Component {
  state = {
    text: '',
  }

  submit = () => {
    if (this.state.text) {
      saveDeckTitle(this.state.text)
      this.setState({text: ''})
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps='handled'>
        <Text style={styles.questionLabel}>What is the title of your new deck?</Text>
        <KeyboardAvoidingView behavior="padding" enabled>
          <TextInput
            style={styles.questionInput}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
            maxLength={30}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={this.submit}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
        </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  questionLabel: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 60,
  },
  questionInput: {
    textAlign: 'left',
    fontSize: 20,
    borderColor: 'gray', 
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    textAlign: 'center',
    color: white,
    backgroundColor: black,
    fontSize: 40,
    padding: 10,
    borderRadius: 7,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderColor: 'black', 
    borderWidth: 1,
  }
})