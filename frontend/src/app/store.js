import { configureStore } from '@reduxjs/toolkit'
import ticketsReducer from '../features/ticket/tickets'
import commentsReducer from '../features/comment/comments'

export default configureStore({
  reducer: {
    tickets: ticketsReducer,
    comments: commentsReducer
  },
})
