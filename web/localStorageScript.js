const checkColor = "#000";
const normalColor = "#ccc";
const storageItemName = "tables";

const months = {
  "January": 31,
  "February": 28,
  "March": 31,
  "April": 30,
  "May": 31,
  "June": 30,
  "July": 31,
  "August": 31,
  "September": 30,
  "October": 31,
  "November": 30,
  "December": 31,
};

const initialTables = {
  "Felt depressed": Array.from(Array(365), () => false),
  "Cooked": Array.from(Array(365), () => false),
  "Pooped": Array.from(Array(365), () => false),
  "Gym": Array.from(Array(365), () => false),
  "Running": Array.from(Array(365), () => false),
  "Ordered food": Array.from(Array(365), () => false),
  "Junk food": Array.from(Array(365), () => false),
  "Sleep well": Array.from(Array(365), () => false),
  "Alcohol": Array.from(Array(365), () => false),
  "Sick": Array.from(Array(365), () => false),
};

let tables = undefined;

async function changeColor(target) {
  // const td = document.getElementById(target);
  const black = checkColor;
  const gray = normalColor;
  const select = document.getElementById("selectTables");

  let setColor = black;
  if (target.style.background === "rgb(0, 0, 0)") {
    setColor = gray;
  }
  target.style.background = setColor;

  tables[select.value][target.id] = !tables[select.value][target.id];
  await updateTables();
}

async function initTables() {
  const data = localStorage.getItem(storageItemName);

  if (!data) {
    tables = initialTables;
  } else {
    tables = JSON.parse(data);
  }

  const select = document.getElementById("selectTables");
  for (table in tables) {
    const option = document.createElement("option");
    option.value = table;
    option.textContent = table;
    select.append(option);
  }
}

function showTable(target) {
  if (!target) {
    const select = document.getElementById("selectTables");
    if (!select || !select.options) {
      return;
    }

    target = select.options[0];
    console.log("select:", select, select.options, select.options[0]);
  }

  const body = document.getElementById("content");
  body.innerHTML = "";
  let weekday = 1;
  let yearDay = 1;

  for (month in months) {
    const table = document.createElement("table");
    let tr = document.createElement("tr");

    const th = document.createElement("th");
    th.textContent = month;
    th.setAttribute("colspan", 7);
    tr.append(th);
    table.append(tr);
    tr = document.createElement("tr");

    for (let day=0; day < weekday; day++) {
      const td = document.createElement("td");
      td.classList.add("blank");
      tr.append(td);
    }

    for (let day=1; day <= months[month]; day++) {
      weekday += 1;
      const td = document.createElement("td");
      td.onclick = function() { changeColor(td); };

      if (tables[target.value][yearDay]) {
        td.style.background = checkColor;
      }

      td.id = yearDay;
      yearDay++;

      tr.append(td);

      if (weekday === 7) {
        table.append(tr);
        tr = document.createElement("tr");
        weekday = 0;
      }
    }

    for (let day=weekday; day < 7; day++) {
      const td = document.createElement("td");
      td.classList.add("blank");
      tr.append(td);
    }

    table.append(tr);
    body.append(table);
  }
}

async function updateTables() {
  localStorage.setItem(storageItemName, JSON.stringify(tables));
}

async function deleteTable() {
  const select = document.getElementById("selectTables");
  delete tables[select.value];
  await updateTables();
  location.reload();
}

async function createTable() {
  const tablenameInput = document.getElementById("tableNameInput");
  tables[tablenameInput.value] = Array.from(Array(365), () => false);
  await updateTables();
  tablenameInput.value = "";
  location.reload();
}
