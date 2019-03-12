const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const viewOperation = document.querySelector(".operation");
const viewResult = document.querySelector(".result");
const btnClear = document.querySelector(".btn-clr");

let displayNumber = "0";
let result = 0;
let isOperatorDouble = true;

updateViewOperation = () => {
  viewOperation.value = displayNumber;
};

getNumber = (e, num) => {    
  let number = e ? e.target.dataset.number : num;
  displayNumber = displayNumber === "0" ? number : displayNumber + number;
  updateViewOperation();
};

getOperator = (e, key) => {
  if (displayNumber === "0") {
    return;
  }
        
  const operator = e ? e.target.dataset.operator : key;
  switch (operator) {
    case "+":
      displayNumber += " + ";
      updateViewOperation();
      break;
    case "-":
      displayNumber += " - ";
      updateViewOperation();
      break;
    case "*":
      displayNumber += " * ";
      updateViewOperation();
      break;
    case "/":
      displayNumber += " / ";
      updateViewOperation();
      break;
    case "=":
      calculateNumber();
      break;
    default:
      updateViewOperation();
      break;
  }
  console.log(displayNumber);
};

calculateNumber = () => {
  result = eval(displayNumber);
  displayNumber = "0";
  viewResult.value = result;
};

keyPressHandler = e => {
  const numEl = document.querySelector(`button[data-key="${e.keyCode}"]`);
  let operatorEl = document.querySelector(`button[data-operator="${e.key}"]`);
  
  if(e.keyCode == '13') {
    operatorEl = document.querySelector(`button[data-operator="="]`);
  }
  if (numEl == null) {
    if (operatorEl == null) {
      return;
    } else {
      let operator = operatorEl.dataset.operator;
      getOperator(null, operator);
    }
    return;
  } else {
    let number = numEl.dataset.number;
    getNumber(null, number);
    updateViewOperation();
  }
};

clearNumberHandler = () => {    
    displayNumber = '0';
    result = 0;
    viewResult.value = result;
    updateViewOperation();
}

numbers.forEach(number => {
  number.addEventListener("click", getNumber);
});

operators.forEach(operator => {
  operator.addEventListener("click", getOperator);
});

btnClear.addEventListener("click", clearNumberHandler);

window.addEventListener("keydown", keyPressHandler);
