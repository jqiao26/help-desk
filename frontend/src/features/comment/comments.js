import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

export const createComment = createAsyncThunk('createComment', async (commentBody) => {
  const { comment, ticketId } = commentBody
  await axios.post(`${process.env.REACT_APP_BACKEND_URL}/create-comment`, {
    ticketId: ticketId, comment: comment
  })
})

export const fetchComments = createAsyncThunk('fetchComments', async (ticketId) => {
  const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-comments-by-ticket?ticketId=${ticketId}`)
  return response.data
})

export const commentsSlice = createSlice({
  name: 'helpDesk',
  initialState: {
    comments: [],
    commentsLoading: false
  },
  reducers: {
    updateComments(state, action) {
      state.comments = action.payload
    }
  },
  extraReducers(builder) {
    builder.addCase(fetchComments.pending, (state) => {
      state.commentsLoading = true
    })
    builder.addCase(fetchComments.fulfilled, (state, action) => {
      state.comments = action.payload
    })
  }
})

export const { updateComments } = commentsSlice.actions
export default commentsSlice.reducer
