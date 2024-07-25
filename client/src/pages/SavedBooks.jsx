import { useState } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { REMOVE_BOOK } from '../utils/mutations';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

const SavedBooks = () => {
  // Execute the GET_ME query and destructure loading and data from the response
  const { loading, data } = useQuery(GET_ME);
  // If data exists, set userData to data.me, otherwise set it to an empty object
  const userData = data?.me || {};

  // Initialize the removeBook mutation
  const [removeBook, { error }] = useMutation(REMOVE_BOOK);

  // Handler for deleting a book
  const handleDeleteBook = async (bookId) => {
    // Check if the user is authenticated
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      // Execute the removeBook mutation
      const { data } = await removeBook({
        variables: { bookId },
      });

      // Remove the book ID from local storage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  // Display a loading message while the GET_ME query is loading
  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      {/* Header section */}
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>

      {/* Main content section */}
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {/* Map through the savedBooks array and render each book */}
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4" key={book.bookId}>
                <Card border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
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

export default SavedBooks;