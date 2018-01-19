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
import Menu from './components/menu';
import Footer from './components/footer';

render (
  <Provider store={store}>
    <div>
      <Menu />
      <BooksList />
      <Footer />
    </div>

  </Provider>, document.getElementById('app')
)


