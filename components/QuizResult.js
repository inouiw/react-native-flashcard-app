import React from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { white, black } from '../utils/colors'

export default function QuizResult({correctCount, numberOfCards, onRestart, onGoBack}) {
  return (
    <View>
      <Text style={styles.resultLabel}>{correctCount} of {numberOfCards} correct answers</Text>
      <View style={{marginTop: 40}} />
      <TouchableOpacity onPress={onRestart}>
        <Text style={styles.button}>Restart</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onGoBack}>
        <Text style={styles.button}>Go to Deck</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    textAlign: 'center',
    color: white,
    backgroundColor: black,
    fontSize: 40,
    padding: 10,
    borderRadius: 7,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderColor: black, 
    borderWidth: 1,
  },
  resultLabel: {
    margin: 10,
    fontSize: 35,
    textAlign: 'center',
  }
})