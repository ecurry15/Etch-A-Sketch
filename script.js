"use strict";
const rangeSlider = document.getElementById("sliderRange");
const sliderOutput = document.getElementById("sliderText");
sliderOutput.textContent = `${rangeSlider.value} x ${rangeSlider.value}`;
const gridContainer = document.querySelector("#paper");
let mousePressed = false;
let screenPressed = false;
let mode = "blue";

//BTNS ---
const blueBtn = document.querySelector("#button-blue");
const rainbowBtn = document.querySelector("#button-rainbow");
const eraserBtn = document.querySelector("#button-eraser");
const resetBtn = document.querySelector("#button-reset");

// CHANGE MODE ON BTN CLICK ---
blueBtn.addEventListener("click", function () {
  mode = "blue";
  blueBtn.classList.add("active-Btn");
  rainbowBtn.classList.remove("active-Btn");
  eraserBtn.classList.remove("active-Btn");
});

rainbowBtn.addEventListener("click", function () {
  mode = "rainbow";
  rainbowBtn.classList.add("active-Btn");
  blueBtn.classList.remove("active-Btn");
  eraserBtn.classList.remove("active-Btn");
});

eraserBtn.addEventListener("click", function () {
  mode = "eraser";
  eraserBtn.classList.add("active-Btn");
  rainbowBtn.classList.remove("active-Btn");
  blueBtn.classList.remove("active-Btn");
});

const makeRows = function (rows, cols) {
  //DYNAMICALLY SETS GRID TEMPLATE ---
  gridContainer.style.gridTemplateColumns = `repeat(${rows}, 1fr)`;
  gridContainer.style.gridTemplateRows = `repeat(${cols}, 1fr)`;

  //SELECTS AND REMOVES PREVIOUS DIVS ---
  let oldDivs = gridContainer.querySelectorAll("div");
  oldDivs.forEach((div) => div.remove());

  //GENERATES DIVS BASED ON THE SPECIFIED ROWS/COLS ---
  for (let i = 0; i < rows * cols; i++) {
    let square = document.createElement("div");
    gridContainer.insertAdjacentElement("beforeend", square);
    gridContainer.appendChild(square).id = "grid-item";
  }

  //SELECTS ALL NEWLY CREATED DIVS ---
  let newDivs = gridContainer.querySelectorAll("div");

  //CHECKS FOR MOUSE CLICK / UNCLICK ---
  document.addEventListener("mousedown", function () {
    mousePressed = true;
  });

  document.addEventListener("touchstart", function () {
    screenPressed = true;
  });

  document.addEventListener("mouseup", function () {
    mousePressed = false;
  });

  document.addEventListener("touchend", function () {
    screenPressed = false;
  });

  //MOUSE CLICK CHANGES SQAURES TO SPECIFIED MODE/COLOR ---
  newDivs.forEach((div) =>
    div.addEventListener("click", function () {
      if (mode === "blue") {
        div.style.backgroundColor = "rgb(6,57,112)";
      } else if (mode === "rainbow") {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        div.style.backgroundColor = `#${randomColor}`;
      } else if (mode === "eraser") {
        div.style.backgroundColor = "beige";
      }
    })
  );

  //MOUSE DRAG CHANGES SQAURES TO SPECIFIED MODE/COLOR ---
  newDivs.forEach((div) =>
    div.addEventListener("mousemove", function () {
      if (mousePressed && mode === "blue") {
        div.style.backgroundColor = "rgb(6,57,112)";
      } else if (mousePressed && mode === "rainbow") {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        div.style.backgroundColor = `#${randomColor}`;
      } else if (mousePressed && mode === "eraser") {
        div.style.backgroundColor = "beige";
      }
    })
  );

  //FOR MOBILE --- WHEN SCREEN IS TOUCHED SQUARES TURN TO SPECIFIED MODE/COLOR ---
  newDivs.forEach((div) =>
    div.addEventListener("touchmove", function () {
      if (screenPressed && mode === "blue") {
        div.style.backgroundColor = "rgb(6,57,112)";
      } else if (screenPressed && mode === "rainbow") {
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        div.style.backgroundColor = `#${randomColor}`;
      } else if (screenPressed && mode === "eraser") {
        div.style.backgroundColor = "beige";
      }
    })
  );

  //RESET ALL SQUARES TO BEIGE ---
  resetBtn.addEventListener("click", function () {
    newDivs.forEach((div) => (div.style.backgroundColor = "beige"));
  });
};

//MAKES SKETCH PAD START WITH 16X16 SQUARES/DIVS ---
let makeFirstSquares = function () {
  makeRows(16, 16);
};

//DISPLAYS RANGE SLIDER INPUT AND MAKES ROWS/COLS---
rangeSlider.oninput = function () {
  sliderOutput.textContent = `${this.value} x ${this.value}`;
  makeRows(this.value, this.value);
};

makeFirstSquares();
