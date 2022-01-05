/**
 * DOM element and Global Variable creation
 */
const clearButton = document.querySelector('#clear');
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equationText = document.querySelector('#running-equation');
const equalsButton = document.getElementById('=');
const solutionText = document.querySelector('#solution');
const squareRootButton = document.getElementById('√');
const squaredButton = document.getElementById('**');
let runningSolution = '';
let equationArray = [];
let tempNumber = '';

/**
 * change strings to float or integer
 */
let generateNumber = function (string) {
  if (string - Math.floor(string) !== 0) {
    return parseFloat(string);
  } else {
    return parseInt(string);
  }
};

/**
 * Make Sure floats never get past a certain length
 */
let roundFloat = function (number) {
  let numString = number.toString();
  numString = numString.substring(numString.indexOf('.'), numString.length - 0);
  if (number - Math.floor(number) !== 0 && numString.length > 10) {
    number = number.toFixed(10);
    number = parseFloat(number);
    numstring = number.toString();
  }
  for (let i = 1; i < numString.length; i++) {
    let currentIndex = numString[i];
    let nextIndex = numString[i + 1];
    if (currentIndex === nextIndex) {
      return parseFloat(number.toFixed(i));
    }
  }
  return number;
};

/**
 * mathWork functionality
 */
const mathWork = function (opperand1, operator, opperand2) {
  if (operator === '+') {
    return opperand1 + opperand2;
  } else if (operator === '-') {
    return opperand1 - opperand2;
  } else if (operator === '*') {
    return opperand1 * opperand2;
  } else if (operator === '/') {
    return opperand1 / opperand2;
  }
};

/**
 * functionality for number buttons
 */
const numberInput = function () {

  //starts new equation after the equals button is pressed
  if (equationArray.length === 1 && tempNumber === '') {
    equationArray = [];
    equationText.textContent = '';
  }

  if (
    this.id === '.' &&
    tempNumber.includes('.') &&
    equationText.textContent.includes('.')
  ) {
    return;
  } else {
    tempNumber += this.id;
    equationText.textContent += this.id;
  }
};

/**
 * Adding functionality for clear button
 */
const clearCalculator = function () {
  if (this.id === 'clear') {
    runningSolution = '';
    equationArray = [];
    tempNumber = '';
    equationText.textContent = '';
    solutionText.textContent = '';
  }
};

/**
 * functionality for square root button
 *   uses generateNumber function
 *   also uses mathWork function
 */
let squareRoot = function () {
  if (tempNumber === '' && equationArray.length === 0) {
    return;
  } else if (equationArray.length === 2 && tempNumber !== '') {
    equationArray.push(generateNumber(tempNumber));
    let mySolution = Math.sqrt(
      mathWork(equationArray[0], equationArray[1], equationArray[2])
    );
    equationArray = [];
    equationArray.push(mySolution);
    runningSolution = mySolution;
    solutionText.textContent = '';
    equationText.textContent = `${mySolution}`;
    tempNumber = '';
  } else if (equationArray.length <= 2 && tempNumber === '') {
    let mySolution = Math.sqrt(generateNumber(equationArray[0]));
    if (mySolution - Math.floor(mySolution) !== 0) {
      mySolution = mySolution.toFixed(10);
    }
    equationArray = [];
    equationArray.push(mySolution);
    runningSolution = mySolution;
    solutionText.textContent = '';
    equationText.textContent = `${mySolution}`;
    tempNumber = '';
  } else if (equationArray.length === 0 && tempNumber !== '') {
    equationArray.push(tempNumber);
    let mySolution = Math.sqrt(generateNumber(equationArray[0]));
    if (mySolution - Math.floor(mySolution) !== 0) {
      mySolution = mySolution.toFixed(10);
    }
    equationArray = [];
    equationArray.push(mySolution);
    runningSolution = mySolution;
    solutionText.textContent = '';
    equationText.textContent = `${mySolution}`;
    tempNumber = '';
  } else if (equationArray.length === 1 && tempNumber === '') {
    let mySolution = Math.sqrt(generateNumber(equationArray[0]));

    if (mySolution - Math.floor(mySolution) !== 0) {
      mySolution = mySolution.toFixed(10);
    }
    equationArray = [];
    equationArray.push(mySolution);
    runningSolution = mySolution;
    solutionText.textContent = '';
    equationText.textContent = `${mySolution}`;
    tempNumber = '';
  }
};

/**
 * functionality for squared button
 *  uses generateNumber function
 *  also uses mathWork function
 */
let squared = function () {
  if (tempNumber === '' && equationArray.length === 0) {
    return;
  } else if (tempNumber !== '' && equationArray.length === 0) {
    let mySolution = generateNumber(tempNumber) ** 2;
    equationArray.push(mySolution);
    equationText.textContent = mySolution;
    tempNumber = '';
  } else if (tempNumber === '' && equationArray.length > 0) {
    let mySolution = generateNumber(equationArray[0]) ** 2;
    equationArray = [];
    equationArray.push(mySolution);
    equationText.textContent = mySolution;
    tempNumber = '';
  } else if (tempNumber !== '' && equationArray.length <= 2) {
    equationArray.push(generateNumber(tempNumber));
    let mySolution =
      mathWork(equationArray[0], equationArray[1], equationArray[2]) ** 2;
    equationArray = [];
    equationArray.push(mySolution);
    equationText.textContent = mySolution;
    tempNumber = '';
  }
};

/**
 * Functionality for opperand buttons
 *  uses generateNumber function
 *  also uses mathWork function
 *  also uses roundFloat function
 */
let addInitialOperator = function () {

  //replaces opperand in equation if one is entered twice
  if (equationArray.length === 2 && tempNumber === '') {
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
    tempNumber = '';
    let mySolution = mathWork(
      equationArray[0],
      equationArray[1],
      equationArray[2]
    );
    if (mySolution - Math.floor(mySolution) !== 0) {
      mySolution = roundFloat(mySolution);
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
    tempNumber = '';
    equationText.textContent += ` ${this.id} `;
  }
  if (tempNumber.length === 0 && equationArray.length === 1) {
    equationArray.push(this.id);
    equationText.textContent += ` ${this.id} `;
  }
};

/**
 * functionality for equals button
 *  uses generateNumber function  
 *  also uses mathWork function
 *  also uses roundFloat function
 */
let equals = function () {
  
  //if no equation has been started this stops the equals button from functioning
  if (equationArray.length <= 1) {
    return;
  }

  equationArray.push(generateNumber(tempNumber));
  tempNumber = '';
  solutionText.textContent = '';
  let mySolution = mathWork(
    equationArray[0],
    equationArray[1],
    equationArray[2]
  );
  if (
    mySolution - Math.floor(mySolution) !== 0 &&
    mySolution.toString().length > 10
  ) {
    mySolution = roundFloat(mySolution);
  }
  equationText.textContent = mySolution;
  equationArray = [];
  equationArray.push(mySolution);
};

//adding functionality to buttons
numberButtons.forEach((button) =>
  button.addEventListener('click', numberInput)
);

clearButton.addEventListener('click', clearCalculator);

squareRootButton.addEventListener('click', squareRoot);

squaredButton.addEventListener('click', squared);

operatorButtons.forEach((button) =>
  button.addEventListener('click', addInitialOperator)
);

equalsButton.addEventListener('click', equals);
