import React from "react";
import "./BotaoNovo.css";

function BotaoNovo({ texto = "Novo", onClick }) {
  return (
    <button className="botao-novo" onClick={onClick}>
      + {texto}
    </button>
  );
}

export default BotaoNovo;
