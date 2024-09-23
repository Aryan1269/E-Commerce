import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import MyProvider from "./utils/Context.jsx";
import { store } from "./Redux/store.jsx";
import { Provider } from "react-redux";

// @ts-ignore
createRoot(document.querySelector("#root")).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <MyProvider>
          <App />
        </MyProvider>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
