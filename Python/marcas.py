import pymysql
from db_config import connect_db
from flask import jsonify
from flask import flash, request, Blueprint

marca_bp = Blueprint('marca_bp', __name__)

#busca todos usuarios
@marca_bp.route('/marcas')
def marca():
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM marca")
        rows = cursor.fetchall()
        resp = jsonify(rows)
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@marca_bp.route('/marca/<id>')
def marca_id(id):
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("SELECT * FROM marca WHERE id_marca=%s", (id))
        row = cursor.fetchall()
        resp = jsonify(row[0])
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()


@marca_bp.route('/marca', methods=['POST'])
def marcanova():
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        #pega os dados do JSON
        marca = request.json
        nome = marca['nome']
        nicho = marca['nicho']
        cnpj = marca['cnpj']
        site = marca['site']

        #insere no banco
        cursor.execute("INSERT INTO marca (nome, nicho, cnpj, site) VALUES (%s, %s, %s, %s)", (nome, nicho, cnpj, site))
        conn.commit()
        resp = jsonify({"message" : 'Marca criada com sucesso!'})
        resp.status_code = 200
        return resp
    
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()
    

@marca_bp.route('/marca/<id>', methods=['PUT'])
def marcaalterar(id):
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)

        #pega os dados do JSON
        marca = request.json
        nome = marca['nome']
        nicho = marca['nicho']
        cnpj = marca['cnpj']
        site = marca['site']

        #atualiza no banco
        cursor.execute("UPDATE marca SET nome=%s, nicho=%s, cnpj=%s, site=%s WHERE id_marca=%s", (nome, nicho, cnpj, site, id))
        conn.commit()
        resp = jsonify({"message" : 'Marca atualizada com sucesso!'})
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

@marca_bp.route('/marca/<id>', methods=['DELETE'])
def marcaexcluir(id):
    try:
        conn = connect_db()
        cursor = conn.cursor(pymysql.cursors.DictCursor)
        cursor.execute("DELETE FROM marca WHERE id_marca=%s", (id))
        conn.commit()
        resp = jsonify({"message" : 'Marca deletada com sucesso!'})
        resp.status_code = 200
        return resp
    except Exception as e:
        print(e)
    finally:
        cursor.close()
        conn.close()

