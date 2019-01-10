import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Keyboard } from 'react-native'
import { black, white, gray } from '../utils/colors'
import { saveDeckTitle } from '../utils/dataAccess'

export default class AddDeck extends Component {
  state = {
    text: '',
  }

  submit = () => {
    const deckTitle = this.state.text

    if (deckTitle) {
      Keyboard.dismiss()
      saveDeckTitle(deckTitle)
        .then(() => this.props.screenProps.updateDecks())
        .then(() => this.props.navigation.navigate('History', { deckTitle: deckTitle }))
      this.setState({text: ''})
    }
  }

  render() {
    const {text} = this.state

    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps='handled'>
        <Text style={styles.questionLabel}>What is the title of your new deck?</Text>
        <KeyboardAvoidingView behavior="padding" enabled>
          <TextInput
            style={styles.questionInput}
            onChangeText={(text) => this.setState({text})}
            value={text}
            maxLength={30}
          />
        </KeyboardAvoidingView>
        <TouchableOpacity onPress={this.submit}>
          <Text style={styles.button}>Create Deck</Text>
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
    borderColor: gray, 
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
    borderColor: black, 
    borderWidth: 1,
  }
})