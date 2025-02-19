import React, { useState } from 'react';
import '../../css/User/ForgotPw.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!email) {
      setMessage('Please enter a valid email.');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('http://localhost:5000/api/auth/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="epwsk container">
      <div className="epwsk container-FP">
        <div className="epwsk form-container-FP">
          <img src={require('../../assets/lines.png')} alt="Lines" className="epwsk lines-FP" />
          <img src={require('../../assets/logo.png')} alt="Logo" className="epwsk logo-FP" />
          <h2 className="epwsk title-FP">Forgot Password</h2>

          <input
            type="email"
            placeholder="Enter Your Mail"
            className="epwsk input-FP"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="epwsk button-FP" onClick={handleForgotPassword} disabled={loading}>
            {loading ? 'Sending...' : 'Send Code'}
          </button>

          {message && <p className="epwsk message-FP">{message}</p>}

          <a href="/signin" className="epwsk back-link-FP">Back To Sign In</a>
        </div>

        <div className="epwsk image-container-FP">
          <img src={require('../../assets/FpwDesktop.png')} alt="Security" className="epwsk side-image-FP" />
          <img src={require('../../assets/FpwMobile.png')} alt="Security" className="epwsk side-image-FP-Mobile" />
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
