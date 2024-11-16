import React, { useEffect, useState } from 'react';
import { getAuthData } from '../api/apiService';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  // State variables for storing books data and loading/error states
  const [books, setBooks] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [isLoggedIn] = useState(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return isLoggedIn;
  });


  const [userInfo] = useState(() => {
    const savedUserInfo = sessionStorage.getItem('userInfo');
    return savedUserInfo ? JSON.parse(savedUserInfo) : null;
  });

  const navigate = useNavigate();
  useEffect(() => {
    const fetchBooks = async () => {
      if (isLoggedIn) {
        try {
          const response = await getAuthData(`/api/v1/book?userId=${userInfo.id}`);
  
          if (!response) {
            throw new Error('Failed to fetch books');
          }
          setBooks(response.data); // Store the fetched books data in the state
          setLoading(false); // Set loading to false after data is loaded
        } catch (err: any) {
          setError(err?.response?.data?.message || "An error occurred. Please try again."); // Handle errors and set error state
          setLoading(false); // Set loading to false on error
        }
      } else {
        // Navigate to the login page
        navigate('/login');
      }
    };
  
    // Check if `isLoggedIn` has a value before calling the API
    if (isLoggedIn !== null && isLoggedIn !== undefined) {
      fetchBooks();
    }
  }, [isLoggedIn]); // Add `isLoggedIn` as a dependency
  
 

  // Render the component based on the loading/error states
  if (loading) {
    return <div>Loading books...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      {
        isLoggedIn ? (

          <div>
            <h3 className='text-center'>Books from :  <span className="fs-6">{userInfo.username}</span></h3>
            <Container>
              <Row>
                {books.length > 0 ? (
                  books.map((book: any, index: number) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={3} className="mb-4">
                      <Card style={{ width: '100%' }}>
                        <Card.Body>
                          <Card.Title>Book Information</Card.Title>
                          <Card.Text><strong>Author:</strong> {book.author}</Card.Text>
                          <Card.Text><strong>Genre:</strong> {book.genre}</Card.Text>
                          <Card.Text><strong>Condition:</strong> {book.bookCondition}</Card.Text>
                          <Card.Text><strong>Location:</strong> {book.location}</Card.Text>
                          <Card.Text>

                            <strong>Book Status:</strong>{" "}
                            <span className={book.available ? 'text-success' : 'text-danger'}>
                              {book.available ? 'Available' : 'Not Available'}
                            </span>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))
                ) : (
                  <Col>
                    <p>No books found for this user.</p>
                  </Col>
                )}
              </Row>
            </Container>
          </div>
        ) : ("Not Logged in")}
    </>

  );
};

export default Dashboard;
