import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GamePage from "./components/GamePage";
import Sidebar from "./components/Sidebar/Sidebar";
import './App.css'

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Routes>
          <Route path="/games/:id" element={<GamePage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
