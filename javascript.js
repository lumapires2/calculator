// Variables

const operators = document.querySelector(".operators")
const numbers = document.querySelector(".numbers")

const display = document.querySelector("#display")
const history = document.querySelector("#history")

let num = ""
let num1 = ""
let num2 = ""

let currentOperator
let lastOperator

let result = document.querySelector("#result")

// Calculator design

let listOperators = ["+", "-", "×", "÷"]

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
    return a / b
}

// Display:

function displayNumberonScreen(e) {
    num = num + e.textContent
    display.textContent = num;
}

function displayResult() {
    num1 = dictOperations[lastOperator](num1, num2);
    num2 = ""
}

function displayHistory() {
    history.textContent = `${num1} ${currentOperator}`;
}

// Events:

dictOperations = {"+": add, "-": subtract, "*": multiply, '/': divide}

Array.from(numbers.children).forEach(number => {
    number.addEventListener("click", (e) => {
        displayNumberonScreen(e);
        if (num1 == "") {
            num1 = parseInt(num)
        } else {
            num2 = parseInt(num)
        }
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
            }
        }
    })
})



