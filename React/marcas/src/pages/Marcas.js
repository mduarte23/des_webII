import React from "react";
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "../components/ui/table";

import { Input } from "../components/ui/input";


// importando icones 
import { FiEdit, FiTrash2 } from "react-icons/fi";


export default class Marcas extends React.Component {
    state = {
        marcas: [],
        carregando: true,
        erro: null,
        busca: "",
    }

    componentDidMount() {
        fetch("http://127.0.0.1:5000/marcas")
            .then((res) => {
                if (!res.ok) throw new Error("Erro ao buscar marcas")
                return res.json()
            })
            .then((data) => this.setState({ marcas: data, carregando: false }))
            .catch((err) => this.setState({ erro: err.message, carregando: false }))
    }

    // método para atualizar o campo de busca
    handleBusca = (e) => {
        this.setState({ busca: e.target.value });
    };

    render() {
        const { marcas, carregando, erro, busca } = this.state;

        // filtrando as marcas com base na busca
        const marcasFiltradas = marcas.filter((m) =>
            `${m.nome} ${m.nicho} ${m.site}`.toLowerCase().includes(busca.toLowerCase())
        );

        return (
            <div className="p-8">
                <h1 className="text-2xl font-bold mb-4">Lista de Marcas</h1>

                {/* campo de busca */}
                <div className="max-w-sm mb-4">
                    <Input
                        type="text"
                        placeholder="Buscar por nome, nicho ou site..."
                        value={busca}
                        onChange={this.handleBusca}
                    />
                </div>

                {carregando && <p className="text-gray-500">Carregando...</p>}
                {erro && <p className="text-red-500">Erro: {erro}</p>}

                {!carregando && !erro && (
                    <Table>
                        <TableCaption>Lista de marcas cadastradas</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Nome</TableHead>
                                <TableHead>Nicho</TableHead>
                                <TableHead>CNPJ</TableHead>
                                <TableHead>Site</TableHead>
                                <TableHead className="text-center">Ações</TableHead> {/* 👈 nova coluna */}
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {/* exibe as marcas aplicando filtro */}
                            {marcasFiltradas.map((marca) => (
                                <TableRow key={marca.id_marca}>
                                    <TableCell>{marca.id_marca}</TableCell>
                                    <TableCell>{marca.nome}</TableCell>
                                    <TableCell>{marca.nicho}</TableCell>
                                    <TableCell>{marca.cnpj}</TableCell>
                                    <TableCell>{marca.site}</TableCell>
                                    <TableCell className="text-center">
                                        <div className="flex gap-2 justify-center">
                                            <button
                                                onClick={() => console.log("Editar", marca.id_marca)}
                                                className="text-blue-600 hover:text-blue-800"
                                                title="Editar">
                                                <FiEdit size={18} />
                                            </button>
                                            <button
                                                onClick={() => console.log("Excluir", marca.id_marca)}
                                                className="text-red-600 hover:text-red-800"
                                                title="Excluir">
                                                <FiTrash2 size={18} />
                                            </button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                        <TableFooter>
                            <TableRow>
                                <TableCell colSpan="5" className="text-center">
                                    Total: {marcas.length} marcas
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                )}
            </div>
        )
    }
}
