import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import '../styles/SignUp.css'

export default function SignUp() {

  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in'); 
    } catch (error) {
      setLoading(false);
      setError(error.message);

    }
  };
  
  
  return (
    <div className="container">
      <div className="box-1">
        <form onSubmit={handleSubmit} className="frm">
          <div className="title">Sign Up</div>
          <div className="input">
            <div>Username</div>
            <input type="text" id="username" onChange={handleChange}/>
          </div>
          <div className="input">
            <div>Email</div>
            <input type="email" id="email" onChange={handleChange}/>
          </div>
          <div className="input">
            <div>Password</div>
            <input type="password" id="password" onChange={handleChange}/>
          </div>
          <button  className="btn">
            {loading ? 'Loading...' : 'Sign Up'}
          </button>
          <OAuth />
          <div className="text">
            Already have an account? <Link to="/sign-in">Sign In</Link>
          </div>
          {error && <p className='error-message'>{error}</p>}
       </form>
      </div>
      <div className="box-2"></div>
    </div>
  )
}
