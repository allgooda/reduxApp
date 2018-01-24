"use strict"
//React
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
//React-router
import {Router, Route, IndexRoute, browserHistory, hashHistory} from 'react-router';

import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
//import combined reducers
import reducers from './reducers/index';

//import actions
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

//STEP 1 Create the store
const middleware = applyMiddleware(thunk, createLogger());
//pass initial state from server store
const initialState = window.INITIAL_STATE;
const store = createStore(reducers, initialState, middleware);

import routes from './routes';

const Routes = (
  <Provider store={store}>
    {routes}
  </Provider>
)

render (
  Routes, document.getElementById('app')
)
