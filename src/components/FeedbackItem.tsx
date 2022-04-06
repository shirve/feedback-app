import Card from './shared/Card'
import { FaTimes, FaEdit } from 'react-icons/fa'
import { useContext } from 'react'
import FeedbackContext from '../context/FeedbackContext'
import { Feedback } from '../models/Feedback'

interface Props {
  item: Feedback
}

const FeedbackItem = ({ item }: Props) => {
  const { deleteFeedback, editFeedback } = useContext(FeedbackContext)

  return (
    <Card>
      <div className='num-display'>{item.rating}</div>
      <button onClick={() => deleteFeedback(item.id!)} className='close'>
        <FaTimes color='red' />
      </button>
      <button onClick={() => editFeedback(item)} className='edit'>
        <FaEdit color='green' />
      </button>
      <div className='text-display'>{item.text}</div>
    </Card>
  )
}

export default FeedbackItem
