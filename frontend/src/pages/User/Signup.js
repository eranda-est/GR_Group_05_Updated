import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import signup from '../../assets/signup.png';
import logo from '../../assets/logo.png';
import googlelogo from '../../assets/google.png';
import pattern from '../../assets/pattern.png'
import '../../css/User/signup.css';

function Signup() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    isAdmin: false
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if passwords match before submitting
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:7000/api/user/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          isAdmin: formData.isAdmin || false
        }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Signup error:', error);
    }

    navigate('/signin')
  };



  return (
    <div className="epwsk-signup-container">
      <div className="epwsk-signup-box">
      <div className='epwsk-signup-pattern'><img src={pattern} width={150}/></div>
        {/* Left Side - Form */}
        <form className="epwsk-signup-form" onSubmit={handleSubmit}>
          <div className="epwsk-signup-header">
            <h2 className="epwsk-signup-title">Sign Up</h2>
            <img src={logo} alt="Gamage Recruiters" className="epwsk-signup-logo" />
          </div>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
            className="epwsk-signup-input"
            required
          />

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="epwsk-signup-input"
            required
          />

          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="epwsk-signup-input"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm Password"
            className="epwsk-signup-input"
            required
          />

          <button type="submit" className="epwsk-signup-button">Sign Up</button>

          <div className="epwsk-signup-divider">
            <hr className="epwsk-signup-hr" />
            <span className="epwsk-signup-or">Or</span>
            <hr className="epwsk-signup-hr" />
          </div>

          <button type="button" className="epwsk-signup-google-button">
            <img src={googlelogo} alt="Google" className="epwsk-signup-google-icon" />
            Continue With Google
          </button>

          <p className="epwsk-signup-footer">
            Already Have An Account? <a href="/signin" className="epwsk-signup-link">Sign In</a>
          </p>
        </form>

        {/* Right Side - Image */}
        <div className="epwsk-signup-image-container">
          <img src={signup} alt="Sign Up" className="epwsk-signup-image" />
        </div>
      </div>
    </div>
  );
}

export default Signup;
