const myModal = new bootstrap.Modal(document.getElementById('modalcadastro'))
const modalexcluir = new bootstrap.Modal('#excluir')
var idmarcaatual;

function novo(){
    idmarcaatual = 0;
    document.getElementById('nome').value= "";
    document.getElementById('nicho').value= "";
    document.getElementById('cnpj').value= "";
    document.getElementById('site').value= "";
    myModal.show();
}

function salvar(){
    let nome = document.getElementById('nome').value;
    let nicho = document.getElementById('nicho').value;
    let cnpj = document.getElementById('cnpj').value;
    let site = document.getElementById('site').value;

    let marca = {
        nome: nome,
        nicho: nicho,
        cnpj: cnpj,
        site: site
    };

    let url;
    let metodo;
    if (idmarcaatual > 0){
        //ALTERAR
        url = "http://127.0.0.1:3333/marca/" + idmarcaatual;
        metodo = "PUT";
    }else{
        //INSERIR
        url = "http://127.0.0.1:3333/marca";
        metodo = "POST";
    }


    fetch(url, {
        method: metodo, 
        headers: {
            'Content-Type': 'application/json'
        },      
        body: JSON.stringify(marca)
    }).then(function(){
        //recarrega a lista
        listar();
        //escone o modal
        myModal.hide();
    });
}



function alterar(idmarca){
    idmarcaatual = idmarca;
    fetch('http://127.0.0.1:3333/marca/'+ idmarcaatual)
    .then(res => res.json())
    .then(dados =>{
        document.getElementById('nome').value = dados.nome;
        document.getElementById('nicho').value = dados.nicho;
        document.getElementById('cnpj').value = dados.cnpj;
        document.getElementById('site').value = dados.site;
        myModal.show();
    });
    

}


function excluir(idmarca){
    //recebe o id para a variavel global
	idmarcaatual = idmarca;
	//exibe o modal
	modalexcluir.show();
}

function excluirsim(){
    //requisiçao para chamar API alterar
    //chama a API passando o id
    fetch("http://127.0.0.1:3333/marca/" + idmarcaatual,
            {method: "DELETE"}
    ).then(resp => resp.json())
    .then(function (resposta){
        alert(resposta.mensagem);
        //esconde o modal
        modalexcluir.hide();
        //lista as funçoes ovamente
        listar();
    });
}

function listar(){
    const lista = document.getElementById('lista');
    lista.innerHTML = '<tr><td colspan="5">Aguarde, carregando...</td></tr>';

    fetch('http://127.0.0.1:3333/marca')
    .then(res => res.json())
    .then(dados => mostrar(dados));
}

function mostrar(dados){
    const lista = document.getElementById('lista');
    lista.innerHTML = '';

    for (let i in dados){
        lista.innerHTML +=  "<tr>" +
                            "<td>" + dados[i].id_marca + "</td>" +
                            "<td>" + dados[i].nome + "</td>" +
                            "<td>" + dados[i].nicho + "</td>" +
                            "<td>" + dados[i].cnpj + "</td>" +
                            "<td>" + dados[i].site + "</td>" +
                            "<td>" +
                            "<button type='button' class='btn btn-warning' onclick='alterar("+dados[i].id_marca+")'>Alterar</button>" +
                            "<button type='button' class='btn btn-danger' onclick='excluir("+dados[i].id_marca+")'>Excluir</button>" +
                            "</td>" +
                            "</tr>";
    }

    
}

