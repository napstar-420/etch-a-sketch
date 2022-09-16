/** All NodeElements Declared here */

const toggleLayoutBtn = document.querySelector('.toggle_list_btn');
const layoutList = document.querySelector('.layout_list');
const gridContainer = document.querySelector('.grid_container');
const colorPicker = document.querySelector('#color');
const colorModeBtn = document.querySelector('#color_mode_btn');
const eraserModeBtn = document.querySelector('#eraser_mode_btn');
const rainbowModeBtn = document.querySelector('#rainbow_mode_btn');
const resetBtn = document.querySelector('#reset_btn');


/** EventListener added here */

toggleLayoutBtn.addEventListener('click', () => layoutList.classList.toggle('hidden'));
colorPicker.addEventListener('input', (e) => selectedColor = e.target.value);
colorModeBtn.addEventListener('click', toggleMode);
eraserModeBtn.addEventListener('click', toggleMode);
rainbowModeBtn.addEventListener('click', toggleMode);
resetBtn.addEventListener('click', clearGrid);


/* selectedColor will hold the color from the html Color Picker */
let selectedColor = "#6600ff";

/** modeTypes is declared so i don't have to write strings separately while doing equality checks like currentMode === modeTypes.color it will reduce the chances of bug*/
const modeTypes = {
    color: 'color',
    eraser: 'eraser',
    rainbow: 'rainbow',
}

/** CurrentMode will hold the selected mode and change when the user switch to different mode like eraser or rainbow*/
let currentMode = modeTypes.color;

/** mouseDown will be used to see if the mouse is being pressed while updating the grid color */
let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

/** This loop will add the grid layout options so i don't have to manually write in the html*/
for(let i = 1; i <= 36 ; i++){
    const layoutListItem = document.createElement('li');
    layoutListItem.textContent = `${i} x ${i}`;
    layoutListItem.addEventListener('click', setGridLayout);
    layoutListItem.setAttribute('data-value', `${i}`)
    layoutList.appendChild(layoutListItem);
}

/* This function will be called when the user click on color mode | eraser or Rainbow */
function toggleMode(e) {
    colorModeBtn.classList.remove('active');
    eraserModeBtn.classList.remove('active');
    rainbowModeBtn.classList.remove('active');
    if(e.target.getAttribute('data-mode') === modeTypes.color){
        currentMode = modeTypes.color;
        e.target.classList.add('active');
    }
    if(e.target.getAttribute('data-mode') === modeTypes.eraser) {
        currentMode = modeTypes.eraser;
        e.target.classList.add('active');
    }
    if(e.target.getAttribute('data-mode') === modeTypes.rainbow){
        currentMode = modeTypes.rainbow;
        e.target.classList.add('active');
    }
}

/* This function will change the number of grids */
function setGridLayout(e) {
    toggleLayoutBtn.textContent = (e.target.textContent);
    layoutList.classList.toggle('hidden');
    gridContainer.innerHTML = '';
    const numberOfGrids = e.target.getAttribute('data-value');
    createGrids(numberOfGrids);
}

/** I am calling this function separately here so when the website first loads grids will be added automatically*/
createGrids(4)

function createGrids(numberOfGrids) {
    gridContainer.style.gridTemplateColumns = `repeat(${numberOfGrids}, 1fr)`
    for (let i = 0; i < numberOfGrids * numberOfGrids; i++) {
        const grid = document.createElement('div');
        grid.addEventListener('mouseover', updateGridColor)
        grid.addEventListener('mousedown', updateGridColor)
        grid.classList.add('grid');
        gridContainer.appendChild(grid);
    }
}


/* This function will update the color of the div on hover but when the mouse is being pressed */
function updateGridColor(e) {
    if (e.type === 'mouseover' && mouseDown == false) {
        return null;
    } else if(currentMode === modeTypes.color) {
        e.target.style.backgroundColor = selectedColor;
    } else if(currentMode === modeTypes.eraser) {
        e.target.style.backgroundColor = '#fefefe';
    } else if (currentMode === modeTypes.rainbow) {
        const redValue = Math.floor(Math.random() * (256 - 0 + 1) + 0)
        const greenValue = Math.floor(Math.random() * (256 - 0 + 1) + 0)
        const blueValue = Math.floor(Math.random() * (256 - 0 + 1) + 0)
        e.target.style.backgroundColor = `rgb(${redValue},${greenValue},${blueValue})`;
    }
}


/* When user presses reset button this function will be called*/
function clearGrid() {
    [...document.querySelectorAll('.grid')]
    .map(grid => grid.style.backgroundColor = '#fefefe');
}