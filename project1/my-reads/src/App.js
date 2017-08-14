import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import ListBooks from './components/ListBooks'
import SearchBook from './components/SearchBook'
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }

  shelfChange = (updatedBook, shelf) => {
    BooksAPI.update(updatedBook, shelf).then(result => {
      this.setState(state => {
        let currentBooks = []
        const alreadyOnShelf = this.state.books.find(book => book.id === updatedBook.id)

        if (alreadyOnShelf) {
          currentBooks = state.books.map(book => {
            if (book.id === updatedBook.id) {
              book.shelf = shelf
            } else {
              book.shelf = "none"
            }
            return book
          })
        } else {
          updatedBook.shelf = shelf
          currentBooks = state.books.concat([updatedBook])
        }
        return { books: currentBooks };
      })
    })
  }

  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={books}
            onShelfChange={this.shelfChange}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBook
            currentBooks = {books}
            onShelfChange={this.shelfChange}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
