import React, { useState, useEffect } from "react";
import frontImg from "../../assets/front.png";
import axios from "axios";
import "./Login.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { API } from "../../Services/Api.js";
import { ToastContainer, toast } from "react-toastify";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(email === "" || password === "")
    {
      toast("Please all credentials")
    }
    await axios
      .post(`${API}/login`, {
        email: email,
        password: password,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("logged_user", response.data.recruiterName);
        setEmail("");
        setPassword("");
        toast("Login successfully")
        navigate("/");
      })
      .catch((error) => {
        if(error.message=="Invalid credentials")
        {
          toast("Invalid credentials")
        }
      });
  };
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
      <div className="login-container">
        <div className="left-side">
          <h1>Already have an account?</h1>
          <h4>Your personal job finder is here</h4>

          <form onSubmit={handleSubmit} className="login-form">
            <input
              type="text"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
            <ToastContainer />
          </form>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="sign-up-link">
              Sign Up
            </Link>
          </p>
        </div>
        <div
          className="right-side"
          style={{ background: `url(${frontImg}) center/cover no-repeat` }}
        >
          <h1>Your Personal Job Finder</h1>
        </div>
      </div>
    </>
  );
};

export default Login;
