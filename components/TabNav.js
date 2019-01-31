import React from 'react'
import { TabNavigator } from 'react-navigation'
import { Platform } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { purple, white } from '../utils/colors'
import DeckList from './DeckList'
import AddDeck from './AddDeck'

export default TabNavigator({
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