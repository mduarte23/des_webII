from flask import Flask, send_from_directory
from marcas import marca_bp
from auth import auth_bp
from flask_cors import CORS 
import os

app = Flask(__name__,
            static_url_path='',
            static_folder='static')

CORS(app)

app.register_blueprint(marca_bp)
app.register_blueprint(auth_bp, url_prefix='/auth')

@app.route('/')
def home():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'index.html')

@app.route('/login')
def login_page():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'login.html')

if __name__ == "__main__":
    app.run()