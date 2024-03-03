const colorSpans = document.querySelectorAll('.color__id');
const button = document.querySelector('#btn__randomizer');
const hexagons = document.querySelectorAll('.color--hex');

// Convertit un code couleur hexadécimal en valeur RGB.
const hexToRgb = hex => {
    const bigint = parseInt(hex.substring(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return `rgb(${r}, ${g}, ${b})`;
};

// Fait rotationner les enfants de color--hex.
document.querySelectorAll('.color--hex:nth-child(2) .color__id, .color--hex:nth-child(3) .color__id, .color--hex:nth-child(4) .color__id').forEach(element => {
    element.style.transform = 'rotate(180deg)';
});

// Set une variable pour décaler les couleurs du background.
var shift = 0;

// Calcule la couleur complémentaire décalée
function getShiftedComplementaryColor(color) {
    color = color.substring(1);
    var colorDecimal = parseInt(color, 16);
    var compColorDecimal = 0xFFFFFF ^ colorDecimal;
    compColorDecimal = (compColorDecimal + shift) % 0xFFFFFF;
    var compColor = compColorDecimal.toString(16).padStart(6, '0');
    shift += 0x123456;
    return "#" + compColor;
}

// Convertit une couleur RGB en valeur HSL
function rgbToHsl(r, g, b) {
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if(max == min){
        h = s = 0; // achromatic
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }
    return [h, s, l];
}

// Trie le tableau de couleurs
function sortColors(colors) {
    return colors.sort(function(a, b) {
        var aRgb = parseInt(a.substring(1), 16);
        var bRgb = parseInt(b.substring(1), 16);
        var aHsl = rgbToHsl((aRgb >> 16) & 255, (aRgb >> 8) & 255, aRgb & 255);
        var bHsl = rgbToHsl((bRgb >> 16) & 255, (bRgb >> 8) & 255, bRgb & 255);
        return aHsl[0] - bHsl[0];
    });
}

// Échange deux couleurs pour ajuster les couleurs du background à l'hexagone.
function swapElements(array, first, second){
    let temp = array[first];
    array[first] = array[second];
    array[second] = temp;
    return array;
}

// Génère des couleurs randoms et leurs complémentaires, les trie par luminosité, et les affiches.
function generateColors() {
    var randomColor = '#' + Math.random().toString(16).substring(2, 8);
    let colors = [];

    for (i = 0; i < colorSpans.length; i++) {
        colors.push(randomColor);
        if (i < colorSpans.length) {
            randomColor = getShiftedComplementaryColor(randomColor);
        }
    }

    let sortedColors = sortColors(colors);

    for (i = 0; i < sortedColors.length; i++) {
        colorSpans[i].parentElement.style.borderTopColor = sortedColors[i];
        colorSpans[i].innerHTML = sortedColors[i];
    }

    sortedColors = swapElements(sortedColors, 1, 3); // Utilisation de la fonction swapElements avec les indices 1 et 3

    document.body.style.background = `linear-gradient(315deg, ${sortedColors})`;
}

// Appelle la fonction generateColors.
generateColors();

// Ajoute un écouteur d'événement pour le clic sur le bouton, qui appelle generateColors.
button.addEventListener('click', generateColors);

// Gère les événements Hover sur des parties d'hexagones pour afficher les valeurs hex et RGB.
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

// Gère les événements d'hover sur les triangles de l'hexagones pour afficher les valeurs hex et RGB.
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