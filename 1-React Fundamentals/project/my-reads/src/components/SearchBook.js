import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import * as BooksAPI from './../utils/BooksAPI'
import BookShelf from './BookShelf'

class SearchBook extends Component {
  state = {
    books: [],
    query: ''
  }

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

  updateQuery = (query) => {
      this.setState({query: query.trim()})
      this.searchData(query.trim())
  }

  searchData = (data) => {
    if (data.length !== 0) {
      BooksAPI.search(data, 8).then((books) => {
          if(books.length > 0) {
            books = books.filter((book) => book.imageLinks)
            this.setState({ books })
          } else {
            this.setState({ books: [] })
          }
      })
    } else {
      this.setState({books: [], query: ''})
    }
  }

  render() {
    return (
      <div>
        <div className="search-books">
          <div className="search-books-bar">
            <Link className='close-search' to='/'>Close</Link>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={this.state.query}
                onChange={(event) => this.updateQuery(event.target.value)}
              />
            </div>
          </div>
          <div className="search-books-results">
            <ol className="books-grid"></ol>
          </div>
        </div>
        {this.state.query !== '' && this.state.books.length > 0 &&
          (<BookShelf
            shelfTitle="Search Result"
            books={this.state.books}
            onShelfChange={(id, shelf) => {
              this.props.onShelfChange(id, shelf)
            }}
          />)
        }
      </div>
    )
  }
}

export default SearchBook
