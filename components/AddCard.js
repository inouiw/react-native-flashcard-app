import React, { Component } from 'react'
import { Text, ScrollView, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { black, white, gray } from '../utils/colors'
import { addCardToDeck } from '../utils/dataAccess'
import Toast from 'react-native-root-toast'

export default class AddCard extends Component {
  static navigationOptions = {
    title: 'Add Card',
  }

  state = {
    question: '',
    answer: '',
  }

  submit = () => {
    if (this.state.question && this.state.answer) {
      const { deckTitle } = this.props.navigation.state.params
      addCardToDeck(deckTitle, { question: this.state.question, answer: this.state.answer })
        .then(() => {
          Toast.show('Card added', {
            position: 30,
          })
          this.props.screenProps.updateDecks()
        })
      this.setState({question: '', answer: ''})
    }
  }

  handleQuestionChange({question}) {
    this.setState({question});
  }

  handleAnswerChange({answer}) {
    this.setState({answer});
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps='handled'>
        <KeyboardAvoidingView behavior="padding" enabled>
          <TextInput
            style={styles.textInput}
            onChangeText={(question) => this.handleQuestionChange({question})}
            value={this.state.question}
            maxLength={30}
            placeholder='Insert question here'
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(answer) => this.handleAnswerChange({answer})}
            value={this.state.answer}
            maxLength={Toast.positions.TOP}
            placeholder='Insert answer here'
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
  textInput: {
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