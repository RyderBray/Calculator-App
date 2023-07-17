const display = document.getElementById("numDisplay");
const buttons = document.querySelectorAll('button');
let clickedValues = [];
let equation = [];
let lastInput = null

//To do
//Commas for thousands, millions, etc

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        const buttonClick = button.innerHTML;
        const Operators = ["%", "⌫", "c", "=", "x", "÷", "+", "-"]
        const specialOperators = ["⌫", "c", "="];
        const lastInputType = getLastInputType(equation);
        const numericValue = parseFloat(buttonClick);

    if (buttonClick === lastInput) {
        return;
    }
    else if (equation.length === 18 && !specialOperators.includes(buttonClick)) {
        return;
    }
    else if (Operators.includes(buttonClick)) { //Checks for operators
        if (buttonClick === "%") {
            percent();
        }
        else if (buttonClick === "⌫") {
            equation.pop();
            clickedValues.pop();
            display.textContent = clickedValues.join("");
        }
        else if (buttonClick === "c") {
            cancel();
        }
        else if (buttonClick === "=") {
            equals();
        }
        else if (buttonClick === "÷") {
            if (lastInputType === "number") {
                displayOperators("/");
            }
        }
        else if (buttonClick === "x") {
            if (lastInputType === "number") {
                displayOperators("*");
            }
        }
        else if (buttonClick === "+") {
            if (lastInputType === "number") {
                displayOperators("+");
            }
        }
        else if (buttonClick === "-") {
            if (lastInputType === "number") {
                displayOperators("-");
            }
        }
    }
    else if (!isNaN(numericValue)) { //Adds numbers to equation and display
        clickedValues.push(buttonClick);
        equation.push(buttonClick);
        display.textContent = clickedValues.join("");
    }
    });
});

function getLastInputType(equation) {
    if (equation.length === 0) {
      return "none";
    }
    const lastItem = equation[equation.length - 1];
    if (!isNaN(parseFloat(lastItem))) {
      return "number";
    }
    return "operator";
  }

function percent() {
    const currentNumber = parseFloat(clickedValues.join(""));
    const percentage = currentNumber / 100;
    clickedValues = [percentage.toString()];
    equation = [percentage.toString()];
    equation.push("*");
    clickedValues.push("*");
    display.textContent = clickedValues.join("");
}

function displayOperators(sign) {
    equation.push(sign);
    clickedValues.push(sign);
    display.textContent = clickedValues.join("");
}

function equals() {
    let finalEquation = equation.join("");
    result = eval(finalEquation);
    equation = [result];
    lastInput = null;
    clickedValues = [result];
    display.textContent = result;
}

function cancel() {
    clickedValues = [];
    equation = [];
    display.textContent = "";
    lastInput = null;
}