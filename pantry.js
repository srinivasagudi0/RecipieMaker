const ingList = document.getElementById('ingredient-list');
const addButton = document.getElementById('add-btn');
const inpuField = document.getElementById('ingredient-input');

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
    while (ingList.firstChild) {
        ingList.removeChild(ingList.firstChild);
    }
})

