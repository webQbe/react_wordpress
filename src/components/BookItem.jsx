/* Presentational Component */
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

const BookItem = ({ book }) => { // Receive a book prop

    /* Set up state for image URL and author name */
    const [imgUrl, setImgUrl] = useState('')    // the full-size image URL
    const [author, setAuthor] = useState('')    // the author’s name
    const [isLoaded, setIsLoaded] = useState(false) // toggles when both image and author are ready to display

    useEffect(() => {  // Run once when the component mounts

        // Destructure book prop 
        const { 
                featured_media, // to get the full-size image URL
                author          // to get the author’s name
            } = book

        /* Make two parallel API requests for media and user */
        const getImageUrl = axios.get(`/wp-json/wp/v2/media/${featured_media}`)
        const getAuthor = axios.get(`/wp-json/wp/v2/users/${author}`)

        /* Wait until both requests resolve */
        Promise.all([getImageUrl, getAuthor]).then(res => {
            
            // Update ImgUrl state with media data in res[0]
            setImgUrl(res[0].data.media_details.sizes.full.source_url) 
            // Update author state with  user data in res[1]  
            setAuthor(res[1].data.name)
            // Set isLoaded to true
            setIsLoaded(true)
        })

        }, [])

    // Until the data is fetched
    if (!isLoaded) return <h3>Loading featured media and author...</h3>     

  /* Render fields from WordPress API response */
  return (
    <div>
        {/* Book Title */}
        <h2 style={{ marginBottom: '0' }}>{ book.title.rendered }</h2>

        {/* Author's name */}
        <small>Review by <strong> { author }</strong></small>

        {/* Render image at full width with the title as the alt text */}
        <img src={ imgUrl } alt={ book.title.rendered } style={{ width: '100%' }} />

        <div 
            dangerouslySetInnerHTML={{ // Trust this HTML & render it directly (Removes HTML tags)
                __html: book.excerpt.rendered 

                 /* This prop is called “dangerously” because you're telling React:

                    “Hey, I trust this HTML, so render it directly.”

                 If the HTML includes something malicious (like a <script> tag), it could harm the user — so only use it with trusted sources (like your WordPress site).
                
                 If you don't want to use dangerouslySetInnerHTML, you could strip tags or use a library like DOMPurify or show plain text instead — but you’ll lose formatting. */
            }} 
        />
    
    </div>
  )
}

BookItem.propTypes = {
    book: PropTypes.object.isRequired
    /* Ensure component receives a book prop, 
    - It should be an object (like the one you get from WordPress API) 
    - If not, React will give a helpful warning in the console during development.*/
}

export default BookItem