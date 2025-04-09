import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

const BookPage = () => {

    const [book, setBook] = useState({})
    const [isLoaded, setIsLoaded] = useState(false)
    const { id } = useParams() // get the book id from the URL

    useEffect(() => { // Run when the component mounts

        // Fetch a single book using its ID
        axios.get(`/wp-json/wp/v2/books/${id}`)
            .then(res => {
                setBook(res.data) // Store the book in state
                setIsLoaded(true)
            })
            .catch(err => console.log(err))

    }, [])

    if (!isLoaded) return <h3>Loading...</h3>

  return (
    <>
        <Link to='/'>Go Back</Link> {/* Returns to /, showing the book list again */}

        <hr />

        {/* Show book title and full HTML content */}
        <h1>{ book.title.rendered }</h1>
        <div dangerouslySetInnerHTML={{ __html: book.content.rendered }}></div>
        <h4>Publisher:    
                { book.acf.publisher 
                 /* The publisher field created using Advanced Custom Fields (ACF) in WordPress */
                } 
        </h4>
    </>
  )
}

export default BookPage