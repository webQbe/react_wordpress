/* Presentational Component */
import React from 'react'

const BookItem = ({ book }) => { // Receive a book prop

  /* Render title.rendered field from  WordPress API response */
  return (
    <div>
        <h2>{ book.title.rendered }</h2>
    </div>
  )
}

export default BookItem