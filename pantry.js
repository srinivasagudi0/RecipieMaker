const ingList = document.getElementById('ingredient-list');
const addButton = document.getElementById('add-btn');
const inpuField = document.getElementById('ingredient-input');
const ingWarnNo = document.getElementById('warn-ing-no');
const makeBtn = document.getElementById('makeBtn');

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
        const ingLength = ingList.textContent.length;
        if (ingLength > 4) {
            ingWarnNo.textContent = false;
        }
        deleteBtn.addEventListener('click', (event)=>{
            const li = event.target.parentElement;
            const confirm = window.confirm(`Are you sure you want to delete ${ingredientName}?`);
            if (confirm) {
                ingList.removeChild(li);
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
    while (ingList.firstChild) {
        ingList.removeChild(ingList.firstChild);
    }
})


makeBtn.addEventListener('click', () =>{
    if (ingList< 4){
        return;
    }
    const suggestions = []

    suggestions = fetch("/api/make/pantry", {
        method: "POST",
        body: {
            "items": ingList
        }
    });
    if suggest
})