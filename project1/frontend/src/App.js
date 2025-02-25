import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import Each from "./Pages/each.js";
import Home from "./Pages/home.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/:cat" element={<Each />} />
      </Routes>
    </Router>
  );
}

export default App;
