import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import QRScanner from './pages/QRScanner';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scan" element={<QRScanner />} />
      </Routes>
  );
}

export default App;
