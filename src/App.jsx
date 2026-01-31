import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Home from "./pages/Home";

import StudentDashboard from './pages/StudentDashboard'
import TnpDashboard from './pages/TnpDashboard'
import Login from './pages/Login'
import Signup from './pages/Signup'
const App = () => {
  return (
    <Router>
      <Routes>
        {/* Hero section is only on Home route */}
        <Route path="/" element={<><Home /></>} />
      
       
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/tnp" element={<TnpDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
