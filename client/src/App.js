import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from './pages/Signup'
import Login from './pages/Login'
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      
    </div>
  );
}

export default App;