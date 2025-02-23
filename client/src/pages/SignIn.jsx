import React from 'react';
import { Link } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import '../styles/SignIn.css'

export default function SignIn() {
  return (
    <div className="container">
      <div className="box-1">
        <form className="frm">
          <div className="title">Sign In</div>
          <div className="input">
            <div>Username</div>
            <input type="text" id="username"/>
          </div>
          <div className="input">
            <div>Email</div>
            <input type="email" id="email"/>
          </div>
          <div className="input">
            <div>Password</div>
            <input type="password" id="password"/>
          </div>
          <button  className="btn">
            Sign In
          </button>
          <button className="btn google-btn">
            <span className="icon">
              <FaGoogle />
            </span>
            Continue with Google
          </button>
          <div className="text">
            Don't have an account? <Link to="/sign-up">Sign Up</Link>
          </div>
        
       </form>
      </div>
      <div className="box-2"></div>
    </div>
  )
}
