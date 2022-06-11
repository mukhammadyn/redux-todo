import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { delTodo, getTodos, checkTodo, makeTodo } from "../packages/api/rest/todos";

export const fetchTodos = createAsyncThunk(
  'todo/fetch-todos',
  async function(_, {rejectWithValue}) {

    try {
      return getTodos()
    } catch(error) {
      return rejectWithValue(error.message)
    }
    
  }
)

export const deleteTodo = createAsyncThunk(
  'todo/delete-todos',
  async function(id, {rejectWithValue, dispatch}) {

    dispatch(removeTodo({id}))

    try {
      delTodo(id)
    } catch(error) {
      return rejectWithValue(error.message)
    }

  }
)

export const changeTodo = createAsyncThunk(
  'todo/change-todos',
  async function(id, {rejectWithValue, dispatch, getState}) {
    const todo = getState().todos.todos.find(todo => todo.id === id)
    try {
      dispatch(completeTodo({id,todo}))
      checkTodo(id, todo)
    } catch(error) {
      return rejectWithValue(error.message)
    }
  }
)

export const newTodo = createAsyncThunk(
  'todo/add-todo',
  async function(todo,{rejectWithValue, dispatch}) {
    try {
      dispatch(addTodo(todo))
      makeTodo(todo)
    } catch(error) {
      return rejectWithValue(error)
    }
  }
)

const todoSlice = createSlice({
  name: 'Todo',
  initialState: {
    todos: [],
    status: null,
    error: null,
    delError: null
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload)
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },
    completeTodo(state, action) {
      const currentTodo = state.todos.find(todo => todo.id === action.payload.id)
      currentTodo.completed = !currentTodo.completed
    }
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = 'loading'
      state.error = null
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = 'resolved'
      state.error = null
      state.todos = action.payload
    },
    [fetchTodos.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = `OOPS! SOMETHING WAS WRONG!(  ${action.payload}`
    },
    [deleteTodo.rejected]: (state, action) => {
      state.status = 'rejected'
      state.delError = `OOPS! SOMETHING WAS WRONG!(  ${action.payload}`
    },
    [changeTodo.rejected]: (state, action) => {
      state.status = 'rejected'
      state.error = `OOPS! SOMETHING WAS WRONG!(  ${action.payload}`
    }
  }
})

export const {addTodo, removeTodo, completeTodo} = todoSlice.actions
export default todoSlice.reducer
