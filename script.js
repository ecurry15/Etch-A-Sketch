"use strict";
const rangeSlider = document.getElementById('sliderRange');
const sliderOutput = document.getElementById('sliderText');
sliderOutput.textContent = `${rangeSlider.value} x ${rangeSlider.value}`;

const gridContainer = document.querySelector('#paper');




const makeRows = function (rows, cols) {
  gridContainer.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
gridContainer.style.gridTemplateRows = `repeat(${cols}, 1fr)`;
let divs = gridContainer.querySelectorAll('div');
divs.forEach((div) => div.remove());

  for (let i = 0; i < rows * cols; i++) {
    let square = document.createElement('div');
    gridContainer.insertAdjacentElement('beforeend', square);
    gridContainer.appendChild(square).id = "grid-item";
  }
  let squareDivs = gridContainer.querySelectorAll('div');
  squareDivs.forEach((div) => div.addEventListener('click', function () {
    div.style.backgroundColor = "black";
  }))
};


rangeSlider.oninput = function () {
  sliderOutput.textContent = `${this.value} x ${this.value}`;
  makeRows(this.value, this.value);
}





