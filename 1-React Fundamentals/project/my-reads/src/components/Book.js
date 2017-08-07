import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class Book extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired,
    shelf: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  render() {
    const { book, shelf, onShelfChange } = this.props
    console.log(book.title + " " + book.shelf)
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${ book.imageLinks.thumbnail }")` }}></div>
          <div className="book-shelf-changer">
            <select onChange={(e) => onShelfChange(book, e.target.value)} value={shelf}>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        {book.authors && book.authors.map((author, idx) => (
            <div key={idx} className="book-authors">{author}</div>
        ))}
      </div>
    )
  }
}

export default Book
