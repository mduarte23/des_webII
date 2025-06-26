import React, { useState } from "react";
import "./App.css";
import Login from "./pages/Login";
import Marcas from "./pages/Marcas";

function App() {
  const [autenticado, setAutenticado] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const handleLoginSucesso = (token) => {
    localStorage.setItem("token", token);
    setAutenticado(true);
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  setAutenticado(false);
};


  return (
    <div>
      {autenticado ? (
        <Marcas onLogout={handleLogout} />

      ) : (
        <Login onLoginSucesso={handleLoginSucesso} />
      )}
    </div>
  );
}

export default App;
