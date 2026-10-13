from flask import Flask, jsonify, request
import os

app = Flask(__name__)

@app.route("/api/make/recipie", methods=["POST"])
def make_recipie():
    data = request.get_json()
    dish = data["dish"]
    return jsonify({"recipe": f"You requested {dish}"})