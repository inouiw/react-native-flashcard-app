import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { white, black } from '../utils/colors'
import DeckHeader from './DeckHeader'

export default class DeckItem extends Component {
  static navigationOptions = {
    title: 'Deck',
  }

  onLinkPressed = (targetSite) => {
    this.props.navigation.navigate(targetSite, { deckTitle: this.props.navigation.state.params.deckTitle})
  }

  render() {
    const {deckTitle} = this.props.navigation.state.params
    const {decks} = this.props.screenProps
    const numberOfCards = decks[deckTitle].questions.length

    return (
      <View>
        <DeckHeader deckTitle={deckTitle} numberOfCards={numberOfCards} />
        <View style={{marginTop: 40}} />
        <TouchableOpacity onPress={() => this.onLinkPressed('AddCard')}>
          <Text style={styles.button}>Add Card</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onLinkPressed('Quiz')}>
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
    borderColor: black, 
    borderWidth: 1,
  }
})