// Variables

const operators = document.querySelector(".operators")
const numbers = document.querySelector(".numbers")

const display = document.querySelector("#display")
const history = document.querySelector("#history")
const restart = document.querySelector("#restart")

let num = ""
let num1 = ""
let num2 = ""

let currentOperator
let lastOperator

let a
let b
let result

// Calculator design

let listOperators = ["+", "-", "×", "÷", "="]

let listNumbers = []
for (let i=9; i>=0; i--) {listNumbers.push(i)}

addChildElementsBasedOnList(listOperators, operators)
addChildElementsBasedOnList(listNumbers, numbers)

function addChildElementsBasedOnList(baseList, father) {
    baseList.forEach(item => {
        const div = document.createElement("div")
        div.textContent = item
        father.appendChild(div)
    })

}

// Math functions

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    if (b == 0) {
        return 'ERROR'
    }
    return a / b
}

function resulting(a, b) {
    opResult = gettingOperationResult(currentOperator);
    display.textContent =  opResult;
    num = num2 = "";
    num1 = opResult;
}
// Display:

dictOperations = {"+": add, "-": subtract, "×": multiply, '÷': divide, "=": resulting}

function gettingOperationResult(operator) {
    return dictOperations[operator](parseFloat(num1), parseFloat(num2));
}

function displayNumberonScreen(e) {
    display.textContent = num;
}

function displayResult() {
    a = parseFloat(num1);
    b = parseFloat(num2);
    result = gettingOperationResult(lastOperator);
    num1 = result;
    num2 = "";
    if (isNaN(result)) {
        display.textContent = "ERROR";
    } else {
        display.textContent = result;
    }
}

function displayHistory() {
    if (isNaN(num1)) {
        history.textContent = "ERROR";
    } else {
        if (currentOperator == "=") {
            history.textContent = `${a}${lastOperator}${b}`
        } else {
            history.textContent = `${num1} ${currentOperator}`;
        }
    }
}

function cleanDisplay() {
    if (currentOperator == "=") {
        display.textContent = result;
    } else {
        display.textContent = "";
    }
}

// Restarting:



// Events:

Array.from(numbers.children).forEach(number => {
    number.addEventListener("click", (e) => {
        if (!!!currentOperator) {
            num1 = num1.toString() + e.target.textContent.toString();
            num = num1;
        } else {
            cleanDisplay();;
            num2 =  num2.toString() + e.target.textContent.toString();
            num = num2;
        }
        displayNumberonScreen(e);
    })
})

Array.from(operators.children).forEach(operator => {
    operator.addEventListener("click", (e) => {
        lastOperator = currentOperator;
        if (num1 != "") {
            currentOperator = e.target.textContent;
            displayHistory();           
            if (num2 != "") {  
                displayResult();
                displayHistory();
                cleanDisplay();        
            }
        }
    })
})



