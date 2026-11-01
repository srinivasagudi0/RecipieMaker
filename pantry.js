const ingList = document.getElementById('ingredient-list');
const addButton = document.getElementById('add-btn');
const inpuField = document.getElementById('ingredient-input');

addButton.addEventListener('click',() => {
    if (inpuField.value.trim() !== ''){
        const newIngredient = document.createElement('li');
        newIngredient.textContent = inpuField.value;
        ingList.appendChild(newIngredient);
        inpuField.value = '';
    } else return;
})