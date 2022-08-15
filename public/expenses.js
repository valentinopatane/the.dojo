//Elementos del HTML

const balanceEl = document.querySelector(".balance .value");
const incomeTotalEl = document.querySelector(".incomeTotal");
const outcomeTotalEl = document.querySelector(".outcomeTotal");
const incomeEl = document.querySelector("#income");
const expenseEl = document.querySelector("#expense");
const allEl = document.querySelector("#all");
const incomeList = document.querySelector("#income .list");
const expenseList = document.querySelector("#expense .list");
const allList = document.querySelector("#all .list");

//Botones

const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");

//Inputs

const addExpense = document.querySelector(".addExpense");
const expenseTitle = document.getElementById("expenseTitleInput");
const expenseAmount = document.getElementById("expenseAmountInput");

const addIncome = document.querySelector(".addIncome");
const incomeTitle = document.getElementById("incomeTitleInput");
const incomeAmount = document.getElementById("incomeAmountInput");

//Variables

let entryList = [];
let balance = 0;
let income = 0;
let outcome = 0;

//Botones de editar y eliminar

const DELETE = "delete";
const EDIT = "edit";

//EventListeners que muestran y ocultan las 3 tabs

expenseBtn.addEventListener("click", function () {
    show(expenseEl);
    hide([incomeEl, allEl]);
    active(expenseBtn);
    inactive([incomeBtn, allBtn]);
});
incomeBtn.addEventListener("click", function () {
    show(incomeEl);
    hide([expenseEl, allEl]);
    active(incomeBtn);
    inactive([expenseBtn, allBtn]);
});
allBtn.addEventListener("click", function () {
    show(allEl);
    hide([incomeEl, expenseEl]);
    active(allBtn);
    inactive([incomeBtn, expenseBtn]);
});

function show(element) {
    element.classList.remove("hide");
}
function hide(elements) {
    elements.forEach((element) => {
        element.classList.add("hide");
    });
}
function active(element) {
    element.classList.add("active");
}
function inactive(elements) {
    elements.forEach((element) => {
        element.classList.remove("active");
    });
}

//Verificar si hay datos almacenados en el local storage

entryList = JSON.parse(localStorage.getItem("entry_list")) || [];
updateBudget();

//Añadir objetos (gastos o ingresos) a array de entradas

addExpense.addEventListener("click", () => {
    if (!expenseTitle.value || !expenseAmount.value) {
        return;
    } else {
        let expense = {
            type: "expense",
            title: expenseTitle.value,
            amount: parseInt(expenseAmount.value),
        };
        entryList.push(expense);
        //Actualización de los numeros del presupuesto general
        updateBudget();
        //Borra los datos de los input al añadirlos
        clearInput([expenseTitle, expenseAmount]);
    }
});
addIncome.addEventListener("click", () => {
    if (!incomeTitle.value || !incomeAmount.value) {
        return;
    } else {
        let income = {
            type: "income",
            title: incomeTitle.value,
            amount: parseInt(incomeAmount.value),
        };
        entryList.push(income);
        updateBudget();
        clearInput([incomeTitle, incomeAmount]);
    }
});

// Eliminar (gastos o ingresos) del array de entradas

incomeList.addEventListener("click", deleteOrEdit);
expenseList.addEventListener("click", deleteOrEdit);
allList.addEventListener("click", deleteOrEdit);

//*Actualización de los numeros del presupuesto general

function updateBudget() {
    income = calculateTotal("income", entryList);
    outcome = calculateTotal("expense", entryList);
    balance = calculateBalance(income, outcome);

    //*Signo en balance
    let sign = "";

    if (income >= outcome) {
        sign = "$";
    } else {
        sign = "-$";
    }

    clearElement([expenseList, incomeList, allList]);

    balanceEl.innerHTML = `<small>${sign}</small>${balance}`;
    outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;
    incomeTotalEl.innerHTML = `<small>$</small>${income}`;

    entryList.forEach((entry, index) => {
        if (entry.type == "expense") {
            showEntry(
                expenseList,
                entry.type,
                entry.title,
                entry.amount,
                index
            );
        } else if (entry.type == "income") {
            showEntry(incomeList, entry.type, entry.title, entry.amount, index);
        }
        showEntry(allList, entry.type, entry.title, entry.amount, index);
    });

    localStorage.setItem("entry_list", JSON.stringify(entryList));
}
function calculateTotal(type, list) {
    let suma = 0;

    list.forEach((entry) => {
        if (entry.type === type) {
            suma += entry.amount;
        }
    });
    return suma;
}
function calculateBalance(income, outcome) {
    return income - outcome;
}

//*Borra los datos de los input al añadirlos

function clearInput(inputs) {
    inputs.forEach((input) => {
        input.value = "";
    });
}
function clearElement(elements) {
    elements.forEach((element) => {
        element.innerHTML = "";
    });
}
function showEntry(list, type, title, amount, id) {
    const entry = ` <li id = "${id}" class="${type}">
                        <div class="entry" id="${type}">${title}: $${amount}</div>
                        <div class="buttonsEntry">
                            <div class="buttonEntry"><img id="edit" src="../multimedia/edit-solid.svg"></img></div>
                            <div  class="buttonEntry"><img id="delete" src="../multimedia/trash-solid.svg"></img></div>
                        </div>
                    </li>`;
    const position = "afterbegin";
    list.insertAdjacentHTML(position, entry);
}

//Eliminar o editar datos

function deleteOrEdit(event) {
    const targetBtn = event.target;

    const entry = targetBtn.parentNode.parentNode.parentNode;
    console.log(entry);

    if (targetBtn.id == DELETE) {
        deleteEntry(entry);
    } else if (targetBtn.id == EDIT) {
        editEntry(entry);
    }
}
function deleteEntry(entry) {
    entryList.splice(entry.id, 1);
    updateBudget();
}
function editEntry(entry) {
    let ENTRY = entryList[entry.id];

    console.log(ENTRY);

    if (ENTRY.type == "income") {
        incomeAmount.value = ENTRY.amount;
        incomeTitle.value = ENTRY.title;
    } else if (ENTRY.type == "expense") {
        expenseAmount.value = ENTRY.amount;
        expenseTitle.value = ENTRY.title;
    }
    deleteEntry(entry);
}
