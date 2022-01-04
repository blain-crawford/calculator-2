//DOM element and Global Variable creation
const numberButtons = document.querySelectorAll('.number-button');
const operatorButtons = document.querySelectorAll('.operator-button');
const equationText = document.querySelector('#running-equation');
const solutionText = document.querySelector('#solution');
let runningSolution = '';
let equationArray = [];
let tempNumber = '';


//functionality for number buttons
const numberInput = function () {
  if(this.id === '.' && tempNumber.includes('.') && equationText.textContent.includes('.')){
    return;
  } else {
    tempNumber += this.id;
    equationText.textContent += this.id;
  }
  // if(parseInt(this.id) >= 0 && parseInt(this.id) <= 9) {
  //   equationText.textContent += this.id;
  //   numberInput += this.id;
  // } else if (this.id === 'clear') {
  //   equationText.textContent = ''
  //   solutionText.textContent = ''
  //   numberInput = '';
  //   while (equationArray.length > 0){
  //     equationArray.pop();
  //   }

  // } else if (this.id === '+' || this.id === '-' || this.id ==='*' || this.id ==='/') {
  //   equationArray.push(numberInput);
  //   equationArray.push(this.id);
  //   numberInput = '';
  //   equationText.textContent += ` ${this.id} `;

    
  // }
  // console.log(equationArray);
  // console.log(numberInput);
  console.log(this.id);
  console.log(tempNumber);
};

const addOperator = function(){
  if(this.id === 'clear'){
      runningSolution = '';
      equationArray = [];
      tempNumber = '';
      equationText.textContent = ''
  } 
  if (equationArray.indexOf(this.id) === -1 && equationArray.length > 0 && this.id === '+' || this.id === '-' || this.id === '*' || this.id === '/'){
    equationText.textContent += ` ${this.id} `;
    equationArray.push(tempNumber);
    equationArray.push(this.id);
    tempNumber = '';

        
    }
  console.log(tempNumber);
  console.log(equationArray);
};

//adding functionality to number buttons
numberButtons.forEach(button => button.addEventListener('click', numberInput));

//adding operator button functionality
operatorButtons.forEach(button => button.addEventListener('click', addOperator));