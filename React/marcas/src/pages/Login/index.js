import React, { useState } from "react";
import "./Login.css";

function Login({ onLoginSucesso }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ login, senha }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Usuário ou senha inválidos");
        return res.json();
      })
      .then((data) => {
        if (onLoginSucesso) {
          onLoginSucesso(data.token);
        }
      })
      .catch((err) => {
        setErro(err.message);
      });
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2 className="titulo-login">Gerenciamento de Marcas</h2>

        {erro && <p className="erro">{erro}</p>}

        <label>Login:</label>
        <input
          type="text"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />

        <label>Senha:</label>
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default Login;
