import React from "react";
import "./Tabela.css";

function Tabela({ colunas, dados, onEditar, onExcluir }) {
    return (
        <div className="tabela-container">
            <table className="tabela">
                <thead>
                    <tr>
                        {colunas.map((coluna, index) => (
                            <th key={index} className="tabela-cabecalho">
                                {coluna}
                            </th>
                        ))}
                        <th className="tabela-cabecalho">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {dados.map((linha, index) => (
                        <tr key={index} className="tabela-linha">
                            {colunas.map((coluna, idx) => (
                                <td key={idx} className="tabela-celula">
                                    {coluna === "Site" && linha.site ? (
                                        <a href={linha.site.startsWith("http") ? linha.site : `https://${linha.site}`} target="_blank" rel="noopener noreferrer">
                                            {linha.site}
                                        </a>
                                    ) : (
                                        linha[coluna.toLowerCase()] ?? "-"
                                    )}
                                </td>

                            ))}
                            <td className="tabela-celula tabela-acoes">
                                <button onClick={() => onEditar && onEditar(linha)} className="btn-editar">✏️</button>
                                <button onClick={() => onExcluir && onExcluir(linha)} className="btn-excluir">🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tabela;
