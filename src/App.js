import Map from './pages/Map';
import './App.css';
import { useParams } from 'react-router-dom';
import { Route, Routes } from "react-router-dom";

function App() {

  const { actionId } = useParams();


  return (
    <div className="App">
      <Routes>
        <Route path="" element={<Map />} />
      </Routes>
    </div>
  );
}

export default App;
