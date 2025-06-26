
# API de Login - Versão Didática

Este projeto implementa uma API de autenticação simples com Flask para fins didáticos.

## Estrutura do Banco de Dados

A tabela `login` deve ter a seguinte estrutura:
```sql
CREATE TABLE login (
    login VARCHAR(255) PRIMARY KEY,
    senha VARCHAR(255) NOT NULL
);
```

## Endpoints da API

### 1. Login
- **URL**: `/auth/login`
- **Método**: `POST`
- **Body**:
```json
{
    "login": "usuario",
    "senha": "senha123"
}
```
- **Resposta de Sucesso** (200):
```json
{
    "success": true,
    "message": "Login realizado com sucesso",
    "user": {
        "login": "usuario"
    }
}
```
- **Resposta de Erro** (401):
```json
{
    "success": false,
    "message": "Login ou senha incorretos"
}
```

### 2. Registro
- **URL**: `/auth/register`
- **Método**: `POST`
- **Body**:
```json
{
    "login": "novo_usuario",
    "senha": "senha123"
}
```
- **Resposta de Sucesso** (201):
```json
{
    "success": true,
    "message": "Usuário registrado com sucesso"
}
```
- **Resposta de Erro** (409):
```json
{
    "error": "Usuário já existe"
}
```

### 3. Listar Usuários
- **URL**: `/auth/users`
- **Método**: `GET`
- **Resposta** (200):
```json
{
    "success": true,
    "users": [
        {"login": "usuario1"},
        {"login": "usuario2"}
    ]
}
```

## Páginas Web

### Página de Login
- **URL**: `/login`
- Interface web para fazer login e registro

## Como Executar

1. Certifique-se de que o MySQL está rodando e acessível
2. Configure as credenciais do banco em `db_config.py`
3. Execute o servidor:
```bash
python server.py
```
4. Acesse `http://localhost:5000/login` para usar a interface web

## Características da Versão Didática

- **Simples**: Sem criptografia de senhas
- **Direto**: Consultas SQL básicas
- **Fácil de entender**: Código limpo e comentado
- **Ideal para aprendizado**: Foca nos conceitos básicos de API

## Dependências

- Flask
- Flask-CORS
- PyMySQL

Instale as dependências com:
```bash
pip install flask flask-cors pymysql
```

## Exemplo de Uso

```bash
# Registrar um usuário
curl -X POST http://localhost:5000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"login":"teste","senha":"123"}'

# Fazer login
curl -X POST http://localhost:5000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"login":"teste","senha":"123"}'

# Listar usuários
curl http://localhost:5000/auth/users
``` 