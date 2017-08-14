import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { books, onShelfChange } = this.props
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MY READS</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              shelfTitle = "Currently Reading"
              books = {books.filter((book) => book.shelf === 'currentlyReading')}
              onShelfChange = {onShelfChange}
            />
            <BookShelf
              shelfTitle = "Want To Read"
              books = {books.filter((book) => book.shelf === 'wantToRead')}
              onShelfChange = {onShelfChange}
            />
            <BookShelf
              shelfTitle = "Read"
              books = {books.filter((book) => book.shelf === 'read')}
              onShelfChange = {onShelfChange}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to='/search'>Add Book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
