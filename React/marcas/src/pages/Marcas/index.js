import "./Marcas.css"
import React, { useEffect, useState } from "react";
import Tabela from "../../components/Tabela";
import Formulario from "../../components/Formulario";
import CampoBusca from "../../components/InputBusca";
import Excluir from "../../components/Excluir";
import BotaoNovo from "../../components/BotaoNovo";



function Marcas({ onLogout }) {
    const [dados, setDados] = useState([]);
    const [filtro, setFiltro] = useState("");
    const [modalAberto, setModalAberto] = useState(false);
    const [marcaSelecionada, setMarcaSelecionada] = useState(null);
    const colunas = ["Nome", "CNPJ", "Nicho", "Site"];
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false);


    useEffect(() => {
        buscarMarcas();
    }, []);

    const buscarMarcas = () => {
        fetch("http://127.0.0.1:5000/marcas")
            .then((res) => res.json())
            .then((data) => setDados(data))
            .catch((err) => console.error("Erro ao buscar marcas:", err));
    };

    const handleEditar = (marca) => {
        setMarcaSelecionada(marca);
        setModalAberto(true);
    };

    const salvarMarca = (formData) => {
        const isEdicao = !!formData.id_marca;
        const url = isEdicao
            ? `http://127.0.0.1:5000/marca/${formData.id_marca}`
            : "http://127.0.0.1:5000/marca";

        fetch(url, {
            method: isEdicao ? "PUT" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao salvar marca");
                return res.json();
            })
            .then(() => {
                buscarMarcas();
            })
            .catch((err) => {
                console.error("Erro ao salvar marca:", err);
            });
    };


    const dadosFiltrados = dados.filter((marca) =>
        Object.values(marca)
            .join(" ")
            .toLowerCase()
            .includes(filtro.toLowerCase())
    );

    const handleExcluir = (marca) => {
        setMarcaSelecionada(marca);
        setModalExcluirAberto(true);
    };

    const confirmarExclusao = (id) => {
        fetch(`http://127.0.0.1:5000/marca/${id}`, {
            method: "DELETE",
        })
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao excluir marca");
                return res.json();
            })
            .then(() => {
                buscarMarcas();
            })
            .catch((err) => {
                console.error("Erro ao excluir marca:", err);
            });
    };

    const handleNovoCadastro = () => {
        setMarcaSelecionada(null); // limpa o formulário
        setModalAberto(true);
    };



    return (
        <div className="pagina-marcas">
            
            <div className="barra-topo">
                <h1 className="titulo-principal">Marcas Cadastradas</h1>
                <button className="btn-logout" onClick={onLogout}>Sair</button>
            </div>

            <div className="barra-superior">
                <CampoBusca valor={filtro} onChange={setFiltro} />
                <BotaoNovo texto="Nova Marca" onClick={handleNovoCadastro} />
            </div>


            <Tabela
                colunas={colunas}
                dados={dadosFiltrados}
                onEditar={handleEditar}
                onExcluir={handleExcluir}
            />

            <Formulario
                isOpen={modalAberto}
                onClose={() => setModalAberto(false)}
                marca={marcaSelecionada}
                onSalvar={salvarMarca}
            />

            <Excluir
                isOpen={modalExcluirAberto}
                onClose={() => setModalExcluirAberto(false)}
                marca={marcaSelecionada}
                onConfirmar={confirmarExclusao}
            />

        </div>
    );
}

export default Marcas;
