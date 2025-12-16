import { configureStore } from '@reduxjs/toolkit'
import  todoAsyncSlice  from '../reducer/todoasyncSlice'
import  todoSyncSlice  from '../reducer/todosyncSlice'

export const store = configureStore({
  reducer: {
    todoSlice:todoAsyncSlice,
    todosync:todoSyncSlice,
  },
})