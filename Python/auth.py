from flask import Blueprint, request, jsonify
from db_config import connect_db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        
        if not data or 'login' not in data or 'senha' not in data:
            return jsonify({'error': 'Login e senha são obrigatórios'}), 400
        
        login = data['login']
        senha = data['senha']
        
        conn = connect_db()
        cursor = conn.cursor()
        
        # Consulta simples para verificar se o usuário existe
        query = "SELECT * FROM login WHERE login = %s AND senha = %s"
        cursor.execute(query, (login, senha))
        
        user = cursor.fetchone()
        
        cursor.close()
        conn.close()
        
        if user:
            return jsonify({
                'success': True,
                'message': 'Login realizado com sucesso',
                'user': {
                    'login': user[0] if user else None
                }
            }), 200
        else:
            return jsonify({
                'success': False,
                'message': 'Login ou senha incorretos'
            }), 401
            
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@auth_bp.route('/register', methods=['POST'])
def register():
    try:
        data = request.get_json()
        
        if not data or 'login' not in data or 'senha' not in data:
            return jsonify({'error': 'Login e senha são obrigatórios'}), 400
        
        login = data['login']
        senha = data['senha']
        
        conn = connect_db()
        cursor = conn.cursor()
        
        # Verificar se o usuário já existe
        check_query = "SELECT * FROM login WHERE login = %s"
        cursor.execute(check_query, (login,))
        
        if cursor.fetchone():
            cursor.close()
            conn.close()
            return jsonify({'error': 'Usuário já existe'}), 409
        
        # Inserir novo usuário
        insert_query = "INSERT INTO login (login, senha) VALUES (%s, %s)"
        cursor.execute(insert_query, (login, senha))
        
        conn.commit()
        cursor.close()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Usuário registrado com sucesso'
        }), 201
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500

@auth_bp.route('/users', methods=['GET'])
def get_users():
    try:
        conn = connect_db()
        cursor = conn.cursor()
        
        query = "SELECT login FROM login"
        cursor.execute(query)
        
        users = cursor.fetchall()
        
        cursor.close()
        conn.close()
        
        user_list = [{'login': user[0]} for user in users]
        
        return jsonify({
            'success': True,
            'users': user_list
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro interno do servidor: {str(e)}'}), 500 