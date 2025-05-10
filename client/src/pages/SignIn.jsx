import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import '../styles/SignIn.css';
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

export default function SignIn() {

  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id] : e.target.value,
    });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
  
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate('/'); 
    } catch (error) {
      dispatch(signInFailure(error.message));

    }
  };
  
  
  return (
    <div className="container">
      <div className="box-1">
        <form onSubmit={handleSubmit} className="frm">
          <div className="title">Sign In</div>
          <div className="input">
            <div>Email</div>
            <input type="email" id="email" onChange={handleChange}/>
          </div>
          <div className="input">
            <div>Password</div>
            <input type="password" id="password" onChange={handleChange}/>
          </div>
          <button  className="btn">
            {loading ? 'Loading...' : 'Sign In'}
          </button>
          <OAuth />
          <div className="text">
            Dont have an account? <Link to="/sign-up">Sign Up</Link>
          </div>
          {error && <p className='error-message'>{error}</p>}
       </form>
      </div>
      <div className="box-2"></div>
    </div>
  )
}
