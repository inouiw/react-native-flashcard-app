import { AsyncStorage } from 'react-native'

const FLASHCARD_STORAGE_KEY = 'davidneuy:flashcard'
const NOTIFICATION_KEY = 'davidneuy:notifications'

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

// Save a whole deck with cards.
// questions expects an array of { question: '<question>', answer: 'answer' } objects.
export function saveDeckWithCards(title, questions) {
  return AsyncStorage.getItem(FLASHCARD_STORAGE_KEY)
    .then((item) => {
      const obj = { 
        [title]: {
          title: title,
          questions: questions,
        },
      }
      return AsyncStorage.mergeItem(FLASHCARD_STORAGE_KEY, JSON.stringify(obj))
    })
}

export function removeUserNotificationPreference() {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
}

export function getDidUserAllowNofifications() {
  return AsyncStorage.getItem(NOTIFICATION_KEY).then(JSON.parse)
}

export function saveDidUserAllowNofifications(didUserAllow) {
  return AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(didUserAllow))
}