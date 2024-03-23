import { configureStore } from '@reduxjs/toolkit'
import ticketsReducer from '../features/ticket/tickets'

export default configureStore({
  reducer: {
    tickets: ticketsReducer
  },
})
