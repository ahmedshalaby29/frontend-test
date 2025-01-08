import { createSlice } from "@reduxjs/toolkit";
import {
  loadFromLocalStorage,
  saveToLocalStorage,
} from "../utils/localStorage";
import { Task } from "../types";

const initialState = loadFromLocalStorage("tasks") || [];

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage("tasks", state);
    },
    editTask: (state, action) => {
      const { id, title, priority } = action.payload;
      const task = state.find((task: Task) => task.id === id);
      if (task) {
        task.title = title;
        task.priority = priority;
      }
      saveToLocalStorage("tasks", state);
    },
    deleteTask: (state, action) => {
      const updatedState = state.filter(
        (task: Task) => task.id !== action.payload
      );
      saveToLocalStorage("tasks", updatedState);
      return updatedState;
    },
    toggleCompletion: (state, action) => {
      const task = state.find((task: Task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
      saveToLocalStorage("tasks", state);
    },
  },
});

export const { addTask, editTask, deleteTask, toggleCompletion } =
  taskSlice.actions;
export default taskSlice.reducer;
