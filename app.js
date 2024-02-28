const colors = document.querySelectorAll('.color__id');
const button = document.querySelector('#btn__randomizer');

function generateColors() {
    colors.forEach((color, index) => {
        let hexCode = '#' + Math.random().toString(16).substring(2, 8);
        color.parentElement.style.borderTopColor = hexCode;
        color.innerHTML = hexCode;
    }); 
}

generateColors();

button.addEventListener('click', generateColors);