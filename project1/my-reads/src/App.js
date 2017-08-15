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
    this.fetchAllBooks()
  }

  fetchAllBooks() {
    BooksAPI.getAll().then((books) => this.setState({ books }))
  }

  changeShelf = (updatedBook, shelf) => {
    BooksAPI.update(updatedBook, shelf).then(() => {
      this.setState(state => {
        let currentBooks = []
        const alreadyOnShelf = state.books.find(book => book.id === updatedBook.id)
        if (alreadyOnShelf) {
          currentBooks = state.books.map(book => {
            if (book.id === updatedBook.id) {
              book.shelf = shelf
            }
            return book
          })
        } else {
          updatedBook.shelf = shelf
          currentBooks = state.books.concat([updatedBook])
        }
        return {books: currentBooks}
      })
    })
  }
  handler = (books) => {
    this.setState({books})
  }
  render() {
    const { books } = this.state
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={books}
            onShelfChange={this.changeShelf}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBook
            currentBooks={books}
            handler={this.handler}
            onShelfChange={this.changeShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
