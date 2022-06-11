import { configureStore } from "@reduxjs/toolkit";
import textSlice from "./textSlice";
import todoSlice from "./todoSlice";

export default configureStore({
  reducer: {
    todos: todoSlice,
    text: textSlice
  }
})