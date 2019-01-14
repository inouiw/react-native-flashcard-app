import React from 'react'
import { View, StatusBar, Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white } from './utils/colors'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckItem from './components/DeckItem'
import AddCard from './components/AddCard'
import Quiz from './components/Quiz'
import { getDecks, saveDeckWithCards } from './utils/dataAccess'
import { baumlisteData } from './utils/initialData'

const Tabs = TabNavigator({
  History: {
    screen: DeckList,
    navigationOptions: {
      tabBarLabel: 'Home',
      tabBarIcon: () => <Ionicons name='ios-home' size={30} />
    }
  },
  AddEntry: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add Deck',
      tabBarIcon: () => <FontAwesome name='plus-square' size={30} />
    }
  },
}, {
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? purple : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white: purple,
      shadowColor: 'rgba(0,0,0,0.24)',
      shadowOffset: {
        width: 0,
        heigth: 3,
      },
      shadowRadius: 6,
      shadowOpacity: 1,
    }
  },
})

const StackNav = StackNavigator({
  DeckList: {
    screen: Tabs,
  },
  DeckItem: {
    screen: DeckItem,
  },
  AddCard: {
    screen: AddCard,
  },
  Quiz: {
    screen: Quiz,
  },
},{
  initialRouteName: 'DeckList',
})

// A StackNavigator with access to navigation prop of TabNavigator.
// function StackNavEx(props) {
//   let sp = { ...props.screenProps, tabNavigation: props.navigation }
//   return <StackNav screenProps={sp} />
// }

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
