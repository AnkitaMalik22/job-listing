import './AddJob.css'
import React from 'react'

const AddJob = () => {
  return (
    <div className='add-job-container'>
    <div className="add-job-left">
<h3 className='reg-h'>Add job description</h3>
<form className='add-job-form'>


  <div className="flex input-box">
    <label htmlFor="Company Name " style={{marginRight:"1rem"}}>Company Name </label>
  <input type="text" name="name" placeholder='Enter your company name here'  className='add-job-input'  />
  </div>


  <div className="flex input-box">
    <label htmlFor="logo URL" style={{marginRight:"1rem"}}>Add logo URL</label>
  <input type="text" name="logo-url" placeholder='Enter the link'  className='add-job-input'  />
  </div>



  <div className="flex input-box">
    <label htmlFor="Job position " style={{marginRight:"1rem"}}>Job position</label>
  <input type="text" name="job-position" placeholder='Enter job position'  className='add-job-input'  />
  </div>


  <div className="flex input-box">
    <label htmlFor="Monthly salary" style={{marginRight:"1rem"}}>Monthly salary</label>
  <input type="text" name="salary" placeholder='Enter Amount in rupees'  className='add-job-input'  />
  </div>


  <div className="flex input-box select-type-box"  >
    <label htmlFor="Job Type" >Job Type</label>
  <select className='add-job-input input-select-type' style={{marginLeft:"6.4rem"}}>
    <option value="Select">Select</option>
  </select>
  </div>


  <div className="flex input-box select-type-box" >
    <label htmlFor="Remote/office" >Remote/office</label>
  <select className='add-job-input input-select-type' style={{marginLeft:"4.1rem"}}>
    <option value="Select">Select</option>
  </select>
  </div>

  <div className="flex input-box">
    <label htmlFor="Location" style={{marginRight:"1rem"}}>Location</label>
  <input type="text" name="location" placeholder='Enter Location'  className='add-job-input'  />
  </div>


  <div className="flex input-box">
    <label htmlFor="Job Description" style={{marginRight:"1rem"}}>Job Description</label>
    <textarea type="text" name="job-des" placeholder='Type the job description'  className='add-job-input' style={{fontFamily:'DM Sans',height:"2rem"}}  />
  </div>


  <div className="flex input-box">
    <label htmlFor="About Company" style={{marginRight:"1rem"}}>About Company</label>
    <textarea type="text" name="about" placeholder='Type about your company'  className='add-job-input' style={{fontFamily:'DM Sans',height:"2rem"}}  />
  </div>


  <div className="flex input-box">
    <label htmlFor="Skills Required" style={{marginRight:"1rem"}}>Skills Required</label>
  <input type="text" name="skills" placeholder='Enter the must have skills'  className='add-job-input'  />
  </div>

<div className="edit-job-btns flex">
  <button className=" buttons edit-btns" style={{border: '1px solid #c2c2c2',backgroundColor:"transparent",color:'#C2C2C2'}}>Cancel</button>
  <button className="buttons   edit-btns" style={{backgroundColor:'#ED5353',color:'#ffff'}}>+ Add Job</button>
</div>

</form>
</div>
<div className="add-job-right">
              <p style={{color: "white" , padding:"1rem", fontSize:"1.5rem" , textAlign : "center"}}>Recruiter add job details here</p>
            </div>
    </div>
  )
}

export default AddJob