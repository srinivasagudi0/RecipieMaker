from flask import Flask, jsonify, request
import os
from flask_cors import CORS
import json
from openai import OpenAI

app = Flask(__name__)
CORS(app)
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)


def ask_recipie(prompt):
    # Ask OpenAI to generate a recipe
    prompt = f"""
        You are a creative chef. Generate a delicious, beginner-friendly
        recipe based on: {prompt}

        Include exact measurements, cooking times, clear instructions,
        substitutions, and useful tips. Respect dietary preferences.

        Return ONLY valid JSON in this structure:

        {{
            "name": "Dish name",
            "description": "Short description",
            "prep_time": "10 minutes",
            "cook_time": "20 minutes",
            "servings": 2,
            "ingredients": [
                {{"name": "Potatoes", "quantity": "2 medium"}}
            ],
            "instructions": [
                "Step 1",
                "Step 2"
            ],
            "substitutions": [
                {{"original": "Butter", "alternative": "Olive oil"}}
            ],
            "tips": [
                "Cooking tip"
            ]
        }}

        Return no markdown, explanations, or text outside the JSON.
    """
    response = client.responses.create(
        model="gpt-4.1-mini",
        input=prompt,
    )

    return response.output_text

@app.route("/api/make/recipe", methods=["POST"])
def make_recipie():
    data = request.get_json()
    dish = data["dish"]
    recipie = json.loads(ask_recipie(dish))
    name = recipie["name"] 
    description = recipie["description"]
    prep_time = recipie["prep_time"]
    cook_time = recipie["cook_time"]
    servings = recipie["servings"]
    ingredients = recipie["ingredients"]
    instructions = recipie["instructions"]
    substitutions = recipie["substitutions"]
    tips = recipie["tips"]

    return jsonify({
        "name": name,
        "description": description,
        "prep_time": prep_time,
        "cook_time": cook_time,
        "servings": servings,
        "ingredients": ingredients,
        "instructions": instructions,
        "substitutions": substitutions,
        "tips": tips
    })
app.run(debug=True)