import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Splash from "./pages/Splash";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import Formulir from "./pages/Formulir";
import PengisianFormulir from "./pages/PengisianFormulir";
import Profile from "./pages/Profile"; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Splash />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/formulir" element={<Formulir />} />
      <Route
        path="/formulir/PengisianFormulir"
        element={<PengisianFormulir />}
      />
      <Route path="/about" element={<About />} />
    </Routes>
  );
}

export default App;
