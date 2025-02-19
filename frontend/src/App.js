import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
import Footer from "./components/templates/Footer";
import Signup from './pages/User/Signup'

function App() {
  return (
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={< Home/>} />
          <Route path="/user-signup" element={<Signup/>}/>
        </Routes>
      </Router>
  );
}

export default App;
