import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import { Button } from 'react-bootstrap';
import Home from './pages/Home';
import Biserici from './pages/Biserici';
import Persoane from './pages/Persoane';
import Contributii from './pages/Contributii';
import LogIn from './pages/Login/Login';
import SignUp from './pages/Login/SignUp';
import Persoana from './pages/Persoana/Persoana';
import './App.scss';
import Grafice from './pages/Grafice';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  BarElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement
);

function App() {

  const navClass = (isActive) => {
    return isActive ? "active" : "";
  }

  return (
    <BrowserRouter>
      <nav className='nav-bar'>
        <div>
          <Button as={NavLink} to="/" className={navClass} variant="primary">Home</Button>
          <Button as={NavLink} to="/biserici" className={navClass} variant="primary">Biserici</Button>
          <Button as={NavLink} to="/persoane" className={navClass} variant="primary">Persoane</Button>
          <Button as={NavLink} to="/contributii" className={navClass} variant="primary">Contributii</Button>
          <Button as={NavLink} to="/grafice" className={navClass} variant="primary">Grafice</Button>
        </div>
        <div>
          <Link to="/login"><Button variant="primary">Log In</Button></Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biserici" element={<Biserici />} />
        <Route path="/persoane" element={<Persoane />} />
        <Route path="/persoane/:id" element={<Persoana />} />
        <Route path="/contributii" element={<Contributii />} />
        <Route path="/grafice" element={<Grafice />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
