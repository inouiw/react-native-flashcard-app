import React from 'react'
import { StyleSheet, View, TouchableOpacity } from 'react-native'
import { black } from '../utils/colors'
import DeckHeader from './DeckHeader'

export default function DeckHeaderButton({deckTitle, numberOfCards, onPress}) {
  return (
    <TouchableOpacity onPress={() => onPress(deckTitle, numberOfCards) }>
      <DeckHeader deckTitle={deckTitle} numberOfCards={numberOfCards} />
      <View style={styles.horizontalLine} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  horizontalLine: {
    borderBottomColor: black,
    borderBottomWidth: 2,
    margin: 10,
  }
})