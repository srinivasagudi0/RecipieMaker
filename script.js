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

    const response = await fetch("/api/recipe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ dish: dish })
    });

    const data = await response.json();

    document.getElementById("rec").textContent = data.recipe;
}