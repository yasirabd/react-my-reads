import React, {Component} from 'react';
import { PropTypes } from 'prop-types'
import Book from "./Book"

class BookShelf extends Component {
  static propTypes = {
    shelfTitle: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { shelfTitle, books, onShelfChange } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book) => (
              <li key = {book.id}>
                <Book
                  book = {book}
                  shelf = {book.shelf}
                  onShelfChange = {onShelfChange}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
