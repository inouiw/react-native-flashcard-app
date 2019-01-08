import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import DeckHeader from './DeckHeader'

export default function DeckList() {
  return (
    <View>
      <DeckHeader deckTitle='hello wold' numberOfCards='4' />
      <Text>DeckList</Text>
    </View>
  )
}