import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import taskReducer from "./redux/taskSlice";
import filterReducer from "./redux/filterSlice.ts";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
const store = configureStore({
  reducer: { tasks: taskReducer, filter: filterReducer },
});

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
