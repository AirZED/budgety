`use strict`;
let totalAmount = 0;
let IndividualArray;
let List;


const Money = function (total, list) {
  this.list = list;
  this.total = total;
};

const income = new Money(5000, [
  ["Website Project", 500],
  ["Banga Soup", 600],
]);

const expense = new Money(2000, [
  ["Buy Shoes", 200],
  ["Banga Soup", 600],
]);

const users = [income, expense];



function submitNewList(e) {
  e.preventDefault();

  addDescription = document.querySelector(`.add-description`).value;
  addValue = Number(document.querySelector(`.value`).value);

  if (addDescription === ``) {
    console.log("Input Description");
  } else if (addValue === ``) {
    console.log(`Input Value`);
  } else {
    IndividualArray = [addDescription, addValue];
    List.push(IndividualArray);
    expense.displayList('expense');
    expense.calcTotalEI('expense');
  }

  document.querySelector(`.add-description`).value = "";
  document.querySelector(`.value`).value = "";
}
Money.prototype.appendArray = function () {
  let addDescription;
  let addValue;
  List = this.list;

  document.querySelector("button").addEventListener("click", submitNewList);
};




expense.appendArray();


Money.prototype.displayList = function (name) {
  let mapExpense = List
    .map(
      (element) =>
        ` <li>
          <div>${element[0]}</div>
          <div class="${name}-amount">$${element[1]}</div>
        </li>`
    )
    .join(``);

  document.querySelector(`.${name}-adons`).innerHTML = mapExpense;
};

expense.displayList("expense");
income.displayList(`income`);

Money.prototype.calcTotalEI = function (name) {
  let dividedTotal = 0;
  for (let index = 0; index < this.list.length; index++) {
    dividedTotal = dividedTotal + this.list[index][1];
  }

  console.log(dividedTotal);
  document.querySelector(`.${name}-amount`).textContent = `+${dividedTotal}`;
};

expense.calcTotalEI("expense");
income.calcTotalEI("income");




document.querySelector(".add-expense").addEventListener(`click`, (console.log('Clicked')));

