let calculator = document.querySelector(".calculator");
let keys = document.querySelector(".calculator-keys");
let display = document.querySelector(".display");
let clear = document.querySelector(".clear");


keys.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
        let key = e.target;
        let action = key.dataset.action
        let keyContent = key.textContent;
        let displayNum = display.textContent;
        let previousKeyType = calculator.dataset.previousKeyType;

        if (action == "add" || action == "subtract" || action == "multiply" || action == "divide") {
            document
                .querySelectorAll('[data-action="add"], [data-action="subtract"], [data-action="multiply"], [data-action="divide"]')
                .forEach(btn => btn.classList.remove("is-depressed"));
            key.classList.add("is-depressed");
            calculator.dataset.previousKeyType = "operator";
            calculator.dataset.firstValue = displayNum;
            calculator.dataset.operator = action;
        }

        if (!action) {

            if (displayNum === '0' || previousKeyType === "operator" || previousKeyType === "equal" || previousKeyType === "clear") {
                display.textContent = keyContent;
            } else {
                display.textContent = displayNum + keyContent;
            }
            calculator.dataset.previousKeyType = "number";
        }

        if (action === "decimal") {
            if (previousKeyType === "operator" || previousKeyType === "equal") {
                display.textContent = "0."
            }
            else if (!displayNum.includes(".")) {
                display.textContent = displayNum + ".";
            }
            calculator.dataset.previousKeyType = "decimal";
        }

        if (action === "equal") {
            const firstValue = calculator.dataset.firstValue;
            const operator = calculator.dataset.operator;
            const secondValue = displayNum;
            const calculate = (n1, operator, n2) => {
                let result;
                if (operator === "add") {
                    result = parseFloat(n1) + parseFloat(n2);
                }
                if (operator === "subtract") {
                    result = parseFloat(n1) - parseFloat(n2);
                }
                if (operator === "multiply") {
                    result = parseFloat(n1) * parseFloat(n2);
                }
                if (operator === "divide") {
                    result = parseFloat(n1) / parseFloat(n2);
                }
                return result;
            }
            if (firstValue && operator && previousKeyType !== "equal") {
                let result = calculate(firstValue, operator, secondValue);
                display.textContent = result;
                calculator.dataset.firstValue = result;
            }

            calculator.dataset.previousKeyType = "equal";
            calculator.dataset.operator = "";
        }
    }
});
clear.addEventListener("click", () => {
    display.textContent = "0";
    calculator.dataset.firstValue = "";
    calculator.dataset.secondValue = "";
    calculator.dataset.operator = "";
    calculator.dataset.previousKeyType = "clear";
    Array.from(keys.children).forEach(k => {
        k.classList.remove("is-depressed");
    });
});