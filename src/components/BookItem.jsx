/* Presentational Component */
import React from 'react'

const BookItem = ({ book }) => { // Receive a book prop

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

export default BookItem