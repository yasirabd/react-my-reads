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
  }

  searchBooks = (query) => {
    if (query.length !== 0) {
      BooksAPI.search(query, 20).then((books) => {
        if(!books.error) {
          books = books.filter((book) => book.imageLinks)
          this.setState((prevState) => {
            books.map((book) => {
              let index = this.props.currentBooks.findIndex((e) => e.id === book.id)
              book.shelf = (index > -1) ? this.props.currentBooks[index].shelf: "none"
            })
            return { searchResults: books }
          })
        } else {
          this.setState({searchResults: []})
        }
      })
    } else {
      this.setState({searchResults: [], query: ''})
    }
  }

  render() {
    const { onShelfChange } = this.props
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
                  <Book book={result} shelf={result.shelf} onShelfChange={onShelfChange}/>
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
