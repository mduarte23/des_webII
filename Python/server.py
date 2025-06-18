from flask import Flask, send_from_directory
from marcas import marca_bp
from flask_cors import CORS 
import os

app = Flask(__name__,
            static_url_path='',
            static_folder='static')

CORS(app)

app.register_blueprint(marca_bp)

@app.route('/')
def home():
    return send_from_directory(os.path.join(app.root_path, 'static'), 'index.html')


if __name__ == "__main__":
    app.run()