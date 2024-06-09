import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main/Main";

function App() {
  return (
    <Router basename="/MUNRK-CRISIS">
       <Routes>
        <Route path="/" element={<Main />} />
       </Routes>
    </Router>
  );
}

export default App;
