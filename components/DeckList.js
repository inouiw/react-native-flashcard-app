import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import DeckHeaderButton from './DeckHeaderButton'

export default class DeckList extends Component {
  static navigationOptions = {
    title: 'Home',
  }

  onDeckItemPress = (deckTitle, numberOfCards) => {
    this.props.navigation.navigate(
      'DeckItem',
      { 
        deckTitle: deckTitle,
      }
    )
  }

  componentDidMount() {
    // If the user is on the Add Deck Tab and clicks on the Home Tab, 
    // then show the Home view rathar then the view on top of the stack.
    this.props.screenProps.tabNavigation.addListener('didFocus', (e) => {
      this.props.navigation.popToTop()
    })
  }

  render() {
    const {decks} = this.props.screenProps
    return (
      <ScrollView style={{flex: 1}}>
        {Object.keys(decks).map((deckTitle) => {
          const deckQuestions = decks[deckTitle].questions
          const numberOfCards = deckQuestions ?  deckQuestions.length : 0
          return (
            <DeckHeaderButton key={deckTitle} deckTitle={deckTitle} numberOfCards={numberOfCards} onPress={this.onDeckItemPress} />
          )
        })}
      </ScrollView>
    )
  }
}