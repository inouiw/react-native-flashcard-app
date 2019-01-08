import React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { lightGray } from '../utils/colors'

export default function DeckHeader({deckTitle, numberOfCards}) {
  return (
    <View>
      <Text style={styles.deckTitle}>{deckTitle}</Text>
      <Text style={styles.numberOfCards}>{numberOfCards} cards</Text>
      <View style={styles.horizontalLine} />
    </View>
  )
}

const styles = StyleSheet.create({
  deckTitle: {
    marginTop: 10,
    textAlign: 'center',
    fontSize: 50,
  },
  numberOfCards: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 40,
    color: lightGray,
  },
  horizontalLine: {
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    margin: 10,
  }
})