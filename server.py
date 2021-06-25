from flask import (
    Flask, jsonify,render_template,send_from_directory,request,
)
from flask_cors import CORS
from base64 import b64encode

app = Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

STATIC_DIR = "/home/jlbagrel/Bureau/demo_web_spa"

tickets_restants = 10

def creer_numero(n, nom, prenom):
    return b64encode((str(n) + nom + prenom).encode("utf-8")).decode("utf-8")

@app.route("/tickets_restants", methods=["GET"])
def get_tickets_restants():
    global tickets_restants
    return {"tickets": tickets_restants}

@app.route("/reserver", methods=["POST"])
def post_reserver():
    global tickets_restants
    if tickets_restants <= 0:
        return {"numero": None}
    else:
        n = tickets_restants
        tickets_restants -= 1
        corps = request.get_json()
        print(corps)
        return {"numero": creer_numero(n, corps["nom"], corps["prenom"]) }

@app.route("/")
def serve_index():
    return send_from_directory(STATIC_DIR, "index.html")

@app.route("/client.js", methods=["GET"])
def serve_app_js():
    return send_from_directory(STATIC_DIR, "client.js")
