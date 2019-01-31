import { StackNavigator } from 'react-navigation'
import DeckItem from './DeckItem'
import AddCard from './AddCard'
import Quiz from './Quiz'
import TabNav from './TabNav'

export default StackNavigator({
  DeckList: {
    screen: TabNav,
  },
  DeckItem: {
    screen: DeckItem,
  },
  AddCard: {
    screen: AddCard,
  },
  Quiz: {
    screen: Quiz,
  },
},{
  initialRouteName: 'DeckList',
})