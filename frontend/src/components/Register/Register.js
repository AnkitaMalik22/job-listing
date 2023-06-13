import React,{useState} from 'react';
import axios from 'axios';
import './Register.css';
import { Link, useNavigate } from 'react-router-dom';
  


const Register = ({setUser,setAuth}) => {

const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


      axios.post(`${process.env.REACT_APP_API_URL}/api/register`,formData)
      .then ((res)=>{
        setAuth(true)
        setUser(res.data.recruiterName)
        localStorage.setItem('token',JSON.stringify(res.data.token));
        // console.log(res)
        navigate('/')
      })
      .catch((err)=>{
        console.log(err);
      })
      
    }
  

  return (
    <div className='register-container'>
        <div className="register-left">
<h3 className='reg-h'>Create an account</h3>
<p  className='reg-p' >Your personal job finder is here</p>

            <form className='register-form' onSubmit={handleSubmit}>

       
      
        <input type="text" name="name" placeholder='Name' value={formData.name} onChange={handleChange}  className='register-input'  />
  
        <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} className='register-input' />
 

     
        <input type="tel" name="mobile" placeholder='Mobile' value={formData.mobile} onChange={handleChange} className='register-input' />
   
  
     
        <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} className='register-input' />
        
        <div className='check-box'>
        <input type='checkbox' />
        <p>By creating an account, I agree to our terms of use and privacy policy</p>
        </div>
    
      <button type="submit" className='reg-submit'>Create Account</button>

            </form>
            
<p className='reg-p' >Already have an account? <a><b><Link to={'/login'}>Sign In</Link> </b></a></p>
            </div>

            <div className="register-right">
              <p style={{color: "white" , padding:"1rem", fontSize:"1.5rem" , textAlign : "center"}}>Your Personal Job Finder</p>
            </div>
    </div>
  )
}

export default Register