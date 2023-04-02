const form = document.querySelector("#equation-form");
const outputField = document.querySelector("#results");
const inputField = document.querySelector("#equation");

const multOrDivRegExp =
  /(?<operand1>-?\d+\.?\d*e?[+-]?\d*)\s*(?<operator>[*/])\s*(?<operand2>-?\d+\.?\d*e?[+-]?\d*)/;
const addOrSubRegExp =
  /(?<operand1>-?\d+\.?\d*e?[+-]?\d*)\s*(?<operator>[+-])\s*(?<operand2>-?\d+\.?\d*e?[+-]?\d*)/;
const exponRegExp =
  /(?<operand1>-?\d+\.?\d*e?[+-]?\d*)\s*(?<operator>[\^])\s*(?<operand2>-?\d+\.?\d*e?[+-]?\d*)/;
const parenExp = /(?<=\().+?(?=\))/g;

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let expression = inputField.value;
  outputField.textContent = +evaluate(expression);
});

function evaluate(expression) {
  if (expression.match(parenExp)) {
    let expInParen = expression.match(parenExp)[0];
    let subExpression = evaluate(expInParen);
    expression = expression.replace(`(${expInParen})`, subExpression);
    return evaluate(expression);
  } else if (expression.match(exponRegExp)) {
    let subExpression = calculate(expression.match(exponRegExp));
    expression = expression.replace(
      expression.match(exponRegExp)[0],
      subExpression
    );
    return evaluate(expression);
  } else if (expression.match(multOrDivRegExp)) {
    let subExpression = calculate(expression.match(multOrDivRegExp));
    expression = expression.replace(
      expression.match(multOrDivRegExp)[0],
      subExpression
    );
    return evaluate(expression);
  } else if (expression.match(addOrSubRegExp)) {
    let subExpression = calculate(expression.match(addOrSubRegExp));
    expression = expression.replace(
      expression.match(addOrSubRegExp)[0],
      subExpression
    );
    return evaluate(expression);
  }
  return expression;
}

function calculate(exp) {
  const operand1 = parseFloat(exp.groups.operand1);
  const operand2 = parseFloat(exp.groups.operand2);
  switch (exp.groups.operator) {
    case "*":
      return operand1 * operand2;
    case "/":
      return operand1 / operand2;
    case "-":
      return operand1 - operand2;
    case "+":
      return operand1 + operand2;
    case "^":
      return operand1 ** operand2;
  }
}
