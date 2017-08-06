import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

class Book extends Component {
  static propTypes = {
    imageURL: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    author: PropTypes.array.isRequired,
    shelf: PropTypes.string.isRequired,
    onShelfChange: PropTypes.func.isRequired
  }

  onBookShelfChange = (e) => {
    const shelf = e.target.value;
    this.props.onShelfChange(shelf);
  }

  render() {
    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url("${ this.props.imageURL.thumbnail }")` }}></div>
          <div className="book-shelf-changer">
            <select onChange={ this.onBookShelfChange } value={ this.props.shelf }>
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{`${this.props.title}`}</div>
        {this.props.author && this.props.author.map((author,index) => (
          <div key={index} className="book-authors">
            {author}
          </div>
        ))}
      </div>
    )
  }
}

export default Book
