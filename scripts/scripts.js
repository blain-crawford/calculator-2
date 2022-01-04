//DOM element and Global Variable creation
const clearButton = document.querySelector('#clear')
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equationText = document.querySelector('#running-equation');
const equalsButton = document.querySelector('#=');
const solutionText = document.querySelector('#solution');
let runningSolution = '';
let equationArray = [];
let tempNumber = '';


//mathWork functionality
const mathWork = function(opperand1, operator, opperand2){
  if(operator === '+') {
   return opperand1 + opperand2;
  } else if (operator === '-') {
    return opperand1 - opperand2;
  } else if (operator === '*') {
    return opperand1 * opperand2;
  } else if (operator === '/'){
    return opperand1 / opperand2;
  } else if(operator === '**'){
    return opperand1 ** 2;
  }
}

//functionality for number buttons
const numberInput = function () {
  if(this.id === '.' && tempNumber.includes('.') && equationText.textContent.includes('.')){
    return;
  } else {
    tempNumber += this.id;
    equationText.textContent += this.id;
  }
  console.log(tempNumber);
};

//Adding functionality for clear Button
const clearCalculator = function() {
  if(this.id === 'clear'){
      runningSolution = '';
      equationArray = [];
      tempNumber = '';
      equationText.textContent = '';
      solutionText.textContent = '';
  } 
};


//Functionality for opperand buttons
let addInitialOperator = function() {
  if(equationArray.length === 2 && tempNumber === ''){
    if(equationArray[1] === this.id){
      return;
    } else {
      equationArray.pop();
      equationArray.push(this.id);
      equationText.textContent = `${equationArray[0]} ${this.id} `
    }
    return;
  }
  
  if(equationArray.length >= 1) {
    equationArray.push(parseInt(tempNumber));
    tempNumber = '';
    let mySolution = mathWork(equationArray[0], equationArray[1], equationArray[2]);
    if(!Number.isInteger(mySolution)){
      mySolution = mySolution.toFixed(10);
    }
    equationArray = [];
    equationArray.push(mySolution);
    equationArray.push(this.id)
    runningSolution = mySolution;
    solutionText.textContent = mySolution;
    equationText.textContent = `${mySolution} ${this.id} `;

  }

  if(tempNumber.length > 0 && equationArray.length === 0){
    equationArray.push(parseInt(tempNumber));
    equationArray.push(this.id);
    tempNumber = '';
    equationText.textContent += ` ${this.id} `
  }

  console.log(equationArray);
}

//functionality for equals button





//adding functionality to number buttons
numberButtons.forEach(button => button.addEventListener('click', numberInput));

//adding operator button functionality
operatorButtons.forEach(button => button.addEventListener('click', addInitialOperator));

//adding functionality to clear button
clearButton.addEventListener('click', clearCalculator);