const ingList = document.getElementById('ingredient-list');
const addButton = document.getElementById('add-btn');
const inpuField = document.getElementById('ingredient-input');
const ingWarnNo = document.getElementById('warn-ing-no');
const makeBtn = document.getElementById('make-btn');
const suggestionsDiv = document.getElementById('suggestions');

addButton.addEventListener('click',() => {
    if (inpuField.value.trim() !== ''){
        const newIngredient = document.createElement('li');
        newIngredient.textContent = inpuField.value;
        const ingredientName = inpuField.value.trim();
        ingList.appendChild(newIngredient);
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        newIngredient.appendChild(deleteBtn);
        inpuField.value = '';
        if (ingList.children.length >= 4) {
            ingWarnNo.textContent = '';
        }
        deleteBtn.addEventListener('click', (event)=>{
            const li = event.target.parentElement;
            const confirm = window.confirm(`Are you sure you want to delete ${ingredientName}?`);
            if (confirm) {
                ingList.removeChild(li);
                if (ingList.children.length < 4) {
                    ingWarnNo.textContent = 'Atleast 4 ingredients needed.';
                }
            } else return;
        });
    } else return;
})


document.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addButton.click();
    }
});

const clearAllBtn = document.getElementById('clear-btn');

clearAllBtn.addEventListener('click', ()=>{
    const confirm = window.confirm("Are you sure you want to clear all ingredient?")
    if (confirm) {
        while (ingList.firstChild) {
            ingList.removeChild(ingList.firstChild);
        }
        ingWarnNo.textContent = 'Atleast 4 ingredients needed.';
        suggestionsDiv.innerHTML = '';
    }
})


makeBtn.addEventListener('click', async () =>{
    if (ingList.children.length < 4){
        ingWarnNo.textContent = 'Atleast 4 ingredients needed.';
        return;
    }

    const ingredients = Array.from(ingList.children).map(ingredient => {
        return ingredient.firstChild.textContent;
    });

    suggestionsDiv.textContent = 'Making dishes...';

    const response = await fetch("http://127.0.0.1:5000/api/make/pantry", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ items: ingredients })
    });
    const suggestions = await response.json();

    if (!response.ok) {
        suggestionsDiv.textContent = suggestions.error || 'Something went wrong.';
        return;
    }

    suggestionsDiv.innerHTML = '<h2>Dish Ideas</h2>';
    suggestions.forEach(suggestion => {
        suggestionsDiv.innerHTML += `
            <h3>${suggestion.name}</h3>
            <p>${suggestion.description}</p>
            <p><b>Ingredients:</b> ${suggestion.ingredients}</p>
            <p><b>Cook Time:</b> ${suggestion.cook_time}</p>
        `;
    });
})
