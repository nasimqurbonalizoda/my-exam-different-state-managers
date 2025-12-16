import { createSlice } from '@reduxjs/toolkit'


export const todoSyncSlice = createSlice({
  name: 'todosync',
  initialState: {
    data: [
      { id: 1, name: "nasimes", age: 21, status: false },
      { id: 2, name: "misanes", age: 24, status: false }
    ]
  },
  reducers: {
    deleteUser: (state, action) => {
      state.data = state.data.filter((elem) => elem.id !== action.payload)
    },
    adduser: (state, action) => {
      state.data.push(action.payload)
    },
    edituser: (state, action) => {
      state.data = state.data.map((el) => 
        el.id === action.payload.id ? { ...el, ...action.payload } : el
      )
    },
    chexbox: (state, action) => {
      state.data = state.data.map((el) => 
        el.id === action.payload ? { ...el, status:!el.status } : el
      )
    },
    
  },
})

export const { deleteUser, adduser, edituser,chexbox } = todoSyncSlice.actions

export default todoSyncSlice.reducer