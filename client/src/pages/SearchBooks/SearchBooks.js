import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
//import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
//import BookCard from '../components/BookCard';

// Function to format the book results as they are returned from the API.  Allows for a single component 'BookCard'
// that can be used in both pages.
const formatBookResults = axiosApiResults => {
  const bookArray = [];

  axiosApiResults.map(book => {
    const formattedBook = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors
        ? book.volumeInfo.authors : ['No Author Found.'],
      synopsis: book.volumeInfo.synopsis
        ? book.volumeInfo.synopsis : 'No Synopsis Found.',
      axiosBookId: book.id,
      thumbnail: book.volumeInfo.imageLinks
        ? book.volumeInfo.imageLinks.thumbnail
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/170px-No_image_available.svg.png',
      link: book.volumeInfo.canonicalVolumeLink,
    };
    console.log("formattedBook " + formattedBook);
    bookArray.push(formattedBook);
    return bookArray
  });
  return bookArray;
};

class SearchBooks extends Component {
  state = {
    search: "",
    title: "",
    author: "",
    synopsis: "",
    results: [],
    error: ""
  };

  // When the component mounts, get list of books
  // componentDidMount() {
  //   API.getBooks()
  //     .then(res => this.setState({ books: res.data.message }))
  //     .catch(err => console.log(err));
  // }


// handle input change
// handleInputChange = event => {
//   this.setState({search: event.target.value})
// };

 // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

// On Submit, retrieve results
// from Axios/Google Books API.
handleFormSubmit = event => {
  event.preventDefault();
  // console.log(`Search for: ${this.state.search}`);
  API.getBook(this.state.search)
    .then(res => {
      const formattedArray = formatBookResults(res.data.items);
      this.setState({results: formattedArray});
    })
    .catch(err => console.log(err))
};

    // When Save Button Clicked, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleSaveBook = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        synopsis: this.state.synopsis
      })
        .then(result => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container>
        <Row>
          <Col size="md-8">
            <Jumbotron>
              <h1>Let's Find A Book!</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (optional)"
              />
              <FormBtn
                disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search
              </FormBtn>
            </form>
          </Col>
        </Row>
      </Container>
      )}}  

export default SearchBooks;      