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
  onBookShelfChange = (id, shelf) => {
    BooksAPI.update({id}, shelf).then(() => {
      this.componentDidMount()
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onShelfChange={(id, shelf) => {
              this.onBookShelfChange(id, shelf)
            }}
          />
        )}/>
        <Route path='/search' render={({ history }) => (
          <SearchBook
            mybooks={this.state.books}
            onShelfChange={(id, shelf) => {
              this.onBookShelfChange(id, shelf)
            }}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
