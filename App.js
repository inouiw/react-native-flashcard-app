import React from 'react'
import { View, StatusBar } from 'react-native'
import { purple } from './utils/colors'
import { getDecks, saveDeckWithCards } from './utils/dataAccess'
import { baumlisteData } from './utils/initialData'
import { setLocalNotification } from './utils/helpers'
import StackNav from './components/StackNav'

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor}}>
      <StatusBar translucent cbackgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  state = {}

  componentDidMount() {
    setLocalNotification()

    // Run Promises in Serial.
    let combinedPromise = Object.keys(baumlisteData).reduce((promiseChain, currentTitle) => {
      return promiseChain.then(() => 
        saveDeckWithCards(currentTitle, baumlisteData[currentTitle].questions)
      )
    }, Promise.resolve())

    combinedPromise.then(this.updateDecks)
  }

  updateDecks = () => {
    return getDecks().then((decks) => this.setState(decks))
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomStatusBar backgroundColor={purple} barStyle='dark-content' />
        <StackNav screenProps={{ decks: this.state, updateDecks: this.updateDecks, onTabChange: this.onTabChange } } />
      </View>
    )
  }
}
