"use strict"
//React
import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import {applyMiddleware, createStore} from 'redux';
import {createLogger} from 'redux-logger';
//import combined reducers
import reducers from './reducers/index';

//import actions
import {addToCart} from './actions/cartActions';
import {postBooks, deleteBooks, updateBooks} from './actions/booksActions';

//STEP 1 Create the store
const middleware = applyMiddleware(createLogger());
const store = createStore(reducers, middleware);

import BooksList from './components/pages/bookslist';

render (
  <Provider store={store}>
    <BooksList />
  </Provider>, document.getElementById('app')
)

//STEP 2 create dispatch actions
// store.dispatch(postBooks(

// ));

// //DELETE A BOOK
// store.dispatch(deleteBooks(
//   {id: 1}
// ));


// //update a book

// store.dispatch(updateBooks(
//   {
//     id: 2,
//     title: 'The biography of adam',
//   }
// ));

// //-->>Cart Actions <<--
// //add to cart
// store.dispatch(addToCart([{id: 1}]));


