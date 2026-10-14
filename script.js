function suggestMe() {
    const ideas = [
        "Hashbrowns with smothered onions",
        "Loaded nachos with cheese and jalapeños",
        "Classic grilled cheese sandwich",
        "Peanut butter and banana toast",
        "Quesadilla with salsa",
        "Baked potato with sour cream and chives",
        "Garlic butter pasta",
        "Fruit smoothie bowl",
        "Cinnamon sugar toast",
        "Pigs in a blanket",
        "Microwave mug pizza",
        "French bread pizza",
        "Tater tot casserole",
        "Mac and cheese bites",
        "Mini corn dogs",
        "Mozzarella sticks with marinara"
    ];
    let idea = ideas[Math.floor(Math.random() * ideas.length)];
    let textbox = document.getElementById("box");
    textbox.value = idea;
}


async function createRecipie() {
    const dish = document.getElementById("box").value;

    const response = await fetch("http://127.0.0.1:5000/api/make/recipe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ dish: dish })
    });
    const data = await response.json();
    document.getElementById("rec").innerHTML = `
    <h1 class="recipie-title">${data.name}</h1>
    <p>${data.description}</p>
    <p>Prep Time: ~<span class="prep-time">${data.prep_time}</span></p>
    <p>Cook Time: ~<span class="cook-time">${data.cook_time}</span> </p>
    <p>Servings: <i>${data.servings}</i></p>
    <h2>Instructions</h2>
    <ol>
        ${data.instructions.map(instruction => `
            <li>${instruction}</li>
        `).join("")}
    </ol>
    <h2>Substitutions</h2>
    <ol>${data.substitutions.map(substitution => `
            <li>${substitution.original} → ${substitution.alternative}</li>
        `).join("")}
    </ol>
    <h2>Ingredients</h2>
    <ol>
        ${data.ingredients.map(ingredient => `
            <li>${ingredient.quantity} ${ingredient.name}</li>
        `).join("")}
    </ol>
    <h2>Tips</h2>
    <ol>
        ${data.tips.map(tip => `
            <li>${tip}</li>
        `).join("")}
    </ol>

    `
}