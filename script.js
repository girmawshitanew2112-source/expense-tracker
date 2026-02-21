const balance = document.getElementById("balance");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions"),
);
let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

function addTransaction(e) {
  e.preventDefault();
  const transaction = {
    id: Math.floor(Math.random() * 1000000),
    text: text.value,
    amount: +amount.value,
  };

  transactions.push(transaction);
  updateDOM();
  updateLocalStorage();
  form.reset();
}

function updateDOM() {
  list.innerHTML = "";
  transactions.forEach((transaction) => {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");
    item.innerHTML = `${transaction.text} <span>${sign}$${Math.abs(transaction.amount)}</span>`;
    list.appendChild(item);
  });

  const total = transactions
    .reduce((acc, item) => (acc += item.amount), 0)
    .toFixed(2);
  balance.innerText = `$${total}`;
}

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

form.addEventListener("submit", addTransaction);
updateDOM();
