import React, { useEffect, useState } from "react";
import "./Formulario.css";

function Formulario({ isOpen, onClose, onSalvar, marca }) {
  const [formData, setFormData] = useState({
    nome: "",
    cnpj: "",
    nicho: "",
    site: ""
  });

  useEffect(() => {
    if (marca) {
      setFormData(marca);
    } else {
      setFormData({ nome: "", cnpj: "", nicho: "", site: "" });
    }
  }, [marca]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSalvar(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{marca ? "Editar Marca" : "Cadastrar Nova Marca"}</h2>
        <form onSubmit={handleSubmit}>
          <label>Nome:</label>
          <input name="nome" value={formData.nome} onChange={handleChange} required />

          <label>CNPJ:</label>
          <input name="cnpj" value={formData.cnpj} onChange={handleChange} required />

          <label>Nicho:</label>
          <input name="nicho" value={formData.nicho} onChange={handleChange} required />

          <label>Site:</label>
          <input name="site" value={formData.site} onChange={handleChange} required />

          <div className="modal-buttons">
            <button type="submit">{marca ? "Salvar Alterações" : "Cadastrar"}</button>
            <button type="button" onClick={onClose} className="cancelar">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Formulario;
