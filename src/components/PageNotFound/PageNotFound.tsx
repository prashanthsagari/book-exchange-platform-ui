import React from "react";
import { useNavigate } from "react-router-dom";
import "./PageNotFound.scss"; 

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="page-not-found-container">
      <h1 className="page-not-found-title">404</h1>
      <h2 className="page-not-found-subtitle">Page Not Found</h2>
      <p className="page-not-found-text">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <button className="page-not-found-button" onClick={goHome}>
        Go Back Home
      </button>
    </div>
  );
};

export default PageNotFound;
