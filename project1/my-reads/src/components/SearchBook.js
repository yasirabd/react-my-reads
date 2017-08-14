import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import * as BooksAPI from './../utils/BooksAPI'
import Book from './Book'

class SearchBook extends Component {
  state = {
    searchResults: [],
    query: ''
  }

  static propTypes = {
    currentBooks: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  updateQuery = (event) => {
    this.setState({query: event.target.value})
    this.searchBooks(event.target.value.trim())
    //this.setState({searchResults: this.searchBooks(event.target.value.trim())})
  }

  searchBooks = (query) => {
    query && BooksAPI.search(query, 20).then((books) => {
      if (!books.error) {
        books = books.filter((book) => book.imageLinks)
        this.setState({
          searchResults: books.map(book => {
            const alreadyOnShelf = this.props.currentBooks.find(currentBook => currentBook.id === book.id)
            if (alreadyOnShelf) {
              book.shelf = alreadyOnShelf.shelf
            } else {
              book.shelf = "none"
            }
            return book
          })
        })
      } else {
        this.setState({searchResults: []})
      }
    })
  }

  changeShelf = (updatedBook, shelf) =>  {
    const completedBook = this.state.searchResults.find(book => book.id === updatedBook.id)
    if (completedBook) {
      this.props.onShelfChange(completedBook, shelf)
    }
  }

  render() {
    const { query, searchResults } = this.state

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
                onChange={this.updateQuery}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid">
              {query !== '' && searchResults.map((result) => (
                <li key={result.id}>
                  <Book book={result} shelf={result.shelf} onShelfChange={this.changeShelf}/>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchBook
