"use strict"
import axios from 'axios';
//Add to Cart

export function addToCart(cart) {
  return function(dispatch) {
    axios.post("/api/cart", cart)
      .then(function(response) {
        dispatch({type:"ADD_TO_CART", payload:response.data})
      })
      .catch(function(err) {
        dispatch({type:"ADD_TO_CART_REJECTED", msg: "error when adding to the cart"})
      })
  }
}

//update cart

export function updateCart(_id, unit, cart) {
  //create copy of cart array
  const currentBookToUpdate = cart;
  //determine the index in cart array for the item to be updated
  const indexToUpdate = currentBookToUpdate.findIndex(
    function(book) {
      return book._id === _id
    }
  )

  const newBookToUpdate = {
    ...currentBookToUpdate[indexToUpdate],
    quantity: currentBookToUpdate[indexToUpdate].quantity + unit
  }
  let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)];

  return {
    type: "UPDATE_CART",
    payload:cartUpdate,
  }
}
//DELETE Cart Item

export function deleteCartItem(cart) {
  return {
    type:"DELETE_CART_ITEM",
    payload: cart
  }
}
