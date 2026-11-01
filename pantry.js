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