import React from 'react'
import { StyleSheet, Text, View, StatusBar, Platform } from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { Constants } from 'expo'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white, black } from './utils/colors'
import DeckList from './components/DeckList'
import AddDeck from './components/AddDeck'
import DeckItem from './components/DeckItem'
import AddCard from './components/AddCard'
import { getDecks } from './utils/dataAccess'

const StackNav = StackNavigator({
  DeckList: {
    screen: DeckList,
  },
  DeckItem: {
    screen: DeckItem,
  },
  AddCard: {
    screen: AddCard,
  },
},{
  //headerTitle: 'Home',
  //headerMode: 'none',
  //cardStyle: { backgroundColor: 'transparent'}
})

const Tabs = TabNavigator({
  History: {
    screen: StackNav,
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
  navigationOptions: {
    //header: null
  },
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
  lazy: false
})

function CustomStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{backgroundColor}}>
      <StatusBar translucent cbackgroundColor={backgroundColor} {...props} />
    </View>
  )
}

export default class App extends React.Component {
  state = {}
  
  updateDecks = () => {
    getDecks()
      .then((decks) => {
        console.log('app: ', decks)
        this.setState(decks)
      })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <CustomStatusBar backgroundColor={purple} barStyle='dark-content' />
        <Tabs screenProps={{ decks: this.state, updateDecks: this.updateDecks } } />
      </View>
    )
  }
}
