// async: espera a resposta da função para executar o restante do codigo
async function connect() {
    // verifica se a conexao ja foi feita
    if (global.connection && global.connection.state != "disconnected"){
        return global.connection;
    }
    // Conexao com bd
    const mysql = require("mysql2/promise");
    const connection = await mysql.createConnection(
        {
            host: "127.0.0.1", user: "root",
            password:"98245803", database: "marca"
        }
    );
    global.connection = connection;
    return connection;
}

// Inserir nova marca
exports.post = async(req, res, next) =>{
    const con = await connect();
    const sql = "INSERT INTO marca (nome, nicho, cnpj, site) VALUES (?,?,?,?)";
    const values = [req.body.nome, req.body.nicho, req.body.cnpj, req.body.site];
    await con.query(sql, values);
    res.status(201).send("INSERIDO COM SUCESSO");
}

// Alterar marca
exports.put = async(req, res, next) =>{
    let id = req.params.id;
    const con = await connect();
    const sql = "UPDATE marca SET nome = ?, nicho = ?, cnpj = ?, site = ? WHERE id_marca = ?";
    const values = [req.body.nome, req.body.nicho, req.body.cnpj, req.body.site, id];
    await con.query(sql, values);
    res.status(201).send("ALTERADO COM SUCESSO ID:" + id);
}

// Excluir marca
exports.delete = async(req, res, next) =>{
    let id = req.params.id;
    const con = await connect();
    const sql = "DELETE FROM marca WHERE id_marca = ?";
    const values = [id];
    await con.query(sql, values);
    res.status(200).json({ mensagem: "EXCLUIDO COM SUCESSO" });
}

// Busca todas marcas
exports.get = async(req, res, next) =>{
    const con = await connect();
    const [rows] = await con.query("SELECT * FROM marca");
    res.status(200).send(rows);
}

// Busca marca por id
exports.getById = async(req, res, next) =>{
    let id = req.params.id;
    const con = await connect();

    try {
        const [rows] = await con.query("SELECT * FROM marca WHERE id_marca = ?", [id]);
        if (rows.length != 0) {
            res.status(200).send(rows[0]);
        } else { 
            res.status(404).send("NOT FOUND");
        }
        
    } catch (error) {
        res.status(500).send("ERRO");
    }
}