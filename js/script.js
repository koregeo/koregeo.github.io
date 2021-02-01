const currencyElementOne = document.getElementById("currency-one");
const currencyElementTwo = document.getElementById("currency-two");
const amountElementOne = document.getElementById("amount-one");
const amountElementTwo = document.getElementById("amount-two");

const rateEl = document.getElementById("rate");
const swap = document.getElementById("swap");

// Fetch exhange rates and update the DOM

async function calculate() {
  const currencyOne = currencyElementOne.value;
  const currencyTwo = currencyElementTwo.value;

  const result = await fetch(
    `https://v6.exchangerate-api.com/v6/4ca21a08b3430d0376ec231d/latest/${currencyOne}`
  );
  const exchangeObj = await result.json();
  const rate = exchangeObj.conversion_rates[currencyTwo];
  rateEl.innerText = `1 ${currencyOne} = ${rate} ${currencyTwo}`;

  amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
}

currencyElementOne.addEventListener("change", calculate);
currencyElementTwo.addEventListener("change", calculate);
amountElementOne.addEventListener("input", calculate);
amountElementTwo.addEventListener("input", calculate);

swap.addEventListener("click", () => {
  const temp = currencyElementOne.value;
  currencyElementOne.value = currencyElementTwo.value;
  currencyElementTwo.value = temp;
  calculate();
});
