import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/global.scss';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard';
import PageNotFound from './components/PageNotFound/PageNotFound';
import Home from './components/Home';
import Registration from './pages/Registration/UserRegistration';
import Profile from './components/Profile/Profile';
import PasswordResetComponent from './components/PasswordResetComponent/PasswordResetComponent';
import BookAdder from './components/Book/BookAdder';
import Books from './components/Book/Books';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/registration' element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-book" element={<BookAdder />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/books" element={<Books />} />
          <Route path="/reset-password" element={<PasswordResetComponent />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
