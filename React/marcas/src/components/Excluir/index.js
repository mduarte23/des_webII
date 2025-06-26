import React from "react";
import "./Excluir.css";

function Excluir({ isOpen, onClose, marca, onConfirmar }) {
  if (!isOpen || !marca) return null;

  const handleConfirmar = () => {
    onConfirmar(marca.id_marca);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Confirmar Exclusão</h2>
        <p>Tem certeza que deseja excluir a marca <strong>{marca.nome}</strong>?</p>
        <div className="modal-buttons">
          <button onClick={handleConfirmar} className="btn-excluir-modal">Excluir</button>
          <button onClick={onClose} className="cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default Excluir;
