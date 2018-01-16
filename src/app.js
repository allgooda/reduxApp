"use strict"
//React
import React from 'react';
import {render} from 'react-dom';

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

store.subscribe(function() {
  console.log('current state is: ', store.getState())
  // console.log('current state is: ', store.getState()[1].price)

})

import BooksList from './components/pages/bookslist';

render (
  <BooksList />, document.getElementById('app')
)
//STEP 2 create dispatch actions
store.dispatch(postBooks(
  [
    {
      id: 1,
      title: 'Book Title',
      description: 'This book is about stuff',
      price: 100,
    },
    {
      id: 2,
      title: 'Book Title Two',
      description: 'This book is about more stuff',
      price: 300,
    }
  ]
));

//DELETE A BOOK
store.dispatch(deleteBooks(
  {id: 1}
));


//update a book

store.dispatch(updateBooks(
  {
    id: 2,
    title: 'The biography of adam',
  }
));

//-->>Cart Actions <<--
//add to cart
store.dispatch(addToCart([{id: 1}]));


