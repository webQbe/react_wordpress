import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Books = () => {

  // Store fetched book data
  const [books, setBooks] = useState([]);
  // Indicate whether API data has loaded
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => { // Run on first render

    // Sends a GET request
    axios.get('/wp-json/wp/v2/books') // proxied to WordPress backend
      .then(res => {
        setBooks(res.data); // Update books with response data
        setIsLoaded(true);  // Set isLoaded to true
      })
      // If there's an error, it logs it to the console
      .catch(err => console.log(err));

  }, []); // Run once when component mounts

  // If !isLoaded is false show Loading...
  if (!isLoaded) return <h3>Loading...</h3>

  return (
    <div>
        { books.length > 0 ? // If books.length is greater than 0, run the code
            ( 
              // Map over books array
              books.map(book => (
                /* Render <div> for each book with its title */
                <div key={ book.id }>
                    <h4>{ book.title.rendered }</h4>
                </div>
             ))
            ) : 
            (  
                /* If there are no books */
                <p>No books found.</p>
            )
        }
    </div>
  )

};

export default Books;
