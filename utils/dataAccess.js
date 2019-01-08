import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'davidneuy:flashcard'

// Returns all of the decks along with their titles, questions, and answers. 
export function getDecks() {
  return {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        }
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.'
        }
      ]
    }
  }
}

// Returns the deck associated with the provided id. 
export function getDeck(id) {

}

// Adds a new deck with the provided title.
export function saveDeckTitle(title) {
  console.log('saving', title)
  const obj = { [title]: {} }
  AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(obj))
  .then(() => {
    AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((item) => console.log('getitem: ', item))
  })
}

// Adds the card to the list of questions for the deck with the associated title. 
export function addCardToDeck(title, card) {

}