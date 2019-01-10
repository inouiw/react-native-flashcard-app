import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'davidneuy:flashcard'

// Returns all of the decks along with their titles, questions, and answers. 
export function getDecks() {
  //AsyncStorage.clear()
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((item) => JSON.parse(item))
  // return {
  //   React: {
  //     title: 'React',
  //     questions: [
  //       {
  //         question: 'What is React?',
  //         answer: 'A library for managing user interfaces'
  //       },
  //       {
  //         question: 'Where do you make Ajax requests in React?',
  //         answer: 'The componentDidMount lifecycle event'
  //       }
  //     ]
  //   },
  //   'Java Script': {
  //     title: 'Java Script',
  //     questions: [
  //       {
  //         question: 'What is a closure?',
  //         answer: 'The combination of a function and the lexical environment within which that function was declared.'
  //       }
  //     ]
  //   }
  // }
}

// Returns the deck associated with the provided id. 
export function getDeck(id) {

}

// Adds a new deck with the provided title.
export function saveDeckTitle(title) {
  const obj = { 
    [title]: {
      title: title,
      questions: [],
    },
  }
  return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(obj))
    .then(() => AsyncStorage.getItem(FLASHCARD_STORAGE_KEY))
}

// Adds the card to the list of questions for the deck with the associated title. 
export function addCardToDeck(title, card) {
  console.log('adding card to deck. title: ', title)
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((item) => {
      let obj = JSON.parse(item)
      console.log(obj)
      obj[title].questions.push(card)
      AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(obj))
    })
}