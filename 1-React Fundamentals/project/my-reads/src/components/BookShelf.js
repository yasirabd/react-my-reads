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
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfTitle}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((book) => (
              <li key = {book.id}>
                <Book
                  imageURL = {book.imageLinks}
                  title = {book.title}
                  author = {book.authors}
                  shelf = {book.shelf}
                  onShelfChange = {(shelf) => {
                    this.props.onShelfChange(book.id, shelf)
                  }}
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
