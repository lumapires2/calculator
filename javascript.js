const nDecimal = 8

const operators = document.querySelector(".operators")
const numbers = document.querySelector(".numbers")

const display = document.querySelector("#display")

const specialChar = document.querySelector(".specialChar")
const dot = document.querySelector("#dot")
const del = document.querySelector("#delete")
const restart = document.querySelector("#restart")

let memory = {
    num: "",
    num1: "",
    num2: "",
    op: ""
}

let equal = false

// Calculator design

const listOperators = ["=", "+", "-", "×", "÷"]

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


function add() {
    return parseFloat(memory.num1) + parseFloat(memory.num2)
}

function subtract() {
    return parseFloat(memory.num1) - parseFloat(memory.num2)
}

function multiply() {
    return parseFloat(memory.num1) * parseFloat(memory.num2)
}

function divide() {
    if (memory.num2 == 0) {
        return 'ERROR'
    }
    return parseFloat(memory.num1) / parseFloat(memory.num2)
}

// Operations:

dictOperations = {"+": add, "-": subtract, "×": multiply, '÷': divide, "=": resulting}

function gettingOperationResult(operator) {   

    result = dictOperations[operator](parseFloat(memory.num1), parseFloat(memory.num2));
    memory.num = result

    if (!allOkWithSize()) {
        before = result.toString().indexOf(".");
        before = before == -1 ? 0 : before;
        result = parseFloat(result).toFixed(nDecimal + 1 - before);
    };

    return result;
}

function resulting() {
    opResult = gettingOperationResult(currentOperator);
    display.textContent = opResult;
    memory.num = memory.num2 = "";
    memory.num1 = opResult;
}


// Display

function displayResult() {

    result = gettingOperationResult(lastOperator);

    memory.num1 = result;
    memory.num2 = "";

    if (isNaN(result)) {
        display.textContent = "ERROR";

    } else {
        display.textContent = result;        
    }

}

function allOkWithSize(str=memory.num) {
    if (str.toString().length > nDecimal + 1) {
        return false;
    } else {
        return true;
    }
}

function treatingDots(number) {
    if (number.indexOf(".") == -1) {
        display.textContent = display.textContent + "."
        return number.toString() + "."
    } else {
        return number
    }
}

// Restarting

function cleanDisplay() {
    display.textContent = "";
}

function restarting() {
    memory.num = memory.num1 = memory.num2 = "";
    lastOperator = currentOperator = undefined;
    cleanDisplay()
}

// Events

Array.from(numbers.children).forEach(number => {
    number.addEventListener("click", (e) => {
        
        if (equal) {
            memory.num1 = "";
            equal = false;
        }

        if (memory.num1 == "" || !!!memory.op) {
            if (allOkWithSize(memory.num1)) {
                memory.num1 = memory.num1.toString() + e.target.textContent.toString();
                memory.num = memory.num1;
                display.textContent = memory.num1;
            }        
        }

        else {
            if (allOkWithSize(memory.num2)) {
                memory.num2 =  memory.num2.toString() + e.target.textContent.toString();
                memory.num = memory.num2;
                display.textContent = display.textContent + e.target.textContent;
            }
        }
    })
})

Array.from(operators.children).forEach(operator => {
    operator.addEventListener("click", (e) => {

        lastOperator = memory.op;
        memory.op = e.target.textContent;
        equal = false;

        if (memory.num1 == "" && memory.op == "-") {
            memory.num1 = 0
            display.textContent = memory.num1 + " " + memory.op + " "

        } else if (!memory.num1 == "" && memory.num2 == "") {
            display.textContent = memory.num1 + " " + memory.op + " "

        } else if (!memory.num1 == "" && !memory.num2 == "") {
            displayResult();

            if (memory.op == "=") {
                display.textContent = result;
                memory.num1 = result;
                memory.num2 = memory.op = "";

            } else {
                display.textContent = display.textContent + " " + memory.op + " ";
            }
        }

    })

})

restart.addEventListener("click", restarting)

dot.addEventListener("click", (e) => {

    if (memory.num1 == "") {
        memory.num1 = "0.";

    } else if (memory.num2 == "" && allOkWithSize(memory.num1)) {
        memory.num1 = treatingDots(memory.num1);
        memory.num = memory.num1;

    } else if (!memory.num2 == "" && allOkWithSize(memory.num2)) {
        memory.num2 = treatingDots(memory.num2);
        memory.num = memory.num2;
    }
})

del.addEventListener("click", (e) => {
    
    if (!memory.num2 == "") {
        memory.num2 = memory.num2.toString().slice(0, -1)

    } else if (!memory.op == "") {
        memory.op = ""
        lastOperator = ""

    } else if (!memory.num1 == "") {
        memory.num1 = memory.num1.toString().slice(0, -1)
    }

    display.textContent = memory.num1 + " " + memory.op + " " + memory.num2

})

// Keyboard trigger:

const dictSymbols = {"Enter": "=", "*": "×", "/": "÷"}
const dictSpecialChar = {".": 1, "Backspace": 2}

document.addEventListener("keydown", (event) => {
    let idx
    pressedKey = event.key;
    if (pressedKey in dictSymbols || listOperators.includes(pressedKey)) {
        if (pressedKey in dictSymbols) {pressedKey = dictSymbols[pressedKey]}
        idx = listOperators.indexOf(pressedKey);
        operators.children[idx].click();
    }
    else if (listNumbers.includes(Number(pressedKey))) {
        idx = listNumbers.indexOf(Number(pressedKey));
        if (idx != -1) {numbers.children[idx].click();}
    }
    else if (pressedKey in dictSpecialChar) {
        idx = dictSpecialChar[pressedKey];
        if (idx !== undefined) {specialChar.children[idx].click();
    }}
})

document.querySelector("#result").addEventListener("click", (e) => {
    equal = true;
})
