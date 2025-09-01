import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<ProtectedRoute content={<Home />} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
