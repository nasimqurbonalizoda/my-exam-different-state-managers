import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const Api = "http://localhost:3000/users";

export const getuser = createAsyncThunk("todoSlice/getuser", async () => {
  try {
    let res = await fetch(Api)
    let data = await res.json()
    return data
  } catch (error) {
    console.error(error);
  }
})
export const deleted = createAsyncThunk("todoSlice/deleted", async (id, { dispatch }) => {
  try {
    await fetch(`${Api}/${id}`, {
      method: "DELETE"
    })
    dispatch(getuser())
  } catch (error) {
    console.error(error);
  }
})
export const edituser = createAsyncThunk("todoSlice/deleted", async (elem, { dispatch }) => {
  try {
    await fetch(`${Api}/${elem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(elem)
    })
    dispatch(getuser())
  } catch (error) {
    console.error(error);
  }
})
export const chexbox = createAsyncThunk("todoSlice/chexbox", async (elem, { dispatch }) => {
  try {
    await fetch(`${Api}/${elem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ ...elem, status:!elem.status })
    })
    dispatch(getuser())
  } catch (error) {
    console.error(error);
  }
})

export const adduser = createAsyncThunk("todoSlice/adduser", async (elem, { dispatch }) => {
  try {
    await fetch(Api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(elem)
    })
    dispatch(getuser())
  } catch (error) {
    console.error(error);
  }
})



export const todoAsyncSlice = createSlice({
  name: 'todoSlice',
  initialState: {
    data: [],
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder.addCase(getuser.fulfilled, (state, action) => {
      state.data = action.payload
    })
  }
})

// export const { increment, decrement, incrementByAmount } = todoAsyncSlice.actions

export default todoAsyncSlice.reducer