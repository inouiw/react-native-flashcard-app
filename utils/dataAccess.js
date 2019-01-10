import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'davidneuy:flashcard'

// Returns all of the decks along with their titles, questions, and answers. 
export function getDecks() {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((item) => JSON.parse(item))
}

// Returns the deck associated with the provided id. 
export function getDeck(id) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((item) => JSON.parse(item)[id])
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
}

// Adds the card to the list of questions for the deck with the associated title. 
export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((item) => {
      let obj = JSON.parse(item)
      obj[title].questions.push(card)
      return AsyncStorage.setItem(FLASHCARD_STORAGE_KEY, JSON.stringify(obj))
    })
}