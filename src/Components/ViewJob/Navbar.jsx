import React, { useState, useEffect } from "react";
import "./Viewjob.css";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import Rectangle1 from "../../assets/Rectangle1.png"
import Rectangle2 from "../../assets/Rectangle2.png"
import Rectangle3 from "../../assets/Rectangle3.png"

const Navbar = ({isLoggedIn,setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const recruiterName = localStorage.getItem("logged_user");

    if (token && recruiterName) {
      setUserName(recruiterName);
      setIsLoggedIn(true);
    }
  }, [isLoggedIn, token, setIsLoggedIn]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("logged_user");
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
<img src={Rectangle1} alt="" className="rectangle1"/>
<img src={Rectangle2} alt="" className="rectangle2"/>
<img src={Rectangle3} alt="" className="rectangle3"/>
        <div className="logo">
          <Link to="/"className="logo-link">Jobfinder</Link>
        </div>
        <div className="login-signup">
          {isLoggedIn ? (
            <>
              <button className="logout" onClick={handleLogout}>
                Logout
              </button>
              <span>Hello! {userName}</span>
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
