import { createSlice } from "@reduxjs/toolkit";

const textSlice = createSlice({
  name: 'Text',
  initialState: {
    text: ''
  },
  reducers: {
    addText(state, action) {
      state.text = action.payload.text
    },
    clearText(state) {
      state.text = ''
    }
  }
})

export const {addText, clearText} = textSlice.actions
export default textSlice.reducer