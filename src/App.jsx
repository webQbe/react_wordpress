import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import './App.css'
/* Imports components */
import Books from './components/Books' 
import BookPage from './components/BookPage'

function App() {

  return (
    <Router>
      <>
        <Routes> 
          <Route exact path='/' Component={Books} /> 
          <Route exact path='/book/:id' Component={BookPage} /> 
        </Routes>
      </>
    </Router> 
  )
  /* Routing Configuration:

        <Router>: Enables routing via URL paths.

        <Routes>: Wraps all your route definitions.

        <Route path="/" Component={Books}:
          When URL is /, render the Books component.

        <Route path="/book/:id" Component={BookPage}:
          When URL matches /book/123, render BookPage with the value of id as a route param.
      */
}

export default App