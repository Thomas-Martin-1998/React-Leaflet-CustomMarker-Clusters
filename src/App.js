import Map from './Map';
import './App.css';
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
