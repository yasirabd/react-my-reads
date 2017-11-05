import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import * as BooksAPI from './../utils/BooksAPI'
import Book from './Book'

class SearchBook extends Component {
  static propTypes = {
    currentBooks: PropTypes.array.isRequired,
    handler: PropTypes.func.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  state = {
    searchResults: [],
    query: ''
  }

  updateQuery = (query) => {
    this.setState({query})
    this.searchBooks(query.trim())
  }

  searchBooks = (query) => {
    query && BooksAPI.search(query, 20).then((books) => {
      if (!books.error) {
        books = books.filter((book) => book.imageLinks)
        books.map(book => {
          const alreadyOnShelf = this.props.currentBooks.find(currentBook => currentBook.id === book.id)
          book.shelf = "none"
          if (alreadyOnShelf){
            book.shelf = alreadyOnShelf.shelf
          }
          return book
        })
        this.setState({searchResults: books})
      } else {
        this.setState({searchResults: []})
      }
    })
  }

  changeShelf = (book, shelf) =>  {
    const {currentBooks, handler} = this.props
    const {searchResults} = this.state

    BooksAPI.update(book, shelf)

    currentBooks.forEach((item) => {
      if (item.id === book.id){
        item.shelf = shelf
      }
    })

    if (book.shelf === "none"){
      let newBook = currentBooks.concat(book)
      handler(newBook)
    } else {
      handler(currentBooks)
    }

    let searchBooks = searchResults
    searchBooks.forEach((item) => {
      if (item.id === book.id){
        item.shelf = shelf
      }
    })

    this.setState({searchResults: searchBooks})
  }

  render() {
    const { query, searchResults } = this.state
    const displayBooks = searchResults.map(book => (
      <li key={book.id}>
        <Book
          book={book}
          shelf={book.shelf}
          onShelfChange={this.changeShelf}
        />
      </li>
    ))

    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className='close-search' to='/'>Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(e) => this.updateQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {query !== '' && displayBooks}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBook
