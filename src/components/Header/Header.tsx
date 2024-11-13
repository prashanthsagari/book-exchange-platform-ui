import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { clearAuthToken } from '../../utils/auth';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<string | null>('false');

  const handleLogout = () => {
    clearAuthToken();
    setIsLoggedIn('false');
    // const history = createBrowserHistory();
    // history.go(0);
    navigate('/login');
  };

  useEffect(() => {
    setIsLoggedIn(sessionStorage.getItem('isLoggedIn'));
  }, []);

  return (
    <>
      <Navbar expand='lg' bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to='/'>BOOK EXCHANGE PLATFORM App</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>
              {/* <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Login</Nav.Link>
            <Nav.Link href="#link">Dashboard</Nav.Link> */}
              <Nav.Link as={Link} to='/' className='m-3 text-decoration-none'>
                Home
              </Nav.Link>

              {isLoggedIn === 'true' ? (
                ''
              ) : (
                <Nav.Link className='m-3 text-decoration-none' as={Link} to='/registration'>
                  Register User
                </Nav.Link>
              )}

              {isLoggedIn === 'true' ? (
                <Nav.Link className='m-3 text-decoration-none' as={Link} to='/dashboard'>
                  Dashboard
                </Nav.Link>
              ) : (
                ''
              )}

              {isLoggedIn === 'true' ? (
                <Nav.Link className='m-3 text-decoration-none' as={Link} to='/profile'>
                  Profile
                </Nav.Link>
              ) : (
                ''
              )}

              {/* {isLoggedIn === 'true' ? (
              <Nav.Link className='m-3 text-decoration-none' as={Link} to='/favorites'>
                Favorites
              </Nav.Link>
            ) : (
              ''
            )} */}

              <Nav.Link className='m-3 text-decoration-none' as={Link} to='/contact'>
                Contact Us
              </Nav.Link>

              {isLoggedIn == 'true' ? (
                <Nav.Link
                  className='m-3 text-decoration-none'
                  as={Link}
                  to='/login'
                  onClick={handleLogout}
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link className='m-3 text-decoration-none' as={Link} to='/login'>
                  Login
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>

  );
};

export default Header;
