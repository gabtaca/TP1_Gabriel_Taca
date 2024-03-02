const colors = document.querySelectorAll('.color__id');
const button = document.querySelector('#btn__randomizer');
const hexagons = document.querySelectorAll('.color--hex');
const hexToRgb = hex => {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
};
//flip le texte dans les color--hex
document.querySelectorAll('.color--hex:nth-child(2) .color__id, .color--hex:nth-child(3) .color__id, .color--hex:nth-child(4) .color__id').forEach(element => {
    element.style.transform = 'rotate(180deg)';
});
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

hexagons.forEach((hexagon, index) => {
    const colorId = hexagon.querySelector('.color__id');

    hexagon.addEventListener('mouseenter', () => {
        colorId.style.color = 'white';
        colorId.style.display = 'block';
    });

    hexagon.addEventListener('mouseleave', () => {
        colorId.style.color = 'transparent';
        colorId.style.display = 'none';
    });
});

hexagons.forEach((hexagon, index) => {
    hexagon.addEventListener('mouseenter', () => {
        hexagon.querySelector('.color__id').style.display = 'block';
    });

    hexagon.addEventListener('mouseleave', () => {
        hexagon.querySelector('.color__id').style.display = 'none';
    });
});

hexagons.forEach((hexagon, index) => {
    hexagon.addEventListener('mouseenter', () => {
        const hexCode = hexagon.querySelector('.color__id').innerHTML;
        const rgbCode = hexToRgb(hexCode);
        hexagon.querySelector('.color__id').innerHTML = `${hexCode}<br>${rgbCode}`;
        hexagon.querySelector('.color__id').style.display = 'block';
    });

    hexagon.addEventListener('mouseleave', () => {
        const hexCode = hexagon.querySelector('.color__id').innerHTML.split('<br>')[0];
        hexagon.querySelector('.color__id').innerHTML = hexCode;
        hexagon.querySelector('.color__id').style.display = 'none';
    });
});