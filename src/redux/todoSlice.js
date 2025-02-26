import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todo: [],
  filterType: "All",
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action) => {
      state.todo.push(action.payload);
    },
    removeTask: (state, action) => {
      state.todo = state.todo.filter((task) => task.id !== action.payload);
    },
    toggleDone: (state, action) => {
      const task = state.todo.find((task) => task.id === action.payload);
      if (task) {
        task.done = !task.done;
      }
    },
    setFilter: (state, action) => {
      state.filterType = action.payload;
    },
    setTasks: (state, action) => {
      state.todo = action.payload;
    },
  },
});

export const { addTask, removeTask, toggleDone, setFilter, setTasks } =
  todoSlice.actions;
export default todoSlice.reducer;
