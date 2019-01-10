import React, { Component } from 'react'
import { ScrollView } from 'react-native'
import DeckHeaderButton from './DeckHeaderButton'

export default class DeckList extends Component {
  static navigationOptions = {
    title: 'Home',
  }

  onDeckItemPress = (deckTitle) => {
    this.props.navigation.navigate('DeckItem', { deckTitle: deckTitle })
  }

  componentDidMount() {
    this.props.navigation.addListener('didFocus', (ev) => {
      if (ev.action.key !== 'StackRouterRoot' && this.props.navigation.state.params) {
        // Add Deck Button was clicked. Route to deck.
        this.props.navigation.navigate('DeckItem', { deckTitle: this.props.navigation.state.params.deckTitle })
      }
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