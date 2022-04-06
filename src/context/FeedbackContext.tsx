import { ReactNode, createContext, useState, useEffect } from 'react'
import { Feedback } from '../models/Feedback'

interface IFeedbackContext {
  feedback: Feedback[]
  feedbackEdit: {
    item: Feedback
    edit: boolean
  }
  isLoading: boolean
  addFeedback: (newFeedback: Feedback) => void
  updateFeedback: (id: string, updatedItem: Feedback) => void
  editFeedback: (item: Feedback) => void
  deleteFeedback: (id: string) => void
}

const FeedbackContext = createContext({} as IFeedbackContext)

export const FeedbackProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {
      rating: 10,
      text: '',
    },
    edit: false,
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  const fetchFeedback = async () => {
    const res = await fetch('/feedback?_sort=id&_order=desc')
    const data = await res.json()
    setFeedback(data)
    setIsLoading(false)
  }

  const addFeedback = async (newFeedback: Feedback) => {
    const res = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFeedback),
    })

    const data = await res.json()

    setFeedback([data, ...feedback])
  }

  const updateFeedback = async (id: string, updatedItem: Feedback) => {
    const res = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedItem),
    })

    const data = await res.json()

    setFeedback(
      feedback.map((item) => (item.id === id ? { ...item, ...data } : item))
    )
  }

  const editFeedback = (item: Feedback) => {
    setFeedbackEdit({
      item,
      edit: true,
    })
  }

  const deleteFeedback = async (id: string) => {
    if (window.confirm('Are you sure you want ot delete this item?')) {
      await fetch(`/feedback/${id}`, {
        method: 'DELETE',
      })
      setFeedback(feedback.filter((item) => item.id !== id))
    }
  }

  return (
    <FeedbackContext.Provider
      value={{
        feedback,
        feedbackEdit,
        isLoading,
        addFeedback,
        updateFeedback,
        editFeedback,
        deleteFeedback,
      }}
    >
      {children}
    </FeedbackContext.Provider>
  )
}

export default FeedbackContext
