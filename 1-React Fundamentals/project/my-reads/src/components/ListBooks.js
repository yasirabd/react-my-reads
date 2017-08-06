import React, { Component } from 'react'
import BookShelf from './BookShelf'
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'

class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      shelf: PropTypes.string.isRequired,
      imageLinks: PropTypes.object.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string.isRequired),
    })),
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf
              shelfTitle = "Currently Reading"
              books = {this.props.books.filter((book) => book.shelf === 'currentlyReading')}
              onShelfChange = {(id, shelf) => {
                this.props.onShelfChange(id, shelf)
              }}
            />
            <BookShelf
              shelfTitle = "Want To Read"
              books = {this.props.books.filter((book) => book.shelf === 'wantToRead')}
              onShelfChange = {(id, shelf) => {
                this.props.onShelfChange(id, shelf)
              }}
            />
            <BookShelf
              shelfTitle = "Read"
              books = {this.props.books.filter((book) => book.shelf === 'read')}
              onShelfChange = {(id, shelf) => {
                this.props.onShelfChange(id, shelf)
              }}
            />
          </div>
        </div>
        <div className="open-search">
          <Link
            to='/search'
          >Add Book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks
