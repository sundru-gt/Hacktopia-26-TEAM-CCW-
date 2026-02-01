import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Home from "./pages/Home";

import StudentDashboard from './pages/StudentDashboard'
import TnpDashboard from './pages/TnpDashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
 import Opportunities from './components/Opportunities';
import About from "./pages/About";
import TnpCoordinators from "./pages/Tnp";
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Hero section is only on Home route */}
        <Route path="/" element={<><Home /></>} />
      
       
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
        <Route path="/tnp" element={<TnpCoordinators />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/tnp" element={<TnpDashboard />} />

<Route path="/opportunities" element={<Opportunities />} />

      </Routes>
    </Router>
  );
};

export default App;
