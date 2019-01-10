import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { lightGray, white, black } from '../utils/colors'
import DeckHeader from './DeckHeader'

export default class DeckItem extends Component {
  static navigationOptions = {
    title: 'Deck Item',
  }

  onAddCardPressed = () => {
    this.props.navigation.navigate(
      'AddCard',
      { 
        deckTitle: this.props.navigation.state.params.deckTitle,
      }
    )
  }

  render() {
    const { deckTitle, numberOfCards } = this.props.navigation.state.params

    return (
      <View>
        <DeckHeader deckTitle={deckTitle} numberOfCards={numberOfCards} />
        <View style={{marginTop: 40}} />
        <TouchableOpacity onPress={this.onAddCardPressed}>
          <Text style={styles.button}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.submit}>
          <Text style={styles.button}>Start Quiz</Text>
        </TouchableOpacity>
      </View>
    )
  }
}



const styles = StyleSheet.create({
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