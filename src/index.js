import React from "react";
import "./index.css";
import App from "./App";
import ReactDOM from 'react-dom';
//REDUX
import { Provider } from "react-redux";
import { store } from "./redux/store/configureStore";
const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
