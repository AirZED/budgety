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

  let calcTotal = function (type) {
    let sum = 0;

    data.allitems[type].forEach((element) => {
      sum += element.value;
    });

    data.totals[type] = sum;
  };

  let data = {
    allitems: {
      exp: [],
      inc: [],
    },
    totals: {
      exp: 0,
      inc: 0,
    },
    budget: 0,
    percentage: -1,
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

    calcBudget: function () {
      //calculate total income and expenses
      calcTotal("exp");
      calcTotal("inc");

      //calculate total budget which is the total incom - total expenses
      data.budget = data.totals.inc - data.totals.exp;
      //calculate the percentade of the income that we spent
      data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
    },
    getBudget: function () {
      return {
        budget: data.budget,
        inc: data.totals.inc,
        exp: data.totals.exp,
        percentage: data.percentage,
      };
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
    backdrop: ".backdrop",
  };

  return {
    getInput: function () {
      return {
        type: document.querySelector(DomStrings.inputType).value, //Will be either income or expense based on the select element.
        description: document.querySelector(DomStrings.descriptionType).value,
        value: +document.querySelector(DomStrings.valueType).value,
      };
    },
    addListItem: function (obj, type) {
      let html;
      //Create html string with placeholder text

      if (type === "inc") {
        html = `<li id= "${obj.id}">
          <div>${obj.description}</div> 
          <div class="income-amount">$${obj.value}<span>25%</span><span>x</span></div>
      </li>`;
      } else if (type === "exp") {
        html = `<li id= "${obj.id}">
                <div>${obj.description}</div>
                <div class="expense-amount">$${obj.value}<span>50%</span><span>x</span></div>
              </li>`;
      }

      //Replace the placeholder text with some real data
      document
        .querySelector(`.${type}-adons`)
        .insertAdjacentHTML(`afterbegin`, html);

      //Insert the html into the DOM
    },
    DisplayBudget: function (obj) {
      document.querySelector(".total-amount").textContent = `$` + obj.budget;
      

      document.querySelector(`.inc-amount`).textContent = `$` + obj.inc;
      document.querySelector(".exp-amount").textContent = `$` + obj.exp;
      if (obj.inc <= 0) {
        document.querySelector(`.exp-percent`).textContent =
          0 + `%`;
      } else {
        document.querySelector(`.exp-percent`).textContent =
          obj.percentage + `%`;
      }
      
    },
    clearFields: function () {
      //Clear the input fields
      let fields = document.querySelectorAll(
        DomStrings.descriptionType + `,` + DomStrings.valueType
      );
      fields.forEach((each) => (each.value = ``));

      //Sets the input focus to the first input element
      fields[0].focus();
    },

    //Function to add the backdrop
    addBackDrop: function () {
      document.querySelector(".backdrop").classList.add(`active`);
    },
    getDOMString: function () {
      return DomStrings;
    },
  };
})();

//GLOBAL APP CONTROLLER
//In order for this branch to access the other functions, they would be passed as arguments to this function below
const controller = (function (budgetCtrl, UICtrl) {
  let DOM = UICtrl.getDOMString();
  let setupEventListeners = function () {
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

  let updateBudget = function ()
  {
    input = UICtrl.getInput();
    //Calculate the  Total Budget
    budgetCtrl.calcBudget();
    //Return the Calculated Budget

    let budget = budgetCtrl.getBudget();

    //Display the budget on the UI
    UICtrl.DisplayBudget(budget);
  };

  let ctrlAddItem = function () {
    let input, newItem;
    //Get the filled input data

    input = UICtrl.getInput();
    if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
      //Add the item to the budget controller
      newItem = budgetCtrl.additem(input.type, input.description, input.value);

      //add the item to the UI
      UICtrl.addListItem(newItem, input.type);

      //Clear the fields
      UICtrl.clearFields();

      //Calculate and update budget
      updateBudget();
    } else {
      //Add backdrop
      UICtrl.addBackDrop();
    }
  };

  return {
    initialization: function () {
      console.log("App has started");
      setupEventListeners();
    },

    updateBudget: function ()
    {
      input = UICtrl.getInput();
      //Calculate the  Total Budget
      budgetCtrl.calcBudget();
      //Return the Calculated Budget

      let budget = budgetCtrl.getBudget();

      //Display the budget on the UI
      UICtrl.DisplayBudget(budget);
    },
  };
})(budgetController, UIController);

controller.initialization();
controller.updateBudget();
