const colors = document.querySelectorAll('.color__id');
const button = document.querySelector('#btn__randomizer');

function generateColors() {
    let gradientColors = [];
    colors.forEach((color, index) => {
        let hexCode = '#' + Math.random().toString(16).substring(2, 8);
        color.parentElement.style.borderTopColor = hexCode;
        color.innerHTML = hexCode;
        gradientColors.push(hexCode);
    });

    let gradient = gradientColors.join(',');
    document.body.style.background = `linear-gradient(45deg, ${gradient})`;
}

generateColors();

button.addEventListener('click', generateColors);