"use strict"

//STEP 3 define reducers
export function booksReducers(state={books: []}, action) {
  switch(action.type) {
    case "POST_BOOK":
    // let books = state.books.concat(action.payload);
    // return {books};
    return {books:[...state.books, ...action.payload]}
    break;

    case "DELETE_BOOK":
    //copy of the current array of books
    const currentBookToDelete = [...state.books]
    //Determine which index in books array is the book to delete
    const indexToDelete = currentBookToDelete.findIndex(
      function(book) {
        return book.id === action.payload.id;
      }
    )
    //use SLICE to remove the book at the specific index
    return {books: [...currentBookToDelete.slice(0, indexToDelete),
    ...currentBookToDelete.slice(indexToDelete + 1)]}
    break;

    case "UPDATE_BOOK":
    //create copy of current book array
    const currentBookToUpdate = [...state.books]
    console.log('current to update', currentBookToUpdate);
    //determine index of book to update in the array
    const indexToUpdate = currentBookToUpdate.findIndex(
      function(book) {
        return book.id === action.payload.id
      }
    )
    //Create a new book object with the new values and with the same
    //array index of the item we want to replace. To do this we will use
    //...spread but we could use concat as well.
    const newBookToUpdate = {
      ...currentBookToUpdate[indexToUpdate],
      title: action.payload.title
    }
    //This log has the purpose to show you how newBookToUpdate looks like
    console.log("what is it newBookToUpdate", newBookToUpdate);
    //use slice to remove the book at the
    return {books: [...currentBookToUpdate.slice(0, indexToUpdate), newBookToUpdate, ...currentBookToUpdate.slice(indexToUpdate + 1)]}
    break;
  }
  return state;
}
