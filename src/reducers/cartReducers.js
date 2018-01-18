"use strict"

//cart reducers

export function cartReducers(state={cart:[]}, action) {

  switch(action.type) {
    case"ADD_TO_CART":
      return {...state, cart:action.payload}
      break;
    case"UPDATE_CART":
      //create copy of cart array
      const currentBookToUpdate = [...state.cart];
      //determine the index in cart array for the item to be updated
      const indexToUpdate = currentBookToUpdate.findIndex(
        function(book) {
          return book._id === action._id
        }
      )

      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        quantity: currentBookToUpdate[indexToUpdate].quantity + action.unit
      }

      let cartUpdate = [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)];
       return {...state,
         cart:cartUpdate,
       }
      break;
    case"DELETE_CART_ITEM":
      return {...state, cart:action.payload}
      break;
  }
  return state;
}
