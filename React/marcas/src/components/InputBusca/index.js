import React from "react";
import "./InputBusca.css";

function CampoBusca({ valor, onChange }) {
    return (
        <div className="campo-busca-container">
            <input
                type="text"
                className="campo-busca"
                placeholder="Pesquisar..."
                value={valor}
                onChange={(e) => onChange(e.target.value)}
            />
            {valor && (
                <button className="btn-limpar" onClick={() => onChange("")}>
                    ×
                </button>
            )}
        </div>
    );
}

export default CampoBusca;
