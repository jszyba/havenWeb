import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import rootReducer from './reducers';
import {App} from './components/app';
import {getInitialData, getNewEntity} from './actions'
import '../styles/styles.scss';

import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001');

let store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

store.dispatch(getInitialData('http://localhost:3000/bees'));

socket.on('new buzz', (data) => {
  console.log(data.buzz);
  const newBuzz = data.buzz;
  store.dispatch(getNewEntity(newBuzz));
});
