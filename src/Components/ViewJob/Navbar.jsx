import React, { useState, useEffect } from "react";
import "./Viewjob.css";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';

const Navbar = ({isLoggedIn,setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const recruiterName = localStorage.getItem("recruiterName");

    if (token && recruiterName) {
      setUserName(recruiterName);
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, token, setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("recruiterName");
    setUserName("");
    setIsLoggedIn(false);
    setToken("");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <nav>
        <div className="logo">
          <Link to="/"className="logo-link">Jobfinder</Link>
        </div>
        <div className="login-signup">
          {isLoggedIn ? (
            <>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
              <span>Hello! {userName}!</span>
            </>
          ) : (
            <>
              <button className="login" onClick={handleLogin}>
                Login
              </button>
              <button className="register" onClick={handleRegister}>
                Register
              </button>
            </>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
