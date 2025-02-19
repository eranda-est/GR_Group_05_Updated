import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import { GoogleOAuthProvider} from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode'; 

import '../css/signIn.css'
import logo from '../assets/logo.png';
import PageCorner from '../assets/pageCorner.png'
import or from '../assets/or.png'
import google from '../assets/google.png'
import SignInImg from '../assets/signInImg.jpeg'
import SignInImgPhone from '../assets/signInImgPhone.png'

const clientId = "908954668020-6ng0d40usd40g28594jtcuu8gguois4r.apps.googleusercontent.com"

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Resetting email and password");
    setEmail('');
    setPassword('');
  }, []);
  
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     navigate('/');
  //   }
  // }, [navigate]);


  useEffect(() => {
    if (window.google) {
      console.log("Google API is loaded");
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: handleGoogleSuccess,
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form default behavior (which causes page reload)

    try {
      const response = await axios.post('http://localhost:7000/api/users/login', { email, password });
      const { token } = response.data;
      localStorage.setItem('token', token); // Store token in localStorage
      setEmail(''); // Clear input fields
      setPassword('');
      navigate('/'); // Redirect to the home page (or any other page you want)
    } catch (error) {
       const errorMessage = error.response ? error.response.data.error : 'An error occurred';
    setErrorMessage(errorMessage); // Show error on the page
    alert(errorMessage); // Show alert with error message
    }
  }

  const handleGoogleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential; // Define 'token' before use
    console.log("Google Token:", token); // Debugging
   
    try {
      const res = await axios.post('http://localhost:7000/api/users/google-login', { token });

      console.log("Backend Response:", res.data); // Debugging

      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error.response?.data || error.message);
      alert('Google login failed: ' + (error.response?.data?.error || "Unknown error"));
  }
  };

  const handleGoogleFailure = () => {
    alert('Google Sign-In failed. Please try again.');
  };


  const handleGoogleLogin = () => {
    if (window.google && clientId) {
      window.google.accounts.id.initialize({
        client_id: clientId,  // Make sure the client_id is correctly passed here
        callback: handleGoogleSuccess,
      });
      window.google.accounts.id.prompt();  // Show the Google login prompt
    } else {
      alert('Google Sign-In script not loaded properly or client_id is missing.');
    }
  };



  return (
    <GoogleOAuthProvider clientId={clientId}>
    <div className='container'>
      {/* Left Side */}
      <div className="epwsk-left">
        <img src={SignInImg} alt="Sign In" className="epwsk-sign-in-img epwsk-desktop" />
        <img src={SignInImgPhone} alt="Sign In" className="epwsk-sign-in-img epwsk-mobile" />
        {/* Mobile Navigation */}
        <div className="epwsk-mobile-nav">
          <ul className="nav-links">
            <li>
              <Link to="#" className="nav-link">Sign In</Link>
            </li>
            <li>
              <Link to="/signup" className="nav-link">Sign Up</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Right Side */}
      <div className='epwsk-right'>
        {/* Desktop Logo & Design */}
        <img src={logo} alt="Logo" className="epwsk-logo" />
        <img src={PageCorner} alt="Design" className="epwsk-corner-design" />

        {/* Form Container */}
        <div className='epwsk-form-container'>
          <h2 className="epwsk-desktop-only">Sign In</h2> {/* Only for desktop */}
          <form onSubmit={handleSubmit}> {/* Add the onSubmit handler */}
            <input
              type="email"
              placeholder='Email'
              required
              className='epwsk-input-field'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                
              }}
              autoComplete="off"
              />
            <input
              type="password"
              placeholder="Password"
              required
              className='epwsk-input-field'
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Update password state
              autoComplete="new-password"
            />
          
            <p className='epwsk-forgot-password'>
               <Link to="/forgot-password" className="epwsk-forgot-password-link">Forgot password?</Link>
            </p>
            <button type="submit" className='epwsk-btn-signin'>Sign In</button> {/* This will now trigger the handleSubmit */}
            {/* {errorMessage && <p className="epwsk-error-message">{errorMessage}</p>} Show error if exists */}
            <p className='epwsk-forgot-password-mobile'> <Link to="/forgot-password" className="epwsk-forgot-password-link">Forgot password?</Link></p>
            <img src={or} alt="or" className='epwsk-or-divider' />
            <button type='button'className='epwsk-btn-google' onClick={handleGoogleLogin}>
              <img src={google} alt='Google' className='epwsk-google-icon' />Continue with Google
            </button>
   
            <p className='epwsk-signup-text'>Don't have an account?</p>
            <button type="button" className='epwsk-btn-signup'>
                <Link to="/signup" className="epwsk-link-signup">Sign Up</Link>
            </button>
          </form>
        </div>
      </div>
    </div>
    </GoogleOAuthProvider>
  );
}

export default SignIn;
