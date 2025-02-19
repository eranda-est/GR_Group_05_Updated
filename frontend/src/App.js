import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import ForgotPassword from '../src/pages/User/ForgotPw';
import ChangePassword from '../src/pages/User/ChangePw';
import Footer from "./components/templates/Footer";

function App() {
  return (
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={< Home/>} />
          <Route path="/forgotpassword" element={< ForgotPassword/>} />
          <Route path="/changepassword" element={< ChangePassword/>} />
        </Routes>
      </Router>
  );
}

export default App;
