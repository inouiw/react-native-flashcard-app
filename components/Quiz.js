import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { lightGray, white, black, red } from '../utils/colors'
import QuizResult from './QuizResult'

export default class Quiz extends Component {
  static navigationOptions = {
    title: 'Quiz',
  }

  state = {
    currentQuestionIndex: 0,
    correctCount: 0,
    showAnswer: false,
  }

  onAnswerPressed = (currentShowAnswer) => {
    this.setState({showAnswer: !currentShowAnswer})
  }

  onQuestionAnswerd = (isCorrect) => {
    this.setState((currentState) => ({
      correctCount: currentState.correctCount + (isCorrect ? 1 : 0),
      currentQuestionIndex: currentState.currentQuestionIndex + 1,
      showAnswer: false,
    }))
  }

  onGoBack = () => {
    this.props.navigation.goBack()
  }

  onRestart = () => {
    this.setState({currentQuestionIndex: 0, correctCount: 0, showAnswer: false})
  }

  render() {
    const { deckTitle } = this.props.navigation.state.params
    const { currentQuestionIndex, showAnswer, correctCount } = this.state
    const deckQuestions = this.props.screenProps.decks[deckTitle].questions
    const numberOfCards = deckQuestions ?  deckQuestions.length : 0
    const remainingCards = numberOfCards - currentQuestionIndex
    const isQuizComplete = remainingCards === 0
    const question = !isQuizComplete && deckQuestions[currentQuestionIndex].question
    const answer = !isQuizComplete && deckQuestions[currentQuestionIndex].answer

    return (
      deckQuestions.length == 0 ?
        <Text style={styles.currentCardLabel}>No cards in this deck</Text>
        :
      isQuizComplete ?
       <QuizResult correctCount={correctCount} numberOfCards={numberOfCards} onRestart={this.onRestart} onGoBack={this.onGoBack} />
       :
      (
      <View>
        <Text style={styles.currentCardLabel}>{remainingCards}/{numberOfCards}</Text>
        <Text style={styles.questionLabel}>{showAnswer ? answer : question}</Text>
        <TouchableOpacity onPress={() => this.onAnswerPressed(showAnswer)}>
          <Text style={styles.redLinkbbtton}>{showAnswer ? 'Question' : 'Answer'}</Text>
        </TouchableOpacity>
        <View style={{marginTop: 40}} />
        <TouchableOpacity disabled={!showAnswer} onPress={() => this.onQuestionAnswerd(true)}>
          <Text style={[styles.button, {backgroundColor: showAnswer ? black : lightGray}]}>Correct</Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={!showAnswer} onPress={() => this.onQuestionAnswerd(false)}>
          <Text style={[styles.button, {backgroundColor: showAnswer ? black : lightGray}]}>Incorrect</Text>
        </TouchableOpacity>
      </View>
      )
    )
  }
}

const styles = StyleSheet.create({
  redLinkbbtton: {
    textAlign: 'center',
    color: red,
    fontSize: 25,
    fontWeight: 'bold',
  },
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
  questionLabel: {
    marginTop: 40,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 60,
  },
  currentCardLabel: {
    margin: 10,
    fontSize: 25,
  }
})