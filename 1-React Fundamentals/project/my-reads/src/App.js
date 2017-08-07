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

  shelfChange = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.componentDidMount()
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
            mybooks={books}
            onShelfChange={this.shelfChange}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
