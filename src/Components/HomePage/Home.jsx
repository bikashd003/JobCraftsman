import React, { useEffect, useState } from "react";
import "./Home.css";
import Navbar from "../ViewJob/Navbar";
import { IoSearch } from "react-icons/io5";
import { TbCurrencyRupee } from "react-icons/tb";
import { Await, Link } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";
import { LuPlus } from "react-icons/lu";
import axios from "axios";
import { API } from "../../Services/Api.js";

const Home = () => {
  const [job, setJob] = useState([]);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [filterValues, setFilterValues] = useState([]);
  const [searchValues, setSearchValues] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const getJob = async () => {
    await axios
      .get(`${API}/get-jobs`)
      .then((res) => {
        setJob(res.data.jobs);
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      });
  };
  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
    if (!token) {
      setIsLoggedIn(false);
    }
    getJob();
  }, [token]);

  const handleSearch = async (e) => {
    try {
      if (e) {
        e.preventDefault();
      }
      if (filter && !filterValues.includes(filter)) {
        setFilterValues((prev) => [...prev, filter]);
      }
      console.log(filter);
      console.log(filterValues);
      let apiUrl = `${API}/get-jobs?`;

      if (search) {
        apiUrl += `position=${search}&`;
      }

      if (filterValues.length > 0) {
        apiUrl += `skills=${filterValues}&`;
        console.log(apiUrl);
      }

      await axios
        .get(apiUrl)
        .then((response) => {
          const jobs = response.data.jobs;
          console.log(jobs);
          if (jobs && jobs.length > 0) {
            setJob(jobs);
          } else {
            setJob([]);
          }
        })
        .catch((error) => {
          console.error("Error fetching jobs:", error);
        });
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }

    if (search && !searchValues.includes(search)) {
      setSearchValues((prev) => [...prev, search]);
    }
  };

  useEffect(() => {
    if (filter) {
      handleSearch();
    }
  }, [filter, filterValues]);

  const handleClear = (type, index) => {
    if (type === "filter") {
      setFilterValues((prev) => prev.filter((_, i) => i !== index));
      setFilter("");
    } else if (type === "search") {
      setSearchValues((prev) => prev.filter((_, i) => i !== index));
    }
    if (filter) {
      getJob();
    }
  };

  const handleAllClear = () => {
    setFilter("");
    setSearch("");
    setFilterValues([]);
    getJob();
  };
  return (
    <>
      <div className="main">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <div className="search-container">
          <form className="search-box" onSubmit={handleSearch}>
            <span className="search-icon">
              <IoSearch />
            </span>
            <input
              type="text"
              placeholder="Type any job title"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
          <div className="filter-items-container">
            <div className="skills-option">
              <select
                value={filter}
                name="skills"
                id="skills"
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">Skills</option>
                <option value="HTML">HTML</option>
                <option value="CSS">CSS</option>
                <option value="JavaScript">JavaScript</option>
                <option value="React.js">React.js</option>
                <option value="Node">Node</option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
              </select>
            </div>
            {filterValues.length > 0
              ? filterValues.map((value, index) => (
                  <div className="selected-itmes" key={index}>
                    <h1>{value}</h1>
                    <span>
                      <RxCross1 onClick={() => handleClear("filter", index)} />
                    </span>
                  </div>
                ))
              : ""}

            {searchValues.length > 0
              ? searchValues.map((value, index) => (
                  <div className="selected-itmes" key={index}>
                    <h1>{value}</h1>
                    <span>
                      <RxCross1 onClick={() => handleClear("search", index)} />
                    </span>
                  </div>
                ))
              : ""}

            {isLoggedIn && (
              <Link to="/add-job" className="add-button">
                <button>
                  <LuPlus />
                  Add job
                </button>
              </Link>
            )}
          </div>
          {(filterValues.length > 0 || searchValues.length > 0) && (
            <h4 className="clear-btn" onClick={handleAllClear}>
              clear
            </h4>
          )}
        </div>
        <div className="job-container-wraper">
          {job.length > 0 ? (
            job.map((jobData) => {
              return (
                <div className="job-container" key={jobData._id}>
                  <div className="left-job-details">
                    <div className="company-icon">
                      <img
                        src={jobData.company.logoURL}
                        alt={jobData.company.name}
                      />
                    </div>
                    <div className="job-details">
                      <h3>{jobData.job.position}</h3>
                      <div className="salary-location">
                        <p>
                          <TbCurrencyRupee /> {jobData.job.salary}
                        </p>
                        <p>{jobData.job.location}</p>
                      </div>

                      <div className="job-types">
                        <p>{jobData.job.remoteOrOffice}</p>
                        <p>{jobData.job.type}</p>
                      </div>
                    </div>
                  </div>
                  <div className="right-job-details">
                    <div className="skills">
                      {jobData.job.skillsRequired.map((skill) => {
                        return <h1 key={skill}>{skill}</h1>;
                      })}
                    </div>
                    <div className="job-buttons">
                      {isLoggedIn ? (
                        <Link to={`/update-job/${jobData._id}`}>
                          <button className="edit-job">Edit job</button>
                        </Link>
                      ) : (
                        ""
                      )}
                      <Link to={`/view-job/${jobData._id}`}>
                        <button className="view-job">View details</button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })
          ) : error ? (
            <h1>No job available</h1>
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
