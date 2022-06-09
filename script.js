//BUDGET CONTROLLER
const budgetController = (function () {
  let Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  let data = {
    allitems: {
      exp: [],
      inc: [],
    },
    totals: {
      totalExpenses: 0,
      totalIncomes: 0,
    },
  };

  return {
    additem: function (type, des, val) {
      let newItem;

      //Create New ID
      data.allitems[type].length <= 0
        ? (ID = 0)
        : (ID = data.allitems[type][data.allitems[type].length - 1].id + 1);

      //Create new Item basedon 'inc' and 'exp'
      if (type === "inc") {
        newItem = new Income(ID, des, val);
      } else if (type === "exp") {
        newItem = new Expense(ID, des, val);
      }
      //push newitem into our data structure
      data.allitems[type].push(newItem);
      return newItem;
    },
    testing: function () {
      console.log(data);
    },
  };
})();

//UI CONTROLLER
const UIController = (function () {
  let DomStrings = {
    inputType: "#selector",
    descriptionType: ".add__description",
    valueType: ".add__value",
    submitBtn: "button",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DomStrings.inputType).value, //Will be either income or expense
        description: document.querySelector(DomStrings.descriptionType).value,
        value: document.querySelector(DomStrings.valueType).value,
      };
    },
    addListItem: function (obj, type)
    {
      let html;
      //Create html string with placeholder text

      if (type === 'inc') {
        html = `<li id= "${obj.id}">
          <div>${obj.description}</div> 
          <div class="income-amount">$${obj.value}<span>25%</span><span>x</span></div>
      </li>`;
      } else if (type === 'exp') {

        html = `<li id= "${obj.id}">
                <div>${obj.description}</div>
                <div class="expense-amount">$${obj.value}<span>50%</span></div>
              </li>`;
      }

      //Replace the placeholder text with some real data
      document.querySelector(`.${type}-adons`).insertAdjacentHTML(`afterbegin`, html);
      

      //Insert the html into the DOM
    },
    getDOMString: function () {
      return DomStrings;
    },
  };
})();

//GLOBAL APP CONTROLLER
//In order for this branch to access the other functions, they would be passed as arguments to this function below
const controller = (function (budgetCtrl, UICtrl) {
  let setupEventListeners = function () {
    let DOM = UICtrl.getDOMString();
    document
      .querySelector(DOM.submitBtn)
      .addEventListener("click", ctrlAddItem);
    document.addEventListener("keypress", function clickedBtn(event) {
      //SINCE NOT ALL BROWSER USES KEYCODES; SOME USES WHICH
      if (event.keyCode === 13 || event.which === 13 || event.key === "Enter") {
        ctrlAddItem();
      }
    });
  };

  let ctrlAddItem = function () {
    let input, newItem;
    //Get the filled input data

    input = UICtrl.getInput();

    //Add the item to the budget controller
    newItem = budgetCtrl.additem(input.type, input.description, +input.value);
    //add the item to the UI
    UICtrl.addListItem(newItem, input.type);

    //Calculate the budget

    //Display the budget on the UI
  };

  return {
    initialization: function () {
      console.log("App has started");
      setupEventListeners();
    },
  };
})(budgetController, UIController);

controller.initialization();
