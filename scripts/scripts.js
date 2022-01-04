//DOM element and Global Variable creation
const clearButton = document.querySelector("#clear");
const numberButtons = document.querySelectorAll(".number-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const equationText = document.querySelector("#running-equation");
const equalsButton = document.getElementById("=");
const solutionText = document.querySelector("#solution");
const squareRootButton = document.getElementById("√");
let runningSolution = "";
let equationArray = [];
let tempNumber = "";

//change strings to float or integer
let generateNumber = function (string) {
  if (!Number.isInteger(parseInt(string))) {
    return parseFloat(string);
  } else {
    return parseInt(string);
  }
};

//mathWork functionality
const mathWork = function (opperand1, operator, opperand2) {
  if (operator === "+") {
    return opperand1 + opperand2;
  } else if (operator === "-") {
    return opperand1 - opperand2;
  } else if (operator === "*") {
    return opperand1 * opperand2;
  } else if (operator === "/") {
    return opperand1 / opperand2;
  }
};

//functionality for number buttons
const numberInput = function () {
  if (
    this.id === "." &&
    tempNumber.includes(".") &&
    equationText.textContent.includes(".")
  ) {
    return;
  } else {
    tempNumber += this.id;
    equationText.textContent += this.id;
  }
  console.log(tempNumber);
};

//Adding functionality for clear button
const clearCalculator = function () {
  if (this.id === "clear") {
    runningSolution = "";
    equationArray = [];
    tempNumber = "";
    equationText.textContent = "";
    solutionText.textContent = "";
  }
};

//functionality for square root button
let squareRoot = function () {
  if (tempNumber === "" && equationArray.length === 0) {
    return;
  } else if (equationArray.length === 2 && tempNumber !== "") {
    equationArray.push(generateNumber(tempNumber))
    let mySolution = mathWork(
      equationArray[0],
      equationArray[1],
      equationArray[2]
    );
    equationArray = [];
    equationArray.push(mySolution);
    runningSolution = mySolution;
    solutionText.textContent = "";
    equationText.textContent = `${mySolution}`;
    tempNumber = "";
    console.log(equationArray);
  } else if (equationArray.length <= 2 && tempNumber === "") {
    equationArray.push(tempNumber);
    let mySolution = Math.sqrt(generateNumber(equationArray[0]));
    if (!Number.isInteger(mySolution)) {
      mySolution = mySolution.toFixed(10);
    }
    equationArray = [];
    equationArray.push(mySolution);
    runningSolution = mySolution;
    solutionText.textContent = "";
    equationText.textContent = `${mySolution}`;
    tempNumber = "";
    console.log(equationArray);
  }
};

//Functionality for opperand buttons
let addInitialOperator = function () {
  //replaces opperand in equation if one is entered twice
  if (equationArray.length === 2 && tempNumber === "") {
    if (equationArray[1] === this.id) {
      return;
    } else {
      equationArray.pop();
      equationArray.push(this.id);
      equationText.textContent = `${equationArray[0]} ${this.id} `;
    }
    return;
  }

  if (equationArray.length > 1) {
    equationArray.push(generateNumber(tempNumber));
    tempNumber = "";
    let mySolution = mathWork(
      equationArray[0],
      equationArray[1],
      equationArray[2]
    );
    if (!Number.isInteger(mySolution)) {
      mySolution = mySolution.toFixed(10);
    }
    equationArray = [];
    equationArray.push(mySolution);
    equationArray.push(this.id);
    runningSolution = mySolution;
    solutionText.textContent = mySolution;
    equationText.textContent = `${mySolution} ${this.id} `;
  }

  if (tempNumber.length > 0 && equationArray.length === 0) {
    equationArray.push(generateNumber(tempNumber));
    equationArray.push(this.id);
    tempNumber = "";
    equationText.textContent += ` ${this.id} `;
  }
  if (tempNumber.length === 0 && equationArray.length === 1) {
    equationArray.push(this.id);
    equationText.textContent += ` ${this.id} `;
    console.log(equationArray);
  }
};

//functionality for equals button
let equals = function () {
  if (equationArray.length <= 1) {
    return;
  }

  equationArray.push(generateNumber(tempNumber));
  tempNumber = "";
  solutionText.textContent = "";
  let mySolution = mathWork(
    equationArray[0],
    equationArray[1],
    equationArray[2]
  );
  equationText.textContent = mySolution;
  equationArray = [];
  equationArray.push(mySolution);
  console.log(equationArray);
  console.log(tempNumber);
};

//adding functionality to number buttons
numberButtons.forEach((button) =>
  button.addEventListener("click", numberInput)
);

//adding functionality to clear button
clearButton.addEventListener("click", clearCalculator);

//adding Event Listener for squre root button
squareRootButton.addEventListener("click", squareRoot);

//adding operator button functionality
operatorButtons.forEach((button) =>
  button.addEventListener("click", addInitialOperator)
);

//adding functionality to equals button
equalsButton.addEventListener("click", equals);
