import { useState, useEffect } from 'react';
import {
  Container,
  Col,
  Form,
  Button,
  Card,
  Row
} from 'react-bootstrap';

import Auth from '../utils/auth';
import { searchGoogleBooks } from '../utils/API';
import { saveBookIds, getSavedBookIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';
import { SAVE_BOOK } from '../utils/mutations';

const SearchBooks = () => {
  // State to manage searched books
  const [searchedBooks, setSearchedBooks] = useState([]);
  // State to manage search input
  const [searchInput, setSearchInput] = useState('');

  // State to manage saved book IDs
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  // useEffect to save book IDs to local storage when the component unmounts
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  // Handler for form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Check if search input is empty
    if (!searchInput) {
      return false;
    }

    try {
      // Call the searchGoogleBooks function with the search input
      const response = await searchGoogleBooks(searchInput);

      // Check if the response is not ok
      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // Extract items from the response JSON
      const { items } = await response.json();

      // Map through the items and format book data
      const bookData = items.map((book) => ({
        bookId: book.id,
        authors: book.volumeInfo.authors || ['No author to display'],
        title: book.volumeInfo.title,
        description: book.volumeInfo.description,
        image: book.volumeInfo.imageLinks?.thumbnail || '',
      }));

      // Update state with the formatted book data
      setSearchedBooks(bookData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // Initialize the saveBook mutation
  const [saveBook, { error }] = useMutation(SAVE_BOOK);

  // Handler for saving a book
  const handleSaveBook = async (bookId) => {
    // Find the book to save from the searched books array
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // Check if the user is authenticated
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Execute the saveBook mutation
      const { data } = await saveBook({
        variables: { bookData: bookToSave },
      });

      // Update state with the saved book IDs
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* Header section */}
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Books!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='Search for a book'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      {/* Main content section */}
      <Container>
        <h2 className='pt-5'>
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : 'Search for a book to begin'}
        </h2>
        <Row>
          {/* Map through the searchedBooks array and render each book */}
          {searchedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? (
                    <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    {Auth.loggedIn() && (
                      <Button
                        disabled={savedBookIds?.some((savedBookId) => savedBookId === book.bookId)}
                        className='btn-block btn-info'
                        onClick={() => handleSaveBook(book.bookId)}>
                        {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                          ? 'This book has already been saved!'
                          : 'Save this Book!'}
                      </Button>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SearchBooks;
