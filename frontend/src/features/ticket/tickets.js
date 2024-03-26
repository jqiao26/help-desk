import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchTickets = createAsyncThunk('fetchTickets', async () => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-tickets`)
  return response.data
})

export const fetchTicketById = createAsyncThunk('fetchTicketById', async (id) => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-ticket-by-id?i_d=${id}`)
  return response.data
})

export const updateTicketStatusById = createAsyncThunk('updateTicketStatusById', async (newTicket) => {
  const { id, name, status, summary, email } = newTicket
  axios.patch(`${process.env.REACT_APP_BACKEND_URL}/update-ticket-by-id`, {
    id: id, name: name, status: status, summary: summary, email: email
  })
})

export const createTicket = createAsyncThunk('createTicket', async (ticket) => {
  const { name, summary, email } = ticket
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-ticket`, {
    name: name, email: email, summary: summary
  })
})

export const ticketsSlice = createSlice({
  name: 'helpDesk',
  initialState: {
    tickets: [],
    ticketsLoading: false,

    ticketDetail: undefined,
    ticketDetailLoading: false,
  },
  reducers: {
  },
  extraReducers(builder) {
    builder.addCase(fetchTickets.pending, (state) => {
      state.ticketsLoading = true
    })
    builder.addCase(fetchTickets.fulfilled, (state, action) => {
      state.tickets = action.payload
      state.ticketsLoading = false
    })
    builder.addCase(fetchTicketById.pending, (state) => {
      state.ticketDetailLoading = true
    })
    builder.addCase(fetchTicketById.fulfilled, (state, action) => {
      state.ticketDetail = action.payload
      state.ticketDetailLoading = false
    })
  }
})

export default ticketsSlice.reducer
