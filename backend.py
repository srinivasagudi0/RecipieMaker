from flask import Flask, jsonify, request
import os
from flask_cors import CORS
from openai import OpenAI


app = Flask(__name__)
CORS(app)
api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI(api_key=api_key)


def ask_recipie(prompt):
    # Ask OpenAI to generate a recipe
    prompt = f"""
    You are a creative, professional chef who specializes in
    making delicious, unique, and easy-to-follow recipes.

    The user wants to make: {prompt}

    Your task:
    1. Create a delicious recipe based on the user's request.
    2. Give the dish a creative and appealing name.
    3. List all ingredients with exact measurements.
    4. Provide clear, step-by-step cooking instructions.
    5. Include preparation time, cooking time, and servings.
    6. Suggest substitutions for uncommon ingredients.
    7. Add optional tips to improve the flavor.
    8. Respect any dietary restrictions or preferences mentioned.
    9. If the user provides ingredients, prioritize using them.

    Rules:
    - Keep instructions simple, practical, and beginner-friendly.
    - Make the recipe flavorful and enjoyable.
    - Avoid unnecessary explanations.
    - Never suggest unsafe cooking practices.
    - Use ingredients that are reasonably accessible.
    - Do not invent cooking temperatures or times that could
      make food unsafe.

    Format your response as:

    DISH NAME:
    DESCRIPTION:
    PREP TIME:
    COOK TIME:
    SERVINGS:

    INGREDIENTS:
    - Ingredient and quantity

    INSTRUCTIONS:
    1. Step one
    2. Step two

    CHEF'S TIPS:
    - Optional improvements
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
    recipie = ask_recipie(dish)
    return jsonify({"dish": recipie})
app.run(debug=True)