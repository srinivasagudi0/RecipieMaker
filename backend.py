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
        recipe based on the (item): {prompt}

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

def ask_pantry_recpie(items):
    prompt= f"""
        You are very creative chef. You are given ingredients the user have. Try to come up with 4-7 dishes
        Here are the ingredients the user has: {items}. Assume that he/she has basic stuff like salt, water & etc.
        
        Return only a valid JSON array in this structure:
        [
            {{
                "name": "Dish_name",
                "ingredients": "ingredients sepaerated by sapce and commas",
                "description": "short description",
                "cook_time": "50 mins"
            }}
        ]

        RETURN NO MARKDOWN, EXPLANATION OR TEXT OUTSIDE THE JSON.
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

@app.route('/api/make/pantry', methods=["POST"])
def pantry_dish():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Data is not sent"}), 400
    ingredients = data.get("items","")
    if not ingredients:
        return jsonify({"error": "THis shouldn't happen"})
    suggestions = json.loads(ask_pantry_recpie(ingredients))
    return jsonify(suggestions)

app.run(debug=True)
