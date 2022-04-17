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

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
  <BrowserRouter>
    <nav>
      <Link to="/"><Button variant="primary">Home</Button></Link>
      <Link to="/biserici"><Button variant="primary">Biserici</Button></Link>
      <Link to="/persoane"><Button variant="primary">Persoane</Button></Link>
    </nav>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/biserici" element={<Biserici />} />
      <Route path="/persoane" element={<Persoane />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
