function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return 'Error'; // Handle division by zero
    }
    return a / b;
}

function operate(operator, a, b) {
    switch (operator) {
        case '+':
            return add(a, b);
        case '-':
            return subtract(a, b);
        case '*':
            return multiply(a, b);
        case '/':
            return divide(a, b);
        default:
            return 'Invalid Operator';
    }
}

let firstNumber = '';
let operator = '';
let secondNumber = '';
let displayValue = '0';
const display = document.querySelector('.display');

function updateDisplay(value) {
    display.textContent = value;
}

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        if (displayValue === '0') {
            displayValue = button.textContent;
        } else {
            displayValue += button.textContent;
        }
        updateDisplay(displayValue);
    });
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        if (firstNumber === '') {
            firstNumber = displayValue;
            operator = button.textContent;
            displayValue = '';
        } else if (operator) {
            secondNumber = displayValue;
            firstNumber = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
            updateDisplay(firstNumber);
            operator = button.textContent;
            displayValue = '';
        }
    });
});

document.querySelector('.equals').addEventListener('click', () => {
    if (firstNumber !== '' && operator !== '' && displayValue !== '') {
        secondNumber = displayValue;
        displayValue = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        updateDisplay(displayValue);
        firstNumber = '';
        operator = '';
        secondNumber = '';
    }
});

document.querySelector('.clear').addEventListener('click', () => {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    displayValue = '0';
    updateDisplay(displayValue);
});

document.querySelector('.backspace').addEventListener('click', () => {
    displayValue = displayValue.slice(0, -1) || '0';
    updateDisplay(displayValue);
});

document.querySelector('.decimal').addEventListener('click', () => {
    if (!displayValue.includes('.')) {
        displayValue += '.';
        updateDisplay(displayValue);
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        handleNumber(e.key);
    } else if (['+', '-', '*', '/'].includes(e.key)) {
        handleOperator(e.key);
    } else if (e.key === 'Enter' || e.key === '=') {
        handleEquals();
    } else if (e.key === 'Backspace') {
        handleBackspace();
    } else if (e.key === 'Escape') {
        handleClear();
    }
});

function handleNumber(number) {
    if (displayValue === '0') {
        displayValue = number;
    } else {
        displayValue += number;
    }
    updateDisplay(displayValue);
}

function handleOperator(op) {
    if (firstNumber === '') {
        firstNumber = displayValue;
        operator = op;
        displayValue = '';
    } else if (operator) {
        secondNumber = displayValue;
        firstNumber = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        updateDisplay(firstNumber);
        operator = op;
        displayValue = '';
    }
}

function handleEquals() {
    if (firstNumber !== '' && operator !== '' && displayValue !== '') {
        secondNumber = displayValue;
        displayValue = operate(operator, parseFloat(firstNumber), parseFloat(secondNumber));
        updateDisplay(displayValue);
        firstNumber = '';
        operator = '';
        secondNumber = '';
    }
}

function handleBackspace() {
    displayValue = displayValue.slice(0, -1) || '0';
    updateDisplay(displayValue);
}

function handleClear() {
    firstNumber = '';
    operator = '';
    secondNumber = '';
    displayValue = '0';
    updateDisplay(displayValue);
}
