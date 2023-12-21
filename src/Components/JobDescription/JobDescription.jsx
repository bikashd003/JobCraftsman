import React, { useEffect, useState } from "react";
import wallpaper from "../../assets/wallpaper.png";
import { LuPlus } from "react-icons/lu";
import "./JobDescription.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useParams, useNavigate } from "react-router-dom";
import {API} from "../../Services/Api.js"

const JobDescription = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [jobDetails, setJobDetails] = useState(null);
  const token = localStorage.getItem("token");
  const headers = {
    token: token,
  };
  const updateJobDetails=()=>{
    if (jobDetails) {
      setJob((prevJob) => ({
        ...prevJob,
        companyName: jobDetails?.company?.name || "",
        logoURL: jobDetails?.company?.logoURL || "",
        about: jobDetails?.company?.about || "",
        position: jobDetails?.job?.position || "",
        type: jobDetails?.job?.type || "",
        location: jobDetails?.job?.location || "",
        remoteOrOffice: jobDetails?.job?.remoteOrOffice || "",
        salary: jobDetails?.job?.salary || "",
        description: jobDetails?.job?.description || "",
        skillsRequired: jobDetails?.job?.skillsRequired || "",
        additionalInformation: jobDetails?.job?.additionalInformation || "",
      }));
    }
  }
  useEffect(() => {
    axios
      .get(`${API}/get-job/${jobId}`)
      .then((response) => {
        setJobDetails(response.data.job);
      })
      .catch((error) => {
        console.log(error);
      });
      updateJobDetails();
  }, []);
  useEffect(()=>{
updateJobDetails();
  },[jobDetails])
  const [job, setJob] = useState({
    companyName: "",
    logoURL: "",
    about: "",
    position: "",
    type: "",
    location: "",
    remoteOrOffice: "",
    salary: "",
    description: "",
    skillsRequired: "",
    additionalInformation: "",
  });
  const handleSubmit = (event) => {
    if (
      job.companyName === "" || job.logoURL === "" || job.about === "" || job.position === "" ||
      job.type === "" || job.location === "" || job.remoteOrOffice === "" || job.salary === "" ||
      job.description === "" || job.skillsRequired === "" || job.additionalInformation === ""
    ) {
      toast("All field is required");
    }
    event.preventDefault();
   
    axios
      .post(
        `${API}/create-job`,
        {
          company: {
            name: job.companyName,
            logoURL: job.logoURL,
            about: job.about,
          },
          job: {
            position: job.position,
            type: job.type,
            location: job.location,
            remoteOrOffice: job.remoteOrOffice,
            salary: job.salary,
            description: job.description,
            skillsRequired: job.skillsRequired,
            additionalInformation: job.additionalInformation,
          },
        },
        {
          headers: headers,
        }
      )

      .then(() => {
        navigate("/");
        toast("Job add successfully");
      })
      .catch((error) => {
        console.error("Error sending data:", error);
      });
  };
  const handleCancel = () => {
    navigate("/");
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    axios.put(`${API}/update-job/${jobId}`,
    {
      company: {
        name: job.companyName,
        logoURL: job.logoURL,
        about: job.about,
      },
      job: {
        position: job.position,
        type: job.type,
        location: job.location,
        remoteOrOffice: job.remoteOrOffice,
        salary: job.salary,
        description: job.description,
        skillsRequired: job.skillsRequired,
        additionalInformation: job.additionalInformation,
      },
    },
    {
      headers: headers,
    })
    .then(() => {
      toast("Job updated successfully");
      navigate("/");
  })
    .catch((error) => {
      toast("Error sending data:");
    })
  }
  //which jobs are created which person only that person can edit that perticular job
  return (
    <>
      <div className="update-job-container">
        <div className="left-side">
          <h1>Add job description</h1>
          <form className="add-job" >
            <div className="job-details">
              <label htmlFor="company-name">Company Name </label>
              <input
                type="text"
                id="company-name"
                placeholder="Enter your company name here"
                value={job.companyName}
                onChange={(e) =>
                  setJob({ ...job, companyName: e.target.value })
                }
              />
            </div>
            <div className="job-details">
              <label htmlFor="logo-url">Add logo URL </label>
              <input
                type="text"
                id="logo-url"
                placeholder="Enter the link"
                value={job.logoURL}
                onChange={(e) => setJob({ ...job, logoURL: e.target.value })}
              />
            </div>
            <div className="job-details">
              <label htmlFor="position">Job position</label>
              <input
                type="text"
                id="position"
                placeholder="Enter job position"
                value={job.position}
                onChange={(e) => setJob({ ...job, position: e.target.value })}
              />
            </div>
            <div className="job-details">
              <label htmlFor="salary">Monthly salary</label>
              <input
                type="text"
                id="salary"
                placeholder="Enter Amount in rupees"
                value={job.salary}
                onChange={(e) => setJob({ ...job, salary: e.target.value })}
              />
            </div>
            <div className="type-container">
              <h5>Job Type</h5>
              <div className="job-type">
                <select
                  name="type"
                  id="type"
                  value={job.type}
                  onChange={(e) => setJob({ ...job, type: e.target.value })}
                >
                  <option value="">Select</option>
                  <option value="full time">Full time</option>
                  <option value="part time">Part time</option>
                </select>
              </div>
            </div>
            <div className="type-container">
              <h5>Remote/office</h5>
              <div className="remote-office">
                <select
                  name="remote-office"
                  id="remote-office"
                  value={job.remoteOrOffice}
                  onChange={(e) =>
                    setJob({ ...job, remoteOrOffice: e.target.value })
                  }
                >
                  <option value="">Select</option>
                  <option value="remote">Remote</option>
                  <option value="office">Office</option>
                </select>
              </div>
            </div>
            <div className="job-details">
              <label htmlFor="location">location</label>
              <input
                type="text"
                id="location"
                placeholder="Enter Location"
                value={job.location}
                onChange={(e) => setJob({ ...job, location: e.target.value })}
              />
            </div>
            <div className="description">
              <h5>Job Description</h5>
              <div className="textarea">
                <textarea
                  placeholder="Type the job description"
                  name="description"
                  id="description"
                  rows="5"
                  value={job.description}
                  onChange={(e) =>
                    setJob({ ...job, description: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="description">
              <h5>About company</h5>
              <div className="textarea">
                <textarea
                  placeholder="Type about your company"
                  name="about"
                  id="about"
                  rows="5"
                  value={job.about}
                  onChange={(e) => setJob({ ...job, about: e.target.value })}
                ></textarea>
              </div>
            </div>
            <div className="job-details">
              <label htmlFor="skills-required">Skills required</label>
              <input
                type="text"
                id="skills-required"
                placeholder="Enter the must have skills"
                value={job.skillsRequired}
                onChange={(e) =>
                  setJob({ ...job, skillsRequired: e.target.value })
                }
              />
            </div>
            <div className="job-details">
              <label htmlFor="information">Information</label>
              <input
                type="text"
                id="information"
                placeholder="Enter the the additional information"
                value={job.additionalInformation}
                onChange={(e) =>
                  setJob({ ...job, additionalInformation: e.target.value })
                }
              />
            </div>
            <div className="buttons">
                <button onClick={handleCancel} className="cancel-btn">Cancel</button>
             {jobId ? (  <button onClick={handleUpdate}>
                Update Job
              </button>):( <button type="submit" onClick={handleSubmit}>
                <LuPlus /> Add Job
              </button>)}
              <ToastContainer position="top-left" />
            </div>
          </form>
        </div>

        <div
          className="right-side"
          style={{ background: `url(${wallpaper}) center/cover no-repeat` }}
        >
          <h1>Recruiter add job details here</h1>
        </div>
      </div>
    </>
  );
};

export default JobDescription;
