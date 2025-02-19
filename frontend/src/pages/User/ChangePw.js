import React, { useState } from 'react';
import '../../css/User/ChangePw.css';

const ChangePassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');  // Assuming user enters email

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/password/change', {  // Adjust if API URL differs
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, newPassword })
      });

      const data = await response.json();
      alert(data.message);

      if (response.ok) {
        // Optional: Redirect user to login page
        window.location.href = '/signin';
      }
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="epwsk container">
      <div className="epwsk form-container">
        <img src={require('../../assets/lines.png')} alt="Gamage Recruiters Logo" className="epwsk lines" />
        <img src={require('../../assets/logo.png')} alt="Gamage Recruiters Logo" className="epwsk logo" />
        <h2 className="epwsk title">Change Your Password</h2>
        
        <input 
          type="email" 
          placeholder="Enter your email" 
          className="epwsk input" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="Enter new password" 
          className="epwsk input" 
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input 
          type="password" 
          placeholder="Confirm new password" 
          className="epwsk input-1" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button className="epwsk button" onClick={handleChangePassword}>
          Change Password
        </button>
      </div>

      <div className="epwsk image-container">
        <img src={require('../../assets/ChangePwDesktop.png')} alt="Security Image" className="epwsk side-image" />
        <img src={require('../../assets/ChangePwImgMobile.png')} alt="Security Image Mobile" className="epwsk side-image-mobile" />
      </div>
    </div>
  );
};

export default ChangePassword;

