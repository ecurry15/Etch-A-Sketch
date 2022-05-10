"use strict";
const rangeSlider = document.getElementById('sliderRange');
const sliderOutput = document.getElementById('sliderText');
sliderOutput.textContent = `${rangeSlider.value} x ${rangeSlider.value}`;

const gridContainer = document.querySelector('#paper');
let mousePressed = false;



const makeRows = function (rows, cols) {
//DYNAMICALLY SETS GRID TEMPLATE ---
gridContainer.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
gridContainer.style.gridTemplateRows = `repeat(${cols}, 1fr)`;

//SELECTS AND REMOVES PREVIOUS DIVS ---
let oldDivs = gridContainer.querySelectorAll('div');
oldDivs.forEach((div) => div.remove());

//GENERATES DIVS BASED ON THE SPECIFIED ROWS/COLS ---
  for (let i = 0; i < rows * cols; i++) {
    let square = document.createElement('div');
    gridContainer.insertAdjacentElement('beforeend', square);
    gridContainer.appendChild(square).id = "grid-item";
  }

//SELECTS ALL NEWLY CREATED DIVS ---
  let newDivs = gridContainer.querySelectorAll('div');

//CHECKS FOR MOUSE CLICK / UNCLICK ---
  document.addEventListener('mousedown', function() {
    mousePressed = true;
  });

  document.addEventListener('mouseup', function() {
    mousePressed = false;
  });

  //IF MOUSE IS CLICKED CHANGE SQAURES TO BLUE ---
  newDivs.forEach((div) => div.addEventListener('mousemove', function() {
    if (mousePressed) {
      div.style.backgroundColor = "rgb(6,57,112)";
    }
  }))

};


//DISPLAYS RANGE SLIDER INPUT AND MAKES ROWS/COLS---
rangeSlider.oninput = function () {
  sliderOutput.textContent = `${this.value} x ${this.value}`;
  makeRows(this.value, this.value);
}





