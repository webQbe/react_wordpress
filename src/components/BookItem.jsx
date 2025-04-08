/* Presentational Component */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const BookItem = ({ book }) => { // Receive a book prop

    /* Set up state for image URL and author name */
    const [imgUrl, setImgUrl] = useState('')
    const [author, setAuthor] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {  // Run once when the component mounts

        // Destructure book prop 
        const { featured_media, author } = book

        /* Make two parallel API requests for media and user */
        const getImageUrl = axios.get(`/wp-json/wp/v2/media/${featured_media}`)
        const getAuthor = axios.get(`/wp-json/wp/v2/users/${author}`)

        /* Wait until both requests resolve */
        Promise.all([getImageUrl, getAuthor]).then(res => {
            console.log(res)
        })

        }, [])

  /* Render fields from WordPress API response */
  return (
    <div>
        <h2>{ book.title.rendered }</h2>
        <div 
            dangerouslySetInnerHTML={{ // Trust this HTML & render it directly (Removes HTML tags)
                __html: book.excerpt.rendered 
            }} 
                /* This prop is called “dangerously” because you're telling React:

                    “Hey, I trust this HTML, so render it directly.”

                 If the HTML includes something malicious (like a <script> tag), it could harm the user — so only use it with trusted sources (like your WordPress site).
                
                 If you don't want to use dangerouslySetInnerHTML, you could strip tags or use a library like DOMPurify or show plain text instead — but you’ll lose formatting. */
        />
    
    </div>
  )
}

/* Ensure component receives a book prop, 
    - It should be an object (like the one you get from WordPress API) 
    - If not, React will give a helpful warning in the console during development.*/
BookItem.propTypes = {
    book: PropTypes.object.isRequired
}

export default BookItem