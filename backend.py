from flask import Flask, jsonify, request
import os
from flask_cors import CORS



app = Flask(__name__)
CORS(app)

@app.route("/api/make/recipe", methods=["POST"])
def make_recipie():
    data = request.get_json()
    dish = data["dish"]
    return jsonify({"dish": f"You requested {dish}"})
app.run(debug=True)