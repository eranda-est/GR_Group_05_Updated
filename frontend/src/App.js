import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./pages/Home";
// import Footer from "./components/templates/Footer";
import EnterCode from './pages/User/EnterCode';

function App() {
  return (
      <Router>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={< Home/>} />
        </Routes>

        <Routes>
          {/* Main Routes */}
          <Route path="enter-code" element={< EnterCode/>} />
        </Routes>
      </Router>
  );
}

export default App;
