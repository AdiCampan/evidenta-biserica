import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";
import { Button } from 'react-bootstrap';
import Home from './pages/Home';
import Biserici from './pages/Biserici';
import Persoane from './pages/Persoane';
import Contributii from './pages/Contributii';
import LogIn from './pages/Login/Login';
import SignUp from './pages/Login/SignUp';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {


  return (
    <BrowserRouter>
      <nav className='nav_bar'>
        <Link to="/"><Button variant="primary">Home</Button></Link>
        <Link to="/biserici"><Button variant="primary">Biserici</Button></Link>
        <Link to="/persoane"><Button variant="primary">Persoane</Button></Link>
        <Link to="/contributii"><Button variant="primary">Contributii</Button></Link>
        <Link to="/login"><Button variant="primary" style={{ marginLeft: '388px' }}>Log In</Button></Link>
      
        
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/biserici" element={<Biserici />} />
        <Route path="/persoane" element={<Persoane />} />
        <Route path="/contributii" element={<Contributii />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp/>} />
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
