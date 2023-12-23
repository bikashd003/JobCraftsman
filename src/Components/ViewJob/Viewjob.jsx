import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Viewjob.css";
import { PiMoneyFill } from "react-icons/pi";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import moment from "moment";
import { API } from "../../Services/Api.js";

const Viewjob = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [jobDetails, setJobDetails] = useState("");
  const { jobId } = useParams();
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
    if (!token) {
      setIsLoggedIn(false);
    }
  }, [token]);
  useEffect(() => {
    axios
      .get(`${API}/get-job/${jobId}`)
      .then((res) => {
        setJobDetails(res.data.job);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const createdAt = new Date(jobDetails.createdAt);
  const daysDifference = moment(createdAt, "YYYYMMDD").fromNow();

  return (
    <>
      <div className="main">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        {jobDetails ? (
          <div className="main-job-container">
            <div className="job-heading">
              <h3>
                {jobDetails.job.position} at {jobDetails.company.name}
              </h3>
            </div>
            <div className="job-description">
              <div className="createdAt-type">
                <p>{daysDifference}</p>
                <p>. {jobDetails.job.type}</p>
              </div>
              <div className="position">
                <h1>{jobDetails.job.position}</h1>
                {isLoggedIn ? (
                  <Link to={`/update-job/${jobDetails._id}`}>
                    <button className="edit-job">Edit job</button>
                  </Link>
                ) : (
                  ""
                )}
              </div>
              <div className="location">{jobDetails.job.location}</div>
              <div className="salary">
                <PiMoneyFill /> Stipend
              </div>
              <div className="money">
                <p>Rs {jobDetails.job.salary}/month</p>
              </div>

              <div className="about">
                <h1>About company</h1>
                <p>{jobDetails.company.about}</p>
              </div>
              <div className="description">
                <h1>About the job/internship</h1>
                <p>{jobDetails.job.description}</p>
              </div>
              <div className="skill-required">
                <h1>Skill(s) required</h1>
                <div className="skills">
                  {jobDetails.job.skillsRequired.map((skill) => (
                    <h1 key={skill}>{skill}</h1>
                  ))}
                </div>
              </div>
              <div className="additional-information">
                <h1>Additional Information</h1>
                <p>{jobDetails.job.additionalInformation}</p>
              </div>
            </div>
          </div>
        ) : (
          <h1 className="main-job-container">Loading</h1>
        )}
      </div>
    </>
  );
};

export default Viewjob;
