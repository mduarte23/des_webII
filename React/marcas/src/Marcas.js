import React from "react";

export default class Marcas extends React.Component {
    state = {
        marca: [],
    }

    // metodo para executar depois do componente montado
    componentDidMount() {
        fetch ("http://127.0.0.1:5000/marcas")
        .then((result) => result.json())
        .then((result) => {
            this.setState({
                marca: result,
            })
        })
    }

    render (){
        const result = this.state.marca.map((entry, index) => {
            return <li key={index}>{entry.nome}</li>
        })

        return <ul>{result}</ul>
    }
}