import React, { useState } from "react";
import axios from "axios";
import './Register.css'
import frontImg from "../../assets/front.png";
import { Link,useNavigate } from "react-router-dom";
import {API} from "../../Services/Api.js"
import { ToastContainer, toast } from "react-toastify";


const Register = () => {
  const [recruiter, setRecruiter] = useState({
    email: "",
    password: "",
    name: "",
    mobile: "",
  });
  const navigate = useNavigate();
  const handleSubmit =async (e) => {
    e.preventDefault();
    if(recruiter.email==="" || recruiter.password===""|| recruiter.name===""|| recruiter.mobile===""){
      toast("Please fill all the credentials")
    }
  await  axios.post(`${API}/register`,{
      name: recruiter.name,
      email: recruiter.email,
      password: recruiter.password,
      mobile: recruiter.mobile,
    })
    .then((response) => {
      // console.log("Data sent successfully:", response.data);
      if(response.data.token){
        localStorage.setItem("token", response.data.token)
        localStorage.setItem("logged_user", response.data.recruiterName)
        navigate("/")
      }
    })
    .catch((error) => {
    if(error.error=="Email already exist" ){
      toast("Email already exist")
    };
    })
  };

  return (
    <>
      <div className="login-container">
        <div className="left-side">
          <h1>Create an account</h1>
          <h4>Your personal job finder is here</h4>

          <form
            onSubmit={handleSubmit}
            className="login-form"
          >
            <input
              type="text"
              placeholder="Name"
              value={recruiter.name}
              onChange={(e) => setRecruiter({ ...recruiter, name: e.target.value })} 
            />
            <input
              type="text"
              placeholder="Email"
              value={recruiter.email}
              onChange={(e) => setRecruiter({...recruiter,email:e.target.value})}
            />
            <input
              type="number"
              placeholder="Mobile"
              value={recruiter.mobile}
              onChange={(e) => setRecruiter({...recruiter,mobile:e.target.value})}

            />
            <input
              type="password"
              placeholder="Password"
              value={recruiter.password}
              onChange={(e) => setRecruiter({...recruiter,password:e.target.value})}

            />
            <ToastContainer />
            <button type="submit">Create Account</button>
          </form>
          <p>
            Already have an account?
            <Link to="/" className="sign-up-link">
             Sign In
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

export default Register;
