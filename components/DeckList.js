import React, { Component } from 'react'
import { Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { StackNavigator, NavigationEvents } from 'react-navigation'
import DeckHeader from './DeckHeader'
import { getDecks } from '../utils/dataAccess'
import DeckHeaderButton from './DeckHeaderButton'

export default class DeckList extends Component {
  static navigationOptions = {
    title: 'Home',
  }
  //state = {}

  onDeckItemPress = (deckTitle, numberOfCards) => {
    this.props.navigation.navigate(
      'DeckItem',
      { 
        deckTitle: deckTitle,
        numberOfCards: numberOfCards,
      }
    )
  }

  // updateDecks = () => {
  //   getDecks()
  //     .then((decks) => {
  //       console.log('decklist: ', decks)
  //       this.setState(decks)
  //     })
  // }

  componentDidMount() {
    //this.props.navigation.addListener('onDidFocus', this.updateDecks)
    this.props.screenProps.updateDecks()
  }

  render() {
    console.log('decklist render, ', this.props)
    return (
      <ScrollView style={{flex: 1}}>
        {Object.keys(this.props.screenProps.decks).map((deckTitle) => {
          const deckQuestions = this.props.screenProps.decks[deckTitle].questions
          const numberOfCards = deckQuestions ?  deckQuestions.length : 0
          return (
            <DeckHeaderButton key={deckTitle} deckTitle={deckTitle} numberOfCards={numberOfCards} onPress={this.onDeckItemPress} />
          )
        })}
        
      </ScrollView>
    )
  }
}