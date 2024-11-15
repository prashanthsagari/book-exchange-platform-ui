import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { clearAuthToken } from '../../utils/auth';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  // const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    return isLoggedIn;
  });

  const handleLogout = () => {
    clearAuthToken();
    navigate('/login');
  };

  // Update the state if sessionStorage changes (e.g., on login/logout)
  useEffect(() => {
    const checkLoginStatus = () => {
      setIsLoggedIn(sessionStorage.getItem('isLoggedIn'));
    };

    checkLoginStatus(); // Check login status on mount

    // You could also listen for changes to sessionStorage (optional)
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, [location]);

  return (
    <>
      <Navbar expand='lg' bg="dark" variant="dark" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to='/'>BOOK EXCHANGE PLATFORM</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'>

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



              <Nav.Link className='m-3 text-decoration-none' as={Link} to='/contact'>
                Contact Us
              </Nav.Link>

              {isLoggedIn == 'true' ? (
                <Nav.Link
                  className='m-3 text-decoration-none text-align-end'
                  as={Link}
                  to='/login'
                  onClick={handleLogout}
                  style={{
                    color: 'red',
                    fontWeight: 'bold',
                    textAlign: 'right'
                  }}
                >
                  Logout
                </Nav.Link>
              ) : (
                <Nav.Link className='m-3 text-decoration-none' as={Link} to='/login'
                style={{
                  color: '#3cd993',
                  fontWeight: 'bold',
                  textAlign: 'right'
                }}>
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
