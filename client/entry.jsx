'use strict';

import 'styles/main.css';

import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App.jsx';
import configureStore from 'store/configureStore.jsx';

import doKuzzle from './kuzzle.jsx';

const initialState = {
  messages: [{
    id: 1,
    text: 'ciao',
    icon: 'send',
    class: 'message-volatile',
    source: {
      toto: 'titi',
      tata: {
        tutu: 'tete'
      }
    }
  },
  {
    id: 2,
    text: 'semo',
  }]
};

let store = configureStore(initialState);
window.store = store;

ReactDom.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('message-log')
);

doKuzzle(store);
