const nDecimal = 9

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

let keyboard = document.querySelector(".keyboard").children
let opButtons = document.querySelector(".operators").children
let specButtons = document.querySelector(".specialChar").children
let numButtons = document.querySelector(".numbers").children

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
    memory.num = result;

    if (!allOkWithSize()) {
        before = result.toString().indexOf(".");
        if (before == -1) {
            result = result > parseInt("9".repeat(nDecimal))? parseInt("9".repeat(nDecimal)): result;
        } else {
            result = parseFloat(result).toFixed(nDecimal - before);
        }
        
    };

    return result;
}

function resulting() {
    opResult = gettingOperationResult(memory.op);
    displaying(opResult);
    memory.num = memory.num2 = "";
    memory.num1 = opResult;
}


// Display

function displaying(text) {

    text = text.toString();

    if (text == undefined) {
        text = "";
    } else if (text.includes(". ")) {
        text = text.replace(". ", " ");
    }

    display.textContent = text;
}

function displayResult() {

    result = gettingOperationResult(lastOperator);

    memory.num1 = result;
    memory.num2 = "";

    if (isNaN(result)) {
        displaying("ERROR");

    } else {
        displaying(result);        
    }

}

function allOkWithSize(str=memory.num) {
    str = str.toString().replace(".", "")
    if (str.toString().length > nDecimal) {
        return false;
    } else {
        return true;
    }
}

function treatingDots(number) {
    if (number.indexOf(".") == -1) {
        displaying(display.textContent + ".");
        return number.toString() + ".";
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
    lastOperator = memory.op = undefined;
    cleanDisplay()
}

// Events

Array.from(numbers.children).forEach(number => {
    number.addEventListener("mousedown", (e) => {
        
        if (memory.num1 == "0" && e.target.textContent.toString() == "0") {
            return
        } else if (memory.num2 == "0" && e.target.textContent.toString() == "0") {
            return
        }

        if (memory.num1 == "0" && e.target.textContent.toString() != "0") {
            memory.num1 = "";
        } else if (memory.num2 == "0" && e.target.textContent.toString() != "0") {
            display.textContent = display.textContent.slice(0, -1);
            memory.num2 = "";
        }

        if (equal) {
            memory.num1 = "";
            equal = false;
        }

        if (memory.num1 == "" || !!!memory.op) {
            if (allOkWithSize(memory.num1)) {
                memory.num1 = memory.num1.toString() + e.target.textContent.toString();
                memory.num = memory.num1;
                displaying(memory.num1);
            }        
        }

        else {
            if (allOkWithSize(memory.num2)) {
                memory.num2 =  memory.num2.toString() + e.target.textContent.toString();
                memory.num = memory.num2;
                displaying(display.textContent + e.target.textContent);
            }
        }
    })
})

Array.from(operators.children).forEach(operator => {
    operator.addEventListener("mousedown", (e) => {

        lastOperator = memory.op;
        memory.op = e.target.textContent;
        equal = false;

        if (memory.num1 == "" && memory.op == "-") {
            memory.num1 = 0;
            displaying(memory.num1 + " " + memory.op + " ");

        } else if (!memory.num1 == "" && memory.num2 == "" && memory.op == "=") {
            equal = false;
            memory.op = ""

        } else if (!memory.num1 == "" && memory.num2 == "") {
            displaying(memory.num1 + " " + memory.op + " ");

        } else if (!memory.num1 == "" && !memory.num2 == "") {
            displayResult();

            if (memory.op == "=") {
                displaying(result);
                memory.num1 = result;
                memory.num2 = memory.op = "";

            } else {
                displaying(display.textContent + " " + memory.op + " ");
            }
        }

    })

})

restart.addEventListener("mousedown", restarting)

dot.addEventListener("mousedown", (e) => {

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

del.addEventListener("mousedown", (e) => {

    if (equal) {return}

    if (!memory.num2 == "") {
        memory.num2 = memory.num2.toString().slice(0, -1)

    } else if (!memory.op == "") {
        memory.op = ""
        lastOperator = undefined

    } else if (!memory.num1 == "") {
        memory.num1 = memory.num1.toString().slice(0, -1)
    }

    display.textContent = memory.num1 + " " + memory.op + " " + memory.num2

})

// Keyboard trigger:

const dictSymbols = {"Enter": "=", "*": "×", "/": "÷"}
const dictSpecialChar = {",": 1, "Backspace": 2}

document.addEventListener("keydown", (event) => {
    let idx
    pressedKey = event.key;
    if (pressedKey in dictSymbols || listOperators.includes(pressedKey)) {
        if (pressedKey in dictSymbols) {pressedKey = dictSymbols[pressedKey]}
        idx = listOperators.indexOf(pressedKey);
        sleepToGetKeyboardEffect(operators.children[idx])
    }
    else if (listNumbers.includes(Number(pressedKey))) {
        idx = listNumbers.indexOf(Number(pressedKey));
        if (idx != -1) {sleepToGetKeyboardEffect(numbers.children[idx])}
    }
    else if (pressedKey in dictSpecialChar) {
        idx = dictSpecialChar[pressedKey];
        if (idx !== undefined) {sleepToGetKeyboardEffect(specialChar.children[idx]);
    }}
})

async function sleepToGetKeyboardEffect(obj) {
    obj.dispatchEvent(new MouseEvent('mousedown'))
    await new Promise(resolve => setTimeout(resolve, 100))
    obj.dispatchEvent(new MouseEvent('mouseup'))
}

document.querySelector("#result").addEventListener("mousedown", (e) => {
    equal = true;
})

responsiveButtons(opButtons)
responsiveButtons(specButtons)
responsiveButtons(numButtons)

function responsiveButtons(children) {
    Array.from(children).forEach(button => {
    
        button.addEventListener("mouseover", (event) => {
            button.classList.add("mouseover");
        });
        
        button.addEventListener("mousedown", (event) => {
            // Two classes for this style overwrite mouseover class style
            button.classList.add("mousedown1");
            button.classList.add("mousedown2");
        });
        
        button.addEventListener("mouseout", (event) => {
            button.classList.remove("mouseover");
        });
        
        button.addEventListener("mouseup", (event) => {
            button.classList.remove("mousedown1");
            button.classList.remove("mousedown2");
        });
    });
}
