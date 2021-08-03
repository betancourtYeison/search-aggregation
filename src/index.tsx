import React from 'react';
import ReactDOM from 'react-dom';

import { configureStore } from './frameworks';
import { Provider } from 'react-redux';

import App from './components/AppPresenter';

import reportWebVitals from './reportWebVitals';

const element: HTMLElement | null = document.getElementById('root');
const ConnectedApp = (
  <Provider store={configureStore()}>
    <App />
  </Provider>
);

ReactDOM.render(ConnectedApp, element);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
