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

  console.log({ books, isLoaded });

  return (
    <div>
    </div>
  );
};

export default Books;
