import React,{useState} from 'react'
import './Login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


const Login = ({setUser,setAuth}) => {
const navigate = useNavigate();

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


      axios.post(`${process.env.REACT_APP_API_URL}/api/login`,formData)
      .then ((res)=>{
        setAuth(true)
        setUser(res.data.recruiterName)
        localStorage.setItem('token',JSON.stringify(res.data.token));
        navigate('/')
      })
      .catch((err)=>{
        alert(err);
      })
      
    }

  return (
    <div className='login-container'>
        <div className="login-left">
<h3 className='reg-h'>Already have an account?</h3>
<p  className='reg-p' >Your personal job finder is here</p>

            <form className='login-form' onSubmit={handleSubmit}>

       
      
      
  
        <input type="email" name="email" placeholder='Email' value={formData.email} onChange={handleChange} className='login-input' />
 

     
      
  
     
        <input type="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} className='login-input' />
        
      
    
      <button type="submit" className='reg-submit'>Sign in</button>

            </form>
            
<p className='reg-p' >Don’t have an account? <a><b><Link to={'/register'}>Sign Up</Link></b></a></p>
            </div>

            <div className="login-right">
              <p style={{color: "white" , padding:"1rem", fontSize:"1.5rem" , textAlign : "center"}}>Your Personal Job Finder</p>
            </div>
    </div>
  )
}

export default Login