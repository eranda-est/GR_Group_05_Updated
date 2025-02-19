import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import EnterCode from './pages/User/EnterCode';
import Signup from './pages/User/Signup';
import ForgotPassword from './pages/User/ForgotPw';
import ChangePassword from './pages/User/ChangePw';
import Footer from "./components/templates/Footer";

function App() {
  return (
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/enter-code" element={<EnterCode />} />
          <Route path="/user-signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
        </Routes>
        <Footer />
      </Router>
  );
}

export default App;
