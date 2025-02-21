// Variables

const nDecimal = 8

const operators = document.querySelector(".operators")
const numbers = document.querySelector(".numbers")

const display = document.querySelector("#display")
const history = document.querySelector("#history")

const dot = document.querySelector("#dot")

let num = ""
let num1 = ""
let num2 = ""

let currentOperator
let lastOperator

let a
let b
let result

let equal
equal = false

const restart = document.querySelector("#restart")

// const keyboard = document

// Calculator design

let listOperators = ["=", "+", "-", "×", "÷"]

let listNumbers = []
for (let i=9; i>=0; i--) {listNumbers.push(i)}

addChildElementsBasedOnList(listOperators, operators)
addChildElementsBasedOnList(listNumbers, numbers)

function addChildElementsBasedOnList(baseList, father) {
    baseList.forEach(item => {
        const div = document.createElement("div")
        div.textContent = item
        father.appendChild(div)
        if (item == "=") {div.id = "result"}
    })

}

// Math functions

function add(a, b) {
    return (a + b)
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
    result = dictOperations[operator](parseFloat(num1), parseFloat(num2));
    if (result.toString().length > nDecimal + 1) {
        before = result.toString().indexOf(".");
        before = before == -1 ? 0 : before;
        result = parseFloat(result).toFixed(nDecimal + 1 - before);
    };
    return result;
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

function putResultInDisplay() {
    display.textContent = result;
}

function checkSize() {
    if (num.toString().length > nDecimal + 1) {
        return false;
    } else {
        return true;
    }
}

function treatingDots(number) {
    if (number.indexOf(".") == -1) {
        return number.toString() + "."
    } else {
        return number
    }
}

// Restarting:

function cleanDisplay() {
    display.textContent = "";
}

function cleanHistory() {
    history.textContent = "";
}

function restarting() {
    num = num1 = num2 = "";
    lastOperator = currentOperator = undefined;
    display.textContent = "";
    history.textContent = "";
}

// Events:

Array.from(numbers.children).forEach(number => {
    number.addEventListener("click", (e) => {
        if (equal) {
            cleanHistory();
            cleanDisplay();
            num1 = ""
            equal = false;
            lastOperator = undefined;
            currentOperator = undefined;
        }
        if (!!!currentOperator) {
            if (checkSize()) {
                num1 = num1.toString() + e.target.textContent.toString();
                num = num1;   
            }

        } else {
            putResultInDisplay();
            if (checkSize()) {
                num2 =  num2.toString() + e.target.textContent.toString();
                num = num2;    
            }
        }
        displayNumberonScreen(e);
    })
})

Array.from(operators.children).forEach(operator => {
    operator.addEventListener("click", (e) => {
        lastOperator = currentOperator;
        equal = false;
        if (num1 != "") {
            currentOperator = e.target.textContent;
            displayHistory();           
            if (num2 != "") {  
                displayResult();
                displayHistory();
                putResultInDisplay();        
            }
        }
        if (e.target.textContent == "="){
            equal = true;
        }
    })
})

restart.addEventListener("click", restarting)

dot.addEventListener("click", (e) => {
    if (num1 == "") {
        num1 = "0.";
    } else if (num2 == "") {
        num1 = treatingDots(num1);
        num = num1;
    } else {
        num2 = treatingDots(num2);
        num = num2;
    }
    displayNumberonScreen(e)
})