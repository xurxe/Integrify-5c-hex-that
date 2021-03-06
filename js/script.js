const main = document.querySelector('main');

// select and style text fields
const inputTextFields = document.querySelectorAll('input[type="text"]');
for (let i = 0; i < inputTextFields.length; i++) {
    inputTextFields[i].style.borderRadius = '0';
    inputTextFields[i].style.boxShadow = 'none';
    inputTextFields[i].style.fontSize = '1rem';
    inputTextFields[i].style.margin = '0.2rem 0 1.5rem';
    inputTextFields[i].style.padding = '0.4rem 0.6rem';
}

const colorInput = document.querySelector('#color-input');
colorInput.style.width = '100%';

/* const hexInput = document.querySelector('#hex-input');
hexInput.style.width = '100%'; */



// select and style buttons
const hexButton = document.querySelector('#hex-button');
hexButton.style.background = 'white';
hexButton.style.color = 'black';
hexButton.style.fontSize = '1rem';
hexButton.style.height = '4.5rem';
hexButton.style.margin = '0 0 1rem';
hexButton.style.padding = '0 1rem';
hexButton.style.transition = 'all 0.5s ease';
hexButton.style.width = '100%';

hexButton.addEventListener('mouseover', function() {
    backgroundColor = generateRandomColor();
    hexButton.style.background = backgroundColor;
    hexButton.style.color = formatHsl(pickContrastingColor(backgroundColor));
    hexButton.style.transition = 'all 0.5s ease';
});

hexButton.addEventListener('mouseout', function() {
    hexButton.style.background = 'white';
    hexButton.style.color = 'black';
    hexButton.style.transition = 'all 0.5s ease';
});

hexButton.addEventListener('focus', function() {
    backgroundColor = generateRandomColor();
    hexButton.style.background = backgroundColor;
    hexButton.style.color = formatHsl(pickContrastingColor(backgroundColor));
    hexButton.style.transition = 'all 0.5s ease';
});

hexButton.addEventListener('blur', function() {
    hexButton.style.background = 'white';
    hexButton.style.color = 'black';
    hexButton.style.transition = 'all 0.5s ease';
});

let hexes = [
    'ableism',
    'animal abusers',
    'anti-vaxxers',
    'boredom',
    'bigotry',
    'colonialism',
    'child molesters',
    'chronic pain',
    'climate change',
    'death',
    'deforestation',
    'depression',
    'diet culture',
    'disease',
    'Donald Trump',
    'facists',
    'fearmongers',
    'fossil fuels',
    'global warming',
    'homophobes',
    'racism',
    'loneliness',
    'mass extinction',
    'mental health stigma',
    'misery',
    'nazis',
    'oppression',
    'pollution',
    'poverty',
    'sexism',
    'soil erosion',
    'the Alt right',
    'the haters',
    'the patriarchy',
    'toxic masculinity',
    'transmisogyny',
    'transphobia',
    'trauma',
    'wars',
    'white supremacy',
    'xenophobia',
];

let usedHexes = [];


function pickRandomHex() {

    // if the hexes array has any items
    if (hexes.length > 0) {

        // pick a random index 
        const i = Math.floor(Math.random() * hexes.length);

        // splice out the hex with the random index
        const hex = hexes.splice(i, 1);

        // push it to the usedHexes array
        usedHexes.push(hex);

        // return it
        return hex;
    }

    // otherwise...
    else {

        // add all the used hexes back to the hexes array
        hexes = usedHexes;

        // and empty the usedHexes array
        usedHexes = []

        // run function again
        pickRandomHex();
    }

}



// generate random hex code
function generateRandomColor() {
    let randomColor = '#' + Math.random().toString(16).substr(2, 6).toUpperCase();
    return randomColor;
};



// convert hex code to RGB
function hexToRgb(hexcode) {
    // two digits for each (R, G, B)
    let rawR = hexcode.slice(1,3);
    let rawG = hexcode.slice(3,5);
    let rawB = hexcode.slice(5,7);

    // convert to integer (0-255)
    let R = parseInt(rawR, 16);
    let G = parseInt(rawG, 16);
    let B = parseInt(rawB, 16);

    // generate array with values
    let rgb = [R, G, B];
    return rgb;
};



// format RGB array for CSS
function formatRgb(array) {
    let rgb = `rgb(${array[0]}, ${array[1]}, ${array[2]})`;
    return rgb;
};



// convert RGB array to HSL array
function rgbToHsl(array) {
    let [R, G, B] = array;

    // get max and min from RGB values
    let rawMax = Math.max(R, G, B);
    let rawMin = Math.min(R, G, B);

    // convert to 0-1 range
    let max = rawMax / 255;
    let min = rawMin / 255;

    let rawH, rawS, rawL;

    rawL = (max + min) / 2;

    // if max and min are equal, it's an achromatic grey
    if (rawMax === rawMin) {
        rawS = 0;
        rawH = 0;
    }

    // if L is below 50%, use this formula
    else if (rawL <= 0.5) {
        rawS = (max - min) / (max + min);
    }
    
    // if L is over 50%, use this formula
    else if (rawL > 0.5) {
        rawS = (max - min) / (2 - max - min);
    };

    // if the highest color value is red, use this formula
    if (rawMax == R) {
        rawH = (G - B) / (max - min);
    }

    // if the highest color value is green, use this formula
    else if (rawMax == G) {
        rawH = 2 + (B - R) / (max - min);
    }

    // if the highest color value is blue, use this formula
    else if (rawMax == B) {
        rawH = 4 + (R - G) / (max - min);
    };

    let H, S, L;
    
    // if raw H is negative, add 360
    if (rawH < 0) {
        H = Math.round(rawH + 360);
    }

    // otherwise, round
    else {
        H = Math.round(rawH);
    }

    // multiply by 100 and round
    S = Math.round(rawS * 100);
    L = Math.round(rawL * 100);

    let hsl = [H, S, L];
    return hsl;
};



// format HSL array for CSS
function formatHsl(array) {
    let hsl = `hsl(${array[0]}, ${array[1]}%, ${array[2]}%)`;
    return hsl;
};



// pick a second color that has enough contrast with the background
function pickContrastingColor(hexcode) {

    // convert from hex to RGB
    let backgroundRgb = hexToRgb(hexcode);
    let backgroundR = backgroundRgb[0];
    let backgroundG = backgroundRgb[1];
    let backgroundB = backgroundRgb[2];

    // convert from RGB to HSL
    let backgroundHsl = rgbToHsl(backgroundRgb);
    let backgroundH = backgroundHsl[0];
    let backgroundS = backgroundHsl[1];

    // define variables for text H, S and L
    let H, S, L;

    // set complementary hue
    H = backgroundH - 180;

    if (H < 0) {
        H += 360;
    }

    // set same saturation as background color
    S = backgroundS;

    // calculate perceived brigthness with luma formula
    brightness = 0.2126 * backgroundR + 0.7152 * backgroundG + 0.0722 * backgroundB;
    
    // if background color has low brightness, pick high luminance for text
    if (brightness < 150) {
        L = 95;
    }

    // if background color has high brightness, pick low luminance for text
    else {
        L = 5;
    };
        
    // define result array
    hsl = [H, S, L];

    return hsl;
};



// generate the given number of divs
function generateDivs(number) {

    // loop as many times as the input number
    for (let i = 0; i < number; i++) {

        // create colorDiv, give class name, append to main
        let colorDiv = document.createElement('div');
        colorDiv.className = 'color-div responsive-padding';
        main.appendChild(colorDiv);

        // generate background color and style colorDiv
        let backgroundColor = generateRandomColor();
        colorDiv.style.background = backgroundColor;

        // generate text color and style colorDiv
        let contrastingColor = formatHsl(pickContrastingColor(backgroundColor));
        colorDiv.style.color = contrastingColor;

        // create hexP, give class name, append to colorDiv
        let hexP = document.createElement('p');
        hexP.className = 'hex-p';
        colorDiv.appendChild(hexP);

        // pick hex and pass as textContent of hexP
        hex = pickRandomHex();
        hexP.textContent = `Hex ${hex}!`;

        // create copyDiv, give class name, append to colorDiv
        let copyDiv = document.createElement('div');
        copyDiv.className = 'copy-div';
        colorDiv.appendChild(copyDiv);

        // create colorText, give class name, append to copyDiv
        let colorText = document.createElement('p');
        colorText.className = 'color-text';
        copyDiv.appendChild(colorText);

        // style colorText
        colorText.style.color = contrastingColor;

        // pass background color as textContent of colorText
        colorText.innerHTML = backgroundColor;

        // create copyButton, give class name, append to copyDiv
        let copyButton = document.createElement('button');
        copyButton.className = 'copy-button';
        copyDiv.appendChild(copyButton);

        // style copy button
        copyButton.textContent = 'copy!';
        copyButton.style.background = 'none';
        copyButton.style.color = contrastingColor;
        copyButton.style.fontSize = '0.8rem';
        copyButton.style.height = '2rem';
        copyButton.style.margin = '0 0 0 1.5rem';
        copyButton.style.paddingLeft = '0.2rem';
        copyButton.style.textAlign = 'center';
        copyButton.style.width = '4rem';

        copyButton.addEventListener('mouseover', function() {
            copyButton.style.background = contrastingColor;
            copyButton.style.color = backgroundColor;
            copyButton.style.transition = 'all 0.5s ease';
        });

        copyButton.addEventListener('mouseout', function() {
            copyButton.style.background = 'none';
            copyButton.style.color = contrastingColor;
            copyButton.style.transition = 'all 0.5s ease';
        });

        copyButton.addEventListener('focus', function() {
            copyButton.style.background = contrastingColor;
            copyButton.style.color = backgroundColor;
            copyButton.style.transition = 'all 0.5s ease';
        });

        copyButton.addEventListener('blur', function() {
            copyButton.style.background = 'none';
            copyButton.style.color = contrastingColor;
            copyButton.style.transition = 'all 0.5s ease';
        });

        copyButton.addEventListener('click', function() {
            let copiedText = this.parentNode.querySelector('p').innerHTML;
            let textArea = document.createElement('textarea');
            document.body.appendChild(textArea);
            textArea.value = copiedText;
            textArea.select();
            document.execCommand('copy');
            textArea.remove();
        });
    };
};



// remove previously-generated color divs
function clearColorDivs() {

    // select color divs
    let colorDivs = document.querySelectorAll('.color-div');

    // use a loop to delete them
    for (let i = 0; i < colorDivs.length; i++) {
        main.removeChild(colorDivs[i]);
    };
};



// after clicking the generate button, do the following:
hexButton.addEventListener('click', function() {

    // get number of colors to be generated from the input field
    const number = colorInput.value;

    if (!(number > 0) || !(number < 101)) {
        colorInput.value = "";
        colorInput.placeholder = "Please enter a valid number."
        return;
    };

    // remove previous color divs
    clearColorDivs();

    // generate new ones
    generateDivs(number);
});

generateDivs(3);





/* // The code below is a simpler way to choose a contrasting text color. You can delete seven functions from above (hexToRgb(), formatRgb(), rgbToHsl(), formatHsl(), pickContrastingColor(), and generateDivs()), and simply use the two functions below:



// pick a font color that has enough contrast with the background
function pickContrastingColor(hexcode) {
    // two digits for each (R, G, B)
    let rawR = hexcode.slice(1,3);
    let rawG = hexcode.slice(3,5);
    let rawB = hexcode.slice(5,7);

    // convert to integer (0-255)
    let R = parseInt(rawR, 16);
    let G = parseInt(rawG, 16);
    let B = parseInt(rawB, 16);

    // if the values of R, G, and B are high, the background color is light, so pick black text
    if (R + G + B > 400) {
        return 'black';
    }

    // if the values of R, G, and B are low, the background color is dark, so pick white text
    else {
        return 'white';
    };
};



// generate the given number of divs
function generateDivs(number) {

    // loop as many times as the input number
    for (let i = 0; i < number; i++) {

        // create colorDiv, give class name, append to main
        let colorDiv = document.createElement('div');
        colorDiv.className = 'color-div';
        main.appendChild(colorDiv);

        // generate background color and style colorDiv
        let backgroundColor = generateRandomColor();
        colorDiv.style.background = backgroundColor;

        // generate text color and style colorDiv
        let contrastingColor = pickContrastingColor(backgroundColor);
        colorDiv.style.color = contrastingColor;

        // create hexP, give class name, append to colorDiv
        let hexP = document.createElement('p');
        hexP.className = 'hex-p';
        colorDiv.appendChild(hexP);

        // pick hex and pass as textContent of hexP
        hex = pickRandomHex(i);
        hexP.textContent = `Hex ${hex}!`;

        // create colorP, give class name, append to colorDiv
        let colorP = document.createElement('p');
        colorP.className = 'color-p';
        colorDiv.appendChild(colorP);

        // pass background color as textContent of colorP
        colorP.textContent = backgroundColor;

    };
}; */