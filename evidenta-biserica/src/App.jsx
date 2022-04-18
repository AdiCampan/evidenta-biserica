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


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
//   const myStyle={
//     backgroundImage: "src/desk2.png",
//     height:'100vh',
//     marginTop:'-70px',
//     fontSize:'50px',
//     backgroundSize: 'cover',
//     backgroundRepeat: 'no-repeat',
// };
  return (
    <BrowserRouter>
      <div >
      
        <nav>
          <Link to="/"><Button variant="primary">Home</Button></Link>
          <Link to="/biserici"><Button variant="primary">Biserici</Button></Link>
          <Link to="/persoane"><Button variant="primary">Persoane</Button></Link>
          <Link to="/contributii"><Button variant="primary">Contributii</Button></Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/biserici" element={<Biserici />} />
          <Route path="/persoane" element={<Persoane />} />
          <Route path="/contributii" element={<Contributii />} />
        </Routes>
        {/* <img src={desk2} width='1000' height='800'></img> */}
      </div>
    </BrowserRouter>
  )
}

export default App
