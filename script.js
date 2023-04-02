const regExp = /^[\d()+*-/^ ]+$/;
const form = document.querySelector("#equation-form");
const outputField = document.querySelector("#results");
const inputField = document.querySelector("#equation");

form.addEventListener("submit", (e) => {
  let value = inputField.value;
  e.preventDefault();
  if (isCorrectExpression(value)) {
    value = value.replace("^", "**");
    outputField.textContent = eval(value);
  } else {
    outputField.textContent = NaN;
  }
});

function isCorrectExpression(expression) {
  return regExp.test(expression);
}
