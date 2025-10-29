import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import Register from "./pages/authentication/Register";
import Login from "./pages/authentication/Login";
import ProtectedRoute from "./ProtectedRoute";
import Home2 from "./pages/Home2";
import { Navigate } from "react-router";

/*


____   ____                   
\   \ /   /___   ____ _____   
 \   Y   /  _ \ /    \\__  \  
  \     (  <_> )   |  \/ __ \_
   \___/ \____/|___|  (____  /
                    \/     \/ 



*/

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={<ProtectedRoute content={<Home2 />} />}
          />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
