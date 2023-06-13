import React, { useEffect, useState } from "react";
import Header from "./Header";
import "./home.css";
import Card from "../Card/Card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = ({ isAuthenticated, user }) => {

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [jobs, setJobs]=useState([])


useEffect(() => {
  handleFilterJobs()
}, [])

const handleSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  //   jobs based on search

  };

  const handleSkillChange = (event) => {
    const selectedSkill = event.target.value;
    if (selectedSkill !== 'Skills' && !selectedSkills.includes(selectedSkill)) {
      const updatedSkills = [...selectedSkills, selectedSkill];
      setSelectedSkills(updatedSkills);
      handleFilterJobs(updatedSkills);
    }
   
  };

  const removeSkill = (skill) => {
    const updatedSkills = selectedSkills.filter((selectedSkill) => selectedSkill !== skill);
    setSelectedSkills(updatedSkills);
    handleFilterJobs(updatedSkills);  };

//   Filter Jobs

const handleFilterJobs = (skills) => {
skills = skills && skills.length >0 ? skills : [""]
  console.log(`${process.env.REACT_APP_API_URL}/api/jobs/${JSON.stringify(skills)}`,skills);
  axios
    .get(`${process.env.REACT_APP_API_URL}/api/jobs/${JSON.stringify(skills)}`)
    .then((res) => {
      setJobs(res.data.data);
      console.log(res.data.data);
    })
    .catch((error) => {
      console.log(`ERROR: ${error}`);
    });
};



  return (
    <div className=" flex">
      <div className="home">
        <Header isAuthenticated={isAuthenticated} user={user} />
        <div className="job-conatiner">
          <div className="job-input-container">
            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 27 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ position: "absolute", top: "190px", left: "340px" }}
              >
                <path
                  d="M21.3073 19.4279L27 25.1193L25.1193 27L19.4279 21.3073C17.3103 23.0049 14.6763 23.9282 11.9622 23.9244C5.35906 23.9244 0 18.5653 0 11.9622C0 5.35906 5.35906 0 11.9622 0C18.5653 0 23.9244 5.35906 23.9244 11.9622C23.9282 14.6763 23.0049 17.3103 21.3073 19.4279ZM18.6411 18.4417C20.3279 16.707 21.2699 14.3818 21.2661 11.9622C21.2661 6.82111 17.1019 2.65827 11.9622 2.65827C6.82111 2.65827 2.65827 6.82111 2.65827 11.9622C2.65827 17.1019 6.82111 21.2661 11.9622 21.2661C14.3818 21.2699 16.707 20.3279 18.4417 18.6411L18.6411 18.4417Z"
                  fill="#9C9C9C"
                />
              </svg>
              <input
                type="text"
                name="search"
                placeholder="Type any job title"
                className="job-input"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div
              className="select-skill flex"
              style={{
                flexDirection: "row",
                margin: "0 4rem",
                width: "87%",
                justifyContent: "flex-start",
              }}
            >
              <select
                style={{ marginRight: "1rem" }}
                onChange={handleSkillChange}
                className="selected-skill-input"
              >
                <option value="Skills">Skills</option>
                <option value="React">React</option>
                <option value="Node">Node</option>
                <option value="MongoDB">
                MongoDB
                </option>
              </select>

              {selectedSkills.map((skill,index) => (
              <div className="selected-skills flex" key={index}>
                <div className="selected-skill flex">
                  <div
                    className="skill-name"
                    style={{
                      backgroundColor: "#FFEEEE",
                      padding: "0.5rem 1rem",
                    }}
                  >
                    {skill}
                  </div>
                  <div
                    className="close"
                    style={{
                      color: "#ffff",
                      backgroundColor: "#FF6B6B",
                      padding: "0.5rem 0.6rem",
                      cursor: "pointer",
                    }}
                    onClick={() => removeSkill(skill)}
                  >
                    x
                  </div>
                </div>
            
         
              </div>
                ))}

    
              {isAuthenticated && selectedSkills ? (
                <div className="al-clear" style={{ right: "800px" }} onClick={()=>setSelectedSkills([])}>
                  Clear
                </div>
              ) : (<div className="clear" onClick={()=>setSelectedSkills([])}>Clear</div>)}
              {isAuthenticated && (
                <button
                  className="add-job"
                  onClick={() => navigate("/job/add")}
                >
                  + Add Job
                </button>
              )}
            </div>
          </div>
          <div className="jobs" style={{ width: "100%" }}>
          {
            jobs && jobs.map((job,index)=>{
              return <Card key={index} job={job}/>
            })
          }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
