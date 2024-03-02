const colorSpans = document.querySelectorAll('.color__id');
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

var shift = 0;

function getShiftedComplementaryColor(color) {
    // Remove the hash from the color value
    color = color.substring(1);

    // Convert the color to decimal format
    var colorDecimal = parseInt(color, 16);

    // Compute the complementary color
    var compColorDecimal = 0xFFFFFF ^ colorDecimal;

    // Shift the color
    compColorDecimal = (compColorDecimal + shift) % 0xFFFFFF;

    // Convert the complementary color to hexadecimal format and add leading zeros if necessary
    var compColor = compColorDecimal.toString(16).padStart(6, '0');

    // Increment the shift for the next call
    shift += 0x123456;

    // Return the complementary color
    return "#" + compColor;
}

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

function sortColors(colors) {
    return colors.sort(function(a, b) {
        // Convert colors to RGB
        var aRgb = parseInt(a.substring(1), 16);
        var bRgb = parseInt(b.substring(1), 16);

        // Convert RGB to HSL
        var aHsl = rgbToHsl((aRgb >> 16) & 255, (aRgb >> 8) & 255, aRgb & 255);
        var bHsl = rgbToHsl((bRgb >> 16) & 255, (bRgb >> 8) & 255, bRgb & 255);

        // Compare the hue values
        return aHsl[0] - bHsl[0];
    });
}

function swapElements(array, first, second){
    let temp = array[first];
    array[first] = array[second];
    array[second] = temp;
    return array;
}

function generateColors() {
    var randomColor = '#' + Math.random().toString(16).substring(2, 8);
    let colors = [];

    // Générer autant de couleurs que nécéssaire et les stocker dans un tableau.
    for( i = 0; i < colorSpans.length; i++ ){
        colors.push(randomColor);

        // Parce qu'on a généré une couleur initial ne pas générer la derniere inutilement.
        if (i < colorSpans.length){
            randomColor = getShiftedComplementaryColor(randomColor);
        }
    }
    
    let sortedColors = sortColors(colors);
    
    for( i = 0; i < sortedColors.length; i++){
        colorSpans[i].parentElement.style.borderTopColor = sortedColors[i];
        colorSpans[i].innerHTML = sortedColors[i];
    }
    
    sortedColors = swapElements(sortedColors,1,2);

    document.body.style.background = `linear-gradient(315deg, ${sortedColors})`;
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