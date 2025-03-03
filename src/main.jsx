import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ToastContainer } from "react-toastify";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store,persistor} from "./redux/store";
import "primereact/resources/themes/lara-light-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core CSS
import "primeicons/primeicons.css"; // Icons
import "react-toastify/dist/ReactToastify.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
  <BrowserRouter>
    <App />
    <ToastContainer/>
  </BrowserRouter>
  </PersistGate>
  </Provider>
);