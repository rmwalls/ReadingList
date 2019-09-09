import React, { Component } from "react";
import API from "API";

class Books extends Component {
    state = {
        books: [],
        title: "",
        author: "",
        description: "", 
        image: "",
        link: ""
    };

    componentDidMount() {
    this.loadBooks();
    }

    loadBooks = () => {
        API.getBooks()
        .then(res => this.setState({ books: res.data, title: "", author: "", description: ""}))
        .catch(err => console.log(err));
    };

    deleteBook = id => {
        API.deleteBook(id)
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
            if(this.state.title && this.state.author) {
            API.saveBook({
                title: this.state.title,
                author: this.state.author,
                description: this.state.description
            })
            .then(res => this.loadBooks())
            .catch(err => console.log(err));
        }
    };

    render() {
        return(
        <container fluid>
            <Row>
                <Col size="md-6">
                    <h1>What Books Should I Read?</h1>
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
                                placeholder="Author(required)"
                            />
                            <TextArea
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                name="description"
                                placeholder="description (Optional)"
                            />
                            <FormBtn 
                                disabled={!(this.state.author && this.state.title)}
                                >Submit Book
                            </FormBtn>
                        </form>
                    </Col>
                    <Col size="md-6 sm-12">
                        <h1>Books On My List</h1>
                        {this.state.books.length ? (
                            <List>
                                {this.state.books.map(book => {
                                    return (
                                        <ListItem key={book._id}>
                                            <a href={"/books/" + book._id}>
                                                <strong>
                                                    {book.title} by {book.author}
                                                </strong>
                                            </a>
                                            <DeleteBtn onClick={() => this.deleteBook(book._id)} />
                                        </ListItem>
                                    );
                                })}
                            </List>
                        ) : (
                            <h3>No Results to Display</h3>
                        )}
                    </Col>
                </Row>
            </container>
        )}
}