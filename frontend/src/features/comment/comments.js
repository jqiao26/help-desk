import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const createComment = createAsyncThunk('createComment', async (commentBody) => {
  const { comment, ticketId } = commentBody
  await axios.post('http://localhost:8000/create-comment', {
    ticketId: ticketId, comment: comment
  })
})

export const commentsSlice = createSlice({
  name: 'helpDesk',
  initialState: {
    comments: []
  },
  reducers: {
  },
  extraReducers(builder) {

  }
})

export const { setCurTab } = commentsSlice.actions
export default commentsSlice.reducer
